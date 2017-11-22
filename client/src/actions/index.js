import axios from 'axios';
import types from './types';

export function getStudentList(){
    return dispatch => {
        axios.get('/api/student-list', {headers: {authorization: localStorage.token}}).then( resp => {

            if(resp.data.expired){
                return dispatch({type: types.EXPIRED_TOKEN, payload: resp.data.msg});
            }

            dispatch({
                type: types.GET_STUDENT_LIST,
                payload: resp.data
            });
        }).catch( err => {
            dispatch({
                type: types.STUDENT_DATA_ERROR,
                error: 'No data available. Are you logged in?'
            });
        });
    }
}

export function getMarketingData(){
    return dispatch => {
        axios.get('/api/marketing-data', {headers: {authorization: localStorage.token}}).then( resp => {

            if(resp.data.expired){
                return dispatch({type: types.EXPIRED_TOKEN, payload: resp.data.msg});
            }

            dispatch({
                type: types.GET_MARKETING_DATA,
                payload: resp.data
            });
        }).catch( err => {
            dispatch({
                type: types.MARKETING_DATA_ERROR,
                error: 'No data available. Are you logged in?'
            });
        });
    }
}

export function signIn(cred){
    return dispatch => {
        axios.post('/auth/sign-in', cred).then(resp => {
            
            localStorage.setItem('token', resp.data.token);

            dispatch({ type: types.SIGN_IN });
        }).catch(err => {
            sendAuthError(dispatch, ['Invalid email and or password']);
        });
    }
}

export function signUp(cred){
    return dispatch => {
        axios.post('/auth/sign-up', cred).then(resp => {

            localStorage.setItem('token', resp.data.token);

            dispatch({ type: types.SIGN_UP });
        }).catch(err => {
            if(err.response){
                sendAuthError(dispatch, err.response.data.errors);
            }
        });
    }
}

export function signOut(){
    
    localStorage.removeItem('token');

    return {
        type: types.SIGN_OUT
    }
}

export function clearAuthErrors(){
    return {
        type: types.CLEAR_AUTH_ERRORS
    }
}

function sendAuthError(dispatch, error){
    dispatch({
        type: types.AUTH_ERROR,
        error
    });
}
