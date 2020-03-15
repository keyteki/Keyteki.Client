import React, { ReactElement, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Navigation from './components/Navigation/Navigation';
import { Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import { useTranslation } from 'react-i18next';
import { ConnectedRouter } from 'connected-react-router';

import routes, { RouteEntry } from './routes';
import { RootState, history } from './redux/store';
import { AuthState, InitState } from './redux/types';
import { setInitLoading } from './redux/actions';

import './styles/bootstrap.scss';

const App: React.FC = () => {
    const { t } = useTranslation();
    const authState = useSelector<RootState, AuthState>(state => state.auth);
    const initState = useSelector<RootState, InitState>(state => state.init);
    const dispatch = useDispatch();

    const initAuth = (): void => {
        dispatch(setInitLoading());
    };

    useEffect(initAuth, []);

    // if (!initState?.finished) {
    //     return <Loader message={t('Please wait while we check some details')}></Loader>;
    // }

    const toastrConfirmOptions = {
        okText: t('Ok'),
        cancelText: t('Cancel')
    };

    return (
        <>
            <ConnectedRouter history={history}>
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
            </ConnectedRouter>
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
