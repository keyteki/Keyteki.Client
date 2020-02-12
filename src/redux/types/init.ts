export enum Init {
    SetInitLoading,
    SetInitFinished = 'SET_INIT_FINISHED'
}

export type InitState = {
    loading: boolean;
    finished: boolean;
};
