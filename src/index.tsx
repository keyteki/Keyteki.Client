import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { OidcProvider } from 'redux-oidc';

import App from './App';
import './i18n';
import store from './redux/store';
import userManager from './userManager';

import './index.scss';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-redux-toastr/src/styles/index.scss';

ReactDOM.render(
    <Provider store={store}>
        <OidcProvider store={store} userManager={userManager}>
            <App />
        </OidcProvider>
    </Provider>,
    document.getElementById('root')
);
