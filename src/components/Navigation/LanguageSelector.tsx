import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const languages = [
    {
        name: 'English',
        value: 'en'
    },
    {
        name: 'Español',
        value: 'es'
    },
    {
        name: 'Deutsch',
        value: 'de'
    },
    {
        name: 'Português',
        value: 'pt'
    },
    {
        name: 'Italiano',
        value: 'it'
    },
    {
        name: 'Français',
        value: 'fr'
    },
    {
        name: 'Polski',
        value: 'pl'
    },
    {
        name: 'ไทย',
        value: 'th'
    },
    {
        name: '简体中文',
        value: 'zhhans'
    },
    {
        name: '繁體中文',
        value: 'zhhant'
    }
];

const LanguageSelector: React.FC = () => {
    const { i18n } = useTranslation();

    const onLanguageSelect = (language: string): void => {
        i18n.changeLanguage(language);
    };

    return (
        <NavDropdown
            title={i18n.language}
            id='nav-dropdown'
            drop='left'
            onSelect={onLanguageSelect}
        >
            {languages.map(language => (
                <NavDropdown.Item key={language.value} eventKey={language.value}>
                    {language.name}
                </NavDropdown.Item>
            ))}
        </NavDropdown>
    );
};

export default LanguageSelector;
