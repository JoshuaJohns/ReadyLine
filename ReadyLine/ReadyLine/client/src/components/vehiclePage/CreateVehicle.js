import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { addVehicle, getAllVehicleTypes } from "../../models/vehicleManager";




export const CreateVehicle = ({ setNewVehicle, setAddedVehicle }) => {

    const [types, setTypes] = useState([])
    const [userChoices, update] = useState({
        vehicleNumber: "",
        mileageAtPMService: "",
        currentMileage: "",
        vehicleTypeId: 0,

    })



    const getTypes = () => {
        getAllVehicleTypes().then(types => setTypes(types));
    };

    useEffect(() => {
        getTypes();
    }, []);

    // what we will send to the api
    const handleSubmitButton = (event) => {
        event.preventDefault()
        const productToSendToAPI = {
            vehicleNumber: userChoices.vehicleNumber,
            mileageAtPMService: userChoices.mileageAtPMService,
            currentMileage: userChoices.currentMileage,
            vehicleTypeId: userChoices.vehicleTypeId
        }

        return addVehicle(productToSendToAPI)

            .then((res) => {
                setNewVehicle(false)
                setAddedVehicle(true)
                window.alert(`Vehicle ${productToSendToAPI.vehicleNumber} has been succesfuly added :)`)

            })
    }

    return (
        <form className="videoForm">
            <h2 className="videoForm__Vehicle Number">Adding a New Vehicle</h2>




            <fieldset>
                <div className="form-group">
                    <label htmlFor="vehicleNumber">Vehicle Number:</label>
                    <input
                        required autoFocus
                        type="string"
                        className="form-control"
                        placeholder="number of vehicle"
                        value={userChoices.vehicleNumber}
                        onChange={
                            (evt) => {
                                const copy = { ...userChoices }
                                copy.vehicleNumber = (evt.target.value)
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">

                    {types.map((type) => {
                        return <div key={type.id} className="radio">

                            <label className="label-name">{type.name}  </label>
                            <input

                                type="radio"
                                value={type.id}
                                checked={userChoices.vehicleTypeId === type.id}
                                onChange={
                                    (evt) => {
                                        const copy = { ...userChoices }
                                        copy.vehicleTypeId = parseInt((evt.target.value))
                                        update(copy)
                                    }
                                }
                            />
                        </div>
                    })}
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="mileageAtPMService">Mileage at Last PM Service:</label>
                    <input

                        type="number"
                        className="form-control"
                        placeholder="mileage"
                        value={userChoices.mileageAtPMService}
                        onChange={
                            (evt) => {
                                const copy = { ...userChoices }
                                copy.mileageAtPMService = parseInt((evt.target.value))
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="currentMileage">Current Mileage:</label>
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
                        placeholder="current mileage"
                        value={userChoices.currentMileage}
                        onChange={
                            (evt) => {
                                const copy = { ...userChoices }
                                copy.currentMileage = parseInt((evt.target.value))
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>




            <button
                onClick={(clickEvent) => handleSubmitButton(clickEvent)}
                className="btn-primary">
                Add Vehicle
            </button>
            <button
                onClick={() => setNewVehicle(false)}
                className="btn-primary">
                Cancle
            </button>


        </form>
    )

}