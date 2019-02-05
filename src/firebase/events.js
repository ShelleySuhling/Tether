import firebase from '../firebase.js';
import moment from 'moment'

let makeEvent = (event) => {
    //This part is an absolute mess, I plan on fixing it later
    let startTimeConstruct = new Date(event.date)
    let endTimeConstruct = new Date(event.date)

    startTimeConstruct.setHours(event.start_time.hours())
    endTimeConstruct.setHours(event.end_time.hours())

    startTimeConstruct.setMinutes(event.start_time.minutes())
    endTimeConstruct.setMinutes(event.end_time.minutes())

    return {
        title: event.title,
        location: event.location,
        startTime: startTimeConstruct,
        endTime: endTimeConstruct,
        isMandatory: event.isMandatory,
    }
}

export let getEvents = () => {
    return firebase.firestore().collection("events").get()
        .then(querySnapshot => {
            let allEvents = []
            querySnapshot.docs.forEach(doc => {
                allEvents.push({
                    ...doc.data(),
                    startTime: moment(doc.data().startTime.toDate()),
                    endTime: moment(doc.data().endTime.toDate()),
                    id: doc.id
                })
            })
            return allEvents
        })
}

export let createNewEvent = (event) => {
    return firebase.firestore().collection("events").add(makeEvent(event)).then(res => {
        return res
    })
}

export let editEvent = (event) => {
    return firebase.firestore().collection("events").doc(event.id).set(makeEvent(event))
        .then(res => {
            return res
        })
}