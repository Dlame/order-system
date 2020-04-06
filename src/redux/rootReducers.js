import { combineReducers } from 'redux';

import user from './user/reducer';
import admin from './admin/reducer';

export default combineReducers({ user, admin });
