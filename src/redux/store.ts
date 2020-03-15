import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { callApiMiddleware } from './middleware/apiMiddleware';
import { oidcMiddleware } from './middleware/oidcMiddleware';
import { loadUser } from 'redux-oidc';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import { InitialState } from './initialState';
import userManager from '../userManager';
import createRootReducer from './reducers';

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
const store = createStore(rootReducer, InitialState, enhancer);

loadUser(store, userManager);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
