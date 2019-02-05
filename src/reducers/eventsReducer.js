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
                eventsList: action.events,
                newEvent: false
            };
        case types.GET_EVENTS_FAILURE:
            console.log('GET_EVENTS_FAILURE')
            return {
                ...state,
                error: action.error
            };
        case types.CREATE_EVENT_REQUEST:
            console.log('CREATE_EVENT_REQUEST')
            return {
                ...state,
                pendingNewEvent: true,
                newEvent: false
            };
        case types.CREATE_EVENT_SUCCESS:
            console.log('CREATE_EVENT_SUCCESS')
            return {
                ...state,
                pendingNewEvent: false,
                newEvent: true
            };
        case types.CREATE_EVENT_FAILURE:
            console.log('CREATE_EVENT_FAILURE')
            return {
                ...state,
                newEvent: false,
                pendingNewEvent: false,
                error: action.error
            };
        case types.EDIT_EVENT_REQUEST:
            console.log('EDIT_EVENT_REQUEST')
            return {
                ...state,
                pendingNewEvent: true,
                newEvent: false,
            };
        case types.EDIT_EVENT_SUCCESS:
            console.log('EDIT_EVENT_SUCCESS')
            return {
                ...state,
                pendingNewEvent: false,
                newEvent: true,
            };
        case types.EDIT_EVENT_FAILURE:
            console.log('EDIT_EVENT_FAILURE')
            return {
                ...state,
                newEvent: false,
                pendingNewEvent: false,
                error: action.error
            };
        default:
            return state;
    }
}