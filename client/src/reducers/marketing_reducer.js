import types from '../actions/types';

const DEFAULT_STATE = { all: [], badData: [], found: 0, notFound: 0 };

export default function(state = DEFAULT_STATE, action){
    switch(action.type){
        case types.GET_MARKETING_DATA:
            return { 
                all: action.payload.data,
                badData: action.payload.badList,
                found: action.payload.data.length,
                notFound: action.payload.badList.length
            };
        default:
            return state;
    }
}
