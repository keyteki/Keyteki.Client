import { Init } from '../types';
import { Action } from 'redux';

export function setInitFinished(): Action {
    return {
        type: Init.SetInitFinished
    };
}

export function initFailed(): Action {
    return {
        type: Init.InitFailed
    };
}
