import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Table } from "reactstrap";
import { getCurrentUserInfo } from "../../models/userManager";
import { addClaim, getAllVehicles, putVehicle } from "../../models/vehicleManager";
import { CreateVehicle } from "./CreateVehicle";
import VehicleDetails from "./VehicleDetails";
import "./VehiclePage.css"



const VehicleList = (terms) => {
    const [vehicles, setVehicles] = useState([]);
    const [filteredVehicles, setFilteredVehicles] = useState([]);
    const [vehicleId, setVehicleId] = useState(null);
    const [newVehicle, setNewVehicle] = useState(false);
    const [addedVehicle, setAddedVehicle] = useState(false);
    const [authorized, setAuthorized] = useState(false);
    const [searchTerm, setSeach] = useState('');
    const [currentUser, setCurrentUser] = useState({});




    //Get Methods
    const getVehicles = () => {
        getAllVehicles().then(vehicles => setVehicles(vehicles));
        setAddedVehicle(false)
    }
    const getUser = () => {
        getCurrentUserInfo().then((user) => {
            setCurrentUser(user)
            if (user.userTypeId == 2) {
                setAuthorized(true)
            }

        }
        )
    }

    /*--------------------------------------------------------------*/
    //useEffect Methods
    useEffect(() => {
        getVehicles();
        getUser();
    }, []);
    useEffect(() => {
        getVehicles();
    }, [addedVehicle]);

    useEffect(
        () => {
            const searchedVehicles = vehicles.filter(vehicle => {
                return vehicle.vehicleNumber.toLowerCase().startsWith(searchTerm.toLowerCase())
            })
            setFilteredVehicles(searchedVehicles)
        }, [searchTerm, vehicles]
    )
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



    return (<div className="vehiclePage-body">

        {
            newVehicle
                ?
                <CreateVehicle setNewVehicle={setNewVehicle} setAddedVehicle={setAddedVehicle} />

                :

                <div className="vehiclePage-addBtn">
                    <Button color="dark" className="addVehicle-btn" onClick={() => {
                        authorized
                            ?
                            setNewVehicle(true)
                            :
                            alert("not Authorized")
                    }}>
                        Add a Vehicle
                    </Button>

                </div>


        }
        <div className="vehiclePage-details-div">
            <VehicleDetails vehicleId={vehicleId} setAddedVehicle={setAddedVehicle} authorized={authorized} />
        </div>
        <div className="vehiclePage-container">
            <div className="vehiclePage-search-div">
                <input

                    className="input-find"
                    onChange={
                        (event) => {
                            setSeach(event.target.value)
                        }
                    }
                    type="text" placeholder="Search by Vehicle #" />

            </div>
            <div>
                <Table className="vehiclePage-table">
                    <thead className="homePage-shopList-thead">
                        <tr>
                            <th></th>
                            <th>Img</th>
                            <th>Type</th>
                            <th>Claim</th>
                            <th>Vehicle Number</th>
                            <th>In Shop</th>
                            <th></th>

                        </tr>
                    </thead>

                    <tbody>

                        {filteredVehicles.map((vehicle) => {
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
                                    <p className="vehicleList-vehicleNumber">{vehicle.vehicleNumber}</p>

                                </td>
                                <td>
                                    {vehicle.isInShop
                                        ? <p className="inShop-true">True</p>
                                        : <p className="inShop-false">False</p>
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


                            </tr>

                        })}
                    </tbody>

                </Table>
            </div>




        </div>



    </div>)



}

export default VehicleList;