import { ApiActionType, RegisterUser, AuthAction, LoginDetails } from '../types';
import { ApiCallAction } from '../apiMiddleware';

export function registerAccount(user: RegisterUser): ApiCallAction {
    return {
        type: ApiActionType.ApiRequest,
        types: [AuthAction.RegisterAccount, AuthAction.AccountRegisteted],
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

export function loginAccount(user: LoginDetails): ApiCallAction {
    return {
        type: ApiActionType.ApiRequest,
        types: [AuthAction.LoginAccount, AuthAction.AccountLogin],
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
