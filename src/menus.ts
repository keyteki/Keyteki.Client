export interface MenuItem {
    path: string;
    title: string;
    showOnlyWhenLoggedOut?: boolean;
}

export const RightMenu: MenuItem[] = [
    { path: '/login', title: 'Login', showOnlyWhenLoggedOut: true },
    { path: '/register', title: 'Register', showOnlyWhenLoggedOut: true }
];

export const ProfileMenu: MenuItem[] = [
    { path: '/profile', title: 'Profile' },
    { path: '/blocklist', title: 'Block List' },
    { path: '/logout', title: 'Logout' }
];
