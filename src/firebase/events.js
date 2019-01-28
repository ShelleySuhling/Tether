import firebase from '../firebase.js';
import moment from 'moment';

export let getEvents = () => {
    return firebase.firestore().collection("events").get()
        .then(querySnapshot => {
            let allEvents = []
            querySnapshot.docs.forEach(doc => {
                allEvents.push(doc.data())
            })
            return allEvents
        })
}

export let createNewEvent = (event) => {

    console.log(event.date)
    console.log(event.date.hours(event.startTime.hours()))


    return firebase.firestore().collection("events").add({
        title: event.title,
        location: event.location,
        startTime: new Date(event.date.hours(event.startTime.hours())),
        endTime: new Date(event.date.hours(event.endTime.hours())),
    }).then(res => {
        return res
    })
}