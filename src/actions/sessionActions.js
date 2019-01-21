import * as types from './actionTypes';
import * as firebaseAuth from '../firebase/auth'

export let requestSignIn = (email, password) => {
    return dispatch => {
        dispatch({ type: types.SIGNIN_REQUEST })
        firebaseAuth.signIn(email, password)
            .then((res) => {
                dispatch({ type: types.SIGNIN_SUCCESS, user: res.user })
                return true
            })
            .catch((error) => {
                dispatch({ type: types.SIGNIN_FAILURE, error: error })
                return false
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
                dispatch({ type: types.SIGNOUT_FAILURE, error: error })
            })
    }
}