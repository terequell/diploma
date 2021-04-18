import express from 'express';
import AuthController from './controllers/AuthController.js';
import { ROUTES } from './constants/routes.js';

const router = express.Router();

router.post(ROUTES.REGISTER_ROUTE, AuthController.register);
router.post(ROUTES.LOGIN_ROUTE, AuthController.login);
router.post(ROUTES.LOGOUT_ROUTE, AuthController.logout);

export default router;
