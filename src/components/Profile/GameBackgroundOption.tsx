import React from 'react';
import classNames from 'classnames';
import { Col } from 'react-bootstrap';

import './GameBackgroundOption.scss';

type GameBackgroundProps = {
    imageUrl: string;
    label: string;
    name: string;
    onSelect: (name: string) => void;
    selected: boolean;
};

const GameBackgroundOption: React.FC<GameBackgroundProps> = props => {
    const { name, label, imageUrl, selected, onSelect } = props;

    const handleClick = (): void => {
        onSelect(name);
    };

    return (
        <Col xs='4' md='3' onClick={handleClick}>
            <img
                alt={label}
                className={classNames('img-fluid', { 'background-selected': selected })}
                src={imageUrl}
            />
            <span className='bg-label'>{label}</span>
        </Col>
    );
};

export default GameBackgroundOption;
