import { getToken } from "./authManager";

const _reportUrl = "/api/report";

export const getAllReports = () => {
    return getToken().then((token) => {
        return fetch(`${_reportUrl}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("An unknown error occurred while trying to get reports.");
            }
        });
    });
};