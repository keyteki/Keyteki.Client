import { AdminState, Admin, AdminAction } from '../types';
import { InitialState } from '../initialState';

const initialState: AdminState = InitialState.admin;

export default function(state = initialState, action: AdminAction): AdminState {
    switch (action.type) {
        case Admin.NewsRecevied:
            return { ...state, news: action.response?.data.news };
        case Admin.NewsItemAdded:
            return { ...state, news: [...state.news, action.response?.data.newsItem] };
    }
    return state;
}
