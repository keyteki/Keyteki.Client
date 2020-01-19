import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import Login from '../components/Login';
import Panel from '../../components/Site/Panel';
import ApiStatus from '../../components/Site/ApiStatus';
import { RootState } from '../../redux/store';
import { AuthAction, ApiState, ClearApiStatusAction } from '../../redux/types';
import { loginAccount, clearApiStatus } from '../../redux/actions';
import { ApiCallAction } from '../../redux/apiMiddleware';

const LoginContainer: React.FC = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation('login');
    const history = useHistory();
    const apiState = useSelector<RootState, ApiState | undefined>(state => {
        const retState = state.api[AuthAction.LoginAccount];

        if (retState && retState.status === 401) {
            retState.message = t('Invalid username/password');
        } else if (retState && retState.success) {
            retState.message = t('Login successful, redirecting you to the home page');

            setTimeout(() => {
                dispatch(clearApiStatus(AuthAction.LoginAccount));
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
                        dispatch(clearApiStatus(AuthAction.LoginAccount))
                    }
                />
                <Login onSubmit={(values): ApiCallAction => dispatch(loginAccount(values))} />
            </Panel>
        </Col>
    );
};

export default LoginContainer;
