import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Form, Button } from 'react-bootstrap';
import { Formik, FormikProps } from 'formik';
import * as yup from 'yup';

interface ProfileDetails {
    email: string;
    password: string;
    passwordAgain: string;
}

const initialValues = {
    email: '',
    password: '',
    passwordAgain: ''
};

const Profile: React.FC = props => {
    const { t } = useTranslation('profile');

    const schema = yup.object({
        email: yup
            .string()
            .email(t('Please enter a valid email address'))
            .required(t('You must specify an email address')),
        password: yup
            .string()
            .min(6, t('Password must be at least 6 characters'))
            .required(t('You must specify a password')),
        passwordAgain: yup
            .string()
            .required(t('You must confirm your password'))
            .oneOf([yup.ref('password'), null], t('The passwords you have entered do not match'))
    });

    return (
        <Formik
            validationSchema={schema}
            onSubmit={() => console.info('hi')}
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
                        <Button>Change</Button>
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
                </Form>
            )}
        </Formik>
    );
};

export default Profile;
