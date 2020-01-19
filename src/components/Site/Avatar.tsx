import React from 'react';
import classNames from 'classnames';

import './Avatar.scss';

type AvatarProps = {
    float?: boolean;
    username: string;
};

const Avatar: React.FC<AvatarProps> = props => {
    const className = classNames('gravatar', {
        'pull-left': props.float
    });

    if (!props.username) {
        return null;
    }

    return <img className={className} src={`/img/avatar/${props.username}.png`} />;
};

export default Avatar;
