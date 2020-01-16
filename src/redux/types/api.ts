import { ReduxType } from '.';

export enum ApiType {
    ApiRequest = 'API_REQUEST',
    ApiLoading = 'API_LOADING',
    ApiFailure = 'API_FAILURE',
    ApiLoaded = 'API_LOADED'
}

export type ApiFailureAction = {
    status: number;
    message: string | { key: string; value: [string] };
    type: ApiType;
    request: ReduxType;
};

export type ApiState = {
    status?: number;
    message?: string | { key: string; value: [string] };
    success?: boolean;
    loading?: boolean;
};

export type ApiStateDictionary = { [key in ReduxType]?: ApiState };
