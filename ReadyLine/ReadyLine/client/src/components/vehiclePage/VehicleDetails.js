import { useState, useEffect } from "react";
import { Card, CardTitle, CardSubtitle, CardBody, CardText } from "reactstrap";
import { getVehicleById } from "../../models/vehicleManager";


export default function VehicleDetails({ vehicleId }) {
    const [vehicle, setVehicle] = useState(null)

    const getVehicleDetails = (id) => {
        getVehicleById(id).then(vehicle => setVehicle(vehicle));
    }

    useEffect(() => {
        if (vehicleId) {
            getVehicleDetails(vehicleId)
        }
    }, [vehicleId])

    if (!vehicle) {
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
                    <p>Color: {vehicle.color}</p>
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
                        Description: {report.issue}
                    </CardText>
                </CardBody>
            </Card>)}
        </>
    )
}