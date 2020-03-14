import { Auth, User, AuthState, AuthAction } from '../types';

interface LoginResponse {
    token: string;
    user: User;
}

const initialState: AuthState = { sessions: [], blocklist: [] };

export default function(state = initialState, action: AuthAction): AuthState {
    let response: LoginResponse;

    switch (action.type) {
        case Auth.AuthTokenReceived:
            response = action.response?.data;

            return {
                ...state,
                token: response.token,
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
                token: action.token
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
