import UserService from '../services/UserService.js';

class UserController {
    async getUserDetails(request, response) {
        try {
            const { userId } = request;

            const userDetails = await UserService.getUserDetails(userId);

            if (userDetails) {
                response.status(200).json(userDetails);
            }

            response.status(404).send('User info not found...');
        } catch (error) {
            response.status(500).send('Server error!');
        }
    } 
}

export default new UserController();
