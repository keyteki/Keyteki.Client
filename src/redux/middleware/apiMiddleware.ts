import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { Dispatch, MiddlewareAPI, Middleware, AnyAction, Action } from 'redux';
import i18n from 'i18next';

import { ApiActionType, Auth } from '../types';
import { retryRequest, clearFailedRequests } from '../actions';
import { RootState } from '../store';

export interface ApiCallAction extends Action {
    types: [string, string];
    apiParams: AxiosRequestConfig;
    shouldCallApi: (_: object) => boolean;
    skipAuth?: boolean;
}

export const callApiMiddleware: Middleware<Dispatch> = ({
    dispatch,
    getState
}: MiddlewareAPI) => next => async (action: AnyAction & ApiCallAction): Promise<{}> => {
    if (!action.types) {
        return next(action);
    }

    const { types, apiParams, shouldCallApi = (): boolean => true, skipAuth = false } = action;

    if (
        !Array.isArray(types) ||
        types.length !== 2 ||
        !types.every(type => typeof type === 'string')
    ) {
        throw new Error('Expected an array of two string types.');
    }

    const [requestType, successType] = types;
    const state: RootState = getState();

    dispatch({
        type: requestType
    });

    if (!shouldCallApi(state)) {
        return next(action);
    }

    dispatch({
        type: ApiActionType.ApiLoading,
        request: requestType
    });

    const params: AxiosRequestConfig = apiParams || {};
    params.headers = {
        'Content-Type': 'application/json',
        'Accept-Language': i18n.language
    };
    if (!skipAuth) {
        const user = state.oidc.user;
        if (!user) {
            console.info('no user');

            dispatch(retryRequest(action));

            return next(action);
        }

        params.headers.Authorization = `Bearer ${user.access_token}`;
    }

    let response;
    let errorStatus = 200;

    try {
        response = await axios(params);
    } catch (error) {
        const axiosError = error as AxiosError;

        response = axiosError.response;
        if (response) {
            errorStatus = response.status;
        }
    }

    const status = response ? response.status : errorStatus;
    let message = 'An error occured communicating with the server.  Please try again later.';

    if (response && response.status === 400) {
        message = response.data || message;
    }

    if (!response || response.status !== 200 || !response.data.success) {
        return dispatch({
            status: status,
            message: message,
            type: ApiActionType.ApiFailure,
            request: requestType
        });
    }

    dispatch({
        response,
        type: successType
    });

    if (successType === Auth.AuthChecked) {
        const failedRequests = state.api.failedQueue;

        if (failedRequests.length > 0) {
            for (const request of failedRequests) {
                dispatch(request);
            }

            dispatch(clearFailedRequests());
        }
    }

    return dispatch({
        type: ApiActionType.ApiLoaded,
        success: response.data.success,
        message: response.data.message,
        request: requestType
    });
};
