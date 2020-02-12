import { Action } from 'redux';

import { InitState, Init, AuthAction } from '../types';

const initialState: InitState = { finished: false, loading: false };

export default function(state = initialState, action: Action | AuthAction): InitState {
    switch (action.type) {
        case Init.SetInitFinished:
            return {
                ...state,
                finished: true,
                loading: false
            };
        case Init.SetInitLoading:
            return {
                ...state,
                loading: true,
                finished: false
            };
    }

    return state;
}
