import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { FormGroup, Input, Label } from "reactstrap";
import { addReportNote, getAllCategories, putReport } from "../../models/reportManager";
import { addVehicle, getAllVehicleTypes } from "../../models/vehicleManager";




export const ChangeReportCategory = ({ setNewVehicle, setAddedVehicle, report }) => {


    const [categories, setCategories] = useState([])
    const [userChoices, update] = useState({
        categoryId: 0,
        note: ""
    })
    const navigate = useNavigate()



    const getCategories = () => {
        getAllCategories().then(categories => setCategories(categories));
    };

    useEffect(() => {
        getCategories()
    }, []);

    // what we will send to the api
    const handleSubmitButton = (event) => {
        event.preventDefault()
        const note = {
            content: userChoices.note,
            reportId: report.id,
        }
        report.categoryId = userChoices.categoryId
        report.notes.push(note)
        if (note.content !== "") {
            addReportNote(note)
        }
        return putReport(report.id, report)
            .then((res) => {
                setNewVehicle(false)
                setAddedVehicle(true)
                window.alert(`Report #${report.id} has been succesfuly updated :)`)
                navigate("/report")

            })
    }

    return (
        <form className="videoForm">
            <h2 className="videoForm__Vehicle Number">Change Category</h2>




            <FormGroup row>
                <Label
                    for="exampleSelect"
                    sm={2}
                >

                </Label>
                <Input
                    type="select"
                    required
                    value={userChoices.categoryId}
                    onChange={
                        (evt) => {
                            const copy = { ...userChoices }
                            copy.categoryId = parseInt((evt.target.value))
                            update(copy)
                        }}
                > <option>Select Category</option>
                    {categories.map((category) => {
                        if (category.stage !== "new")
                            return <option key={category.id} value={category.id}>

                                {category.stage}

                            </option>
                    })}
                </Input>
            </FormGroup>

            {
                userChoices.categoryId == 5
                    ?
                    <>
                        <FormGroup className="createReport-formGroup-issue">
                            <div className="form-group">
                                <label htmlFor="issue">Write Description of all work done to Vehicle: (Required)</label>
                                <input
                                    required autoFocus
                                    type="text"
                                    className="form-control"

                                    value={userChoices.note}
                                    onChange={
                                        (evt) => {
                                            const copy = { ...userChoices }
                                            copy.note = (evt.target.value)
                                            update(copy)
                                        }
                                    } />
                            </div>
                        </FormGroup>

                    </>
                    :
                    <>
                        <FormGroup className="createReport-formGroup-issue">
                            <div className="form-group">
                                <label htmlFor="issue">Add Note: (Optional)</label>
                                <input

                                    type="text"
                                    className="form-control"

                                    value={userChoices.note}
                                    onChange={
                                        (evt) => {
                                            const copy = { ...userChoices }
                                            copy.note = (evt.target.value)
                                            update(copy)
                                        }
                                    } />
                            </div>
                        </FormGroup>
                    </>
            }
            <button
                onClick={(clickEvent) =>

                    handleSubmitButton(clickEvent)}
                className="btn-primary">
                Submit Change
            </button>
            <button
                onClick={() => setNewVehicle(false)}
                className="btn-primary">
                Cancel
            </button>


        </form>
    )

}