import { ApiCallAction } from '../middleware/apiMiddleware';
import { ApiResponseAction } from '.';

export enum Admin {
    LoadNews = 'LOAD_NEWS',
    NewsLoaded = 'NEWS_LOADED'
}

export type AdminState = {
    news: NewsItem[];
};

export interface NewsItem {
    id: number;
    datePublished: Date;
    posterId: number;
    text: string;
    poster: string;
}

export interface RequestNewsAction extends ApiCallAction, ApiResponseAction {
    type: typeof Admin.NewsLoaded;
}
