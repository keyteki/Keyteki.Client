/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { ReactElement, useRef, FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Form, Button, Alert, FormControl } from 'react-bootstrap';
import { Formik, FormikProps } from 'formik';
import * as yup from 'yup';

import { User } from '../../redux/types';
import Avatar from '../../components/Site/Avatar';

import './Profile.scss';

interface SettingsDetails {
    background: string;
    cardSize: string;
    windowTimer: number;
}

interface ProfileDetails {
    avatar?: File;
    email: string;
    password: string;
    passwordAgain: string;

    settings: SettingsDetails;
}

interface ProfileRetDetails {
    avatar?: string | null;
    email: string;
    password: string;
    passwordAgain: string;

    settings: SettingsDetails;
}

type ProfileProps = {
    onSubmit: (values: ProfileRetDetails) => void;
    user?: User;
};

const initialValues: ProfileDetails = {
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
    const inputFile = useRef<FormControl & HTMLInputElement>(null);
    const [localAvatar, setAvatar] = useState<string | null>(null);

    const toBase64 = (file: File): Promise<string | null> =>
        new Promise<string | null>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (): void => resolve(reader.result?.toString().split(',')[1]);
            reader.onerror = (error): void => reject(error);
        });

    const onAvatarUploadClick = (): void => {
        if (!inputFile.current) {
            return;
        }

        inputFile.current.click();
    };

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
                value => value.size <= 100 * 1024
            )
            .test('fileType', t('Unsupported image format'), value =>
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
            onSubmit={async (values: ProfileDetails): Promise<void> => {
                const submitValues: ProfileRetDetails = {
                    avatar: values.avatar ? await toBase64(values.avatar) : null,
                    email: values.email,
                    password: values.password,
                    passwordAgain: values.passwordAgain,
                    settings: values.settings
                };

                props.onSubmit(submitValues);
            }}
            initialValues={initialValues}
        >
            {(formProps: FormikProps<ProfileDetails>): ReactElement => (
                <Form
                    onSubmit={(event: React.FormEvent<HTMLFormElement>): void => {
                        event.preventDefault();
                        formProps.handleSubmit(event);
                    }}
                >
                    <Form.Row>
                        <Form.Group as={Col} md='6' controlId='formGridEmail'>
                            <Form.Label>{t('Email')}</Form.Label>
                            <Form.Control
                                name='email'
                                type='text'
                                placeholder={t('Enter an email address')}
                                value={formProps.values.email}
                                onChange={formProps.handleChange}
                                onBlur={formProps.handleBlur}
                                isInvalid={formProps.touched.email && !!formProps.errors.email}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {formProps.errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md='3'>
                            <Form.Label>{t('Avatar')}</Form.Label>
                            <div className='full-width'>
                                {!formProps.errors.avatar && localAvatar ? (
                                    <img className='profile-avatar' src={localAvatar!} />
                                ) : (
                                    <Avatar username={props.user!.username}></Avatar>
                                )}
                                <Button onClick={onAvatarUploadClick}>Change avatar</Button>
                            </div>
                            <Form.Control
                                name='avatar'
                                type='file'
                                accept='image/*'
                                onChange={(event: FormEvent<HTMLInputElement>): void => {
                                    if (
                                        !event.currentTarget ||
                                        !event.currentTarget.files ||
                                        event.currentTarget.files.length === 0
                                    ) {
                                        return;
                                    }

                                    const file = event.currentTarget.files[0];
                                    setAvatar(URL.createObjectURL(file));
                                    formProps.setFieldValue('avatar', file);
                                }}
                                onBlur={formProps.handleBlur}
                                hidden
                                ref={inputFile}
                                isInvalid={!!formProps.errors.avatar}
                            ></Form.Control>
                            <Form.Control.Feedback type='invalid'>
                                {formProps.errors.avatar}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md='6' controlId='formGridPassword'>
                            <Form.Label>{t('Password')}</Form.Label>
                            <Form.Control
                                name='password'
                                type='password'
                                placeholder={t('Enter a password')}
                                value={formProps.values.password}
                                onChange={formProps.handleChange}
                                onBlur={formProps.handleBlur}
                                isInvalid={
                                    formProps.touched.password && !!formProps.errors.password
                                }
                            />
                            <Form.Control.Feedback type='invalid'>
                                {formProps.errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md='6' controlId='formGridPassword1'>
                            <Form.Label>{t('Password (again)')}</Form.Label>
                            <Form.Control
                                name='passwordAgain'
                                type='password'
                                placeholder={t('Enter the same password')}
                                value={formProps.values.passwordAgain}
                                onChange={formProps.handleChange}
                                onBlur={formProps.handleBlur}
                                isInvalid={
                                    formProps.touched.passwordAgain &&
                                    !!formProps.errors.passwordAgain
                                }
                            />
                            <Form.Control.Feedback type='invalid'>
                                {formProps.errors.passwordAgain}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
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
