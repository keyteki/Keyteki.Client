import { GametekiPermission } from './redux/types';

export interface MenuItem {
    path?: string;
    title: string;
    showOnlyWhenLoggedOut?: boolean;
    showOnlyWhenLoggedIn?: boolean;
    permission?: GametekiPermission;
    children?: MenuItem[];
}

export const LeftMenu: MenuItem[] = [
    {
        title: 'Admin',
        showOnlyWhenLoggedIn: true,
        children: [
            { path: '/admin/news', title: 'News', permission: 'canEditNews' },
            { path: '/admin/users', title: 'Users', permission: 'canManageUsers' }
        ]
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
