import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';

import api from './api';
import auth from './auth';
import init from './init';

const rootReducer = combineReducers({ api, auth, init, toastr: toastrReducer });

export default rootReducer;
