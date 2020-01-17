import { RegisterUser, RegisterAction } from '../types/register';

import { ApiType } from '../types/api';
import { ApiAction } from '../apiMiddleware';

export function registerAccount(user: RegisterUser): ApiAction {
    return {
        type: ApiType.ApiRequest,
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
