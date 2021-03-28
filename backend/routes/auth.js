const express = require('express');
const router = express.Router();
const db = require('../db');
const validator = require('validator');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

// REGISTER ROUTE
router.post('/register', checkRegisterValidity, checkUserAlreadyExists, async (request, response, next) => {
    const { username, password, email, difficulty_level } = request.body;

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = {
        username,
        password: hashedPassword,
        email,
        difficulty_level,
    }

    db.query("INSERT INTO user SET ?", newUser, (err, result) => {
        if (err) {
            response.status(500).send('Server error from auth router...');
            throw new Error(err);
        }

        response.status(201).send('User has beed registered!');
    });
});

// LOGIN ROUTE
router.post('/login', checkUserExists, checkPasswordValidity, (request, response, next) => {
    const { email, password } = request.body;

});

function checkRegisterValidity (request, response, next) {
    const { username, password, email } = request.body;
    
    const isEmailValid = validator.isEmail(email);
    const isUsernameValid = validator.isAlphanumeric(username);
    const isPasswordValid = password.length > 3;

    if (isEmailValid && isUsernameValid && isPasswordValid) {
        next();
    } else {
        response.status(400).send('Some of fields is invalid. Check them please.')
    }
}

async function checkPasswordValidity (request, response, next) {
    const { email, password } = request.body;
    let userHashedPassword = '';

    await db.query(`SELECT * from user where email = ? ;`, [email], (err, result) => {
        if (err) {
            response.status(500).send('Server error from auth router...');
        }

        try {
            userHashedPassword = result[0].password;
        } catch (error) {
            console.log(error);
        }
    });

    try {
        console.log(userHashedPassword)
        const isPasswordValid = await bcrypt.compare(password, userHashedPassword);
        console.log(isPasswordValid);
    } catch (error) {
        console.log(error);
    }
}

function checkUserAlreadyExists (request, response, next) {
    const { email } = request.body;

    db.query(`SELECT * from user where email = ? ;`, [email], (err, result) => {
        if (err) {
            return response.status(500).send('Server error from auth router...');
        }
        
        if (result.length > 0) {
            response.status(409).send("This email is already used.");
        } else {
            next();
        }
    });
}

function checkUserExists (request, response, next) {
    const { email } = request.body;

    db.query(`SELECT * from user where email = ? ;`, [email], (err, result) => {
        if (err) {
            return response.status(500).send('Server error from auth router...');
        }
        
        if (result.length > 0) {
            next();
        } else {
            response.status(404).send("User with this email not found.");
        }
    });
}

module.exports = router;
