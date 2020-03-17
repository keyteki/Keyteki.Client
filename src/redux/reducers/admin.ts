import { AdminState, Admin, AdminAction } from '../types';
import { InitialState } from '../initialState';

const initialState: AdminState = InitialState.admin;

export default function(state = initialState, action: AdminAction): AdminState {
    switch (action.type) {
        case Admin.NewsRecevied:
            return { ...state, news: action.response?.data.news };
        case Admin.NewsItemAdded:
            return { ...state, news: [...state.news, action.response?.data.newsItem] };
        case Admin.NewsItemUpdated:
            // eslint-disable-next-line no-var
            var response = action.response;
            // eslint-disable-next-line no-var
            var news = [...state.news];

            if (!response) {
                return state;
            }

            // eslint-disable-next-line no-var
            var newsItem = news.find(n => n.id === response?.data.newsItem.id);

            if (!newsItem) {
                return state;
            }

            for (const n of news) {
                console.info(n);
            }

            newsItem.newsText = response.data.newsItem.newsText;
            console.info('updating', newsItem);

            for (const n of news) {
                console.info(n);
            }

            return { ...state, news: news };
    }
    return state;
}
