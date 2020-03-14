import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { LinkContainer } from 'react-router-bootstrap';

import { MenuItem } from '../../menus';
import { User } from '../../redux/types';
import Avatar from '../Site/Avatar';

type ProfileMenuProps = {
    menu: MenuItem[];
    user?: User;
};

const ProfileMenu: React.FC<ProfileMenuProps> = props => {
    const { t } = useTranslation('navigation');

    if (!props.user) {
        return null;
    }

    const title = (
        <span>
            <Avatar username={props.user.username}></Avatar>
            {props.user.username}
        </span>
    );

    return (
        <NavDropdown title={title} id='nav-dropdown'>
            {props.menu.map(menuItem => {
                if (!menuItem.path) {
                    return null;
                }

                return (
                    <LinkContainer key={menuItem.path} to={menuItem.path}>
                        <NavDropdown.Item>{t(menuItem.title)}</NavDropdown.Item>
                    </LinkContainer>
                );
            })}
        </NavDropdown>
    );
};

export default ProfileMenu;
