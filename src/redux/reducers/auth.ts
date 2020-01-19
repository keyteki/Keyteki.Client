import { AuthAction, ApiResponseAction, User, AuthState } from '../types';

interface LoginResponse {
    token: string;
    refreshToken: string;
    user: User;
}

const initialState: AuthState = { registered: false };

export default function(state: AuthState = initialState, action: ApiResponseAction): AuthState {
    const response: LoginResponse = action.response?.data;

    switch (action.type) {
        case AuthAction.AccountRegisteted:
            return {
                ...state,
                registered: true
            };
        case AuthAction.AccountLogin:
            localStorage.setItem('token', response.token);
            localStorage.setItem('refreshToken', response.refreshToken);

            return {
                ...state,
                token: response.token,
                refreshToken: response.refreshToken,
                user: response.user
            };
            break;
    }

    return state;
}
