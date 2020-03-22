import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useTranslation } from 'react-i18next';

import { RightMenu, ProfileMenu, MenuItem, LeftMenu } from '../../menus';
import LanguageSelector from './LanguageSelector';
import ProfileDropdown from './ProfileMenu';
import { User } from '../../redux/types';

import './Navigation.scss';

type NavigationProps = {
    appName?: string;
    user?: User;
};

const Navigation: React.FC<NavigationProps> = (props: NavigationProps) => {
    const { t } = useTranslation('navigation');

    const userCanSeeMenu = (menuItem: MenuItem, user?: User): boolean => {
        return !menuItem.permission || (!!user && user.permissions[menuItem.permission]);
    };

    const filterMenuItems = (menuItems: MenuItem[], user?: User): MenuItem[] => {
        const returnedItems = [];

        for (const menuItem of menuItems) {
            if (user && menuItem.showOnlyWhenLoggedOut) {
                continue;
            }

            if (!user && menuItem.showOnlyWhenLoggedIn) {
                continue;
            }

            if (!userCanSeeMenu(menuItem, user)) {
                continue;
            }

            returnedItems.push(menuItem);
        }

        return returnedItems;
    };

    const renderMenuItems = (menuItems: MenuItem[]): JSX.Element[] => {
        return filterMenuItems(menuItems, props.user).map(
            (menuItem: MenuItem): JSX.Element => {
                const children =
                    menuItem.children && filterMenuItems(menuItem.children, props.user);
                if (children && children.length > 0) {
                    return (
                        <NavDropdown
                            key={menuItem.title}
                            title={menuItem.title}
                            id={`nav-${menuItem.title}`}
                        >
                            {children.map(menuItem => {
                                if (!menuItem.path) {
                                    return <></>;
                                }

                                return (
                                    <LinkContainer key={menuItem.path} to={menuItem.path}>
                                        <NavDropdown.Item>{t(menuItem.title)}</NavDropdown.Item>
                                    </LinkContainer>
                                );
                            })}
                        </NavDropdown>
                    );
                }

                if (!menuItem.path) {
                    return <></>;
                }

                return (
                    <LinkContainer key={menuItem.path || menuItem.title} to={menuItem.path}>
                        <Nav.Link>{t(menuItem.title)}</Nav.Link>
                    </LinkContainer>
                );
            }
        );
    };

    return (
        <Navbar bg='dark' variant='dark'>
            <Navbar.Brand>
                <Link to='/'>{props.appName || 'Gameteki Application'}</Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='navbar' />
            <Nav>{renderMenuItems(LeftMenu)}</Nav>
            <Navbar.Collapse id='navbar' className='justify-content-end'>
                <Nav className='ml-auto pr-md-5'>
                    {renderMenuItems(RightMenu)}
                    <ProfileDropdown menu={ProfileMenu} user={props.user} />
                    <LanguageSelector />
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Navigation;
