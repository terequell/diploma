const FRONT_URL = 'localhost:3000';

describe("Тест стартовой страницы", () => {
    beforeEach(() => {
        cy.visit(FRONT_URL);
      })

    it('На стартовой странице есть корректное название приложения', () => {
        cy.get('h1').contains('Веб-приложение для тренировки английских слов.');
    })

    it ('На стартовой странице есть кнопка Войти', () => {
        cy.get('.cy-login').contains('Войти');
    })

    it ('Кнопка Войти редиректит на страницу входа', () => {
        cy.get('.cy-login').click();
        cy.location('pathname').should('include', '/login')
    })

    it ('На стартовой странице есть кнопка Регистрации', () => {
        cy.get('.cy-register').contains('Зарегистрироваться');
    })

    it ('Кнопка Регистрации редиректит на страницу регистрации.', () => {
        cy.get('.cy-register').click();
        cy.location('pathname').should('include', '/register')
    })
});
