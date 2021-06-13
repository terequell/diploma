const FRONT_URL = 'localhost:3000';
const LOGIN_URL = `${FRONT_URL}/login`;

describe('Тест страницы входа', () => {
    beforeEach(() => {
        cy.visit(LOGIN_URL);
    });

    it ('Есть валидная кнопка назад', () => {
        cy.get('.cy-back_button').click();
        cy.location('pathname').should('not.include', '/login');
    })

    it ('Поле электронной почты валидно', () => {
        const field = cy.get('.cy-login_email');
        field.contains('E-mail');

        field.get('input#email').type('alexey-032@ya.ru').should('have.value', 'alexey-032@ya.ru');

        field.clear().focus();
        field.get('div[role="alert"]').should('be.visible').contains('Пожалуйста, введите корректную почту');
    })

    it ('Поле пароля валидно', () => {
        const field = cy.get('.cy-login_password');
        field.contains('Пароль');

        field.get('input#password').type('qwe123rty').should('have.value', 'qwe123rty');

        field.clear().focus();
        field.get('div[role="alert"]').should('be.visible').contains('Пожалуйста, введите пароль');
    })

    it ('Отправление пустых полей (вместе или по отдельности) не пройдет валидацию.', () => {
        const email_input = cy.get('.cy-login_email');
        const password_input = cy.get('.cy-login_password');

        email_input.get('input#email').clear();
        password_input.get('input#password').clear();

        cy.get('.cy-login_button').click();
        cy.location('pathname').should('include', '/login');
    })

    it ('Вход с правильными данными', () => {
        const email_input = cy.get('.cy-login_email');
        const password_input = cy.get('.cy-login_password');

        email_input.get('input#email').type('alexey-032@yandex.ru');
        password_input.get('input#password').type('12345');

        cy.get('.cy-login_button').click()
        cy.location('pathname').should('include', '/home');
    })

    it ('Вход с неправильными данными', () => {
        const email_input = cy.get('.cy-login_email');
        const password_input = cy.get('.cy-login_password');

        email_input.get('input#email').type('alexey-032@yandex.ru');
        password_input.get('input#password').type('1337qwerty');

        cy.get('.cy-login_button').click()
        cy.get('.cy-notification').should('be.visible');
        cy.location('pathname').should('include', '/login');
    })
});


