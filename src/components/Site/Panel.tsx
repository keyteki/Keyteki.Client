import React, { Component, ReactElement, ReactNodeArray } from 'react';
import classNames from 'classnames';

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
        return (
            <div className={ classNames('panel', `panel-${this.props.type}`, this.props.className) }>
                { this.props.title &&
                    <div className={ classNames('panel-heading', this.props.titleClass) }>
                        { this.props.title }
                    </div>
                }
                <div className='panel-body'>
                    { this.props.children }
                </div>
            </div>);
    }
}

export default Panel;
