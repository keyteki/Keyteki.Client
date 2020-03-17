import {
    Admin,
    RequestNewsAction,
    AddNewsItemAction,
    RemoveNewsItemAction,
    UpdateNewsItemAction
} from '../types';

export function getAdminNews(): RequestNewsAction {
    return {
        type: Admin.NewsRecevied,
        types: [Admin.RequestNews, Admin.NewsRecevied],
        shouldCallApi: (): boolean => true,
        apiParams: {
            url: '/api/news/admin',
            method: 'GET'
        }
    };
}

export function addNewsItem(text: string): AddNewsItemAction {
    return {
        type: Admin.NewsItemAdded,
        types: [Admin.AddNewsItem, Admin.NewsItemAdded],
        shouldCallApi: (): boolean => true,
        apiParams: {
            url: '/api/news',
            method: 'POST',
            data: {
                text: text
            }
        }
    };
}

export function removeNewsItem(id: number): RemoveNewsItemAction {
    return {
        type: Admin.NewsItemRemoved,
        types: [Admin.RemoveNewsItem, Admin.NewsItemRemoved],
        shouldCallApi: (): boolean => true,
        apiParams: {
            url: `/api/news/${id}`,
            method: 'DELETE'
        }
    };
}

export function updateNewsItem(id: number, text: string): UpdateNewsItemAction {
    return {
        type: Admin.NewsItemUpdated,
        types: [Admin.UpdateNewsItem, Admin.NewsItemUpdated],
        shouldCallApi: (): boolean => true,
        apiParams: {
            url: `/api/news/${id}`,
            method: 'PUT',
            data: {
                text: text
            }
        }
    };
}
