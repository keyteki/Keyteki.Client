import { ApiType, ApiFailureAction, ApiStateDictionary, ApiState } from '../types/api';

const initialState: ApiStateDictionary = {};

export default function(
    state: ApiStateDictionary = initialState,
    action: ApiFailureAction
): ApiStateDictionary {
    const retState = {
        ...state
    };

    const apiState: ApiState = {};

    switch (action.type) {
        case ApiType.ApiFailure:
            apiState.status = action.status;
            apiState.message = action.message;
            apiState.success = false;
            break;
    }

    retState[action.request] = apiState;

    return retState;
}
