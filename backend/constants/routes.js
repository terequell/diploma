export const ROUTES = {
    REGISTER_ROUTE: '/auth/register',
    LOGIN_ROUTE: '/auth/login',
    LOGOUT_ROUTE: '/auth/logout',
    REFRESH_TOKENS_ROUTE: '/auth/refresh',
    GET_USER_DETAILS: '/me',
    UPDATE_WORDS_TABLE: '/words/update',
    CREATE_LESSON: '/lesson/create',
};

export const ROUTES_DONT_NEED_AUTH = [
    ROUTES.LOGIN_ROUTE, ROUTES.REGISTER_ROUTE, ROUTES.REFRESH_TOKENS_ROUTE, ROUTES.UPDATE_WORDS_TABLE
];
