import * as types from './actionTypes';
import * as firebaseEvents from '../firebase/events'

export let requestEvents = () => {
    return dispatch => {
        dispatch({ type: types.GET_EVENTS_REQUEST })

        firebaseEvents.getEvents()
            .then((res) => {
                dispatch({ type: types.GET_EVENTS_SUCCESS, events: res })
            })
            .catch((err) => {
                dispatch({ type: types.GET_EVENTS_FAILURE, error: err })
            })
    }
}
