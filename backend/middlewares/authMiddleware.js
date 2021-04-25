import jwt from 'jsonwebtoken';
import { ROUTES } from '../constants/routes.js';

export function authMiddleware(request, response, next) {
    if (request.originalUrl === ROUTES.LOGIN_ROUTE || 
        request.originalUrl === ROUTES.REGISTER_ROUTE ||
        request.originalUrl === ROUTES.REFRESH_TOKENS_ROUTE
    ) {
        return next();
    }

    try {
        const authHeader = request.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        
        if (!token) {
            return response.status(401).send('Unauthorized!');
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, data) => {
            if (error) {
                return response.status(401).send('Unauthorized!');
            }

            request.userId = data.userId;
            next();
        });
    } catch (error) {
        console.error(error);
        response.status(500).send('Server error!');
    }
}
