import React from 'react';

import Lobby from './pages/Lobby';
import Profile from './pages/containers/Profile';
import Patreon from './pages/Patreon';
import Blocklist from './pages/containers/Blocklist';
import Logout from './pages/components/Logout';
import Callback from './pages/Callback';
import NewsAdmin from './pages/containers/NewsAdmin';

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
    { path: '/admin/news', component: NewsAdmin },
    { path: '/blocklist', component: Blocklist },
    { path: '/callback', component: Callback },
    { path: '/logout', component: Logout },
    { path: '/patreon', component: Patreon },
    { path: '/profile', component: Profile }
];

export default routes;
