export interface MenuItem {
    path?: string;
    title: string;
    showOnlyWhenLoggedOut?: boolean;
    showOnlyWhenLoggedIn?: boolean;
    children?: MenuItem[];
}

export const LeftMenu: MenuItem[] = [
    {
        title: 'Admin',
        showOnlyWhenLoggedIn: true,
        children: [{ path: '/admin/news', title: 'News' }]
    }
];

export const RightMenu: MenuItem[] = [
    { path: '/login', title: 'Login', showOnlyWhenLoggedOut: true }
];

export const ProfileMenu: MenuItem[] = [
    { path: '/profile', title: 'Profile' },
    { path: '/blocklist', title: 'Block List' },
    { path: '/logout', title: 'Logout' }
];
