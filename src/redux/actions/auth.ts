import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

import {
    Auth,
    AuthAction,
    UpdateProfileDetails,
    RequestSessionsAction,
    RemoveSessionAction,
    RequestBlocklistAction,
    RemoveBlocklistEntryAction,
    AddBlocklistEntryAction,
    LogoutAccountAction
} from '../types';
import { RootState } from '../store';
import userManager from '../../userManager';

export function authenticate(): AuthAction {
    return {
        type: Auth.AuthTokenReceived,
        types: [Auth.RequestAuthToken, Auth.AuthTokenReceived],
        shouldCallApi: (): boolean => true,
        apiParams: {
            url: '/api/account/token',
            method: 'post'
        }
    };
}

export function setAuthToken(token: string): AuthAction {
    return {
        type: Auth.SetAuthTokens,
        token: token
    };
}

export function checkAuth(): AuthAction {
    return {
        type: Auth.AuthChecked,
        types: [Auth.CheckAuth, Auth.AuthChecked],
        shouldCallApi: (): boolean => true,
        apiParams: {
            url: '/api/account/checkauth',
            method: 'post'
        }
    };
}

export function authChecked(): Action {
    return {
        type: Auth.AuthChecked
    };
}

export function updateProfile(username: string, profile: UpdateProfileDetails): AuthAction {
    return {
        type: Auth.ProfileUpdated,
        types: [Auth.UpdateProfile, Auth.ProfileUpdated],
        shouldCallApi: (): boolean => true,
        apiParams: {
            url: `/api/account/${username}`,
            method: 'put',
            data: profile
        }
    };
}

export function linkPatreon(authCode: string): AuthAction {
    return {
        type: Auth.PatreonLinked,
        types: [Auth.LinkPatreon, Auth.PatreonLinked],
        shouldCallApi: (): boolean => true,
        apiParams: {
            url: '/api/account/linkPatreon',
            method: 'POST',
            data: { authCode: authCode }
        }
    };
}

export function getActiveSessions(): RequestSessionsAction {
    return {
        type: Auth.SessionsReceived,
        types: [Auth.RequestSessions, Auth.SessionsReceived],
        shouldCallApi: (): boolean => true,
        apiParams: {
            url: '/api/account/sessions',
            method: 'GET'
        }
    };
}

export function removeSession(sessionId: number): RemoveSessionAction {
    return {
        type: Auth.SessionRemoved,
        types: [Auth.RemoveSession, Auth.SessionRemoved],
        shouldCallApi: (): boolean => true,
        apiParams: {
            url: `/api/account/sessions/${sessionId}`,
            method: 'DELETE'
        }
    };
}

export function getBlocklist(): RequestBlocklistAction {
    return {
        type: Auth.BlocklistReceived,
        types: [Auth.RequestBlocklist, Auth.BlocklistReceived],
        shouldCallApi: (): boolean => true,
        apiParams: {
            url: '/api/account/blocklist',
            method: 'GET'
        }
    };
}

export function removeBlocklistEntry(entry: string): RemoveBlocklistEntryAction {
    return {
        type: Auth.BlocklistEntryRemoved,
        types: [Auth.RemoveBlocklistEntry, Auth.BlocklistEntryRemoved],
        shouldCallApi: (): boolean => true,
        apiParams: {
            url: `/api/account/blocklist/${entry}`,
            method: 'DELETE'
        }
    };
}

export function addBlocklistEntry(entry: string): AddBlocklistEntryAction {
    return {
        type: Auth.BlocklistEntryAdded,
        types: [Auth.AddBlocklistEntry, Auth.BlocklistEntryAdded],
        shouldCallApi: (): boolean => true,
        apiParams: {
            url: `/api/account/blocklist/${entry}`,
            method: 'PUT'
        }
    };
}

export function logoutAccount(): Action {
    userManager.signoutRedirect();

    return {
        type: Auth.LogoutAccount
    };
}
