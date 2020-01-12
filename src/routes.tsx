import Login from './pages/Login';
import Register from './pages/Register';
import Lobby from './pages/Lobby';

const routes = [
    { path: '/', component: Lobby },
    { path: '/login', component: Login },
    { path: '/register', component: Register }
];

export default routes;
