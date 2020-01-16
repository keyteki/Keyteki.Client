import Login from './pages/Login';
import Register from './pages/containers/Register';
import Lobby from './pages/Lobby';
import React from 'react';

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
    { path: '/login', component: Login },
    { path: '/register', component: Register }
];

export default routes;
