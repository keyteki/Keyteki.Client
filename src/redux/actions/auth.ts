import { RegisterUser, Auth, LoginDetails, AuthAction } from '../types';

export function registerAccount(user: RegisterUser): AuthAction {
    return {
        type: Auth.AccountRegistered,
        types: [Auth.RegisterAccount, Auth.AccountRegistered],
        shouldCallApi: (): boolean => true,
        skipAuth: true,
        apiParams: {
            url: '/api/account/register',
            method: 'post',
            data: {
                username: user.username,
                email: user.email,
                password: user.password
            }
        }
    };
}

export function loginAccount(user: LoginDetails): AuthAction {
    return {
        type: Auth.AccountLogin,
        types: [Auth.LoginAccount, Auth.AccountLogin],
        shouldCallApi: (): boolean => true,
        skipAuth: true,
        apiParams: {
            url: '/api/account/login',
            method: 'post',
            data: {
                username: user.username,
                password: user.password
            }
        }
    };
}

export function setAuthTokens(token: string, refreshToken: string): AuthAction {
    return {
        type: Auth.SetAuthTokens,
        token: token,
        refreshToken: refreshToken
    };
}

export function checkAuth(): AuthAction {
    return {
        type: Auth.AuthChecked,
        types: [Auth.CheckAuth, Auth.AuthChecked],
        shouldCallApi: (): boolean => true,
        apiParams: {
            url: '/api/account/checkauth',
            method: 'post'
        }
    };
}
