import * as types from './actionTypes';
import firebase from '../firebase.js';
import * as firebaseAuth from '../firebase/auth'
import { history } from 'react-router-dom'
import { SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILURE, SIGNOUT_REQUEST, SIGNOUT_SUCCESS, SIGNOUT_FAILURE } from '../actions/actionTypes';

export let requestSignIn = (email, password) => {
    console.log('requestSignIn')
    return dispatch => {
        dispatch({ type: types.SIGNIN_REQUEST })
        firebaseAuth.signIn(email, password)
            .then((res) => {
                console.log('SIGNIN SUCCESS', res.user)
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
    console.log('requestSignOut')
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