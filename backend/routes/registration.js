const express = require('express');
const router = express.Router();
const db = require('../db');
const validator = require('validator');

router.post('/', checkValidity, (req, res, next) => {
    const { username, password, email, difficulty_level } = req.body;

    const newUser = {
        username,
        password,
        email,
        difficulty_level,
    }

    db.query("INSERT INTO user SET ?", newUser, (err, result) => {
        if (err) {
            res.status(500).send('Something on backend falls...');
            throw new Error(err);
        }

        res.status(201).send('User has beed registered!');
    });
})

function checkValidity (req, res, next) {
    const { username, password, email } = req.body;
    
    const isEmailValid = validator.isEmail(email);
    const isUsernameValid = validator.isAlphanumeric(username);
    const isPasswordValid = password.length > 3;

    if (isEmailValid && isUsernameValid && isPasswordValid) {
        next();
    } else {
        res.status(400).send('Some of fields is invalid. Check them please.')
    }
}

module.exports = router;
