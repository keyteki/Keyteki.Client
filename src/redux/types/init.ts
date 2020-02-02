export enum Init {
    SetInitFinished = 'SET_INIT_FINISHED',
    InitFailed = 'INIT_FAILED'
}

export type InitState = {
    finished: boolean;
    failed: boolean;
};
