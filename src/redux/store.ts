import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { callApiMiddleware } from './middleware/apiMiddleware';
import { startupMiddleware } from './middleware/startupMiddleware';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk, callApiMiddleware, startupMiddleware));

const initialState = {};
const store = createStore(rootReducer, initialState, enhancer);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
