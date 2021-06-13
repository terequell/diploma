const FRONT_URL = 'localhost:3000';
const REGISTER_URL = `${FRONT_URL}/register`;

describe('Тест страницы регистрации', () => {
    beforeEach(() => {
        cy.visit(REGISTER_URL);
    });

    it ('Есть валидная кнопка назад', () => {
        cy.get('.cy-back_button').click();
        cy.location('pathname').should('not.include', '/register');
    })

    it ('Поле имя пользователя валидно', () => {
        const field = cy.get('.cy-register_username');
        field.should('contain', 'Никнейм');

        field.get('input#username').type('Alexey032').should('have.value', 'Alexey032');

        field.clear().focus();
        field.get('div[role="alert"]').should('be.visible').contains('Пожалуйста, введите никнейм');
    })

    it ('Поле электронной почты валидно', () => {
        const field = cy.get('.cy-register_email');
        field.should('contain', 'E-mail');

        field.get('input#email').type('alexey-032@ya.ru').should('have.value', 'alexey-032@ya.ru');

        field.clear().focus();
        field.get('div[role="alert"]').should('be.visible').contains('Пожалуйста, введите корректную почту');
    })

    it ('Поле пароля валидно', () => {
        const field = cy.get('.cy-register_password');
        field.should('contain', 'Пароль');

        field.get('input#password').type('qwe123rty').should('have.value', 'qwe123rty');

        field.clear().focus();
        field.get('div[role="alert"]').should('be.visible').contains('Пожалуйста, введите пароль');
    })

    it ('Регистрация с уже существующей почтой', () => {
        const email_input = cy.get('.cy-register_email');
        const password_input = cy.get('.cy-register_password');
        const username_input = cy.get('.cy-register_username');

        email_input.get('input#email').type('alexey-032@yandex.ru');
        password_input.get('input#password').type('12345');
        username_input.get('input#username').type('Alexey032')

        cy.get('.cy-register_button').click()
        cy.get('.cy-notification_user-exists')
            .should('be.visible')
            .and('contain', 'Такой пользователь уже зарегистрирован! Пожалуйста, войдите с помощью email.');
    })
});
