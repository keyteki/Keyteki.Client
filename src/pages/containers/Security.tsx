import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col, Alert } from 'react-bootstrap';

import Panel from '../../components/Site/Panel';
import ApiStatus from '../../components/Site/ApiStatus';
import { clearApiStatus, getActiveSessions, removeSession } from '../../redux/actions';
import {
    Auth,
    ApiResponseState,
    ClearApiStatusAction,
    AuthState,
    RemoveSessionAction
} from '../../redux/types';
import { RootState } from '../../redux/store';
import Security from '../components/Security';
import Loader from '../../components/Site/Loader';

const SecurityContainer: React.FC = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation('security');
    const removeState = useSelector<RootState, ApiResponseState | undefined>(
        state => state.api.requests[Auth.RemoveSession]
    );
    const loadState = useSelector<RootState, ApiResponseState | undefined>(
        state => state.api.requests[Auth.RequestSessions]
    );
    const authState = useSelector<RootState, AuthState | undefined>(state => state.auth);

    useEffect((): void => {
        dispatch(getActiveSessions());
    }, [dispatch]);

    if (!authState || !authState.user) {
        return <Alert variant='danger'>{t('You need to be logged in to view your profile')}</Alert>;
    }

    if (loadState?.loading) {
        return <Loader message={t('Please wait while we load your user sessions')} />;
    }

    return (
        <Col lg={{ span: 10, offset: 1 }}>
            <Panel title={t('Active Sessions')}>
                <ApiStatus
                    state={removeState}
                    onClose={(): ClearApiStatusAction =>
                        dispatch(clearApiStatus(Auth.RemoveSession))
                    }
                />
                <Security
                    sessions={authState!.sessions || []}
                    onRemoveSession={(id: number): RemoveSessionAction =>
                        dispatch(removeSession(id))
                    }
                />
            </Panel>
        </Col>
    );
};

export default SecurityContainer;
