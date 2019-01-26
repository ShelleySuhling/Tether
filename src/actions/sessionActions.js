import * as types from './actionTypes';
import * as firebaseAuth from '../firebase/auth'

export let requestSignIn = (email, password) => {
    return dispatch => {
        dispatch({ type: types.SIGNIN_REQUEST })
        firebaseAuth.signIn(email, password)
            .then((res) => {
                if (res.code) {
                    throw res
                }
                dispatch({ type: types.SIGNIN_SUCCESS, user: res.user })
            })
            .catch((error) => {
                dispatch({ type: types.SIGNIN_FAILURE, error: error.message })
            })
    }
}

export let requestSignOut = () => {
    return dispatch => {
        dispatch({ type: types.SIGNOUT_REQUEST })
        firebaseAuth.signOut()
            .then((res) => {
                dispatch({ type: types.SIGNOUT_SUCCESS })
            })
            .catch((error) => {
                dispatch({ type: types.SIGNOUT_FAILURE, error: error.message })
            })
    }
}

export let requestSignUp = (email, password) => {
    return dispatch => {
        dispatch({ type: types.SIGNUP_REQUEST })
        firebaseAuth.signUp(email, password)
            .then((res) => {
                if (res.code) {
                    throw res
                }
                dispatch({ type: types.SIGNUP_SUCCESS, user: res.user })
            })
            .catch((error) => {
                dispatch({ type: types.SIGNUP_FAILURE, error: error.message })
            })
    }
}

export let clearAuthErrors = () => {
    return dispatch => {
        dispatch({ type: types.CLEAR_ERROR })
    }
}
