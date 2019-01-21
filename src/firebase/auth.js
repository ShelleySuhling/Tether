import firebase from '../firebase.js';

export let signIn = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then((res) => {
            return res
        })
        .catch((error) => {
            return error
        });
}

export let signOut = () => {
    console.log("Firebase/auth.js  signOUt")
    return firebase.auth().signOut()
        .then(res => {
            return res
        })
        .catch(error => {
            return error
        })
}

export let getCurrentUser = () => {
    var user = firebase.auth().currentUser;
    if (user) {
        console.log(user)
    } else {
        console.log('no one signed in')
    }
    return user
}
