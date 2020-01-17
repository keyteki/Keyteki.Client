import { ApiActionType, ApiStateDictionary, ApiAction } from '../types';

const initialState: ApiStateDictionary = {};

export default function(
    state: ApiStateDictionary = initialState,
    action: ApiAction
): ApiStateDictionary {
    const retState = {
        ...state
    };

    const apiState: ApiAction = {};

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
            break;
    }

    retState[action.request] = apiState;

    return retState;
}
