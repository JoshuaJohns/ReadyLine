import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardTitle, CardSubtitle, CardBody, CardText, Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";
import { getNotesOnReport, getReportById } from "../../models/reportManager";
import { getCurrentUserInfo } from "../../models/userManager";
import { deleteVehicle, getVehicleById } from "../../models/vehicleManager";
import { ChangeReportCategory } from "./ChangeReportCategory";
import "./ShopPage.css"


export default function ReportDetails() {
    const [autrhorized, setAuthorized] = useState(false);
    const [report, setReport] = useState({})
    const [notes, setNotes] = useState([])
    const [user, setUser] = useState({})
    const [newVehicle, setNewVehicle] = useState(false);
    const [addedVehicle, setAddedVehicle] = useState(false);
    const navigate = useNavigate()
    const { id } = useParams()

    const getReport = (id) => {
        getReportById(id).then(report => setReport(report));
    }
    const getReportNotes = (id) => {
        getNotesOnReport(id).then(notes => setNotes(notes));
    }
    const getUser = () => {
        getCurrentUserInfo().then((user) => {
            setUser(user)
            if (user.userTypeId == 3) {
                setAuthorized(true)
            }

        }
        )


    }

    useEffect(() => {
        getReport(id)
        getUser()
        getReportNotes(id)
    }, [])



    const mileageSincePM = report?.vehicle?.currentMileage - report?.vehicle?.mileageAtPMService

    return <div className="reportDetails-container">

        <Card className="reportDetails-card">
            <h3>Report #{report.id}</h3>
            <CardTitle>
                {report?.vehicle?.vehicleNumber}--
                {report?.category?.stage}
            </CardTitle>
            <img className="reportDetails-img" src={report?.vehicle?.imageLocation} alt="image"></img>
            <CardBody>

                <CardText><b>Mileage Since Last PM Service:</b> {mileageSincePM}mi</CardText>
                <CardText><b>Current Mileage:</b> {report?.vehicle?.currentMileage}mi</CardText>
                <CardText><b> Submitted By:</b> {report?.user?.firstName} {report?.user?.lastName}</CardText>
                <h5><b>Issue:</b></h5>
                <CardText className="reportDetails-issue">{report.issue}</CardText>
                <h3>Tags</h3>
                <ul>
                    {report?.tags?.map((tag) => {
                        return <li key={tag.id}>{tag.status}</li>
                    })}

                </ul>
                <h3>Notes</h3>
                <ol>
                    {notes.map((note) => {
                        return <li key={note.id}>{note.content}</li>
                    })}

                </ol>
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
                        Change Category
                    </Button>


            }


            <Button color="dark" className="reportDetails-goBack-btn" onClick={() => {
                navigate("/report")
            }}>
                Go Back
            </Button>
        </Card>


    </div>
}