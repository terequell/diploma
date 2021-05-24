import LessonService from '../services/LessonService.js';
import UserService from '../services/UserService.js';
import { STATUS_CODES } from '../constants/statusCodes.js';

class LessonController {
    async createLesson(request, response) {
        try {
            const { userId } = request;

            const userInfo = await UserService.getUserDetails(userId);
            const { difficulty_level } = userInfo;

            const createdLessonId = await LessonService.createLesson(userId, difficulty_level);
            await LessonService.insertWordsToLesson(userId, createdLessonId);

            const lessonDetails = await LessonService.getLessonDetails(createdLessonId, difficulty_level);

            response.status(200).json(lessonDetails);
        } catch (error) {
            response.status(500).send('Server error!');
        }
    }

    async finishLesson(request, response) {
        try {
            const { lessonId, answers } = request.body;
            const { userId } = request;

            const userInfo = await UserService.getUserDetails(userId);
            const { difficulty_level } = userInfo;

            const { success } = await LessonService.updateLessonDetailsAfterFinish(lessonId, answers);
            await LessonService.upgradeUserDifficultyLevelIfPossible(userId, difficulty_level);

            if (success) {
                response.status(200).json({ status: STATUS_CODES.OK });   
            } else {
                response.status(500).send('Something with updating lesson after finish it.');
            }
        } catch (error) {
            response.status(500).send('Server error!');
        }
    }
}

export default new LessonController();
