import initialState from './initialState';
import { SIGNIN, SIGNOUT_REQUEST, SIGNOUT_SUCCESS, SIGNOUT_FAILURE, SIGNIN_REQUEST, SIGNIN_SUCCESS } from '../actions/actionTypes';

export default function session(state = {}, action) {
    console.log('*****', action, state)
    switch (action.type) {
        case SIGNIN_REQUEST:
            console.log('SIGNIN REQUEST')
            return {
                ...state,
                pending_signin: true
            };
        case SIGNIN_SUCCESS:
            console.log('SIGNIN SUCCESS')
            return {
                ...state,
                user: action.user,
                pending_signin: false
            };
        case SIGNOUT_FAILURE:
            console.log('SIGNIN FAILURE')
            return {
                ...state,
                error: action.error,
                pending_signin: false,
            };
        case SIGNOUT_REQUEST:
            console.log('SIGNOUT request')
            return {
                ...state,
                pending_signout: true,
            };
        case SIGNOUT_SUCCESS:
            console.log('SIGNOUT request')
            return {
                ...state,
                user: {},
                pending_signout: false,
            };
        case SIGNOUT_FAILURE:
            console.log('SIGNOUT request')
            return {
                ...state,
                error: action.session.error,
                pending_signout: false,
            };
        default:
            return state;
    }
}