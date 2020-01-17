import { ReduxType, ClearApiStatusAction, ApiActionType } from '../types';

export function clearApiStatus(actionType: ReduxType): ClearApiStatusAction {
    return {
        type: ApiActionType.ClearApiStatus,
        request: actionType
    };
}
