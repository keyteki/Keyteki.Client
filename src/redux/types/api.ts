import { ReduxType } from '.';
import { AxiosResponse } from 'axios';

export enum ApiActionType {
    ClearApiStatus = 'CLEAR_API_STATUS',
    ApiRequest = 'API_REQUEST',
    ApiLoading = 'API_LOADING',
    ApiFailure = 'API_FAILURE',
    ApiLoaded = 'API_LOADED'
}

export interface ApiResponse {
    message?: string | { key: string; value: [string] };
    success?: boolean;
    status?: number;
}

export type ApiState = {
    loading?: boolean;
} & ApiResponse;

export type ApiStatusAction = {
    request: ReduxType;
    type?: ApiActionType;
} & ApiResponse;

export type ApiResponseAction = {
    type: ReduxType;
    response: AxiosResponse;
};

export type ApiStateDictionary = { [key in ReduxType]?: ApiState };

export interface ClearApiStatusAction {
    type: typeof ApiActionType.ClearApiStatus;
    request: ReduxType;
}

export type ApiAction = ClearApiStatusAction;
