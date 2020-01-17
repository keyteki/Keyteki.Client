import { ApiActionType, RegisterUser, RegisterAction } from '../types';
import { ApiCallAction } from '../apiMiddleware';

export function registerAccount(user: RegisterUser): ApiCallAction {
    return {
        type: ApiActionType.ApiRequest,
        types: [RegisterAction.RegisterAccount, RegisterAction.AccountRegisteted],
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
