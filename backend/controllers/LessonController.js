import LessonService from '../services/LessonService.js';
import UserService from '../services/UserService.js';

class LessonController {
    async createLesson(request, response) {
        try {
            const { userId } = request;

            const userInfo = await UserService.getUserDetails(userId);
            const { difficulty_level } = userInfo;

            const createdLessonId = await LessonService.createLesson(userId, difficulty_level);
            await LessonService.insertWordsToLesson(createdLessonId);

            const lessonDetails = await LessonService.getLessonDetails(createdLessonId, difficulty_level);

            console.log(lessonDetails);
        } catch (error) {
            response.status(500).send('Server error!');
        }
    }
}

export default new LessonController();
