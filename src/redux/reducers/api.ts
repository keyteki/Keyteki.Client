import { ApiActionType, ApiStateDictionary, ApiState, ApiResponseAction } from '../types';

const initialState: ApiStateDictionary = {};

export default function(
    state: ApiStateDictionary = initialState,
    action: ApiResponseAction
): ApiStateDictionary {
    const retState = {
        ...state
    };

    let apiState: ApiState | undefined = {};

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

    retState[action.request] = apiState;

    return retState;
}
