import React from 'react';
import { Col, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import Profile from '../components/Profile';
import { RootState } from '../../redux/store';
import {
    AuthState,
    AuthAction,
    ApiResponseState,
    Auth,
    ClearApiStatusAction
} from '../../redux/types';
import { updateProfile, clearApiStatus } from '../../redux/actions';
import ApiStatus from '../../components/Site/ApiStatus';

const ProfileContainer: React.FC = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation('profile');
    const authState = useSelector<RootState, AuthState | undefined>(state => state.auth);
    const apiState = useSelector<RootState, ApiResponseState | undefined>(state => {
        const retState = state.api.requests[Auth.UpdateProfile];

        if (retState && retState.success) {
            retState.message = t(
                'Profile saved successfully.  Please note settings changed here may only apply at the start of your next game.'
            );

            setTimeout(() => {
                dispatch(clearApiStatus(Auth.UpdateProfile));
            }, 5000);
        }

        return retState;
    });

    if (!authState || !authState.user) {
        return <Alert variant='danger'>{t('You need to be logged in to view your profile')}</Alert>;
    }

    return (
        <Col lg={{ span: 10, offset: 1 }}>
            <ApiStatus
                state={apiState}
                onClose={(): ClearApiStatusAction => dispatch(clearApiStatus(Auth.UpdateProfile))}
            />
            <Profile
                user={authState?.user}
                onSubmit={(profile): AuthAction => {
                    return dispatch(updateProfile(authState.user!.username, profile));
                }}
            />
        </Col>
    );
};

export default ProfileContainer;
