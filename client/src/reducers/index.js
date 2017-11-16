import { combineReducers } from 'redux';
import marketing from './marketing_reducer';
import students from './student_reducer';

export default combineReducers({ marketing, students });
