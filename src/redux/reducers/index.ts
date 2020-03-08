import { combineReducers, Reducer } from 'redux';
import { reducer as toastrReducer, ToastrState } from 'react-redux-toastr';
import { connectRouter, RouterState } from 'connected-react-router';
import { reducer as oidcReducer, UserState } from 'redux-oidc';
import { History, LocationState } from 'history';

import api, { ApiState } from './api';
import auth from './auth';
import init from './init';
import { AuthState, InitState } from '../types';

export interface ApplicationState {
    api: ApiState;
    auth: AuthState;
    init: InitState;
    oidc: UserState;
    router: RouterState;
    toastr: ToastrState;
}

const createRootReducer = (history: History<LocationState>): Reducer<ApplicationState> =>
    combineReducers({
        api,
        auth,
        init,
        oidc: oidcReducer,
        router: connectRouter(history),
        toastr: toastrReducer
    });
export default createRootReducer;
