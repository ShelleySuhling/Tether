import firebase from '../firebase.js';

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