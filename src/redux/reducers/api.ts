import { ApiActionType, ApiStateDictionary, ApiResponseState, ApiStatusAction } from '../types';
import { ApiCallAction } from '../apiMiddleware';

export interface ApiState {
    requests: ApiStateDictionary;
    failedQueue: ApiCallAction[];
}

const initialState: ApiState = {
    requests: {},
    failedQueue: []
};

export default function(state: ApiState = initialState, action: ApiStatusAction): ApiState {
    const retState = {
        ...state
    };

    let apiState: ApiResponseState | undefined = {};

    switch (action.type) {
        case ApiActionType.ApiFailure:
            apiState.loading = false;
            apiState.success = false;
            apiState.status = action.status;
            apiState.message = action.message;
            break;
        case ApiActionType.ApiLoading:
            apiState.loading = true;
            break;
        case ApiActionType.ApiLoaded:
            apiState.loading = false;
            apiState.success = action.success;
            apiState.message = action.message;
            break;
        case ApiActionType.ClearApiStatus:
            apiState = undefined;
            break;
    }

    retState.requests[action.request] = apiState;

    return retState;
}
