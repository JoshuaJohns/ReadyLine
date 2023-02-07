import React, { useEffect, useState } from "react";
import { Button, Card, CardBody } from "reactstrap";
import { getAllVehicles } from "../../models/vehicleManager";
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
            <div className="homePage-shopList-div">
                {vehicles.map((vehicle) => {
                    return <Card className="vehicle-card" key={vehicle.id}>
                        <CardBody className="vehicle-cardBody">
                            <img className="vehicle-img" src={vehicle.imageLocation} alt="image"></img>
                            <p>{vehicle?.vehicleType?.name}</p>
                            {
                                vehicle.isClaimed
                                    ? <p>Yes</p> : <p>No</p>
                            }
                            <p>{vehicle.vehicleNumber}</p>
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
                        </CardBody>
                    </Card>

                })}
            </div>
            <div>
                <VehicleDetails vehicleId={vehicleId} setAddedVehicle={setAddedVehicle} />
            </div>


        </div>

    </>)



}
export default VehicleList;