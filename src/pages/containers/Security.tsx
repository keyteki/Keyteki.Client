import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col } from 'react-bootstrap';

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

const SecurityContainer: React.FC = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation('security');
    const apiState = useSelector<RootState, ApiResponseState | undefined>(
        state => state.api.requests[Auth.RegisterAccount]
    );
    const authState = useSelector<RootState, AuthState | undefined>(state => state.auth);

    useEffect((): void => {
        dispatch(getActiveSessions());
    }, [dispatch]);

    // if (apiState?.success) {
    //     setTimeout(() => {
    //         dispatch(clearApiStatus(Auth.RegisterAccount));
    //         history.push('/');
    //     }, 5000);
    // }

    return (
        <Col lg={{ span: 10, offset: 1 }}>
            <Panel title={t('Active Sessions')}>
                <ApiStatus
                    state={apiState}
                    onClose={(): ClearApiStatusAction =>
                        dispatch(clearApiStatus(Auth.RequestSessions))
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
