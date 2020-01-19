import React, { ReactElement } from 'react';
import { Container } from 'react-bootstrap';
import Navigation from './components/Navigation/Navigation';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import routes, { RouteEntry } from './routes';
import { RootState } from './redux/store';
import { AuthState } from './redux/types';

import './App.scss';
import './styles/bootstrap.scss';

const App: React.FC = () => {
    const authState = useSelector<RootState, AuthState | undefined>(state => state.auth);
    return (
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
