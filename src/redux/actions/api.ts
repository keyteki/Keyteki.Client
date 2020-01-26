import {
    ReduxType,
    ClearApiStatusAction,
    ApiActionType,
    RetryRequestAction,
    ClearFailedRequestsAction
} from '../types';
import { ApiCallAction } from '../apiMiddleware';

export function clearApiStatus(actionType: ReduxType): ClearApiStatusAction {
    return {
        type: ApiActionType.ClearApiStatus,
        request: actionType
    };
}

export function retryRequest(action: ApiCallAction): RetryRequestAction {
    return {
        type: ApiActionType.RetryRequest,
        action: action
    };
}

export function clearFailedRequests(): ClearFailedRequestsAction {
    return {
        type: ApiActionType.ClearFailedRequests
    };
}
