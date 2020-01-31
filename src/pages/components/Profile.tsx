import React, { ReactElement, useState, useRef } from 'react';
import { Form, Button, Alert, Col, Row, Spinner } from 'react-bootstrap';
import { Formik, FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { User } from '../../redux/types';
import ProfileMain from '../../components/Profile/ProfileMain';
import ProfileBackground from '../../components/Profile/ProfileBackground';
import KeyforgeGameSettings from '../../components/Profile/KeyforgeGameSettings';
import ProfileCardSize from '../../components/Profile/ProfileCardSize';
import { Constants } from '../../constants';

import './Profile.scss';

interface SettingsDetails {
    background: string;
    cardSize: string;
    windowTimer: number;
}

interface GameOptionsDetails {
    orderForcedAbilities: boolean;
    confirmOneClick: boolean;
}

interface ProfileDetails {
    email: string;
    password: string;
    passwordAgain: string;
    settings: SettingsDetails;
}

export interface ExistingProfileDetails extends ProfileDetails {
    gameOptions: GameOptionsDetails;
    avatar?: File;
}

interface NewProfileDetails extends ProfileDetails {
    customData: string;
    avatar?: string | null;
}

export interface BackgroundOption {
    name: string;
    label: string;
    imageUrl: string;
}

export interface ProfileCardSizeOption {
    name: string;
    label: string;
}

type ProfileProps = {
    onSubmit: (values: NewProfileDetails) => void;
    user?: User;
    isLoading: boolean;
};

const initialValues: ExistingProfileDetails = {
    avatar: undefined,
    email: '',
    password: '',
    passwordAgain: '',
    settings: {
        background: '',
        cardSize: '',
        windowTimer: 0
    },
    gameOptions: {
        confirmOneClick: false,
        orderForcedAbilities: false
    }
};

const Profile: React.FC<ProfileProps> = props => {
    const { user, onSubmit, isLoading } = props;
    const { t } = useTranslation('profile');
    const [localBackground, setBackground] = useState<string>(user!.settings.background);
    const [localCardSize, setCardSize] = useState<string>(user!.settings.cardSize);
    const topRowRef = useRef<Row<'div'> & HTMLDivElement>(null);

    const backgrounds = [{ name: 'none', label: t('none'), imageUrl: 'img/bgs/blank.png' }];
    const cardSizes = [
        { name: 'small', label: t('small') },
        { name: 'normal', label: t('normal') },
        { name: 'large', label: t('large') },
        { name: 'x-large', label: t('extra-large') }
    ];

    for (let i = 0; i < Constants.Houses.length; ++i) {
        backgrounds.push({
            name: Constants.HousesNames[i],
            label: t(Constants.Houses[i]),
            imageUrl: `img/bgs/${Constants.Houses[i]}.png`
        });
    }

    const toBase64 = (file: File): Promise<string | null> =>
        new Promise<string | null>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (): void => resolve(reader.result?.toString().split(',')[1]);
            reader.onerror = (error): void => reject(error);
        });

    if (!user) {
        return <Alert variant='danger'>You need to be logged in to view your profile.</Alert>;
    }

    initialValues.email = user.email;
    if (user.customData) {
        initialValues.gameOptions = JSON.parse(user.customData);
    }

    const schema = yup.object({
        avatar: yup
            .mixed()
            .test(
                'fileSize',
                t('Image must be less than 100KB in size'),
                value => !value || value.size <= 100 * 1024
            )
            .test(
                'fileType',
                t('Unsupported image format'),
                value =>
                    !value ||
                    ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'].includes(value.type)
            ),
        email: yup
            .string()
            .email(t('Please enter a valid email address'))
            .required(t('You must specify an email address')),
        password: yup.string().min(6, t('Password must be at least 6 characters')),
        passwordAgain: yup
            .string()
            .oneOf([yup.ref('password'), null], t('The passwords you have entered do not match'))
    });

    return (
        <Formik
            validationSchema={schema}
            onSubmit={async (values: ExistingProfileDetails): Promise<void> => {
                const submitValues: NewProfileDetails = {
                    avatar: values.avatar ? await toBase64(values.avatar) : null,
                    email: values.email,
                    password: values.password,
                    passwordAgain: values.passwordAgain,
                    settings: values.settings,
                    customData: JSON.stringify(values.gameOptions)
                };

                if (localBackground) {
                    submitValues.settings.background = localBackground;
                }

                if (localCardSize) {
                    submitValues.settings.cardSize = localCardSize;
                }

                onSubmit(submitValues);

                if (!topRowRef || !topRowRef.current) {
                    return;
                }

                topRowRef.current.scrollIntoView(false);
            }}
            initialValues={initialValues}
        >
            {(formProps: FormikProps<ExistingProfileDetails>): ReactElement => (
                <Form
                    className='profile-form'
                    onSubmit={(event: React.FormEvent<HTMLFormElement>): void => {
                        event.preventDefault();
                        formProps.handleSubmit(event);
                    }}
                >
                    <Row ref={topRowRef}>
                        <Col sm='12'>
                            <ProfileMain formProps={formProps} user={user} />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm='12'>
                            <ProfileBackground
                                backgrounds={backgrounds}
                                selectedBackground={localBackground || user!.settings.background}
                                onBackgroundSelected={(name): void => setBackground(name)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm='6'>
                            <ProfileCardSize
                                cardSizes={cardSizes}
                                selectedCardSize={localCardSize || user!.settings.cardSize}
                                onCardSizeSelected={(name): void => setCardSize(name)}
                            />
                        </Col>
                        <Col sm='6'>
                            <KeyforgeGameSettings formProps={formProps} user={user} />
                        </Col>
                    </Row>
                    <div className='text-center profile-submit'>
                        <Button variant='primary' type='submit' disabled={isLoading}>
                            {isLoading ? (
                                <Spinner
                                    animation='border'
                                    size='sm'
                                    as={'span'}
                                    role='status'
                                    aria-hidden='true'
                                />
                            ) : null}
                            {t('Save')}
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default Profile;
