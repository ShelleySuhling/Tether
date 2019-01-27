import * as types from '../actions/actionTypes';

export default function users(state = {}, action) {
    switch (action.type) {
        case types.GET_ACTIVE_USER_REQUEST:
            console.log('GET_ACTIVE_USER_REQUEST')
            return {
                ...state,
                pending_user: true,
            };
        case types.GET_ACTIVE_USER_SUCCESS:
            console.log('GET_ACTIVE_USER_SUCCESS')
            return {
                ...state,
                active_user: action.active_user,
                pending_user: false,
            };
        case types.GET_ACTIVE_USER_FAILURE:
            console.log('GET_ACTIVE_USER_FAILURE')
            return {
                ...state,
                error: action.error,
                pending_user: false,
            };
        case types.UPDATE_USER_REQUEST:
            console.log('UPDATE_USER_REQUEST')
            return {
                ...state,
                pending_user: true,
            };
        case types.UPDATE_USER_SUCCESS:
            console.log('UPDATE_USER_SUCCESS')
            return {
                ...state,
                pending_user: false,
            };
        case types.UPDATE_USER_FAILURE:
            console.log('UPDATE_USER_FAILURE')
            return {
                ...state,
                error: action.error,
                pending_user: false,
            };
        default:
            return state;
    }
}