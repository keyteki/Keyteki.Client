import React, { ReactNodeArray, ReactNode } from 'react';

import './Panel.scss';
import { Card } from 'react-bootstrap';

enum PanelType {
    Default = 'default',
    Primary = 'primary',
    Info = 'info',
    Warning = 'warning',
    Danger = 'danger'
}

type PanelProps = {
    children?: ReactNode | ReactNodeArray;
    className?: string;
    title?: string;
    titleClass?: string;
} & Partial<DefaultProps>;

const defaultProps = {
    type: PanelType.Primary
};

type DefaultProps = Readonly<typeof defaultProps>;

const Panel: React.FC<PanelProps> = props => {
    let type:
        | 'primary'
        | 'secondary'
        | 'success'
        | 'danger'
        | 'warning'
        | 'info'
        | 'dark'
        | 'light';

    switch (props.type) {
        case PanelType.Primary:
            type = 'primary';
            break;
        case PanelType.Default:
            type = 'secondary';
            break;
        case PanelType.Info:
            type = 'info';
            break;
        case PanelType.Warning:
            type = 'warning';
            break;
        case PanelType.Danger:
            type = 'danger';
            break;
        default:
            type = 'primary';
            break;
    }

    return (
        <Card border={type} bg='dark'>
            <Card.Header className='text-center'>{props.title}</Card.Header>
            <Card.Body>{props.children}</Card.Body>
        </Card>
    );
};

export default Panel;
