import types from '../actions/types';

const DEFAULT_STATE = { all: [], count: 0 };

export default function(state = DEFAULT_STATE, action){
    switch(action.type){
        case types.GET_STUDENT_LIST:
            return { all: action.payload.data, count: action.payload.data.length };
        default:
            return state;
    }
}
