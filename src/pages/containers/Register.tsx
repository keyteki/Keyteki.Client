import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import Register from '../components/Register';
import Panel from '../../components/Site/Panel';
import ApiStatus from '../../components/Site/ApiStatus';
import { registerAccount, clearApiStatus } from '../../redux/actions';
import { Auth, ApiResponseState, ClearApiStatusAction, AuthAction } from '../../redux/types';
import { RootState } from '../../redux/store';

const RegisterContainer: React.FC = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation('register');
    const apiState = useSelector<RootState, ApiResponseState | undefined>(
        state => state.api.requests[Auth.RegisterAccount]
    );
    const history = useHistory();

    if (apiState?.success) {
        setTimeout(() => {
            dispatch(clearApiStatus(Auth.RegisterAccount));
            history.push('/');
        }, 5000);
    }

    return (
        <Col lg={{ span: 10, offset: 1 }}>
            <Panel title={t('Register an account')}>
                <ApiStatus
                    state={apiState}
                    onClose={(): ClearApiStatusAction =>
                        dispatch(clearApiStatus(Auth.RegisterAccount))
                    }
                />
                <Register
                    onSubmit={(values): AuthAction => dispatch(registerAccount(values))}
                ></Register>
            </Panel>
        </Col>
    );
};

export default RegisterContainer;
