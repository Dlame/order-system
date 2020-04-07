import { combineReducers } from 'redux';

import user from './user/reducer';
import admin from './admin/reducer';
import shoppingCart from './cart/reducer';

export default combineReducers({ user, admin, shoppingCart });
