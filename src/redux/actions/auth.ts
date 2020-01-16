import { ApiAction } from '../apiMiddleware';
import { RegisterUser, RegisterType } from '../types/register';

import { ApiTypes } from '../types/api';

export function registerAccount(user: RegisterUser): ApiAction {
    return {
        type: ApiTypes.ApiRequest,
        types: [RegisterType.RegisterAccount, RegisterType.AccountRegisteted],
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
