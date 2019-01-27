import * as types from './actionTypes';
import * as firebaseUsers from '../firebase/users'


export let getUserProfile = (uid) => {
    return dispatch => {
        dispatch({ type: types.GET_ACTIVE_USER_REQUEST })
        firebaseUsers.getUser(uid)
            .then((res) => {
                dispatch({ type: types.GET_ACTIVE_USER_SUCCESS, active_user: res })
            })
            .catch((err) => {
                dispatch({ type: types.GET_ACTIVE_USER_FAILURE, error: err })
            })
    }
}

export let requestUpdateUser = (user, uid) => {
    return dispatch => {
        dispatch({ type: types.UPDATE_USER_REQUEST })
        firebaseUsers.updateUser(user, uid)
            .then((res) => {
                dispatch({ type: types.UPDATE_USER_SUCCESS, active_user: res })
            })
            .catch((err) => {
                dispatch({ type: types.UPDATE_USER_FAILURE, error: err })
            })
    }
}
