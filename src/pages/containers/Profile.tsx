/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { Col, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import Panel from '../../components/Site/Panel';
import Profile from '../components/Profile';
import { RootState } from '../../redux/store';
import { AuthState, AuthAction } from '../../redux/types';
import { updateProfile } from '../../redux/actions';

const ProfileContainer: React.FC = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation('profile');
    const authState = useSelector<RootState, AuthState | undefined>(state => state.auth);

    if (!authState || !authState.user) {
        return <Alert variant='danger'>{t('You need to be logged in to view your profile')}</Alert>;
    }

    return (
        <Col lg={{ span: 10, offset: 1 }}>
            <Panel title={t('Profile')}>
                <Profile
                    user={authState?.user}
                    onSubmit={(profile): AuthAction => {
                        return dispatch(updateProfile(authState.user!.username, profile));
                    }}
                />
            </Panel>
        </Col>
    );
};

export default ProfileContainer;
