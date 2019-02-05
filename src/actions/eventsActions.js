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

export let requestCreateEvent = (event) => {
    return dispatch => {
        dispatch({ type: types.CREATE_EVENT_REQUEST })

        firebaseEvents.createNewEvent(event)
            .then(function (docRef) {
                dispatch({ type: types.CREATE_EVENT_SUCCESS })
                requestEvents()
            })
            .catch(function (error) {
                dispatch({ type: types.CREATE_EVENT_FAILURE, error: error })
            });
    }
}


export let requestEditEvent = (event) => {
    return dispatch => {
        dispatch({ type: types.EDIT_EVENT_REQUEST })

        firebaseEvents.editEvent(event)
            .then(function (docRef) {
                dispatch({ type: types.EDIT_EVENT_SUCCESS })
                requestEvents()
            })
            .catch(function (error) {
                dispatch({ type: types.EDIT_EVENT_FAILURE, error: error })
            });
    }
}

