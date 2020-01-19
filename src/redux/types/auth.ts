export type RegisterUser = {
    username: string;
    password: string;
    email: string;
};

export type LoginDetails = {
    username: string;
    password: string;
};

export enum AuthAction {
    RegisterAccount = 'REGISTER_ACCOUNT',
    AccountRegisteted = 'ACCOUNT_REGISTERED',
    LoginAccount = 'LOGIN_ACCOUNT',
    AccountLogin = 'ACCOUNT_LOGIN'
}

export interface User {
    id: string;
    username: string;
    email: string;
}

export type AuthState = {
    registered: boolean;
    token?: string;
    refreshToken?: string;
    user?: User;
};
