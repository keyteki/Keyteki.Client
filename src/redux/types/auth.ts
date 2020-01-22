import { Action } from 'redux';
import { ApiCallAction } from '../apiMiddleware';
import { ApiResponseAction } from './api';

export type RegisterUser = {
    username: string;
    password: string;
    email: string;
};

export type LoginDetails = {
    username: string;
    password: string;
};

export type UpdateProfileDetails = {
    email: string;
    password: string;
};

export enum Auth {
    RegisterAccount = 'REGISTER_ACCOUNT',
    AccountRegistered = 'ACCOUNT_REGISTERED',
    LoginAccount = 'LOGIN_ACCOUNT',
    AccountLogin = 'ACCOUNT_LOGIN',
    SetAuthTokens = 'SET_AUTH_TOKENS',
    CheckAuth = 'CHECK_AUTH',
    AuthChecked = 'AUTH_CHECKED',
    RequestAuthToken = 'REQUEST_AUTH_TOKEN',
    AuthTokenReceived = 'AUTH_TOKEN_RECEIVED',
    UpdateProfile = 'UPDATE_PROFILE',
    ProfileUpdated = 'PROFILE_UPDATED'
}

export interface User {
    id: string;
    username: string;
    email: string;
}

export type AuthState = {
    registered: boolean;
    token?: string;
    refreshToken?: string;
    user?: User;
};

export interface RegisterUserAction extends ApiCallAction, ApiResponseAction {
    type: typeof Auth.AccountRegistered;
}

export interface LoginUserAction extends ApiCallAction, ApiResponseAction {
    type: typeof Auth.AccountLogin;
}

export interface SetAuthTokenAction extends Action {
    type: typeof Auth.SetAuthTokens;
    token: string;
    refreshToken: string;
}

export interface CheckAuthAction extends ApiCallAction, ApiResponseAction {
    type: typeof Auth.AuthChecked;
}

export interface AuthenticateAction extends ApiCallAction, ApiResponseAction {
    type: typeof Auth.AuthTokenReceived;
}

export interface UpdateProfileAction extends ApiCallAction {
    type: typeof Auth.ProfileUpdated;
}

export type AuthAction =
    | SetAuthTokenAction
    | CheckAuthAction
    | RegisterUserAction
    | LoginUserAction
    | AuthenticateAction
    | UpdateProfileAction;
