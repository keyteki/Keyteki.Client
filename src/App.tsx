import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import routes from './routes';

import './App.css';

import './styles/bootstrap.scss';

const App: React.FC = () => {
  return (
    <Router>
        <div>
            This is the background
            <div className="main-wrapper">
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
}

function RouteWithSubRoutes(route: any) {
    return (
      <Route
        path={route.path}
        render={props => (
          <route.component {...props} routes={route.routes} />
        )}
      />
    );
  }

export default App;
