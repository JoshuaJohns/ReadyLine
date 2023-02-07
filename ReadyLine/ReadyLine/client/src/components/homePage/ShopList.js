import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardImg, CardImgOverlay, CardText, Fade, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { getAllReports } from "../../models/reportManager";
import { getCurrentUserInfo } from "../../models/userManager";
import "./HomePage.css"

const ShopList = () => {
    const [reports, setReports] = useState([]);
    const [user, setUser] = useState([]);

    //Get Methods
    const getPosts = () => {
        getAllReports().then(reports => setReports(reports));
    }
    const getUser = () => {
        getCurrentUserInfo().then(reports => setUser(reports));
    }

    /*--------------------------------------------------------------*/
    //useEffect Methods
    useEffect(() => {
        getPosts();
        getUser();
    }, []);




    return (<>

        <aside className="homePage-aside">



        </aside>
        <div className="homePage-container">

            <Card inverse className="homePage-userInfo-Card">
                <CardImg
                    alt="Card image cap"
                    className="homePage-userCardImg"
                    src="data:image/jpeg;base64,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"
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
                        alt="Card cap"
                        src={user.imageUrl}

                    />


                </CardImgOverlay>
            </Card>


        </div>





        <h2>Your Vehicle(s)...</h2>
        <div className="vehiclePage-container">
            <div className="homePage-shopList-div">
                {user?.vehicles?.map((vehicle) => {
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
        </div>

    </>)


}
export default ShopList;