import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col, Alert } from 'react-bootstrap';

import Panel from '../../components/Site/Panel';
import ApiStatus from '../../components/Site/ApiStatus';
import {
    clearApiStatus,
    getBlocklist,
    removeBlocklistEntry,
    addBlocklistEntry
} from '../../redux/actions';
import {
    Auth,
    ApiResponseState,
    ClearApiStatusAction,
    AuthState,
    RemoveBlocklistEntryAction,
    AddBlocklistEntryAction
} from '../../redux/types';
import { RootState } from '../../redux/store';
import Blocklist from '../components/Blocklist';
import Loader from '../../components/Site/Loader';

const BlocklistContainer: React.FC = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation('blocklist');
    const removeState = useSelector<RootState, ApiResponseState | undefined>(
        state => state.api.requests[Auth.RemoveBlocklistEntry]
    );
    const addState = useSelector<RootState, ApiResponseState | undefined>(
        state => state.api.requests[Auth.AddBlocklistEntry]
    );
    const loadState = useSelector<RootState, ApiResponseState | undefined>(
        state => state.api.requests[Auth.RequestBlocklist]
    );
    const authState = useSelector<RootState, AuthState | undefined>(state => state.auth);

    useEffect((): void => {
        dispatch(getBlocklist());
    }, [dispatch]);

    if (!authState || !authState.user) {
        return <Alert variant='danger'>{t('You need to be logged in to view your profile')}</Alert>;
    }

    if (loadState?.loading) {
        return <Loader message={t('Please wait while we load your block list')} />;
    }

    return (
        <Col lg={{ span: 10, offset: 1 }}>
            <Panel title={t('Block List')}>
                <ApiStatus
                    state={removeState}
                    onClose={(): ClearApiStatusAction =>
                        dispatch(clearApiStatus(Auth.RemoveBlocklistEntry))
                    }
                />
                <ApiStatus
                    state={addState}
                    onClose={(): ClearApiStatusAction =>
                        dispatch(clearApiStatus(Auth.AddBlocklistEntry))
                    }
                />
                <Blocklist
                    blocklist={authState!.blocklist || []}
                    onRemoveBlocklistEntry={(entry: string): RemoveBlocklistEntryAction =>
                        dispatch(removeBlocklistEntry(entry))
                    }
                    onSubmit={(values): AddBlocklistEntryAction =>
                        dispatch(addBlocklistEntry(values.username))
                    }
                />
            </Panel>
        </Col>
    );
};

export default BlocklistContainer;
