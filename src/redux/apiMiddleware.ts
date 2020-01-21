import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { Dispatch, MiddlewareAPI, Middleware, AnyAction } from 'redux';
import { ApiActionType } from './types';
import i18n from 'i18next';
import { authenticate } from './actions';

export interface ApiCallAction {
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

    dispatch({
        type: requestType
    });

    if (!shouldCallApi(getState())) {
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
        params.headers.Authorization = `Bearer ${getState().auth.token}`;
    }

    let response;
    let errorStatus = 200;

    try {
        response = await axios(params);
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError && axiosError.response) {
            response = axiosError.response;
            if (response.status === 401) {
                if (skipAuth) {
                    return dispatch({
                        status: 401,
                        type: ApiActionType.ApiFailure,
                        request: requestType
                    });
                }

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return dispatch<any>(authenticate());
            } else {
                errorStatus = response.status;
            }
        }
    }

    const status = response ? response.status : errorStatus;
    let message = 'An error occured communicating with the server.  Please try again later.';

    if (response && response.status === 400) {
        message = response.data || message;
    }

    if (!response || response.status !== 200) {
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

    return dispatch({
        type: ApiActionType.ApiLoaded,
        success: response.data.success,
        message: response.data.message,
        request: requestType
    });
};
