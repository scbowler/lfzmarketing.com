import axios from 'axios';
import types from './types';

export function getStudentList(){
    return dispatch => {
        axios.get('/api/student-list').then( resp => {

            dispatch({
                type: types.GET_STUDENT_LIST,
                payload: resp.data
            });
        }).catch( err => {
            console.warn('ERROR FETCHING STUDENT LIST', err);
        });
    }
}

export function getMarketingData(){
    return dispatch => {
        axios.get('/api/marketing-data').then( resp => {

            dispatch({
                type: types.GET_MARKETING_DATA,
                payload: resp.data
            });
        }).catch( err => {
            console.warn('ERROR FETCHING MARKETING DATA', err);
        });
    }
}
