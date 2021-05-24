import pool from '../dbConnection.js';
import * as arrayHelpers from '../helpers/arrays.js';
import * as objectHelpers from '../helpers/objects.js';
import { 
    WORDS_PER_LESSON_COUNT, 
    EXERCISE_TYPES, 
    WORDS_COUNT_FOR_UPGRADE_DIFFICULTY_LEVEL 
} from '../constants/lesson.js';

class LessonService {
    async createLesson(userId, difficulty_level) {
        try {
            const newLessonResult = await pool.query('INSERT INTO lesson (userId, difficulty_level) VALUES (?, ?);', [userId, difficulty_level]);
            const { insertId } = newLessonResult[0];

            return insertId;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    async insertWordsToLesson(userId, lessonId) {
        try {
            const result = await pool.query('SELECT * FROM lesson WHERE id = ?;', [lessonId]);
            const [lessonInfo] = result[0];

            const { difficulty_level } = lessonInfo;

            const [allWords] = await pool.query('SELECT * FROM word WHERE difficulty_level = ?', [difficulty_level]);
            const [wordsLearnedRes] = await pool.query('CALL get_fully_learned_words_by_user_by_difficulty(?, ?)', [userId, difficulty_level]);
            const [wordsLearned] = wordsLearnedRes;

            const wordsForLesson = [];

            while (wordsForLesson.length !== WORDS_PER_LESSON_COUNT) {
                const wordId = arrayHelpers.getRandomItem(allWords).id;
                const wordLearned = wordsLearned.find((word) => word.id === wordId);

                if (!wordsForLesson.includes(wordId) && !wordLearned) {
                    wordsForLesson.push(wordId);
                }
            }

            await Promise.all(wordsForLesson.map(async (word) => {
                const exercise_type = objectHelpers.getRandomProperty(EXERCISE_TYPES);

                await pool.query('INSERT INTO lesson_word (word_id, lesson_id, exercise_type) VALUES (?, ?, ?);', [word, lessonId, exercise_type]);
            }));
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    async getLessonDetails(lessonId, difficulty_level) {
        try {
            const [lessonResult] = await pool.query('CALL get_words_by_lesson(?);', [lessonId]);
            const lessonWords = lessonResult[0].map((word) => ({
                id: word.wordId,
                russian_wording: word.russian_wording,
                english_wording: word.english_wording,
                exercise_type: word.exercise_type,
            }));

            return {
                lessonId,
                difficulty_level,
                words: lessonWords,
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async updateLessonDetailsAfterFinish(lessonId, answers) {
        try {
            await Promise.all(answers.map(async (item) => {
                const { isRight, answer, wordId } = item;
                await pool.query(
                    'UPDATE lesson_word SET isRightAnswered=?, answer=? WHERE word_id=? and lesson_id=?;',
                    [isRight, answer, wordId, lessonId]
                );
            }));

            await pool.query(
                'UPDATE lesson SET isFinished=true WHERE id=?;', 
                [lessonId],
            );

            return { success: true };
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getCountLessonsFinished(userId) {
        try {
            const [finishedLessons] = await pool.query('SELECT * FROM lesson WHERE userId=? and isFinished=true;', [userId]);

            if (Array.isArray(finishedLessons)) {
                return finishedLessons.length;
            }

            return 0;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async upgradeUserDifficultyLevelIfPossible(userId, difficulty_level) {
        try {
            const [wordsLearnedRes] = await pool.query('CALL get_fully_learned_words_by_user_by_difficulty(?, ?)', [userId, difficulty_level]);
            const [wordsLearned] = wordsLearnedRes;
            const wordsLearnedCount = wordsLearned.length;
            const isLearnedMoreThanNeedForUpgrade = (wordsLearnedCount / WORDS_COUNT_FOR_UPGRADE_DIFFICULTY_LEVEL) > difficulty_level;

            if (isLearnedMoreThanNeedForUpgrade) {
                await pool.query(
                    'UPDATE user SET difficulty_level=? WHERE id=?;', 
                    [difficulty_level + 1, userId],
                );
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

export default new LessonService();
