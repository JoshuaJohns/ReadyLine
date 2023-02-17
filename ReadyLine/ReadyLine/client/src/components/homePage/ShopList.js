import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, CardImg, CardImgOverlay, CardText, Table, } from "reactstrap";
import { getAllReports } from "../../models/reportManager";
import { getCurrentUserInfo } from "../../models/userManager";
import { deleteClaim, getAllVehicles, putVehicle, putVehicleIsInShop } from "../../models/vehicleManager";
import EmployeeList from "./EmployeeList";
import "./HomePage.css"

const ShopList = () => {
    const [vehicles, setVehicles] = useState([]);
    const [filteredVehicles, setfilteredVehicles] = useState([]);
    const [user, setUser] = useState([]);
    const [authorized, setAuthorized] = useState(false);
    const navigate = useNavigate()

    //Get Methods
    const getVehicles = () => {
        getAllVehicles().then(vehicles => setVehicles(vehicles));
    }
    const getUser = () => {
        getCurrentUserInfo().then((user) => {
            setUser(user)
            if (user.userTypeId == 2) {
                setAuthorized(true)
            }

        });
    }

    /*--------------------------------------------------------------*/
    //useEffect Methods
    useEffect(() => {
        getVehicles();
        getUser();
    }, []);



    /*----------------------------------Buttons----------------------------------------------------*/
    const handleUpdateButton = (event, vehicle) => {
        event.preventDefault()

        return putVehicleIsInShop(vehicle.id, vehicle)
            .then((res) => {
                getVehicles()
            })
    }
    const handleUnClaimButton = (event, vehicleId) => {
        event.preventDefault()
        const claimToSendToAPI = {
            vehicleId: vehicleId

        }

        return deleteClaim(vehicleId)
            .then((res) => {
                getUser()
            })
    }







    //Grab onlt vehicles that are ready for pick up
    let filtered = vehicles.filter(p => p.isApproved == true && p.isInShop == true)

    //Get number of vehicles
    let count = 0
    filtered.map((vehicle) => {
        count++
    })


    return (<>

        {
            authorized

                ?
                <div className="homePage-readyLine-container">
                    <div className="homePage-readyLine-div">
                        <div className="homePage-count-div">
                            <h1>Ready Line</h1>
                            <h3 className="homePage-count-h3">Count: {count}</h3>

                        </div>
                        <Table className="homePage-readyLine-table">
                            <tbody>
                                {
                                    filtered.map((vehicle) => {
                                        return <tr className="home-readyLine-tr" key={vehicle.id}>
                                            <th className="home-readyLine-th" scope="row">

                                            </th>
                                            <td>
                                                <img className="home-readyLine-img" src={vehicle.imageLocation} alt="image"></img>

                                            </td>
                                            <td>
                                                <p className="home-readyLine-type">{vehicle?.vehicleType?.name}</p>

                                            </td>

                                            <td>
                                                <p className="home-readyLine-number">{vehicle.vehicleNumber}</p>

                                            </td>
                                            <td>
                                                <Button color="success" className="home-readyLine-pickedUp" onClick={(clickEvent) => {
                                                    handleUpdateButton(clickEvent, vehicle);
                                                }}>
                                                    Vehicle Picked Up
                                                </Button>
                                            </td>
                                            <td></td>

                                        </tr>

                                    })}
                            </tbody>

                        </Table>

                    </div>
                    <div className="homePage-readyLine-div">
                        <h2 className="yourVehicle-h2">Your Vehicle(s)...</h2>
                        <div className="vehiclePage-container-home">
                            <div className="homePage-shopList-div">
                                {user?.vehicles?.map((vehicle) => {
                                    let mileageUntilPmService = 10000 - (vehicle.currentMileage - vehicle.mileageAtPMService)
                                    return <Card className="homePage-vehicle-card" key={vehicle.id}>
                                        <CardBody className="homePage-vehicle-cardBody">
                                            <p className="homePage-vehicle-pmService">{mileageUntilPmService}mi until next PM Service</p>
                                            <img className="homePage-vehicle-img" src={vehicle.imageLocation} alt="image"></img>
                                            <p className="homePage-vehicle-p"><b>Number:</b> {vehicle.vehicleNumber}</p>
                                            <p className="homePage-vehicle-p"><b>Type:</b> {vehicle?.vehicleType?.name}</p>
                                            <p className="homePage-vehicle-p"><b>Current Mileage:</b> {vehicle.currentMileage}mi</p>

                                            <Button color="danger" onClick={(clickEvent) => {
                                                handleUnClaimButton(clickEvent, vehicle.id);
                                            }}>
                                                UnClaim
                                            </Button>
                                            <Button color="dark" className="homePage-edit-vehicle" onClick={() => {
                                                navigate(`vehicle/${vehicle.id}`)
                                            }}>
                                                Edit
                                            </Button>
                                        </CardBody>
                                    </Card>

                                })}
                            </div>
                        </div>
                    </div>

                </div>
                :

                <div className="homePage-readyLine-div">
                    <h2 className="yourVehicle-h2">Your Vehicle(s)...</h2>
                    <div className="vehiclePage-container-home">
                        <div className="homePage-shopList-div">
                            {user?.vehicles?.map((vehicle) => {
                                let mileageUntilPmService = 10000 - (vehicle.currentMileage - vehicle.mileageAtPMService)
                                return <Card className="homePage-vehicle-card" key={vehicle.id}>
                                    <CardBody className="homePage-vehicle-cardBody">
                                        <p className="homePage-vehicle-pmService">{mileageUntilPmService}mi until next PM Service</p>
                                        <img className="homePage-vehicle-img" src={vehicle.imageLocation} alt="image"></img>
                                        <p className="homePage-vehicle-p"><b>Number:</b> {vehicle.vehicleNumber}</p>
                                        <p className="homePage-vehicle-p"><b>Type:</b> {vehicle?.vehicleType?.name}</p>
                                        <p className="homePage-vehicle-p"><b>Current Mileage:</b> {vehicle.currentMileage}mi</p>

                                        <Button color="danger" onClick={(clickEvent) => {
                                            handleUnClaimButton(clickEvent, vehicle.id);
                                        }}>
                                            UnClaim
                                        </Button>
                                        <Button color="dark" className="homePage-edit-vehicle" onClick={() => {
                                            navigate(`vehicle/${vehicle.id}`)
                                        }}>
                                            Edit
                                        </Button>
                                    </CardBody>
                                </Card>

                            })}
                        </div>
                    </div>

                    <div className="homePage-readyLine-container">
                        <div className="homePage-readyLine-div">
                            <div className="homePage-count-div">
                                <h1>Ready Line</h1>
                                <h3 className="homePage-count-h3">Count: {count}</h3>

                            </div>
                            <Table className="homePage-readyLine-table">
                                <tbody>
                                    {
                                        filtered.map((vehicle) => {
                                            return <tr className="home-readyLine-tr" key={vehicle.id}>
                                                <th className="home-readyLine-th" scope="row">

                                                </th>
                                                <td>
                                                    <img className="home-readyLine-img" src={vehicle.imageLocation} alt="image"></img>

                                                </td>
                                                <td>
                                                    <p className="home-readyLine-type">{vehicle?.vehicleType?.name}</p>

                                                </td>

                                                <td>
                                                    <p className="home-readyLine-number">{vehicle.vehicleNumber}</p>

                                                </td>
                                                <td>
                                                    <Button color="success" className="home-readyLine-pickedUp" onClick={(clickEvent) => {
                                                        handleUpdateButton(clickEvent, vehicle);
                                                    }}>
                                                        Vehicle Picked Up
                                                    </Button>
                                                </td>
                                                <td></td>

                                            </tr>

                                        })}
                                </tbody>

                            </Table>


                        </div>
                    </div>
                </div>
        }




        <div className="homePage-container">

            <Card inverse className="homePage-userInfo-Card">
                <CardImg
                    alt="Card image cap"
                    className="homePage-userCardImg"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkN91T05BSap40oh_WG660xtR862r2HzgRasoIOhrBLpvHfPjA9asS7Nknn2zZ85b_HTE&usqp=CAU"
                    style={{
                        height: 270

                    }}

                />
                <CardImgOverlay>

                    <CardBody className="homePage-userCardBody">
                        <CardText className="homePage-userLi">{user.firstName} {user.lastName}</CardText>
                        <CardText className="homePage-userLi">{user.email}</CardText>
                        <CardText className="homePage-userLi">{user.jobTitle}</CardText>
                        <CardText className="homePage-userLi"></CardText>
                        <CardText className="homePage-userLi"></CardText>
                    </CardBody>



                    <img
                        className="hompage-userImg"
                        alt="Card cap"
                        src={user.imageUrl}

                    />


                </CardImgOverlay>
            </Card>

            <div className="homePage-employeeList-Container">

                <EmployeeList />
            </div>

        </div>





    </>)


}
export default ShopList;