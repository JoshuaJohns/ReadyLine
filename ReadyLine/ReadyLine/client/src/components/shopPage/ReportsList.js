import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, Popover, PopoverHeader, PopoverBody, CardTitle, Table } from "reactstrap";
import { getAllReports } from "../../models/reportManager";
import { getAllVehicles } from "../../models/vehicleManager";
import ReportDetails from "./ReportDetails";
import "./ShopPage.css"




const ReportsList = () => {
    const [reports, setReports] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [reportId, setReportId] = useState(null);

    const navigate = useNavigate()


    //Get Methods
    const getReports = () => {
        getAllReports().then(reports => setReports(reports));
    }
    const getVehicles = () => {
        getAllVehicles().then(vehicles => {
            vehicles.map((vehicle) => {

                vehicle.reports = vehicle.reports[0]
            })
            setVehicles(vehicles)
        });
    }

    /*--------------------------------------------------------------*/
    //useEffect Methods
    useEffect(() => {
        getReports();
        getVehicles();
    }, []);




    return (<div className="shopPage-page-body">

        <div className="shopPage-btns">
            <Button color="dark" className="shopPage-add-btn" onClick={() => {
                navigate(`/report/form`)
            }}>
                Submit a Vehicle
            </Button>
        </div>

        <div className="shopPage-headers">
            <h2 >Just Added</h2>
            <h2 >Ready For Service</h2>
            <h2>Ready Line</h2>
        </div>

        <div className="shopPage-allList-div">



            <div className="shopPage-justAdded-div">
                {reports.map((report) => {
                    {
                        if (report.categoryId == 4) {
                            return (<Card className="report-card" key={report.id} color="light">
                                <h3> #{report.id}</h3>
                                <CardBody className="report-cardBody">
                                    <div className="shopPage-cardBody-div">
                                        <img className="report-img" src={report?.vehicle?.imageLocation} alt="image"></img>
                                        <p>{report?.vehicle?.vehicleNumber}</p>
                                        <h4>Tags:</h4>
                                        <ul>{report?.tags?.map((tag) => {
                                            return (
                                                <li key={tag.id}>{tag.status}</li>
                                            )
                                        })}</ul>

                                        <p>{report.vehicleNumber}</p>
                                        <Button color="dark" onClick={() => {
                                            navigate(`/report/details/${report.id}`)
                                        }}>
                                            Report Details
                                        </Button>
                                    </div>
                                </CardBody>
                            </Card>

                            )

                        }

                    }

                })}
            </div>



            <div className="shopPage-reportsList-div">
                <Table className="vehiclePage-table">
                    <thead className="homePage-shopList-thead">
                        <tr>
                            <th></th>
                            <th>Img</th>
                            <th>Vehicle Number</th>


                            <th>Category</th>
                            <th></th>

                        </tr>
                    </thead>
                    <tbody>

                        {reports.map((report) => {
                            {
                                if (report.categoryId !== 4 && report.dateCompleted == null && report?.vehicle?.isApproved == false && report?.vehicle?.isInShop == true) {
                                    if (report.categoryId == 1 && report?.vehicle?.isApproved == false) {
                                        return (<tr className="report-tr-1" key={report.id}>
                                            <th className="report-th" scope="row" >
                                                {report.id}

                                            </th>
                                            <td>
                                                <img className="report-img" src={report?.vehicle?.imageLocation} alt="image"></img>

                                            </td>
                                            <td>

                                                <p>{report?.vehicle?.vehicleNumber}</p>

                                            </td>


                                            <td>
                                                <p>Quick Fix</p>

                                            </td>
                                            <td>
                                                <Button color="dark" onClick={() => {
                                                    navigate(`/report/details/${report.id}`)
                                                }}>
                                                    Report Details
                                                </Button>

                                            </td>


                                        </tr>)
                                    }
                                    else if (report.categoryId == 2 && report?.vehicle?.isApproved == false) {
                                        return (<tr className="report-tr-2" key={report.id}>
                                            <th className="report-th" scope="row">
                                                {report.id}
                                            </th>
                                            <td>
                                                <img className="report-img" src={report?.vehicle?.imageLocation} alt="image"></img>

                                            </td>
                                            <td>

                                                <p>{report?.vehicle?.vehicleNumber}</p>

                                            </td>


                                            <td>
                                                <p>Moderate</p>

                                            </td>
                                            <td>
                                                <Button color="dark" onClick={() => {
                                                    navigate(`/report/details/${report.id}`)
                                                }}>
                                                    Report Details
                                                </Button>

                                            </td>


                                        </tr>)
                                    }


                                }

                            }


                        })}
                    </tbody>
                </Table>

            </div>


            <div className="shopPage-readyLine-div">

                {vehicles.map((vehicle) => {
                    {
                        if (vehicle.isApproved == true && vehicle.isInShop == true) {
                            return (
                                <Card className="report-card-ready" key={vehicle.id} >
                                    <h3></h3>
                                    <CardBody className="report-cardBody">
                                        <img className="report-img" src={vehicle.imageLocation} alt="image"></img>
                                        <p>{vehicle.vehicleNumber}</p>
                                        <h4>Ready for Pick up</h4>
                                        <Button color="dark" onClick={() => {
                                            navigate(`/report/details/${vehicle?.reports?.id}`)
                                        }}>
                                            Report Details
                                        </Button>
                                    </CardBody>
                                </Card>
                            )

                        }

                    }

                })}
            </div>




        </div>

    </div>)



}
export default ReportsList;