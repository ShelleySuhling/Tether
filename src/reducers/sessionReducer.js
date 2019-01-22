import * as types from '../actions/actionTypes';

export default function session(state = {}, action) {
    switch (action.type) {
        case types.SIGNIN_REQUEST:
            console.log('SIGNIN REQUEST')
            return {
                ...state,
                pending_signin: true,
                error: ""
            };
        case types.SIGNIN_SUCCESS:
            console.log('SIGNIN SUCCESS')
            return {
                ...state,
                user: action.user,
                pending_signin: false,
                isAuthenticated: true,
                error: "",
            };
        case types.SIGNIN_FAILURE:
            console.log('SIGNIN FAILURE')
            return {
                ...state,
                error: action.error,
                pending_signin: false,
                isAuthenticated: false,
            };
        case types.SIGNOUT_REQUEST:
            console.log('SIGNOUT REQUEST')
            return {
                ...state,
                pending_signout: true,
                error: "",
            };
        case types.SIGNOUT_SUCCESS:
            console.log('SIGNOUT SUCCESS')
            return {
                ...state,
                user: {},
                pending_signout: false,
                isAuthenticated: false,
                error: "",
            };
        case types.SIGNOUT_FAILURE:
            console.log('SIGNOUT FAILURE')
            return {
                ...state,
                error: action.error,
                pending_signout: false,
                isAuthenticated: state.isAuthenticated
            };
        case types.SIGNUP_REQUEST:
            console.log('SIGNUP REQUEST')
            return {
                ...state,
                pending_signup: true,
            };
        case types.SIGNUP_SUCCESS:
            console.log('SIGNUP SUCCESS')
            return {
                ...state,
                user: action.user,
                pending_signup: false,
                isAuthenticated: false,
            };
        case types.SIGNUP_FAILURE:
            console.log('SIGNUP FAILURE')
            return {
                ...state,
                error: action.error,
                pending_signup: false,
                isAuthenticated: state.isAuthenticated
            };
        case types.CLEAR_ERROR:
            console.log('CLEAR_ERROR')
            return {
                ...state,
                error: "",
            };
        default:
            return state;
    }
}