import React from 'react';

import Login from './pages/containers/Login';
import Register from './pages/containers/Register';
import Lobby from './pages/Lobby';
import Profile from './pages/containers/Profile';
import Patreon from './pages/Patreon';
import Blocklist from './pages/containers/Blocklist';
import Logout from './pages/components/Logout';
import Callback from './pages/Callback';

export interface RoutedProps {
    routes?: RouteEntry[];
}

export interface RouteEntry {
    exact?: boolean;
    path: string;
    component: React.FC<RoutedProps | {}>;
    routes?: RouteEntry[];
}

const routes: RouteEntry[] = [
    { path: '/', component: Lobby, exact: true },
    { path: '/callback', component: Callback },
    { path: '/login', component: Login },
    { path: '/patreon', component: Patreon },
    { path: '/profile', component: Profile },
    { path: '/register', component: Register },
    { path: '/blocklist', component: Blocklist },
    { path: '/logout', component: Logout }
];

export default routes;
