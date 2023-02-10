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
export const addClaim = (claim) => {
    return getToken().then((token) => {
        return fetch(`${_vehicleUrl}/claimVehicle`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(claim),
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else if (resp.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error(
                    "An unknown error occurred while trying to add claim.",
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
export const deleteClaim = (id) => {
    return getToken().then((token) => {
        return fetch(`${_vehicleUrl}/claim/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })
    });
};


export const putVehicle = (id, vehicle) => {
    return getToken().then((token) => {
        return fetch(`${_vehicleUrl}/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(vehicle)
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else if (res.status === 401) {
                    throw new Error("Unauthorized");
                } else {
                    throw new Error(
                        "An unknown error occurred while trying to put vehicle.",
                    );
                }
            });
    });
}
export const putVehicleIsInShop = (id, vehicle) => {
    return getToken().then((token) => {
        return fetch(`${_vehicleUrl}/pickup/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(vehicle)
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else if (res.status === 401) {
                    throw new Error("Unauthorized");
                } else {
                    throw new Error(
                        "An unknown error occurred while trying to put vehicle.IsInSop.",
                    );
                }
            });
    });
}