import { ReduxType } from '.';

export enum ApiActionType {
    ApiRequest = 'API_REQUEST',
    ApiLoading = 'API_LOADING',
    ApiFailure = 'API_FAILURE',
    ApiLoaded = 'API_LOADED'
}

export type ApiAction = {
    status?: number;
    message?: string | { key: string; value: [string] };
    success?: boolean;
    loading?: boolean;
    request: ReduxType;
    type?: ApiActionType;
};

export type ApiStateDictionary = { [key in ReduxType]?: ApiAction };
