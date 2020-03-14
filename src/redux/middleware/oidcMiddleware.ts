import { AnyAction, MiddlewareAPI, Middleware, Dispatch } from 'redux';
import { USER_FOUND, USER_EXPIRED } from 'redux-oidc';
import { checkAuth } from '../actions';
import userManager from '../../userManager';

export const oidcMiddleware: Middleware<Dispatch> = ({
    dispatch,
    getState
}: MiddlewareAPI) => next => async (action: AnyAction): Promise<{}> => {
    if (action.type === USER_FOUND) {
        next(action);

        return dispatch(checkAuth());
    } else if (action.type === USER_EXPIRED) {
        if (window.location.pathname === '/callback') {
            return next(action);
        }

        userManager.signinRedirect();
    }

    return next(action);
};
