import { FormikProps } from 'formik';
import { User } from '../../redux/types';
import { ExistingProfileDetails } from '../../pages/components/Profile';

import React from 'react';
import Panel from '../Site/Panel';
import { Col, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

type KeyforgeGameSettingsProps = {
    formProps: FormikProps<ExistingProfileDetails>;
    user?: User;
};

const KeyforgeGameSettings: React.FC<KeyforgeGameSettingsProps> = props => {
    const { t } = useTranslation('profile');
    const formProps = props.formProps;

    return (
        <Panel title={t('Game Settings')}>
            <Form.Row>
                <Form.Check
                    id='orderForcedAbilities'
                    name='gameOptions.orderForcedAbilities'
                    label={t('Prompt to order simultaneous abilities')}
                    type='switch'
                    checked={formProps.values.gameOptions.orderForcedAbilities}
                    onChange={formProps.handleChange}
                    onBlur={formProps.handleBlur}
                />
                <Form.Check
                    id='confirmOneClick'
                    name='gameOptions.confirmOneClick'
                    label={t('Show a prompt when initating 1-click abilities')}
                    type='switch'
                    checked={formProps.values.gameOptions.confirmOneClick}
                    onChange={formProps.handleChange}
                    onBlur={formProps.handleBlur}
                />
            </Form.Row>
        </Panel>
    );
};

export default KeyforgeGameSettings;
