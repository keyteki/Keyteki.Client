import React from 'react';
import { useDispatch } from 'react-redux';
import { CallbackComponent } from 'redux-oidc';
import { push } from 'react-router-redux';

import userManager from '../userManager';
import { RouterAction } from 'connected-react-router';

const Callback: React.FC = () => {
    const dispatch = useDispatch();

    return (
        <CallbackComponent
            userManager={userManager}
            successCallback={(): RouterAction => dispatch(push('/'))}
            errorCallback={(error): void => {
                dispatch(push('/'));
                console.error(error);
            }}
        >
            <div>Redirecting...</div>
        </CallbackComponent>
    );
};

export default Callback;
