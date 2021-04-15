import bcrypt from 'bcrypt';
import pool from '../dbConnection.js';

class AuthService {
    async registerUser(user) {
        try {
            await pool.query("INSERT INTO user SET ?", user, (err, result) => {
                console.log(result);
                if (err) {
                    response.status(500).send('Server error from auth router...');
                    throw new Error(err);
                }
            });

            return user;
        } catch (e) {
            console.error(e);
        }
    }

    async getUserByEmail(email) {
        try {
            const result = await pool.query(`SELECT * from user where email = ? ;`, [email]);
            const data = result[0];
    
            if (data && data.length === 1) {
                return data[0];
            }
    
            return null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async checkPasswordValidity(email, password) {
        try {
            const userInfo = await this.getUserByEmail(email);

            if (userInfo) {
                const userHashedPassword = userInfo.password;
                const isPasswordValid = await bcrypt.compare(password, userHashedPassword);

                return isPasswordValid;
            }

            return false;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

export default new AuthService();
