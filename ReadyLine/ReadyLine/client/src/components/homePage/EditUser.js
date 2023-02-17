import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { FormGroup, Input, Label } from "reactstrap";

import { getAllUserTypes, getUserById, putUserInfo } from "../../models/userManager";





export const EditUser = () => {



    const [userTypes, setUserTypes] = useState([])
    const [user, updateUser] = useState({
        // firstName: "",
        // lastName: "",
        // email: "",
        // imageUrl: "",
        // jobTitle: "",
        // userTypeId: 0

    })
    const navigate = useNavigate()
    const { id } = useParams()


    const getuser = () => {
        getUserById(id).then(user => updateUser(user));
    };
    const getUserType = () => {
        getAllUserTypes().then(type => setUserTypes(type));
    };

    useEffect(() => {
        getuser()
        getUserType()
    }, []);




    // what we will send to the api
    const handleSubmitButton = (event) => {
        event.preventDefault()


        return putUserInfo(user.id, user)

            .then((res) => {

                window.alert(`User ${user.firstName} ${user.lastName}  has been succesfuly updated :)`)
                navigate(`/user/${user.id}`)

            })
    }

    return (<div className="editUser-div">

        <form className="editUserForm">
            <h2 className="videoForm__Vehicle Number">Edit User Information</h2>


            <FormGroup className="createReport-formGroup-issue">
                <div className="form-group">
                    <label htmlFor="issue">First Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"

                        value={user.firstName}
                        onChange={
                            (evt) => {
                                const copy = { ...user }
                                copy.firstName = (evt.target.value)
                                updateUser(copy)
                            }
                        } />
                </div>
            </FormGroup>
            <FormGroup className="createReport-formGroup-issue">
                <div className="form-group">
                    <label htmlFor="issue">Last Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"

                        value={user.lastName}
                        onChange={
                            (evt) => {
                                const copy = { ...user }
                                copy.lastName = (evt.target.value)
                                updateUser(copy)
                            }
                        } />
                </div>
            </FormGroup>

            <FormGroup className="createReport-formGroup-issue">
                <div className="form-group">
                    <label htmlFor="issue">Image Url:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"

                        value={user.imageUrl}
                        onChange={
                            (evt) => {
                                const copy = { ...user }
                                copy.imageUrl = (evt.target.value)
                                updateUser(copy)
                            }
                        } />
                </div>
            </FormGroup>
            <FormGroup className="createReport-formGroup-issue">
                <div className="form-group">
                    <label htmlFor="issue">Job Title:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"

                        value={user.jobTitle}
                        onChange={
                            (evt) => {
                                const copy = { ...user }
                                copy.jobTitle = (evt.target.value)
                                updateUser(copy)
                            }
                        } />
                </div>
            </FormGroup>

            <FormGroup className="createReport-formGroup">
                <Label
                    className="createReport-label"
                    for="exampleSelect"
                    sm={2}
                >
                    Authentication Level
                </Label>
                <Input
                    type="select"

                    value={user.userTypeId}
                    onChange={
                        (evt) => {
                            const copy = { ...user }
                            copy.userTypeId = parseInt((evt.target.value))
                            updateUser(copy)
                        }}
                > <option>Select Level</option>
                    {userTypes.map((type) => {

                        return (<option key={type.id} value={type.id}>
                            {type.name}

                        </option>)
                    })}
                </Input>
            </FormGroup>


            <button
                onClick={(clickEvent) => handleSubmitButton(clickEvent)}
                className="btn-primary">
                Submit Change
            </button>
            <button
                onClick={() => navigate(`/user/${user.id}`)}
                className="btn-primary">
                Cancle
            </button>


        </form>
    </div>
    )

}