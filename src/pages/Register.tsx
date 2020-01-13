import React from 'react';

import Panel from '../components/Site/Panel';
import { Link } from 'react-router-dom';
import { Form, Col, Button } from 'react-bootstrap';

const Register: React.FC = () => {
    return (
        <Col md={ { span: 8, offset: 2 } }>
            <Panel title='Register an account'>
                <p>We require information from you in order to service your access to the site. Please see the <Link to='/privacy'>privacy policy</Link> for details on why we need this information and what we do with it.  Please pay particular attention to the section on avatars.</p>
                <Form>
                    <Form.Row>
                        <Form.Group as={ Col } controlId="formGridUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter a username" />
                        </Form.Group>
                        <Form.Group as={ Col } controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter an email address" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={ Col } controlId="formGridPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter a password" />
                        </Form.Group>
                        <Form.Group as={ Col } controlId="formGridPassword1">
                            <Form.Label>Password (again)</Form.Label>
                            <Form.Control type="password" placeholder="Enter the same password" />
                        </Form.Group>
                    </Form.Row>

                    <div className='text-center'>
                        <Button variant="primary" type="button">
                            Register
                        </Button>
                    </div>
                </Form>
            </Panel>
        </Col>);
}

export default Register;