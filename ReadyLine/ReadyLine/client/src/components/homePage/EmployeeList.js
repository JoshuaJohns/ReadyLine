import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, Table } from "reactstrap";
import { getAllUsers } from "../../models/userManager";
import { addClaim, getAllVehicles, putVehicle } from "../../models/vehicleManager";

import "./HomePage.css"


const EmployeeList = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [vehicleId, setVehicleId] = useState(null);
    const [newVehicle, setNewVehicle] = useState(false);
    const [addedVehicle, setAddedVehicle] = useState(false);
    const [basic, setBasic] = useState(false);
    const [searchTerm, setSeach] = useState('');

    const navigate = useNavigate()



    //Get Methods
    const getUsers = () => {
        getAllUsers().then(users => {
            users.map((user) => {
                user.fullName = (`${user.firstName} ${user.lastName}`)
            })
            setUsers(users)
        });

    }

    /*--------------------------------------------------------------*/
    //useEffect Methods
    useEffect(() => {
        getUsers();
    }, []);
    useEffect(() => {
        getUsers();
    }, [addedVehicle]);

    useEffect(
        () => {
            const searchedUser = users.filter(user => {
                return user.fullName.toLowerCase().startsWith(searchTerm.toLowerCase())
            })
            setFilteredUsers(searchedUser)
        }, [searchTerm, users])

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
            <div className="employeeList-search-div">

                <h3 className="employeeList-h3">Employees</h3>
            </div>
            <input className="input-find-home"
                onChange={
                    (event) => {
                        setSeach(event.target.value)
                    }
                }
                type="text" placeholder="Search by Name" />



            <Table className="homePage-employeeList-table">
                <thead className="homePage-employee-thead">
                    <tr>
                        <th></th>
                        <th>Img</th>
                        <th>Name</th>
                        <th>Email</th>

                        <th>Auth Level</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>

                    {filteredUsers.map((user) => {
                        return <tr className="user-tr" key={user.id}>
                            <th className="user-th" scope="row">

                            </th>
                            <td>
                                <img className="homePage-userList-img" src={user.imageUrl} alt="image"></img>

                            </td>
                            <td className="homePage-userList-td">
                                <p>{user.firstName} {user.lastName}</p>

                            </td>
                            <td className="homePage-userList-td">

                                {user.email}

                            </td>


                            {
                                user.userTypeId == 2
                                    ? <td className="homePage-userList-admin">Admin</td>
                                    :
                                    user.userTypeId == 3
                                        ?
                                        <td className="homePage-userList-mechanic">Mechanic</td>

                                        :
                                        <td className="homePage-userList-basic">Basic</td>
                            }


                            <td >
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