import firebase from '../firebase.js';

export let getUser = (uid) => {
    return firebase.firestore().collection("users").doc(uid).get()
        .then((d) => {
            return d.data()
        })
}

export let updateUser = (new_user_data, uid) => {
    let docRef = firebase.firestore().collection("users").doc(uid)
    return docRef.get().then((thisDoc) => {
        if (thisDoc.exists) {
            return docRef.update(new_user_data)
        }
    })
}