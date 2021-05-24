import UserService from '../services/UserService.js';
import LessonService from '../services/LessonService.js';
import WordService from '../services/WordService.js';

class UserController {
    async getUserDetails(request, response) {
        try {
            const { userId } = request;

            const userDetails = await UserService.getUserDetails(userId);
            const lessonsFinishedCount = await LessonService.getCountLessonsFinished(userId);
            const wordsLearned = await WordService.getWordsFullyLearned(userId);

            if (userDetails) {
                response.status(200).json({ 
                    ...userDetails,
                    lessonsFinishedCount: lessonsFinishedCount,
                    wordsLearnedCount: wordsLearned.length || 0
                });
            } else {
                response.status(404).send('User info not found...');
            }
        } catch (error) {
            response.status(500).send('Server error!');
        }
    } 
}

export default new UserController();
