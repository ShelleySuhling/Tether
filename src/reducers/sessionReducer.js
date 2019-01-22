import { SIGNOUT_REQUEST, SIGNOUT_SUCCESS, SIGNOUT_FAILURE, SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILURE } from '../actions/actionTypes';

export default function session(state = {}, action) {
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
                pending_signin: false,
                isAuthenticated: true
            };
        case SIGNIN_FAILURE:
            console.log('SIGNIN FAILURE')
            return {
                ...state,
                error: action.error,
                pending_signin: false,
                isAuthenticated: false,
            };
        case SIGNOUT_REQUEST:
            console.log('SIGNOUT REQUEST')
            return {
                ...state,
                pending_signout: true,
            };
        case SIGNOUT_SUCCESS:
            console.log('SIGNOUT SUCCESS')
            return {
                ...state,
                user: {},
                pending_signout: false,
                isAuthenticated: false,
            };
        case SIGNOUT_FAILURE:
            console.log('SIGNOUT FAILURE')
            return {
                ...state,
                error: action.session.error,
                pending_signout: false,
                isAuthenticated: state.isAuthenticated
            };
        default:
            return state;
    }
}