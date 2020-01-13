import React from 'react';

import Panel from '../components/Site/Panel';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';

const Register: React.FC = () => {
    return (
        <div>
            <Panel title='Register an account'>
                <p>We require information from you in order to service your access to the site.  Please see the <Link to='/privacy'>privacy policy</Link> for details on why we need this information and what we do with it.  Please pay particular attention to the section on avatars.</p>

                <Form>
                </Form>
            </Panel>
        </div>);
}

export default Register;