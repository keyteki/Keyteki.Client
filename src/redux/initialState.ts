import { ApplicationState } from './reducers';

export const InitialState: ApplicationState = {
    admin: {
        news: []
    },
    api: {
        failedQueue: [],
        requests: {}
    },
    auth: {
        blocklist: [],
        sessions: []
    },
    init: {
        finished: false,
        loading: false
    },
    oidc: {
        isLoadingUser: false,
        user: undefined
    },
    router: {
        action: 'PUSH',
        location: { pathname: '', search: '', hash: '', state: undefined }
    },
    toastr: {
        confirm: undefined,
        toastrs: []
    }
};
