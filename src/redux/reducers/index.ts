import { combineReducers } from 'redux';

import api from './api';
import auth from './auth';
import init from './init';

const rootReducer = combineReducers({ api, auth, init });

export default rootReducer;
