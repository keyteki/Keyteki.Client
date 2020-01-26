import React from 'react';
import { Alert } from 'react-bootstrap';

import { ApiResponseState } from '../../redux/types';

type ApiStatusProps = {
    state?: ApiResponseState;
    onClose: () => void;
};

const ApiStatus: React.FC<ApiStatusProps> = props => {
    if (!props.state || props.state.loading) {
        return null;
    }

    let error;
    let index = 0;
    if (typeof props.state.message === 'object') {
        error = (
            <ul>
                {Object.values(props.state.message).map(message => {
                    return <li key={index++}>{message}</li>;
                })}
            </ul>
        );
    } else {
        error = props.state.message;
    }

    return (
        <Alert
            variant={props.state.success ? 'success' : 'danger'}
            dismissible
            onClose={props.onClose}
        >
            {error}
        </Alert>
    );
};

export default ApiStatus;
