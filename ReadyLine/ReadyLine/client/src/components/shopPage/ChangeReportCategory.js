import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { FormGroup, Input, Label } from "reactstrap";
import { getAllCategories, putReport } from "../../models/reportManager";
import { addVehicle, getAllVehicleTypes } from "../../models/vehicleManager";




export const ChangeReportCategory = ({ setNewVehicle, setAddedVehicle, report }) => {


    const [categories, setCategories] = useState([])
    const [userChoices, update] = useState({
        categoryId: 0,
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
        report.categoryId = userChoices.categoryId

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
            <h2 className="videoForm__Vehicle Number">Change Status</h2>




            <FormGroup row>
                <Label
                    for="exampleSelect"
                    sm={2}
                >
                    Select Category
                </Label>
                <Input
                    type="select"

                    value={userChoices.categoryId}
                    onChange={
                        (evt) => {
                            const copy = { ...userChoices }
                            copy.categoryId = parseInt((evt.target.value))
                            update(copy)
                        }}
                > <option>Choose Category</option>
                    {categories.map((category) => {
                        if (category.stage !== "new")
                            return <option key={category.id} value={category.id}>

                                {category.stage}

                            </option>
                    })}
                </Input>
            </FormGroup>
            <button
                onClick={(clickEvent) => handleSubmitButton(clickEvent)}
                className="btn-primary">
                Submit Change
            </button>
            <button
                onClick={() => setNewVehicle(false)}
                className="btn-primary">
                Cancle
            </button>


        </form>
    )

}