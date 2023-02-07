import firebase from "firebase/app";
import "firebase/auth";
import { getToken } from "./authManager";

const _apiUrl = "/api/user";

export const getCurrentUserInfo = () => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/currentUser`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("An unknown error occurred while trying to get user info.");
            }
        });
    });
};