import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { addReport } from "../../models/reportManager";
import { addReportTag, getAllTags } from "../../models/tagManager";
import { getAllVehicles } from "../../models/vehicleManager";
import "./ShopPage.css"




export const CreateReport = () => {

    const [vehicles, setVehicles] = useState([])
    const [tags, setTags] = useState([])
    const [userChoices, update] = useState({
        issue: "",
        vehicleId: 0,
        tagIds: []

    })

    const navigate = useNavigate()


    const getVehicles = () => {
        getAllVehicles().then(vehicles => setVehicles(vehicles));
    };
    const getTags = () => {
        getAllTags().then(tags => setTags(tags));
    };

    useEffect(() => {
        getTags();
        getVehicles();
    }, []);


    // what we will send to the api
    const handleSubmitButton = (event) => {
        event.preventDefault()

        const reportToSendToAPI = {
            issue: userChoices.issue,
            vehicleId: userChoices.vehicleId

        }

        return addReport(reportToSendToAPI)
            .then((res) => {
                userChoices?.tagIds?.map((tagId) => {
                    return addReportTag(tagId, res.id)
                        .then(() => {

                        })
                })
                window.alert(`Report has been succesfuly submitted :)`)
                navigate('/report')
            })
    }

    return (

        <Form className="videoForm">
            <h2 className="videoForm__Vehicle Number">Submit a Vehicle to the Shop</h2>


            <FormGroup row>
                <Label
                    for="exampleSelect"
                    sm={2}
                >
                    Select Vehicle
                </Label>
                <Input
                    type="select"

                    value={userChoices.vehicleId}
                    onChange={
                        (evt) => {
                            const copy = { ...userChoices }
                            copy.vehicleId = parseInt((evt.target.value))
                            update(copy)
                        }}
                > <option>Choose By Vehicle Number</option>
                    {vehicles.map((vehicle) => {
                        if (vehicle.isApproved == true)
                            return <option key={vehicle.id} value={vehicle.id}>
                                {vehicle.vehicleNumber}--
                                {vehicle?.vehicleType?.name}
                                {/* <img className="report-img" src={vehicle.imageLocation} alt="image"></img> */}
                            </option>
                    })}
                </Input>
            </FormGroup>


            <FormGroup>
                <div className="form-group">
                    <label htmlFor="issue">Describe the Issue(s):</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="issue"
                        value={userChoices.issue}
                        onChange={
                            (evt) => {
                                const copy = { ...userChoices }
                                copy.issue = (evt.target.value)
                                update(copy)
                            }
                        } />
                </div>
            </FormGroup>


            <FormGroup check>
                {tags.map((tag) => {
                    return <Label check key={tag.id}>
                        <Input
                            type="checkbox"
                            checked={userChoices?.tags?.includes(tag.id)}
                            onChange={
                                (evt) => {
                                    if (evt.target.checked) {
                                        const copy = structuredClone(userChoices)
                                        copy?.tagIds?.push(tag.id)
                                        update(copy)
                                    } else {
                                        const copy = structuredClone(userChoices)
                                        copy.tagIds = copy?.tagIds?.filter(id => id !== tag.id)
                                        update(copy)
                                    }


                                }
                            } />
                        {tag.status}
                    </Label>

                })}
            </FormGroup>



            <button
                onClick={(clickEvent) => handleSubmitButton(clickEvent)}
                className="btn-primary">
                Submit Vehicle
            </button>



        </Form>
    )

}