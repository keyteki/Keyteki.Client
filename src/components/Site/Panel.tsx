import React, { Component, ReactElement, ReactNodeArray } from 'react';
import classNames from 'classnames';

import './Panel.scss';
import { Card } from 'react-bootstrap';
import { readlink } from 'fs';

enum PanelType {
    Default = 'default',
    Primary = 'primary',
    Info = 'info',
    Warning = 'warning',
    Danger = 'danger'
}

type PanelProps = {
    children?: Node | ReactNodeArray;
    className?: string;
    title?: string;
    titleClass?: string;
} & Partial<DefaultProps>

const defaultProps = {
    type: PanelType.Primary
}

type DefaultProps = Readonly<typeof defaultProps>

class Panel extends Component<PanelProps, {}> {
    static defaultProps = defaultProps;

    render(): ReactElement {
        let type:
        | 'primary'
        | 'secondary'
        | 'success'
        | 'danger'
        | 'warning'
        | 'info'
        | 'dark'
        | 'light';

        switch(this.props.type) {
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
            <Card.Header>{this.props.title}</Card.Header>
            <Card.Body>
              <Card.Text>
                {this.props.children}
              </Card.Text>
            </Card.Body>
          </Card>);
    }
}

export default Panel;
