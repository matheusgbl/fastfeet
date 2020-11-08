import { combineReducers } from 'redux';

import auth from './auth/reducer';
import deliveryman from './deliveryman/reducer';
import order from './order/reducer';

export default combineReducers({
  auth,
  deliveryman,
  order,
});
