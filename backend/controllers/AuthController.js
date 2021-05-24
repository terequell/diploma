import bcrypt from 'bcrypt';
import AuthService from '../services/AuthService.js';
import { checkRegisterFieldsValid } from '../helpers/auth.js';
import { STATUS_CODES } from '../constants/statusCodes.js';

const SALT_ROUNDS = 10;

class AuthController {
    async register(request, response) {
        try {
            const { username, password, email } = request.body;
            const difficulty_level = 1; // TODO: добавить какое нибудь начальное определение уровня.
            const isFieldsValid = checkRegisterFieldsValid({ username, password, email });
            const isUserAlreadyExists = Boolean(await AuthService.getUserByEmail(email));

            if (isUserAlreadyExists) {
                response.status(200).json({ statusCode: STATUS_CODES.USER_ALREADY_EXISTS });
                return;
            }

            if (isFieldsValid) {
                const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

                const newUser = {
                    username,
                    password: hashedPassword,
                    email,
                    difficulty_level,
                }
    
                await AuthService.registerUser(newUser);

                response.status(200).json({ 
                    user: { username, email, difficulty_level }, 
                    message: 'User succesfully registered!',
                    statusCode: STATUS_CODES.OK,
                });
            } else {
                response.status(400).send('Some of fields is invalid. Check them please.');
            }
        } catch (error) {
            response.status(500).send('Server error!');
        }
    }

    async login(request, response) {
        try {
            const { email, password } = request.body;

            const isPasswordValid = await AuthService.checkPasswordValidity(email, password);

            if (isPasswordValid) {
                const userInfo = await AuthService.getUserByEmail(email);
                const userId = userInfo.id;

                const tokens = await AuthService.generateAndSaveTokens(userId);

                response.status(200).json({ statusCode: STATUS_CODES.OK, tokens });
            } else {
                response.status(200).json({ statusCode: STATUS_CODES.INVALID_PASSWORD });
            }
        } catch (error) {
            response.status(500).send('Server error!');
        }
    }

    async logout(request, response) {
        try {
            const { userId } = request;

            await AuthService.deleteUserRefreshTokens(userId);

            response.status(200).json({ statusCode: STATUS_CODES.OK });
        } catch (error) {
            response.status(500).send('Server error!');
        }
    }

    async refreshTokens(request, response) {
        try {
            const { refreshToken } = request.body;
            const isRefreshTokenValid = AuthService.checkIsTokenValid(refreshToken);

            if (isRefreshTokenValid) {
                const userId = AuthService.getUserIdFromToken(refreshToken);
                const tokens = await AuthService.generateAndSaveTokens(userId); 

                response.status(200).json({ statusCode: STATUS_CODES.OK, tokens });
            } else {
                response.status(403).send('Invalid refresh token!');
            }
        } catch (error) {
            response.status(500).send('Server error!');
        }
    }
}

export default new AuthController();
