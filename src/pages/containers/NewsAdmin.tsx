import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col } from 'react-bootstrap';

import {
    getAdminNews,
    addNewsItem,
    removeNewsItem,
    updateNewsItem
} from '../../redux/actions/admin';
import { RootState } from '../../redux/store';
import {
    ApiResponseState,
    Admin,
    AdminState,
    AddNewsItemAction,
    ClearApiStatusAction,
    RemoveNewsItemAction,
    UpdateNewsItemAction
} from '../../redux/types';
import Loader from '../../components/Site/Loader';
import Panel from '../../components/Site/Panel';
import NewsAdmin from '../components/NewsAdmin';
import ApiStatus from '../../components/Site/ApiStatus';
import { clearApiStatus } from '../../redux/actions';

const NewsAdminContainer: React.FC = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation('newsadmin');

    const loadState = useSelector<RootState, ApiResponseState | undefined>(
        state => state.api.requests[Admin.RequestNews]
    );
    const addState = useSelector<RootState, ApiResponseState | undefined>(
        state => state.api.requests[Admin.AddNewsItem]
    );
    const removeState = useSelector<RootState, ApiResponseState | undefined>(
        state => state.api.requests[Admin.RemoveNewsItem]
    );
    const adminState = useSelector<RootState, AdminState | undefined>(state => state.admin);

    useEffect((): void => {
        dispatch(getAdminNews());
    }, [dispatch]);

    if (loadState?.loading) {
        return <Loader message={t('Please wait while we load the news')} />;
    }

    return (
        <Col lg={12}>
            <Panel title={t('News Admin')}>
                <ApiStatus
                    state={removeState}
                    onClose={(): ClearApiStatusAction =>
                        dispatch(clearApiStatus(Admin.RemoveNewsItem))
                    }
                />
                <ApiStatus
                    state={addState}
                    onClose={(): ClearApiStatusAction =>
                        dispatch(clearApiStatus(Admin.AddNewsItem))
                    }
                />

                <NewsAdmin
                    news={adminState!.news || []}
                    onRemoveNewsItem={(id: number): RemoveNewsItemAction =>
                        dispatch(removeNewsItem(id))
                    }
                    onUpdateNewsItem={(id: number, text: string): UpdateNewsItemAction =>
                        dispatch(updateNewsItem(id, text))
                    }
                    onSubmit={(values): AddNewsItemAction => dispatch(addNewsItem(values.text))}
                />
            </Panel>
        </Col>
    );
};

export default NewsAdminContainer;
