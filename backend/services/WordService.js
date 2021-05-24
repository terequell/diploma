import { convertCsvToArray } from '../helpers/convertCsvToArray.js';
import path from 'path';
import pool from '../dbConnection.js';

class WordService {
    async updateWordTable() {
        const wordsPath = `${path.resolve()}/words.csv`;

        const words = await convertCsvToArray(wordsPath);
        const wordsRows = words.slice(1);

        await pool.query('DELETE FROM word');
        await pool.query('ALTER TABLE word AUTO_INCREMENT=1');
        await pool.query(
            'INSERT INTO word (russian_wording, english_wording, picture_link, difficulty_level) VALUES ?;', 
            [wordsRows]
        );
    }

    async getWordsFullyLearned(userId) {
        try {
            const [wordsLearnedRes] = await pool.query('CALL get_fully_learned_words_by_user(?)', [userId]);
            const [wordsLearned] = wordsLearnedRes;

            return wordsLearned;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

export default new WordService();
