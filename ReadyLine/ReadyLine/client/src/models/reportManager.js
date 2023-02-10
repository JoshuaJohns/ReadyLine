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
export const getAllCategories = () => {
    return getToken().then((token) => {
        return fetch(`${_reportUrl}/categories`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("An unknown error occurred while trying to get categories.");
            }
        });
    });
};

export const addReport = (report) => {
    return getToken().then((token) => {
        return fetch(_reportUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(report),
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else if (resp.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error(
                    "An unknown error occurred while trying to add Report.",
                );
            }
        });
    });
};

export const getReportById = (id) => {
    return fetch(`${_reportUrl}/${id}`).then((res) => res.json());
}

export const putReport = (id, report) => {
    return getToken().then((token) => {
        return fetch(`${_reportUrl}/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(report)
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else if (res.status === 401) {
                    throw new Error("Unauthorized");
                } else {
                    throw new Error(
                        "An unknown error occurred while trying to put report.",
                    );
                }
            });
    });
}

