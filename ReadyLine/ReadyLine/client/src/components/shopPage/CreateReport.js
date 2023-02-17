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
        <div className="createReport-container">

            <Form className="createReport-form">
                <h2 className="createReport-h2">Submit a Vehicle to the Shop</h2>


                <FormGroup className="createReport-formGroup">
                    <Label
                        className="createReport-label"
                        for="exampleSelect"
                        sm={2}
                    >
                        Vehicle#
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
                    > <option>Select By Vehicle Number</option>
                        {vehicles.map((vehicle) => {
                            if (vehicle.isApproved == true && vehicle.isInShop == false)
                                return (<option key={vehicle.id} value={vehicle.id}>
                                    {vehicle.vehicleNumber}--
                                    {vehicle?.vehicleType?.name}

                                </option>)
                        })}
                    </Input>
                </FormGroup>


                <FormGroup className="createReport-formGroup-issue">
                    <div className="form-group">
                        <label htmlFor="issue">Describe the Issue(s):</label>
                        <input

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


                <FormGroup check className="createReport-formGroup-checkBox">
                    {tags.map((tag) => {
                        return (<div className="createReport-div-checkBox" key={tag.id}>
                            <Label className="createReport-label-checkBox" >
                                <Input

                                    className="createReport-input-checkBox"
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

                        </div>)

                    })}
                </FormGroup>



                <button
                    onClick={(clickEvent) => handleSubmitButton(clickEvent)}
                    className="btn-primary">
                    Submit Vehicle
                </button>
                <button
                    onClick={(clickEvent) => navigate("/report")}
                    className="btn-primary">
                    Cancel
                </button>



            </Form>
        </div>
    )

}