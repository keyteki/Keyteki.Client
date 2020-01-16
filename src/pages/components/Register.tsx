import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Form, Col, Button } from 'react-bootstrap';
import { useTranslation, Trans } from 'react-i18next';
import { Formik, FormikProps } from 'formik';
import * as yup from 'yup';

import Panel from '../../components/Site/Panel';

interface RegisterDetails {
    username: string;
    email: string;
    password: string;
    passwordAgain: string;
}

export type RegisterProps = {
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
        <Col lg={{ span: 10, offset: 1 }}>
            <Panel title={t('Register an account')}>
                <p>
                    <Trans i18nKey='register:privacy'>
                        We require information from you in order to service your access to the site.
                        Please see the <Link to='/privacy'>privacy policy</Link> for details on why
                        we need this information and what we do with it.
                    </Trans>
                </p>
                <Formik
                    validationSchema={schema}
                    onSubmit={props.onSubmit}
                    initialValues={initialValues}
                >
                    {(props: FormikProps<RegisterDetails>): ReactElement => (
                        <Form
                            onSubmit={(event: React.FormEvent<HTMLFormElement>): void => {
                                event.preventDefault();
                                props.handleSubmit(event);
                            }}
                        >
                            <Form.Row>
                                <Form.Group as={Col} md='6' controlId='formGridUsername'>
                                    <Form.Label>{t('Username')}</Form.Label>
                                    <Form.Control
                                        name='username'
                                        type='text'
                                        placeholder={t('Enter a username')}
                                        value={props.values.username}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        isInvalid={
                                            props.touched.username && !!props.errors.username
                                        }
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        {props.errors.username}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md='6' controlId='formGridEmail'>
                                    <Form.Label>{t('Email')}</Form.Label>
                                    <Form.Control
                                        name='email'
                                        type='email'
                                        placeholder={t('Enter an email address')}
                                        value={props.values.email}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        isInvalid={props.touched.email && !!props.errors.email}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        {props.errors.email}
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
                                        value={props.values.password}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        isInvalid={
                                            props.touched.password && !!props.errors.password
                                        }
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        {props.errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md='6' controlId='formGridPassword1'>
                                    <Form.Label>{t('Password (again)')}</Form.Label>
                                    <Form.Control
                                        name='passwordAgain'
                                        type='password'
                                        placeholder={t('Enter the same password')}
                                        value={props.values.passwordAgain}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        isInvalid={
                                            props.touched.passwordAgain &&
                                            !!props.errors.passwordAgain
                                        }
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        {props.errors.passwordAgain}
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
            </Panel>
        </Col>
    );
};

export default Register;
