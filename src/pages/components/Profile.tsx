import React, { ReactElement, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Formik, FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { User } from '../../redux/types';
import ProfileMain from '../../components/Profile/ProfileMain';
import ProfileBackground from '../../components/Profile/ProfileBackground';
import { Constants } from '../../constants';

import './Profile.scss';
import ProfileCardSize from '../../components/Profile/ProfileCardSize';

interface SettingsDetails {
    background: string;
    cardSize: string;
    windowTimer: number;
}

interface ProfileDetails {
    email: string;
    password: string;
    passwordAgain: string;

    settings: SettingsDetails;
}

export interface ExistingProfileDetails extends ProfileDetails {
    avatar?: File;
}

interface NewProfileDetails extends ProfileDetails {
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
    }
};

const Profile: React.FC<ProfileProps> = props => {
    const { t } = useTranslation('profile');
    const [localBackground, setBackground] = useState<string | null>(null);
    const [localCardSize, setCardSize] = useState<string | null>(null);

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

    if (!props.user) {
        return <Alert variant='danger'>You need to be logged in to view your profile.</Alert>;
    }

    initialValues.email = props.user.email;

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
                    settings: values.settings
                };

                if (localBackground) {
                    submitValues.settings.background = localBackground;
                }

                props.onSubmit(submitValues);
            }}
            initialValues={initialValues}
        >
            {(formProps: FormikProps<ExistingProfileDetails>): ReactElement => (
                <Form
                    onSubmit={(event: React.FormEvent<HTMLFormElement>): void => {
                        event.preventDefault();
                        formProps.handleSubmit(event);
                    }}
                >
                    <ProfileMain formProps={formProps} user={props.user} />
                    <ProfileBackground
                        backgrounds={backgrounds}
                        selectedBackground={localBackground || props.user!.settings.background}
                        onBackgroundSelected={(name): void => setBackground(name)}
                    />
                    <ProfileCardSize
                        cardSizes={cardSizes}
                        selectedCardSize={localCardSize || props.user!.settings.cardSize}
                        onCardSizeSelected={(name): void => setCardSize(name)}
                    />
                    <div className='text-center'>
                        <Button variant='primary' type='submit'>
                            {t('Save')}
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default Profile;
