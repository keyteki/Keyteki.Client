import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import { RightMenu, MenuItem } from '../../menus';
import LanguageSelector from './LanguageSelector';
import './Navigation.scss';
import { User } from '../../redux/types';

type NavigationProps = {
    appName?: string;
    user?: User;
};

const Navigation: React.FC<NavigationProps> = (props: NavigationProps) => {
    const rightMenuItems: JSX.Element[] = [];

    for (const menuItem of RightMenu) {
        if (props.user && menuItem.showOnlyWhenLoggedOut) {
            continue;
        }

        rightMenuItems.push(
            <LinkContainer key={menuItem.path} to={menuItem.path}>
                <Nav.Link>{menuItem.title}</Nav.Link>
            </LinkContainer>
        );
    }

    return (
        <Navbar bg='dark' variant='dark'>
            <Navbar.Brand>
                <Link to='/'>{props.appName || 'Gameteki Application'}</Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='navbar' />
            <Navbar.Collapse id='navbar' className='justify-content-end'>
                <Nav className='ml-auto pr-md-5'>
                    {rightMenuItems}
                    <LanguageSelector />
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Navigation;
