import { Auth, User, AuthState, AuthAction } from '../types';

interface LoginResponse {
    token: string;
    refreshToken: string;
    user: User;
}

const initialState: AuthState = { registered: false, sessions: [], blocklist: [] };

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
        case Auth.SessionsReceived:
            return {
                ...state,
                sessions: action.response?.data.tokens
            };
        case Auth.SessionRemoved:
            return {
                ...state,
                sessions: state.sessions?.filter(
                    session => session.id !== action.response?.data.tokenId
                )
            };
        case Auth.BlocklistReceived:
            return {
                ...state,
                blocklist: action.response?.data.blockList
            };
        case Auth.BlocklistEntryRemoved:
            return {
                ...state,
                blocklist: state.blocklist.filter(entry => entry !== action.response?.data.username)
            };
        case Auth.BlocklistEntryAdded:
            return {
                ...state,
                blocklist: [...state.blocklist, action.response?.data.username]
            };
    }

    return state;
}
