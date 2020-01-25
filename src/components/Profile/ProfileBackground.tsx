import React from 'react';
import { Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import Panel from '../Site/Panel';
import { BackgroundOption } from '../../pages/components/Profile';
import GameBackgroundOption from './GameBackgroundOption';

type BackgroundProps = {
    backgrounds: BackgroundOption[];
    selectedBackground: string;
    onBackgroundSelected: (name: string) => void;
};

const ProfileBackground: React.FC<BackgroundProps> = props => {
    const { t } = useTranslation('profile');
    const { backgrounds, selectedBackground, onBackgroundSelected } = props;

    return (
        <Panel title={t('Game Board Background')}>
            <Row>
                {backgrounds.map(background => (
                    <GameBackgroundOption
                        imageUrl={background.imageUrl}
                        key={background.name}
                        label={background.label}
                        name={background.name}
                        onSelect={onBackgroundSelected}
                        selected={selectedBackground === background.name}
                    />
                ))}
            </Row>
        </Panel>
    );
};

export default ProfileBackground;
