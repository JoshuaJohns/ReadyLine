import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, CardTitle, CardSubtitle, CardBody, CardText, Button, Popover, PopoverHeader, PopoverBody, CardImg, CardImgOverlay } from "reactstrap";
import { getReportById } from "../../models/reportManager";
import { getCurrentUserInfo, getUserById } from "../../models/userManager";
import { deleteVehicle, getVehicleById } from "../../models/vehicleManager";

import "./HomePage.css"

export default function UserDetails() {
    const [autrhorized, setAuthorized] = useState(false);
    const [user, setUser] = useState({})
    const [currentUser, setCurrentUser] = useState({})

    const navigate = useNavigate()
    const { id } = useParams()


    const getUserInfo = () => {
        getUserById(id).then(user => setUser(user));

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

    useEffect(() => {
        getUserInfo()
        getUser()
    }, [])





    return <div className="userDetails-container">
        <div className="userDetails-subContainer">

            <div inverse className="userDetails-userInfo-Card">
                {/* <CardImg
                    alt="Card image cap"
                    className="userDetails-userCardBackgroundImg"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW9qSrOdXUcOmUXGeQO1TPz8Ovhmj3B1XIDUg0X1c8pdyhvrQgTKvT-z1x0RY163Gk2og&usqp=CAU"


                /> */}
                <p className="userDetails-cardOverlay">

                    <img
                        className="userDetails-userCardImg"
                        alt="Card cap"
                        src={user.imageUrl}

                    />
                </p>

                <ul className="userDetails-userCardBody">
                    <li className="userDetails-userLi">{user.firstName} {user.lastName}</li>
                    <li className="userDetails-userLi">{user.email}</li>
                    <li className="userDetails-userLi">{user.jobTitle}---{user?.userType?.name}</li>


                    <h3>Vehicle(s)...</h3>
                    {user?.vehicles?.map((vehicle) => {
                        return (
                            <li className="userDetails-vehicleLink" key={vehicle.id}><Link to={`/vehicle`}>{vehicle?.vehicleType?.name} -- {vehicle.vehicleNumber} </Link></li>
                        )
                    })}
                </ul>




            </div>
            <Button color="dark" className="userDetails-goBack-btn" onClick={() => {
                navigate("/")

            }}>
                Go Back
            </Button>

            {
                autrhorized
                    ?
                    <Button color="dark" className="userDetails-edit-btn" onClick={() => {
                        navigate(`/user/edit/${user.id}`)
                    }}>
                        Edit
                    </Button>

                    :
                    <></>
            }
        </div>

    </div>
}