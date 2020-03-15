import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { AuthState, ApiResponseState, Auth, ClearApiStatusAction } from '../../redux/types';

import Loader from '../../components/Site/Loader';
import { logoutAccount, clearApiStatus } from '../../redux/actions';
import ApiStatus from '../../components/Site/ApiStatus';

const Logout: React.FC = () => {
    const { t } = useTranslation('logout');
    const dispatch = useDispatch();
    const authState = useSelector<RootState, AuthState | undefined>(state => state.auth);
    const apiState = useSelector<RootState, ApiResponseState | undefined>(
        state => state.api.requests[Auth.LogoutAccount]
    );

    useEffect(() => {
        if (authState?.user) {
            dispatch(logoutAccount());
        }
    }, [dispatch, authState]);

    return apiState && apiState.message ? (
        <ApiStatus
            state={apiState}
            onClose={(): ClearApiStatusAction => dispatch(clearApiStatus(Auth.LogoutAccount))}
        />
    ) : (
        <Loader message={t('Please wait while we log you out')} />
    );
};

export default Logout;
