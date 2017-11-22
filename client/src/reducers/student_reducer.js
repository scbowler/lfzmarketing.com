import types from '../actions/types';

const DEFAULT_STATE = { all: [], count: 0, error: null };

export default function(state = DEFAULT_STATE, action){
    switch(action.type){
        case types.GET_STUDENT_LIST:
            return { all: action.payload.data, count: action.payload.data.length };
        case types.STUDENT_DATA_ERROR:
            return { ...state, error: action.error };
        case types.SIGN_IN:
        case types.SIGN_OUT:
            return { ...DEFAULT_STATE };
        default:
            return state;
    }
}
