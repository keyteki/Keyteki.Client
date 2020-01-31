import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Auth, ApiResponseState, ClearApiStatusAction } from '../redux/types';
import { RootState } from '../redux/store';
import { linkPatreon, clearApiStatus } from '../redux/actions';
import ApiStatus from '../components/Site/ApiStatus';
import Loader from '../components/Site/Loader';

function useQuery(): URLSearchParams {
    return new URLSearchParams(useLocation().search);
}

const Patreon: React.FC = () => {
    const { t } = useTranslation();
    const query = useQuery();
    const history = useHistory();
    const dispatch = useDispatch();
    const [requestSent, setRequestSent] = useState(false);
    const apiState = useSelector<RootState, ApiResponseState | undefined>(state => {
        const retState = state.api.requests[Auth.LinkPatreon];

        if (retState?.success) {
            retState.message = t(
                'Your account was linked successfully.  Sending you back to the profile page.'
            );

            setTimeout(() => {
                dispatch(clearApiStatus(Auth.LinkPatreon));
                history.push('/profile');
            }, 3000);
        }

        return retState;
    });

    const code = query.get('code');
    if (!code) {
        setTimeout(() => history.push('/'), 5000);

        return (
            <Alert variant='danger'>
                {t(
                    'This page is not intended to be viewed directly.  Redircting you to the home page'
                )}
            </Alert>
        );
    } else if (!requestSent) {
        dispatch(linkPatreon(code!));
        setRequestSent(true);
    }

    return apiState?.loading ? (
        <Loader message={t('Please wait while we attempt to link your patreon account...')} />
    ) : (
        <ApiStatus
            state={apiState}
            onClose={(): ClearApiStatusAction => {
                setTimeout(() => history.push('/'), 100);

                return dispatch(clearApiStatus(Auth.LinkPatreon));
            }}
        />
    );
};

export default Patreon;
