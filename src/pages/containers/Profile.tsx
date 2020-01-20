import React from 'react';
import { Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import Panel from '../../components/Site/Panel';

const ProfileContainer: React.FC = () => {
    const { t } = useTranslation('register');

    return (
        <Col lg={{ span: 8, offset: 2 }}>
            <Panel title={t('Profile')}></Panel>
        </Col>
    );
};

export default ProfileContainer;
