import React from 'react';

import Panel from '../components/Site/Panel';
import { Link } from 'react-router-dom';
import { Form, Col, Button } from 'react-bootstrap';
import { useTranslation, Trans } from 'react-i18next';

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
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} md='6' controlId='formGridUsername'>
                            <Form.Label>{t('Username')}</Form.Label>
                            <Form.Control type='text' placeholder={t('Enter a username')} />
                        </Form.Group>
                        <Form.Group as={Col} md='6' controlId='formGridEmail'>
                            <Form.Label>{t('Email')}</Form.Label>
                            <Form.Control type='email' placeholder={t('Enter an email address')} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} md='6' controlId='formGridPassword'>
                            <Form.Label>{t('Password')}</Form.Label>
                            <Form.Control type='password' placeholder={t('Enter a password')} />
                        </Form.Group>
                        <Form.Group as={Col} md='6' controlId='formGridPassword1'>
                            <Form.Label>{t('Password (again)')}</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder={t('Enter the same password')}
                            />
                        </Form.Group>
                    </Form.Row>

                    <div className='text-center'>
                        <Button variant='primary' type='button'>
                            {t('Register')}
                        </Button>
                    </div>
                </Form>
            </Panel>
        </Col>
    );
};

export default Register;
