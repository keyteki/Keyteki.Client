import { Init } from '../types';
import { Action } from 'redux';

export function setInitFinished(): Action {
    return {
        type: Init.SetInitFinished
    };
}

export function setInitLoading(): Action {
    return {
        type: Init.SetInitLoading
    };
}
