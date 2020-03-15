import { combineReducers, Reducer } from 'redux';
import { reducer as toastrReducer, ToastrState } from 'react-redux-toastr';
import { connectRouter, RouterState } from 'connected-react-router';
import { reducer as oidcReducer, UserState } from 'redux-oidc';
import { History, LocationState } from 'history';

import api, { ApiState } from './api';
import auth from './auth';
import init from './init';
import admin from './admin';
import { AuthState, InitState, AdminState } from '../types';

export interface ApplicationState {
    admin: AdminState;
    api: ApiState;
    auth: AuthState;
    init: InitState;
    oidc: UserState;
    router: RouterState;
    toastr: ToastrState;
}

const createRootReducer = (history: History<LocationState>): Reducer<ApplicationState> =>
    combineReducers({
        admin,
        api,
        auth,
        init,
        oidc: oidcReducer,
        router: connectRouter(history),
        toastr: toastrReducer
    });
export default createRootReducer;
