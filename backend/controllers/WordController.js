import WordService from '../services/WordService.js';

class WordController {
    async __updateTable() {
        try {
            await WordService.updateWordTable();
        } catch (error) {
            console.error(error);
        }
    }
}

export default new WordController();
