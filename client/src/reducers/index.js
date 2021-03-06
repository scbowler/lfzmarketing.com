import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import marketing from './marketing_reducer';
import students from './student_reducer';
import user from './user_reducer';

export default combineReducers({ marketing, students, user, form });
