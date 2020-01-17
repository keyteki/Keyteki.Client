import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { Dispatch, MiddlewareAPI, AnyAction } from 'redux';
import { ApiActionType } from './types';

export interface ApiCallAction {
    type: string;
    types: [string, string];
    apiParams: AxiosRequestConfig;
    shouldCallApi: (_: object) => boolean;
    skipAuth?: boolean;
}

export default function callApiMiddleware({ dispatch, getState }: MiddlewareAPI) {
    return (next: Dispatch) => async (action: AnyAction | ApiCallAction): Promise<{}> => {
        const { types, apiParams, shouldCallApi = (): boolean => true, skipAuth = false } = action;

        if (!types) {
            return next(action);
        }

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
        params.headers = { 'content-type': 'application/json' };
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
                    const state = getState();
                    const authResponse = await axios({
                        url: '/api/account/token',
                        method: 'post',
                        data: { token: state.auth.refreshToken }
                    });

                    if (authResponse.status !== 200) {
                        //  dispatch(navigate('/login'));

                        return next(action);
                    }

                    // dispatch(setAuthTokens(authResponse.token, state.auth.refreshToken));
                    // dispatch(authenticateSocket());

                    params.headers = {
                        'content-type': 'application/json'
                        //Authorization: `Bearer ${authResponse.token}`
                    };

                    try {
                        response = await axios(params);
                    } catch (innerError) {
                        errorStatus = innerError.status;
                    }
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
            dispatch({
                status: status,
                message: message,
                type: ApiActionType.ApiFailure,
                request: requestType
            });

            return next(action);
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
}
