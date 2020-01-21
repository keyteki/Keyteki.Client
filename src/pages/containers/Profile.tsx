import React from 'react';
import { Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import Panel from '../../components/Site/Panel';
import Profile from '../components/Profile';

const ProfileContainer: React.FC = () => {
    const { t } = useTranslation('profile');

    return (
        <Col lg={{ span: 10, offset: 1 }}>
            <Panel title={t('Profile')}>
                <Profile />
            </Panel>
        </Col>
    );
};

export default ProfileContainer;
