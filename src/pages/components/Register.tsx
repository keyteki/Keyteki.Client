import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Form, Col, Button } from 'react-bootstrap';
import { useTranslation, Trans } from 'react-i18next';
import { Formik, FormikProps } from 'formik';
import * as yup from 'yup';

interface RegisterDetails {
    username: string;
    email: string;
    password: string;
    passwordAgain: string;
}

type RegisterProps = {
    onSubmit: (values: RegisterDetails) => void;
};

const initialValues = {
    username: '',
    email: '',
    password: '',
    passwordAgain: ''
};

const Register: React.FC<RegisterProps> = props => {
    const { t } = useTranslation('register');

    const schema = yup.object({
        username: yup
            .string()
            .required(t('You must specify a username'))
            .min(3, t('Username must be at least 3 characters and no more than 15 characters long'))
            .max(
                15,
                t('Username must be at least 3 characters and no more than 15 characters long')
            )
            .matches(
                /^[A-Za-z0-9_-]+$/,
                t('Usernames must only use the characters a-z, 0-9, _ and -')
            ),
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
        <>
            <p>
                <Trans i18nKey='register:privacy'>
                    We require information from you in order to service your access to the site.
                    Please see the <Link to='/privacy'>privacy policy</Link> for details on why we
                    need this information and what we do with it.
                </Trans>
            </p>
            <Formik
                validationSchema={schema}
                onSubmit={props.onSubmit}
                initialValues={initialValues}
            >
                {(formProps: FormikProps<RegisterDetails>): ReactElement => (
                    <Form
                        onSubmit={(event: React.FormEvent<HTMLFormElement>): void => {
                            event.preventDefault();
                            formProps.handleSubmit(event);
                        }}
                    >
                        <Form.Row>
                            <Form.Group as={Col} md='6' controlId='formGridUsername'>
                                <Form.Label>{t('Username')}</Form.Label>
                                <Form.Control
                                    name='username'
                                    type='text'
                                    placeholder={t('Enter a username')}
                                    value={formProps.values.username}
                                    onChange={formProps.handleChange}
                                    onBlur={formProps.handleBlur}
                                    isInvalid={
                                        formProps.touched.username && !!formProps.errors.username
                                    }
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {formProps.errors.username}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md='6' controlId='formGridEmail'>
                                <Form.Label>{t('Email')}</Form.Label>
                                <Form.Control
                                    name='email'
                                    type='email'
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
                                {t('Register')}
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default Register;
