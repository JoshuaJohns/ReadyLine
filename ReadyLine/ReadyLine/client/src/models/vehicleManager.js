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
export const getAllVehicleTypes = () => {
    return getToken().then((token) => {
        return fetch(`${_vehicleUrl}/types`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("An unknown error occurred while trying to get vehicle types.");
            }
        });
    });
};

export const getVehicleById = (id) => {
    return fetch(`${_vehicleUrl}/${id}`).then((res) => res.json());
}

export const addVehicle = (vehicle) => {
    return getToken().then((token) => {
        return fetch(_vehicleUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(vehicle),
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else if (resp.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error(
                    "An unknown error occurred while trying to add vehicle.",
                );
            }
        });
    });
};
export const deleteVehicle = (id) => {
    return getToken().then((token) => {
        return fetch(`${_vehicleUrl}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })
    });
};