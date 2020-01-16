import React from 'react';
import { useDispatch } from 'react-redux';

import Register from '../components/Register';
import { registerAccount } from '../../redux/actions/auth';
import { ApiAction } from '../../redux/apiMiddleware';

const RegisterContainer: React.FC = () => {
    const dispatch = useDispatch();

    return (
        <Register onSubmit={(values): ApiAction => dispatch(registerAccount(values))}></Register>
    );
};

export default RegisterContainer;
