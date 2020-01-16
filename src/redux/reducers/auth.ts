import { ApiAction } from '../apiMiddleware';

type AuthState = {};

const initialState: AuthState = {};

export default function(state: AuthState = initialState, action: ApiAction): AuthState {
    return state;
}
