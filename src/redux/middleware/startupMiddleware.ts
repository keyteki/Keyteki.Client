import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { Dispatch, MiddlewareAPI, Middleware, AnyAction, Action } from 'redux';
import i18n from 'i18next';

import { ApiActionType, Auth, Init } from '../types';
import {
    authenticate,
    retryRequest,
    clearFailedRequests,
    initFailed,
    setInitFinished
} from '../actions';
import { RootState } from '../store';

export const startupMiddleware: Middleware<Dispatch> = ({
    dispatch,
    getState
}: MiddlewareAPI) => next => async (action: AnyAction): Promise<{}> => {
    if ([Init.SetInitFinished, Auth.SetAuthTokens, Auth.AuthTokenReceived].includes(action.type)) {
        console.info('action is allowed type, continuing without check auth', action.type);
        return next(action);
    }

    if (getState().init.finished) {
        console.info('init finished, allowing', action.type);
        return next(action);
    }

    const checkAuth = async (): Promise<boolean> => {
        const state: RootState = getState();

        if (!state.auth.token || !state.auth.refreshToken) {
            console.info('no tokens, returning true');
            return true;
        }

        const request: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${state.auth.token}`
            },
            url: '/api/account/checkauth',
            method: 'POST'
        };

        let response;

        try {
            response = await axios(request);

            console.info(response);
            if (response && response.data.success) {
                return true;
            }
        } catch (error) {
            const axiosError = error as AxiosError;

            if (axiosError?.response?.status === 401) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                await dispatch<any>(authenticate());
            }
            console.info('got an error', axiosError);
        }

        return false;
    };

    const authSuccess = await checkAuth();

    const state: RootState = getState();

    if (authSuccess) {
        if (!state.init.finished) {
            dispatch(setInitFinished());
        }

        return next(action);
    }

    return checkAuth;
};
