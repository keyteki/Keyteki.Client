import React from 'react';
import { Col, Form, Button } from 'react-bootstrap';
import Panel from '../components/Site/Panel';

const Login: React.FC = () => {
    return (
        <Col md={{ span: 6, offset: 3 }}>
            <Panel title='Login'>
                <p></p>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId='formGridUsername'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type='text' placeholder='Enter your username' />
                        </Form.Group>
                        <Form.Group as={Col} controlId='formGridPassword'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder='Enter your password' />
                        </Form.Group>
                    </Form.Row>

                    <div className='text-center'>
                        <Button variant='primary' type='button'>
                            Login
                        </Button>
                    </div>
                </Form>
            </Panel>
        </Col>
    );
};

export default Login;
