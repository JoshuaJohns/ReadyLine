import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Table } from "reactstrap";
import { addClaim, getAllVehicles, putVehicle } from "../../models/vehicleManager";
import { CreateVehicle } from "./CreateVehicle";
import VehicleDetails from "./VehicleDetails";
import "./VehiclePage.css"


const VehicleList = () => {
    const [vehicles, setVehicles] = useState([]);
    const [vehicleId, setVehicleId] = useState(null);
    const [newVehicle, setNewVehicle] = useState(false);
    const [addedVehicle, setAddedVehicle] = useState(false);




    //Get Methods
    const getVehicles = () => {
        getAllVehicles().then(vehicles => setVehicles(vehicles));
        setAddedVehicle(false)
    }

    /*--------------------------------------------------------------*/
    //useEffect Methods
    useEffect(() => {
        getVehicles();
    }, []);
    useEffect(() => {
        getVehicles();
    }, [addedVehicle]);

    /*----------------------------------Buttons----------------------------------------------------*/
    const handleClaimButton = (event, vehicleId) => {
        event.preventDefault()
        const claimToSendToAPI = {
            vehicleId: vehicleId

        }

        return addClaim(claimToSendToAPI)
            .then((res) => {
                getVehicles()
            })
    }




    return (<>

        {
            newVehicle
                ?
                <CreateVehicle setNewVehicle={setNewVehicle} setAddedVehicle={setAddedVehicle} />

                :
                <Button color="dark" onClick={() => {
                    setNewVehicle(true);
                }}>
                    Add a Vehicle
                </Button>


        }
        <div className="vehiclePage-container">


            <Table className="vehiclePage-table">
                <thead className="homePage-shopList-thead">
                    <tr>
                        <th></th>
                        <th>Img</th>
                        <th>Type</th>
                        <th>Claimed</th>
                        <th>Vehicle Number</th>
                        <th>In Shop</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>

                    {vehicles.map((vehicle) => {
                        return <tr className="vehicle-tr" key={vehicle.id}>
                            <th className="vehicle-th" scope="row">

                            </th>
                            <td>
                                <img className="vehicle-img" src={vehicle.imageLocation} alt="image"></img>

                            </td>
                            <td>
                                <p>{vehicle?.vehicleType?.name}</p>

                            </td>
                            <td>
                                {
                                    vehicle.isClaimed
                                        ? <p className="vehiclePage-p-claimed">Claimed</p>

                                        : <Button color="success" onClick={(clickEvent) => {
                                            handleClaimButton(clickEvent, vehicle.id);
                                        }}>
                                            Claim
                                        </Button>
                                }

                            </td>
                            <td>
                                <p>{vehicle.vehicleNumber}</p>

                            </td>
                            <td>
                                {vehicle.isApproved
                                    ? <p>Approved</p>
                                    : <p>False</p>
                                }

                            </td>
                            <td>
                                <Button color="dark" onClick={() => {
                                    setVehicleId(vehicle.id);

                                    window.scrollTo({
                                        top: 0,
                                        left: 0,
                                        behavior: 'smooth'
                                    });
                                }}>
                                    Show Details
                                </Button>

                            </td>
                            <td></td>

                        </tr>

                    })}
                </tbody>

            </Table>
            <div className="vehiclePage-details-div">
                <VehicleDetails vehicleId={vehicleId} setAddedVehicle={setAddedVehicle} />
            </div>
        </div>



    </>)



}
export default VehicleList;