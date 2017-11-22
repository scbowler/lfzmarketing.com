import types from '../actions/types';

const DEFAULT_STATE = { auth: false, error: [], message: null, expired: null };

export default function(state = DEFAULT_STATE, action){
    switch(action.type){
        case types.SIGN_IN:
        case types.SIGN_UP:
            return { auth: true, error: [], message: null, expired: null };
        case types.SIGN_OUT:
            return {...state, auth: false, error: [], expired: null };
        case types.AUTH_ERROR:
            return {...state, auth: false, error: action.error };
        case types.EXPIRED_TOKEN:
            return { ...state, expired: true, message: action.payload };
        default:
            return state;
    }
}
