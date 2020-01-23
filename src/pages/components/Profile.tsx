/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { ReactElement, useRef, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Form, Button, Alert, FormControl } from 'react-bootstrap';
import { Formik, FormikProps } from 'formik';
import * as yup from 'yup';

import { User } from '../../redux/types';
import Avatar from '../../components/Site/Avatar';

interface SettingsDetails {
    background: string;
    cardSize: string;
    windowTimer: number;
}

interface ProfileDetails {
    avatar: any;
    email: string;
    password: string;
    passwordAgain: string;

    settings: SettingsDetails;
}

type ProfileProps = {
    onSubmit: (values: ProfileDetails) => void;
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

    const toBase64 = (file: File): Promise<string | null> =>
        new Promise<string | null>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (): void => resolve(reader.result?.toString());
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
        <Formik validationSchema={schema} onSubmit={props.onSubmit} initialValues={initialValues}>
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
                                <Avatar username={props.user!.username}></Avatar>
                                <Button onClick={onAvatarUploadClick}>Change avatar</Button>
                            </div>
                            <Form.Control
                                name='avatar'
                                type='file'
                                accept='image/*'
                                onChange={async (
                                    event: FormEvent<HTMLInputElement>
                                ): Promise<any> => {
                                    if (!event.currentTarget || !event.currentTarget.files) {
                                        return;
                                    }

                                    console.info(URL.createObjectURL(event.currentTarget.files[0]));

                                    formProps.setFieldValue(
                                        'avatar',
                                        await toBase64(event.currentTarget.files[0])
                                    );
                                }}
                                onBlur={formProps.handleBlur}
                                hidden
                                ref={inputFile}
                            ></Form.Control>
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
