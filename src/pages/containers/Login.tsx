import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import Login from '../components/Login';
import Panel from '../../components/Site/Panel';
import ApiStatus from '../../components/Site/ApiStatus';
import { RootState } from '../../redux/store';
import { Auth, ApiResponseState, ClearApiStatusAction, AuthAction } from '../../redux/types';
import { loginAccount, clearApiStatus } from '../../redux/actions';

const LoginContainer: React.FC = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation('login');
    const history = useHistory();
    const apiState = useSelector<RootState, ApiResponseState | undefined>(state => {
        const retState = state.api.requests[Auth.LoginAccount];

        if (retState && retState.status === 401) {
            retState.message = t('Invalid username/password');
        } else if (retState && retState.success) {
            retState.message = t('Login successful, redirecting you to the home page');

            setTimeout(() => {
                dispatch(clearApiStatus(Auth.LoginAccount));
                history.push('/');
            }, 500);
        }

        return retState;
    });

    return (
        <Col md={{ span: 6, offset: 3 }}>
            <Panel title={t('Login')}>
                <ApiStatus
                    state={apiState}
                    onClose={(): ClearApiStatusAction =>
                        dispatch(clearApiStatus(Auth.LoginAccount))
                    }
                />
                <Login onSubmit={(values): AuthAction => dispatch(loginAccount(values))} />
            </Panel>
        </Col>
    );
};

export default LoginContainer;
