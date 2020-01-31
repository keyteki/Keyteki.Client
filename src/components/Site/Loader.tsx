import React from 'react';
import { Spinner } from 'react-bootstrap';

import './Loader.scss';

type LoaderProps = {
    message?: string;
};

const Loader: React.FC<LoaderProps> = props => {
    return (
        <div className='loader'>
            <Spinner animation='border'></Spinner>
            {props.message}
        </div>
    );
};

export default Loader;
