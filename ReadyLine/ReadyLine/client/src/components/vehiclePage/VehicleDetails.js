import { useState, useEffect } from "react";
import { Card, CardTitle, CardSubtitle, CardBody, CardText, Button } from "reactstrap";
import { deleteVehicle, getVehicleById } from "../../models/vehicleManager";


export default function VehicleDetails({ vehicleId, setAddedVehicle }) {
    const [vehicle, setVehicle] = useState(null)

    const getVehicleDetails = (id) => {
        getVehicleById(id).then(vehicle => setVehicle(vehicle));
    }

    useEffect(() => {
        if (vehicleId) {
            getVehicleDetails(vehicleId)
        }
    }, [vehicleId])

    if (!vehicle || vehicleId == 0) {
        return (
            <>
                <h2>Vehicle Details</h2>
                <p>Please choose a vehicle...</p>
            </>
        )
    }
    return (
        <>
            <h2>Vehicle Details</h2>
            <Card color="dark" key={vehicle.id} inverse>
                <CardBody>
                    <CardTitle tag="h4">
                        {vehicle.brand}
                    </CardTitle>
                    <p>Vehicle #: {vehicle.vehicleNumber}</p>
                    <p>Current Mileage: {vehicle.currentMileage}</p>
                    <p>Mileage Since Last PM Service: {vehicle.currentMileage - vehicle.mileageAtPMService}</p>
                    <Button color="light" onClick={() => {
                        deleteVehicle(vehicle.id).then(() => {
                            window.alert(`Vehicle ${vehicle.vehicleNumber} deleted succesfuly`)
                            setAddedVehicle(true)
                            vehicleId = 0
                        })

                    }}>
                        Delete Vehicle
                    </Button>
                </CardBody>
            </Card>
            <h4>Work Order History</h4>
            {vehicle?.reports?.map(report => <Card outline color="warning" key={report.id} style={{ marginBottom: '4px' }}>
                <CardBody>
                    <CardTitle tag="h5">
                        {report.dateCreated.split('T')[0]}
                    </CardTitle>
                    <CardSubtitle>
                        Completed: {report.dateCompleted ? report.dateCompleted.split('T')[0] : 'Open'}
                    </CardSubtitle>
                    <CardText>
                        Issue: {report.issue}
                    </CardText>
                </CardBody>
            </Card>)}
        </>
    )
}