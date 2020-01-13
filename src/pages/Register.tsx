import React, { Component, ReactElement } from 'react';

import Panel from '../components/Site/Panel';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';

class Register extends Component<{}, {}> {
    render(): ReactElement {
        return (
            <div className='col-md-8 col-md-offset-2'>
                <Panel title='Register an account'>
                    <p>We require information from you in order to service your access to the site.  Please see the <Link to='/privacy'>privacy policy</Link> for details on why we need this information and what we do with it.  Please pay particular attention to the section on avatars.</p>

                    <Form>
                    </Form>
                </Panel>
            </div>);
    }
  }

  export default Register;