import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col } from 'react-bootstrap';

import Register from '../components/Register';
import { registerAccount } from '../../redux/actions/auth';
import { ApiCallAction } from '../../redux/apiMiddleware';
import Panel from '../../components/Site/Panel';
import ApiStatus from '../../components/Site/ApiStatus';
import { ApiAction, RegisterAction } from '../../redux/types';
import { RootState } from '../../redux/store';

const RegisterContainer: React.FC = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation('register');
    const apiState = useSelector<RootState, ApiAction | undefined>(
        state => state.api[RegisterAction.RegisterAccount]
    );

    return (
        <Col lg={{ span: 10, offset: 1 }}>
            <Panel title={t('Register an account')}>
                <ApiStatus state={apiState} />
                <Register
                    onSubmit={(values): ApiCallAction => dispatch(registerAccount(values))}
                ></Register>
            </Panel>
        </Col>
    );
};

export default RegisterContainer;
