import { Action } from 'redux';
import { ApiCallAction } from '../middleware/apiMiddleware';
import { ApiResponseAction } from './api';

export type UpdateProfileDetails = {
    email: string;
};

export enum Auth {
    SetAuthTokens = 'SET_AUTH_TOKENS',
    CheckAuth = 'CHECK_AUTH',
    AuthChecked = 'AUTH_CHECKED',
    RequestAuthToken = 'REQUEST_AUTH_TOKEN',
    AuthTokenReceived = 'AUTH_TOKEN_RECEIVED',
    UpdateProfile = 'UPDATE_PROFILE',
    ProfileUpdated = 'PROFILE_UPDATED',
    LinkPatreon = 'LINK_PATREON',
    PatreonLinked = 'PATREON_LINKED',
    SessionsReceived = 'SESSIONS_RECEIVED',
    RequestSessions = 'REQUEST_SESSIONS',
    RemoveSession = 'REMOVE_SESSION',
    SessionRemoved = 'SESSION_REMOVED',
    RequestBlocklist = 'REQUEST_BLOCKLIST',
    BlocklistReceived = 'BLOCKLIST_RECEIVED',
    RemoveBlocklistEntry = 'REMOVE_BLOCKLIST_ENTRY',
    BlocklistEntryRemoved = 'BLOCKLIST_ENTRY_REMOVED',
    AddBlocklistEntry = 'ADD_BLOCKLIST_ENTRY',
    BlocklistEntryAdded = 'BLOCKLIST_ENTRY_ADDED',
    LogoutAccount = 'LOGOUT_ACCOUNT',
    AccountLoggedOut = 'ACCOUNT_LOGGED_OUT'
}

export enum PatreonStatus {
    Unlinked = 0,
    Linked = 1,
    Pledged = 2
}

export interface Settings {
    background: string;
    cardSize: string;
    windowTimer: number;
}

export interface User {
    id: string;
    username: string;
    email: string;
    customData: string;
    settings: Settings;
    patreonStatus: PatreonStatus;
}

export interface Session {
    id: number;
    ip: string;
    lastUsed: Date;
}

export type AuthState = {
    token?: string;
    user?: User;
    sessions: Session[];
    blocklist: string[];
};

export interface SetAuthTokenAction extends Action {
    type: typeof Auth.SetAuthTokens;
    token: string;
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

export interface LinkPatreonAction extends ApiCallAction {
    type: typeof Auth.PatreonLinked;
}

export interface RequestSessionsAction extends ApiCallAction, ApiResponseAction {
    type: typeof Auth.SessionsReceived;
}

export interface RemoveSessionAction extends ApiCallAction, ApiResponseAction {
    type: typeof Auth.SessionRemoved;
}

export interface RequestBlocklistAction extends ApiCallAction, ApiResponseAction {
    type: typeof Auth.BlocklistReceived;
}

export interface RemoveBlocklistEntryAction extends ApiCallAction, ApiResponseAction {
    type: typeof Auth.BlocklistEntryRemoved;
}

export interface AddBlocklistEntryAction extends ApiCallAction, ApiResponseAction {
    type: typeof Auth.BlocklistEntryAdded;
}

export interface LogoutAccountAction extends ApiCallAction, ApiResponseAction {
    type: typeof Auth.AccountLoggedOut;
}

export type AuthAction =
    | SetAuthTokenAction
    | CheckAuthAction
    | AuthenticateAction
    | UpdateProfileAction
    | LinkPatreonAction
    | RequestSessionsAction
    | RemoveSessionAction
    | RequestBlocklistAction
    | RemoveBlocklistEntryAction
    | AddBlocklistEntryAction
    | LogoutAccountAction;
