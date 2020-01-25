import React from 'react';
import classNames from 'classnames';

import './CardSizeOption.scss';

type CardSizeProps = {
    label: string;
    name: string;
    onSelect: (name: string) => void;
    selected: boolean;
};

const CardSizeOption: React.FC<CardSizeProps> = props => {
    const { name, label, selected, onSelect } = props;

    const handleClick = (): void => {
        onSelect(name);
    };

    return (
        <div key={name} className='card-settings' onClick={handleClick}>
            <div className={classNames('card', 'vertical', name, { selected: selected })}>
                <img
                    className={classNames('card', 'vertical', name)}
                    src='/img/idbacks/identity.jpg'
                />
            </div>
            <span className='bg-label'>{label}</span>
        </div>
    );
};

export default CardSizeOption;
