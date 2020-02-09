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
    if (action.type === Auth.SetAuthTokens || action.type === Init.SetInitFinished) {
        return next(action);
    }

    const checkAuth = async (): Promise<boolean> => {
        const state: RootState = getState();

        if (!state.auth.token || !state.auth.refreshToken) {
            return true;
        }

        const request: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${state.auth.token}`
            }
        };

        let response;

        try {
            response = await axios(request);
        } catch (error) {
            const axiosError = error as AxiosError;
        }

        return false;
    };

    const authChecked = await checkAuth();

    const state: RootState = getState();

    if (authChecked) {
        if (!state.init.finished) {
            dispatch(setInitFinished());
        }

        return next(action);
    }

    return checkAuth;
};
