import React, { useEffect, useState } from "react";
import { Button, Card, CardBody } from "reactstrap";
import { getAllReports } from "../../models/reportManager";
import "./ShopPage.css"




const ReportsList = () => {
    const [reports, setReports] = useState([]);
    const [reportId, setReportId] = useState(null);



    //Get Methods
    const getReports = () => {
        getAllReports().then(reports => setReports(reports));
    }

    /*--------------------------------------------------------------*/
    //useEffect Methods
    useEffect(() => {
        getReports();
    }, []);




    return (<div className="shopPage-container">



        <div className="shopPage-reportsList-div">
            {reports.map((report) => {
                {
                    if (report.categoryId == 1) {
                        return <>
                            <h2>Fast Lane</h2>
                            <Card className="report-card" key={report.id}>
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

            {reports.map((report) => {
                {
                    if (report.categoryId == 2) {
                        return <>
                            <h2>Moderate</h2>
                            <Card className="report-card" key={report.id}>
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


    </div>)


}
export default ReportsList;