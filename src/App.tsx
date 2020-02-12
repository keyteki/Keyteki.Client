import React, { ReactElement, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Navigation from './components/Navigation/Navigation';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import { useTranslation } from 'react-i18next';

import routes, { RouteEntry } from './routes';
import { RootState } from './redux/store';
import { AuthState, InitState } from './redux/types';
import { setAuthTokens, checkAuth, authChecked } from './redux/actions';
import Loader from './components/Site/Loader';
import Login from './pages/containers/Login';

import './styles/bootstrap.scss';

const App: React.FC = () => {
    const { t } = useTranslation();
    const authState = useSelector<RootState, AuthState | undefined>(state => state.auth);
    const initState = useSelector<RootState, InitState | undefined>(state => state.init);
    const dispatch = useDispatch();

    const initAuth = (): void => {
        const token = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken');

        if (token && refreshToken) {
            dispatch(setAuthTokens(token, refreshToken));
        } else {
            dispatch(authChecked());
        }
    };

    useEffect(initAuth, []);

    if (!initState?.finished) {
        return <Loader message={t('Please wait while we check some details')}></Loader>;
    }

    const toastrConfirmOptions = {
        okText: t('Ok'),
        cancelText: t('Cancel')
    };

    return (
        <>
            <Router>
                <div>
                    <Navigation appName='The Crucible Online' user={authState?.user} />
                    <div className='main-wrapper'>
                        <Container>
                            <Switch>
                                {routes.map((route, i) => (
                                    <RouteWithSubRoutes key={i} {...route} />
                                ))}
                            </Switch>
                        </Container>
                    </div>
                </div>
            </Router>
            <ReduxToastr
                preventDuplicates
                transitionIn='fadeIn'
                transitionOut='fadeOut'
                confirmOptions={toastrConfirmOptions}
            />
        </>
    );
};

function RouteWithSubRoutes(route: RouteEntry): ReactElement {
    return (
        <Route
            exact={route.exact}
            path={route.path}
            render={(props): ReactElement => <route.component {...props} routes={route.routes} />}
        />
    );
}

export default App;
