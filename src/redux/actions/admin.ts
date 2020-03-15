import { Admin, RequestNewsAction } from '../types';

export function getAdminNews(): RequestNewsAction {
    return {
        type: Admin.NewsLoaded,
        types: [Admin.LoadNews, Admin.NewsLoaded],
        shouldCallApi: (): boolean => true,
        apiParams: {
            url: '/api/news/admin',
            method: 'GET'
        }
    };
}
