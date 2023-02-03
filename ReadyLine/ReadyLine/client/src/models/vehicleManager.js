import { getToken } from "./authManager";

const _vehicleUrl = "/api/vehicle";

export const getAllVehicles = () => {
    return getToken().then((token) => {
        return fetch(`${_vehicleUrl}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("An unknown error occurred while trying to get vehicles.");
            }
        });
    });
};

export const getVehicleById = (id) => {
    return fetch(`${_vehicleUrl}/${id}`).then((res) => res.json());
}