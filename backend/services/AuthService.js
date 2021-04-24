import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../dbConnection.js';

class AuthService {
    async registerUser(user) {
        try {
            await pool.query("INSERT INTO user SET ?", user, (err, result) => {
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

    async getUserRefreshToken(userId) {
        try {
            const result = await pool.query(`SELECT * from refresh_tokens where user_id = ? ;`, [userId]);
            const data = result[0];

            if (data && data.length > 0) {
                return data[0].token;
            }

            return null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async setUserRefreshToken(token, userId) {
        await pool.query('INSERT INTO refresh_tokens (token, user_id) VALUES (?, ?);', [token, userId]);
    }

    async deleteUserRefreshTokens(userId) {
        try {
            await pool.query('DELETE FROM refresh_tokens WHERE user_id = ?', [userId]);
        } catch (error) {
            console.error(error);
        }
    }

    async generateAndSaveTokens(userId) {
        try {
            const currentRefreshToken = await this.getUserRefreshToken(userId);

            if (currentRefreshToken) {
                const currentRefreshTokenValid = this.checkIsTokenValid(currentRefreshToken);

                if (currentRefreshTokenValid) {
                    const accessToken = this.generateAccessToken(userId);

                    return {
                        accessToken, 
                        refreshToken: currentRefreshToken
                    }
                }
            }

            await this.deleteUserRefreshTokens(userId);
    
            const accessToken = this.generateAccessToken(userId);
            const refreshToken = this.generateRefreshToken(userId);
    
            await this.setUserRefreshToken(refreshToken, userId);
    
            return {
                accessToken,
                refreshToken,
            };
        } catch (errror) {
            console.error(error);
            return null;
        }
    }

    generateAccessToken(userId) {
        return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' });
    }

    generateRefreshToken(userId) {
        return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' });
    }

    checkIsTokenValid(token) {
        let currentRefreshTokenValid = false;
 
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, data) => {
            if (error) {
                currentRefreshTokenValid = false;
                return;
            }
            currentRefreshTokenValid = true;
        });

        return currentRefreshTokenValid;
    }

    getUserIdFromToken(token) {
        let userId = null;

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, data) => {
            if (!error) {
                userId = data.userId;
            }
        });

        return userId;
    }
}

export default new AuthService();
