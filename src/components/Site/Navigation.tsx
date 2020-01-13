import React, { Component, ReactElement } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import { RightMenu } from '../../menus';
import './Navigation.scss';

interface NavigationProps {
    appName?: string;
}

class Navigation extends Component<NavigationProps, {}> {
    render(): ReactElement {
        const navLinks = RightMenu.map(menuItem => {
            return <LinkContainer key={menuItem.path} to={menuItem.path}><Nav.Link>{menuItem.title}</Nav.Link></LinkContainer>
        });

        return <Navbar bg='dark' variant='dark'>
            <Navbar.Brand><Link to='/'>{this.props.appName || 'Gameteki Application'}</Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar" />
            <Navbar.Collapse id="navbar" className="justify-content-end">
                <Nav className="ml-auto">
                    {navLinks}
                </Nav>
              </Navbar.Collapse>
        </Navbar>
    }
}

export default Navigation;