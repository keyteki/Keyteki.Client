import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Form, Col, Button } from 'react-bootstrap';
import { useTranslation, Trans } from 'react-i18next';
import { Formik, FormikProps } from 'formik';
import * as yup from 'yup';

import Panel from '../components/Site/Panel';

interface RegisterDetails {
    username?: string;
    email?: string;
    password?: string;
    passwordAgain?: string;
}

const schema = yup.object({
    username: yup.string().required(),
    email: yup
        .string()
        .email()
        .required(),
    password: yup.string().required(),
    passwordAgain: yup.string().required()
});

const Register: React.FC = () => {
    const { t } = useTranslation('register');

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
                <Formik validationSchema={schema} onSubmit={console.log} initialValues={{}}>
                    {(props: FormikProps<RegisterDetails>): ReactElement => (
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} md='6' controlId='formGridUsername'>
                                    <Form.Label>{t('Username')}</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder={t('Enter a username')}
                                        name='username'
                                        value={props.values.username}
                                        onChange={props.handleChange}
                                        isInvalid={!!props.errors.username}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        {props.errors.username}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md='6' controlId='formGridEmail'>
                                    <Form.Label>{t('Email')}</Form.Label>
                                    <Form.Control
                                        type='email'
                                        placeholder={t('Enter an email address')}
                                        name='email'
                                        value={props.values.email}
                                        onChange={props.handleChange}
                                        isInvalid={!!props.errors.email}
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
                                        type='password'
                                        placeholder={t('Enter a password')}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        {props.errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md='6' controlId='formGridPassword1'>
                                    <Form.Label>{t('Password (again)')}</Form.Label>
                                    <Form.Control
                                        type='password'
                                        placeholder={t('Enter the same password')}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        {props.errors.passwordAgain}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>

                            <div className='text-center'>
                                <Button variant='primary' type='button'>
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
