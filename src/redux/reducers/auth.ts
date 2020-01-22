import { Auth, User, AuthState, AuthAction } from '../types';

interface LoginResponse {
    token: string;
    refreshToken: string;
    user: User;
}

const initialState: AuthState = { registered: false };

export default function(state = initialState, action: AuthAction): AuthState {
    let response: LoginResponse;

    switch (action.type) {
        case Auth.AccountRegistered:
            return {
                ...state,
                registered: true
            };
        case Auth.AccountLogin:
        case Auth.AuthTokenReceived:
            response = action.response?.data;

            localStorage.setItem('token', response.token);
            localStorage.setItem('refreshToken', response.refreshToken);

            return {
                ...state,
                token: response.token,
                refreshToken: response.refreshToken,
                user: response.user
            };
        case Auth.AuthChecked:
            return {
                ...state,
                user: action.response?.data.user
            };
        case Auth.SetAuthTokens:
            return {
                ...state,
                token: action.token,
                refreshToken: action.refreshToken
            };
    }

    return state;
}
