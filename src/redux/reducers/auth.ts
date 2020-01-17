import { RegisterAction } from '../types/register';

type AuthState = {};

const initialState: AuthState = {};

export default function(state: AuthState = initialState, action: RegisterAction): AuthState {
    switch (action) {
        case RegisterAction.AccountRegisteted:
            break;
    }

    return state;
}
