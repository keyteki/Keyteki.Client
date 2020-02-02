import { Action } from 'redux';

import { InitState, Init, AuthAction, Auth } from '../types';

const initialState: InitState = { finished: false, failed: false };

export default function(state = initialState, action: Action | AuthAction): InitState {
    switch (action.type) {
        case Auth.AuthChecked:
        case Init.SetInitFinished:
            return {
                ...state,
                finished: true
            };
        case Init.InitFailed:
            return {
                ...state,
                failed: true
            };
    }

    return state;
}
