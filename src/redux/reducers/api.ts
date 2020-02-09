import { ApiActionType, ApiStateDictionary, ApiResponseState, ApiAction } from '../types';
import { ApiCallAction } from '../middleware/apiMiddleware';

export interface ApiState {
    requests: ApiStateDictionary;
    failedQueue: ApiCallAction[];
}

const initialState: ApiState = {
    requests: {},
    failedQueue: []
};

export default function(state: ApiState = initialState, action: ApiAction): ApiState {
    const retState = {
        ...state
    };

    retState.requests = { ...state.requests };

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
        case ApiActionType.RetryRequest:
            retState.failedQueue.push(action.action);
            break;
        case ApiActionType.ClearFailedRequests:
            retState.failedQueue = [];
            break;
    }

    if (
        action.type !== ApiActionType.RetryRequest &&
        action.type !== ApiActionType.ClearFailedRequests
    ) {
        retState.requests[action.request] = apiState;
    }

    return retState;
}
