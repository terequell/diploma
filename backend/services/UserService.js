import pool from '../dbConnection.js';

class UserService {
    async getUserDetails(userId) {
        try {
            const result = await pool.query(`SELECT * from user where id = ? ;`, [userId]);
            const data = result[0];

            if (data && data[0]) {
                return {
                    username: data[0].username,
                    email: data[0].email,
                    difficulty_level: data[0].difficulty_level,
                    dateRegistration: data[0].reg_date,
                }
            }

            return null;
        } catch (error) {
            return null;
        }
    }
}

export default new UserService();
