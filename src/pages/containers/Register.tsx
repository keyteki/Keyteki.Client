import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col } from 'react-bootstrap';

import Register from '../components/Register';
import { registerAccount, clearApiStatus } from '../../redux/actions';
import { ApiCallAction } from '../../redux/apiMiddleware';
import Panel from '../../components/Site/Panel';
import ApiStatus from '../../components/Site/ApiStatus';
import { RegisterAction, ApiState, ClearApiStatusAction } from '../../redux/types';
import { RootState } from '../../redux/store';
import { useHistory } from 'react-router-dom';

const RegisterContainer: React.FC = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation('register');
    const apiState = useSelector<RootState, ApiState | undefined>(
        state => state.api[RegisterAction.RegisterAccount]
    );
    const history = useHistory();

    if (apiState?.success) {
        setTimeout(() => {
            dispatch(clearApiStatus(RegisterAction.RegisterAccount));
            history.push('/');
        }, 5000);
    }

    return (
        <Col lg={{ span: 10, offset: 1 }}>
            <Panel title={t('Register an account')}>
                <ApiStatus
                    state={apiState}
                    onClose={(): ClearApiStatusAction =>
                        dispatch(clearApiStatus(RegisterAction.RegisterAccount))
                    }
                />
                <Register
                    onSubmit={(values): ApiCallAction => dispatch(registerAccount(values))}
                ></Register>
            </Panel>
        </Col>
    );
};

export default RegisterContainer;
