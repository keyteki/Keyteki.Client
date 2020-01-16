import axios, { AxiosRequestConfig } from 'axios';
import { Dispatch, MiddlewareAPI, AnyAction } from 'redux';

export interface ApiAction {
    type: string;
    types: [string, string];
    apiParams: AxiosRequestConfig;
    shouldCallApi: (_: object) => boolean;
    payload?: {};
    skipAuth?: boolean;
}

export default function callApiMiddleware({ dispatch, getState }: MiddlewareAPI) {
    return (next: Dispatch) => async (action: AnyAction | ApiAction): Promise<{}> => {
        const {
            types,
            apiParams,
            shouldCallApi = (): boolean => true,
            payload = {},
            skipAuth = false
        } = action;

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

        dispatch(
            Object.assign({}, payload, {
                type: requestType
            })
        );

        if (!shouldCallApi(getState())) {
            return next(action);
        }

        dispatch(
            Object.assign({}, payload, {
                type: 'API_LOADING',
                request: requestType
            })
        );

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
            if (error.status === 401) {
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
                errorStatus = error.status;
            }
        }

        if (!response) {
            dispatch(
                Object.assign({}, payload, {
                    status: errorStatus,
                    message:
                        'An error occured communicating with the server.  Please try again later.',
                    type: 'API_FAILURE',
                    request: requestType
                })
            );

            return next(action);
        }

        if (response.status !== 200) {
            dispatch(
                Object.assign({}, payload, {
                    status: response.status,
                    message: response.statusText,
                    type: 'API_FAILURE',
                    request: requestType
                })
            );

            return next(action);
        }

        dispatch(
            Object.assign({}, payload, {
                response,
                type: successType
            })
        );

        return dispatch(
            Object.assign({}, payload, {
                type: 'API_LOADED',
                request: requestType
            })
        );
    };
}
