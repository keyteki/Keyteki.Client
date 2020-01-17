import { RegisterAction } from '../types';

type AuthState = {
    registered: boolean;
};

const initialState: AuthState = { registered: false };

export default function(state: AuthState = initialState, action: RegisterAction): AuthState {
    switch (action) {
        case RegisterAction.AccountRegisteted:
            return {
                ...state,
                registered: true
            };
    }

    return state;
}
