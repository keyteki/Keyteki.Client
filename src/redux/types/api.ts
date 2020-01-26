import { ReduxType } from '.';
import { AxiosResponse } from 'axios';
import { ApiCallAction } from '../apiMiddleware';

export enum ApiActionType {
    ClearApiStatus = 'CLEAR_API_STATUS',
    ApiRequest = 'API_REQUEST',
    ApiLoading = 'API_LOADING',
    ApiFailure = 'API_FAILURE',
    ApiLoaded = 'API_LOADED',
    RetryRequest = 'RETRY_REQUEST'
}

export interface ApiResponse {
    message?: string | { key: string; value: [string] };
    success?: boolean;
    status?: number;
}

export type ApiResponseState = {
    loading?: boolean;
} & ApiResponse;

export type ApiStatusAction = {
    request: ReduxType;
    type?: ApiActionType;
} & ApiResponse;

export interface ApiResponseAction {
    response?: AxiosResponse;
}

export type ApiStateDictionary = { [key in ReduxType]?: ApiResponseState };

export interface ClearApiStatusAction {
    type: typeof ApiActionType.ClearApiStatus;
    request: ReduxType;
}

export interface RetryRequestAction {
    type: typeof ApiActionType.RetryRequest;
    action: ApiCallAction;
}

export type ApiAction = ClearApiStatusAction;
