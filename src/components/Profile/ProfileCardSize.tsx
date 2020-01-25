import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import Panel from '../Site/Panel';
import { ProfileCardSizeOption } from '../../pages/components/Profile';
import CardSizeOption from './CardSizeOption';

type CardSizeProps = {
    cardSizes: ProfileCardSizeOption[];
    selectedCardSize: string;
    onCardSizeSelected: (name: string) => void;
};

const ProfileCardSize: React.FC<CardSizeProps> = props => {
    const { t } = useTranslation('profile');
    const { cardSizes, selectedCardSize, onCardSizeSelected } = props;

    return (
        <Panel title={t('Card Image Size')}>
            <Row>
                <Col xs='12'>
                    {cardSizes.map(cardSize => (
                        <CardSizeOption
                            key={cardSize.name}
                            label={cardSize.label}
                            name={cardSize.name}
                            onSelect={onCardSizeSelected}
                            selected={selectedCardSize === cardSize.name}
                        />
                    ))}
                </Col>
            </Row>
        </Panel>
    );
};

export default ProfileCardSize;
