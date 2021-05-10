import express from 'express';
import AuthController from './controllers/AuthController.js';
import UserController from './controllers/UserController.js';
import WordController from './controllers/WordController.js';
import LessonController from './controllers/LessonController.js';
import { ROUTES } from './constants/routes.js';

const router = express.Router();

router.post(ROUTES.REGISTER_ROUTE, AuthController.register);
router.post(ROUTES.LOGIN_ROUTE, AuthController.login);
router.post(ROUTES.LOGOUT_ROUTE, AuthController.logout);
router.post(ROUTES.REFRESH_TOKENS_ROUTE, AuthController.refreshTokens);

router.get(ROUTES.GET_USER_DETAILS, UserController.getUserDetails);

router.post(ROUTES.UPDATE_WORDS_TABLE, WordController.__updateTable);

router.post(ROUTES.CREATE_LESSON, LessonController.createLesson);

export default router;
