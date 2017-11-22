import types from '../actions/types';

const DEFAULT_STATE = { all: [], badData: [], found: 0, notFound: 0, error: null };

export default function(state = DEFAULT_STATE, action){
    switch(action.type){
        case types.GET_MARKETING_DATA:
            return { 
                all: action.payload.data,
                badData: action.payload.badList,
                found: action.payload.data.length,
                notFound: action.payload.badList.length,
                error: null
            };
        case types.MARKETING_DATA_ERROR:
            return {...state, error: action.error };
        case types.SIGN_IN:
        case types.SIGN_OUT:
            return { ...DEFAULT_STATE };
        default:
            return state;
    }
}
