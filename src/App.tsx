import React, { ReactElement } from 'react';
import { Container } from 'react-bootstrap';
import Navigation from './components/Navigation/Navigation';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import routes, { RouteEntry } from './routes';

import './App.scss';
import './styles/bootstrap.scss';

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <Navigation appName='The Crucible Online' />
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
