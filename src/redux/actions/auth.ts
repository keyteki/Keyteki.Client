import { RegisterUser, RegisterType } from '../types/register';

import { ApiType } from '../types/api';

export function registerAccount(user: RegisterUser): ApiAction {
    return {
        type: ApiType.ApiRequest,
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
