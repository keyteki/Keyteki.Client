import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAdminNews } from '../../redux/actions/admin';

const NewsAdminContainer: React.FC = () => {
    const dispatch = useDispatch();

    useEffect((): void => {
        dispatch(getAdminNews());
    }, [dispatch]);

    return <div>News Admin</div>;
};

export default NewsAdminContainer;
