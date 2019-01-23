import firebase from '../firebase.js';

export let signIn = (email, password) => {
    return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then((res) => {
                return res
            })
            .catch((error) => {
                return error
            });
    })
}

export let signOut = () => {
    return firebase.auth().signOut()
        .then(res => {
            return res
        })
        .catch(error => {
            return error
        })
}

export let signUp = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((res) => {
            return res
        })
        .catch((error) => {
            return error
        })
}

export let getCurrentUser = () => {
    console.log(firebase.auth().currentUser)
}
