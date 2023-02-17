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

export const getAllUsers = () => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("An unknown error occurred while trying to get users.");
            }
        });
    });
};
export const getAllUserTypes = () => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/userTypes`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("An unknown error occurred while trying to get userTypes.");
            }
        });
    });
};

export const putUserInfo = (id, user) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else if (res.status === 401) {
                    throw new Error("Unauthorized");
                } else {
                    throw new Error(
                        "An unknown error occurred while trying to put user.",
                    );
                }
            });
    });
}


export const getUserById = (id) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/userInfo/${id}`, {
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

