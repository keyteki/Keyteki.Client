import React from 'react';
import { Alert } from 'react-bootstrap';

import { ApiState } from '../../redux/types/api';

type ApiStatusProps = {
    state?: ApiState;
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
        <div>
            <Alert variant={props.state.success ? 'success' : 'danger'} dismissible>
                {error}
            </Alert>
        </div>
    );
};

export default ApiStatus;
