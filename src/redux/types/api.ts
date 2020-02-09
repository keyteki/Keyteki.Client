import { ReduxType } from '.';
import { AxiosResponse } from 'axios';
import { ApiCallAction } from '../middleware/apiMiddleware';

export enum ApiActionType {
    ClearApiStatus = 'CLEAR_API_STATUS',
    ApiRequest = 'API_REQUEST',
    ApiLoading = 'API_LOADING',
    ApiFailure = 'API_FAILURE',
    ApiLoaded = 'API_LOADED',
    RetryRequest = 'RETRY_REQUEST',
    ClearFailedRequests = 'CLEAR_FAILED_REQUESTS'
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
    type:
        | typeof ApiActionType.ApiFailure
        | ApiActionType.ApiLoaded
        | ApiActionType.ApiLoading
        | ApiActionType.ApiRequest;
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

export interface ClearFailedRequestsAction {
    type: typeof ApiActionType.ClearFailedRequests;
}

export type ApiAction =
    | ClearApiStatusAction
    | RetryRequestAction
    | ApiStatusAction
    | ClearFailedRequestsAction;
