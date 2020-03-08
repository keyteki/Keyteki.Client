import { AnyAction, MiddlewareAPI, Middleware, Dispatch } from 'redux';
import { USER_FOUND, USER_EXPIRED } from 'redux-oidc';
import { checkAuth } from '../actions';
import userManager from '../../userManager';

export const oidcMiddleware: Middleware<Dispatch> = ({
    dispatch,
    getState
}: MiddlewareAPI) => next => async (action: AnyAction): Promise<{}> => {
    if (action.type === USER_FOUND) {
        console.info('user found');
        next(action);
        return dispatch(checkAuth());
    } else if (action.type === USER_EXPIRED) {
        if (window.location.pathname === '/callback') {
            return next(action);
        }
        console.info('User expired');
        userManager.signinRedirect();
    }

    return next(action);
};
