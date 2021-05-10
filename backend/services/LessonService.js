import pool from '../dbConnection.js';
import * as arrayHelper from '../helpers/arrays.js';
import { WORDS_PER_LESSON_COUNT } from '../constants/lesson.js';

class LessonService {
    async createLesson(userId, difficulty_level) {
        try {
            const newLessonResult = await pool.query('INSERT INTO lesson (userId, difficulty_level) VALUES (?, ?);', [userId, difficulty_level]);
            const { insertId } = newLessonResult[0];

            return insertId;
        } catch (error) {
            throw new Error(error);
        }
    }

    async insertWordsToLesson(lessonId) {
        try {
            const result = await pool.query('SELECT * FROM lesson WHERE id = ?;', [lessonId]);
            const [lessonInfo] = result[0];

            const { difficulty_level } = lessonInfo;

            const [allWords] = await pool.query('SELECT * FROM word WHERE difficulty_level = ?', [difficulty_level]);

            const wordsForLesson = [];

            while (wordsForLesson.length !== WORDS_PER_LESSON_COUNT) {
                // TODO: сделать более сложную логику генерации слов в зависимости от имеющегося прогресса у пользователя
                const wordId = arrayHelper.getRandomItem(allWords).id;

                if (!wordsForLesson.includes(wordId)) {
                    wordsForLesson.push(wordId);
                }
            }

            await Promise.all(wordsForLesson.map(async (word) => {
                await pool.query('INSERT INTO lesson_word (word_id, lesson_id) VALUES (?, ?);', [word, lessonId]);
            }));
        } catch (error) {
            throw new Error(error);
        }
    }

    async getLessonDetails(lessonId, difficulty_level) {
        try {
            const [lessonResult] = await pool.query('CALL get_words_by_lesson(?);', [lessonId]);
            
            const lessonWords = lessonResult[0].map((word) => ({
                russian_wording: word.russian_wording,
                english_wording: word.english_wording,
            }));

            return {
                lessonId,
                difficulty_level,
                words: lessonWords,
            }
        } catch (error) {
            return null;
        }
    }
}

export default new LessonService();
