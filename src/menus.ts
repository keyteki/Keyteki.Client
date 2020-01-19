export interface MenuItem {
    path: string;
    title: string;
    showOnlyWhenLoggedOut: boolean;
}

export const RightMenu: MenuItem[] = [
    { path: '/login', title: 'Login', showOnlyWhenLoggedOut: true },
    { path: '/register', title: 'Register', showOnlyWhenLoggedOut: true }
];
