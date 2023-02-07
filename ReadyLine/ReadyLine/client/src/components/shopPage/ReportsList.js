import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";
import { getAllReports } from "../../models/reportManager";
import "./ShopPage.css"




const ReportsList = () => {
    const [reports, setReports] = useState([]);
    const [reportId, setReportId] = useState(null);

    const navigate = useNavigate()


    //Get Methods
    const getReports = () => {
        getAllReports().then(reports => setReports(reports));
    }

    /*--------------------------------------------------------------*/
    //useEffect Methods
    useEffect(() => {
        getReports();
    }, []);




    return (<>

        <div className="shopPage-btns">
            <Button color="dark" onClick={() => {
                navigate(`/report/form`)
            }}>
                Submit a Vehicle
            </Button>
        </div>
        <div className="shopPage-justAdded-div">
            <h2>Just Added</h2>
            {reports.map((report) => {
                {
                    if (report.categoryId == null) {
                        return <>
                            <Card className="report-card" key={report.id} color="primary">
                                <CardBody className="report-cardBody">
                                    <div className="shopPage-cardBody-div">
                                        <img className="report-img" src={report?.vehicle?.imageLocation} alt="image"></img>
                                        <p>{report?.vehicle?.vehicleNumber}</p>
                                        <p>{report.issue}</p>

                                        <p>{report.vehicleNumber}</p>
                                        <Button color="dark" onClick={() => {
                                            setReportId(report.id);

                                            window.scrollTo({
                                                top: 0,
                                                left: 0,
                                                behavior: 'smooth'
                                            });
                                        }}>
                                            Show Details
                                        </Button>
                                    </div>
                                </CardBody>
                            </Card>

                        </>

                    }

                }

            })}
        </div>


        <div className="shopPage-container">



            <div className="shopPage-reportsList-div">
                <h2>Fast Lane</h2>
                {reports.map((report) => {
                    {
                        if (report.categoryId == 1 && report?.vehicle?.isApproved == false) {
                            return <>
                                <Card className="report-card" key={report.id} color="primary">
                                    <CardBody className="report-cardBody">
                                        <div className="shopPage-cardBody-div">
                                            <img className="report-img" src={report?.vehicle?.imageLocation} alt="image"></img>
                                            <p>{report?.vehicle?.vehicleNumber}</p>
                                            <p>{report.issue}</p>

                                            <p>{report.vehicleNumber}</p>
                                            <Button color="dark" onClick={() => {
                                                setReportId(report.id);

                                                window.scrollTo({
                                                    top: 0,
                                                    left: 0,
                                                    behavior: 'smooth'
                                                });
                                            }}>
                                                Show Details
                                            </Button>
                                        </div>
                                    </CardBody>
                                </Card>

                            </>

                        }

                    }

                })}
            </div>

            <div>

                <h2>Moderate</h2>
                {reports.map((report) => {
                    {
                        if (report.categoryId == 2 && report?.vehicle?.isApproved == false) {
                            return <>
                                <Card className="report-card" key={report.id} color="warning">
                                    <CardBody className="report-cardBody">
                                        <img className="report-img" src={report?.vehicle?.imageLocation} alt="image"></img>
                                        <p>{report?.vehicle?.vehicleNumber}</p>
                                        <p>{report.issue}</p>

                                        <p>{report.vehicleNumber}</p>
                                        <Button color="dark" onClick={() => {
                                            setReportId(report.id);

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
                            </>

                        }

                    }

                })}
            </div>
            <div>

                <h2>Ready Line</h2>
                {reports.map((report) => {
                    {
                        if (report.dateCompleted != null && report?.vehicle?.isApproved == true && report?.vehicle?.isInShop == true) {
                            return <>
                                <Card className="report-card" key={report.id} color="danger">
                                    <CardBody className="report-cardBody">
                                        <img className="report-img" src={report?.vehicle?.imageLocation} alt="image"></img>
                                        <p>{report?.vehicle?.vehicleNumber}</p>
                                        <p>{report.issue}</p>

                                        <p>{report.vehicleNumber}</p>
                                        <Button color="dark" onClick={() => {
                                            setReportId(report.id);

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
                            </>

                        }

                    }

                })}
            </div>


        </div>


    </>)



}
export default ReportsList;