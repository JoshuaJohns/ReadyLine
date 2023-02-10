import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardTitle, CardSubtitle, CardBody, CardText, Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";
import { getReportById } from "../../models/reportManager";
import { getCurrentUserInfo } from "../../models/userManager";
import { deleteVehicle, getVehicleById } from "../../models/vehicleManager";
import { ChangeReportCategory } from "./ChangeReportCategory";


export default function ReportDetails() {
    const [autrhorized, setAuthorized] = useState(false);
    const [report, setReport] = useState({})
    const [user, setUser] = useState({})
    const [newVehicle, setNewVehicle] = useState(false);
    const [addedVehicle, setAddedVehicle] = useState(false);
    const navigate = useNavigate()
    const { id } = useParams()

    const getReport = (id) => {
        getReportById(id).then(report => setReport(report));
    }
    const getUser = () => {
        getCurrentUserInfo().then((user) => {
            setUser(user)
            if (user.userTypeId == 2) {
                setAuthorized(true)
            }

        }
        )


    }

    useEffect(() => {
        getReport(id)
        getUser()
    }, [])



    const mileageSincePM = report?.vehicle?.currentMileage - report?.vehicle?.mileageAtPMService

    return <>

        <Card>
            <h3>Report #{report.id}</h3>
            <CardTitle>
                {report?.vehicle?.vehicleNumber}--
                {report?.category?.stage}
            </CardTitle>
            <img className="report-img" src={report?.vehicle?.imageLocation} alt="image"></img>
            <CardBody>
                <CardText>Submitted By: {report?.user?.firstName} {report?.user?.lastName}</CardText>

                <CardText>Mileage Since Last PM Service: {mileageSincePM}mi</CardText>
                <CardText>Current Mileage: {report?.vehicle?.currentMileage}mi</CardText>
                <CardText>{report.issue}</CardText>
                <h3>Tags</h3>

                {report?.tags?.map((tag) => {
                    return <CardText>{tag.status}</CardText>
                })}
            </CardBody>



            {
                newVehicle
                    ?
                    <ChangeReportCategory setNewVehicle={setNewVehicle} setAddedVehicle={setAddedVehicle} report={report} />

                    :

                    <Button color="dark" onClick={() => {
                        {
                            autrhorized
                                ?
                                setNewVehicle(true)

                                :
                                window.alert("sorry you are not authorized!")
                        }


                    }}>
                        Change Status
                    </Button>


            }


            <Button color="dark" onClick={() => {
                navigate("/report")
            }}>
                Go Back
            </Button>
        </Card>


    </>
}