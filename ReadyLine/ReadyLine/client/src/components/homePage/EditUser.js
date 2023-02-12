import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { FormGroup, Input, Label } from "reactstrap";
import { getAlluser, putReport } from "../../models/reportManager";
import { getUserById, putUserInfo } from "../../models/userManager";
import { addVehicle, getAllVehicleTypes } from "../../models/vehicleManager";




export const EditUser = () => {


    const [user, setuser] = useState([])
    const [userChoices, update] = useState({
        categoryId: 0,
    })
    const navigate = useNavigate()
    const { id } = useParams()


    const getuser = () => {
        getUserById(id).then(user => setuser(user));
    };

    useEffect(() => {
        getuser()
    }, []);

    // what we will send to the api
    const handleSubmitButton = (event) => {
        event.preventDefault()
        report.categoryId = userChoices.categoryId

        return putUserInfo(report.id, report)

            .then((res) => {
                setNewVehicle(false)
                setAddedVehicle(true)
                window.alert(`Report #${report.id} has been succesfuly updated :)`)
                navigate("/report")

            })
    }

    return (
        <form className="videoForm">
            <h2 className="videoForm__Vehicle Number">Edit User Information</h2>




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
                    {user.map((category) => {
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