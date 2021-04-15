import validator from 'validator';

export function checkRegisterFieldsValid(fields) {
    const { username, password, email } = fields;

    const isEmailValid = validator.isEmail(email);
    const isUsernameValid = validator.isAlphanumeric(username);
    const isPasswordValid = password.length > 3;

    return isEmailValid && isUsernameValid && isPasswordValid;
}
