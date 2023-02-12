import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, Table } from "reactstrap";
import { getAllUsers } from "../../models/userManager";
import { addClaim, getAllVehicles, putVehicle } from "../../models/vehicleManager";

import "./HomePage.css"


const EmployeeList = () => {
    const [users, setUsers] = useState([]);
    const [vehicleId, setVehicleId] = useState(null);
    const [newVehicle, setNewVehicle] = useState(false);
    const [addedVehicle, setAddedVehicle] = useState(false);
    const [basic, setBasic] = useState(false);

    const navigate = useNavigate()



    //Get Methods
    const getUsers = () => {
        getAllUsers().then(users => setUsers(users));

    }

    /*--------------------------------------------------------------*/
    //useEffect Methods
    useEffect(() => {
        getUsers();
    }, []);
    useEffect(() => {
        getUsers();
    }, [addedVehicle]);

    /*----------------------------------Buttons----------------------------------------------------*/
    const handleClaimButton = (event, vehicleId) => {
        event.preventDefault()
        const claimToSendToAPI = {
            vehicleId: vehicleId

        }

        return addClaim(claimToSendToAPI)
            .then((res) => {
                getUsers()
            })
    }




    return (<>


        <div className="homePage-employeeList-container">


            <Table className="homePage-employeeList-table">
                <thead className="homePage-employee-thead">
                    <tr>
                        <th></th>
                        <th>Img</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Job Title</th>
                        <th>Auth Level</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>

                    {users.map((user) => {
                        return <tr className="user-tr" key={user.id}>
                            <th className="user-th" scope="row">

                            </th>
                            <td>
                                <img className="homePage-user-img" src={user.imageUrl} alt="image"></img>

                            </td>
                            <td>
                                <p>{user.firstName} {user.lastName}</p>

                            </td>
                            <td>

                                {user.email}
                                {/* {
                                    user.isClaimed
                                    ? <p className="homePage-employeeList-p-claimed">Claimed</p>
                                    
                                    : <Button color="success" onClick={(clickEvent) => {
                                        handleClaimButton(clickEvent, user.id);
                                    }}>
                                    Claim
                                    </Button>
                                } */}

                            </td>
                            <td>
                                <p>{user.jobTitle}</p>

                            </td>
                            <td>
                                {
                                    user.userTypeId == 1
                                        ? <td>Basic</td>
                                        : <td>Admin</td>
                                }

                            </td>
                            <td>
                                <Button color="dark" onClick={() => {
                                    navigate(`/user/${user.id}`)
                                }}>
                                    View
                                </Button>

                            </td>
                            <td></td>

                        </tr>

                    })}
                </tbody>

            </Table>

        </div>



    </>)



}
export default EmployeeList;