import { getToken } from "./authManager";

const _tagUrl = "/api/tag";

export const getAllTags = () => {
    return getToken().then((token) => {
        return fetch(`${_tagUrl}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("An unknown error occurred while trying to get tags.");
            }
        });
    });
};

export const addReportTag = (tagId, reportId) => {
    return getToken().then((token) => {
        return fetch(`${_tagUrl}/${tagId}/${reportId}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else if (resp.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error(
                    "An unknown error occurred while trying to add reportTag.",
                );
            }
        });
    });
};