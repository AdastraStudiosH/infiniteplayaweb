import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { authReducer } from './auth/auth.reducer';
import { userReducer } from './user/user.reducer';

export default combineReducers({
  routing: routerReducer,
  auth: authReducer,
  user: userReducer
})