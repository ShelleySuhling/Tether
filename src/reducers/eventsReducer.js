import * as types from '../actions/actionTypes';

export default function events(state = {}, action) {
    switch (action.type) {
        case types.GET_EVENTS_REQUEST:
            console.log('GET_EVENTS_REQUEST')
            return {
                ...state,
            };
        case types.GET_EVENTS_SUCCESS:
            console.log('GET_EVENTS_SUCCESS')
            return {
                ...state,
                eventsList: action.events
            };
        case types.GET_EVENTS_FAILURE:
            console.log('GET_EVENTS_FAILURE')
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
}