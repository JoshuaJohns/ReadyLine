import { useState, useEffect } from "react";
import { Card, CardTitle, CardSubtitle, CardBody, CardText, Button } from "reactstrap";
import { deleteVehicle, getVehicleById } from "../../models/vehicleManager";


export default function VehicleDetails({ vehicleId, setAddedVehicle, authorized }) {
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
            <Card className="vehicleDetails-card" color="dark" key={vehicle.id} inverse>
                <CardBody>
                    <CardTitle tag="h4">
                        {vehicle.brand}
                    </CardTitle>
                    <p><b className="vehicleDetails-card-b">Vehicle #:</b> {vehicle.vehicleNumber}</p>
                    <p><b className="vehicleDetails-card-b">Current Mileage:</b> {vehicle.currentMileage}</p>
                    <p><b className="vehicleDetails-card-b">Mileage Since Last PM Service:</b> {vehicle.currentMileage - vehicle.mileageAtPMService}</p>
                    <Button className="delete-vehicle" variant='custom' onClick={() => {
                        authorized
                            ?
                            <>

                                {deleteVehicle(vehicle.id).then(() => {
                                    setAddedVehicle(true)
                                    vehicleId = 0
                                    setVehicle(false)
                                    window.alert(`Vehicle ${vehicle.vehicleNumber} deleted succesfuly`)
                                })}
                            </>

                            :
                            alert("not Authorized")
                    }}>
                        Delete Vehicle
                    </Button>
                </CardBody>
            </Card>
            <h4>Work Order History</h4>
            {
                vehicle?.reports?.map(report => <Card outline color="warning" key={report.id} style={{ marginBottom: '4px' }}>
                    <CardBody>
                        <CardTitle tag="h5">
                            {report.dateCreated.split('T')[0]}
                        </CardTitle>
                        <CardSubtitle className="vehicleDetails-sub">
                            <b>Submitted By:</b>  {report?.user?.firstName} {report?.user?.lastName}
                        </CardSubtitle>
                        <CardSubtitle className="vehicleDetails-sub">
                            <b> Completed:</b> {report.dateCompleted ? report.dateCompleted.split('T')[0] : 'Open'}
                        </CardSubtitle >
                        <CardText className="vehicleDetails-text">
                            <b>Tags:</b>   {report?.tags?.map((tag) => {
                                return <li className="vehicleDetails-tagList" key={tag.id}>{tag.status}</li>
                            })}
                        </CardText>
                        <CardText className="vehicleDetails-text">
                            <b>Issue:</b> {report.issue}
                        </CardText>
                        <Card className="vehicleDetails-text">
                            <b>Mechanic's Notes:</b> <ol>  {report?.notes?.map((note) => {
                                return <li className="vehicleDetails-tagList" key={note.id}>{note.content}</li>
                            })}</ol>
                        </Card>
                    </CardBody>
                </Card>)
            }
        </>
    )
}