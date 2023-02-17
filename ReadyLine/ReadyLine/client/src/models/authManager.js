import firebase from "firebase/app";
import "firebase/auth";
import { useNavigate } from "react-router-dom";

const _apiUrl = "/api/user";


const _doesUserExist = (firebaseUserId) => {
    return getToken().then((token) =>
        fetch(`${_apiUrl}/DoesUserExist/${firebaseUserId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => resp.ok));
};

const _saveUser = (user) => {
    return getToken().then((token) =>
        fetch(`${_apiUrl}/save`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else if (resp.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error(
                    "An unknown error occurred while trying to add User.",
                );
            }
        }));
};



export const getToken = () => firebase.auth().currentUser.getIdToken();


export const login = (email, pw) => {
    return firebase.auth().signInWithEmailAndPassword(email, pw)
        .then((signInResponse) => _doesUserExist(signInResponse.user.uid))
        .then((doesUserExist) => {
            if (!doesUserExist) {

                // If we couldn't find the user in our app's database, we should logout of firebase
                logout();

                throw new Error("Something's wrong. The user exists in firebase, but not in the application database.");
            }
        }).catch(err => {
            console.error(err);
            throw err;
        });
};


export const logout = () => {

    firebase.auth().signOut()

};


export const register = (user, password) => {
    return firebase.auth().createUserWithEmailAndPassword(user.email, password)
        .then((createResponse) => _saveUser({
            ...user,
            firebaseUserId: createResponse.user.uid
        }));

};


export const onLoginStatusChange = (onLoginStatusChangeHandler) => {
    firebase.auth().onAuthStateChanged((user) => {
        onLoginStatusChangeHandler(!!user);
    });
};