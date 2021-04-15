import bcrypt from 'bcrypt';
import AuthService from '../services/AuthService.js';
import { checkRegisterFieldsValid } from '../helpers/auth.js';

const SALT_ROUNDS = 10;

class AuthController {
    async register(request, response) {
        try {
            const { username, password, email, difficulty_level } = request.body;
            const isFieldsValid = checkRegisterFieldsValid({ username, password, email });
            const isUserAlreadyExists = Boolean(await AuthService.getUserByEmail(email));

            if (isUserAlreadyExists) {
                response.status(400).send('This user already exists.');
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

                response.status(200).send('You has beed registrated!');
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
                response.status(200).send('You has been logged in!');
            } else {
                response.status(401).send('Invalid email or password!');
            }
        } catch (error) {
            response.status(500).send('Server error!');
        }
    }
}

export default new AuthController();
