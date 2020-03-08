import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { callApiMiddleware } from './middleware/apiMiddleware';
import { oidcMiddleware } from './middleware/oidcMiddleware';
import { loadUser } from 'redux-oidc';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import userManager from '../userManager';
import createRootReducer, { ApplicationState } from './reducers';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
    }
}

export const history = createBrowserHistory();

const rootReducer = createRootReducer(history);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
    applyMiddleware(thunk, callApiMiddleware, oidcMiddleware, routerMiddleware(history))
);

const initialState: ApplicationState = {
    api: {
        failedQueue: [],
        requests: {}
    },
    auth: {
        blocklist: [],
        registered: false,
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
const store = createStore(rootReducer, initialState, enhancer);

loadUser(store, userManager);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
