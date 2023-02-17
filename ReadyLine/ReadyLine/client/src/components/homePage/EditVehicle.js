import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { getVehicleById, putVehicle } from "../../models/vehicleManager";




export const EditVehicle = () => {


    const [vehcle, setVehicle] = useState({})
    const [userChoices, update] = useState({
        currentMileage: 0
    })



    const navigate = useNavigate()
    const { id } = useParams()


    const getVehicle = () => {
        getVehicleById(id).then(vehcle => setVehicle(vehcle));
    };

    useEffect(() => {
        getVehicle()
    }, []);




    // what we will send to the api
    const handleSubmitButton = (event) => {
        event.preventDefault()
        const vehicleToSendToApi = {
            currentMileage: userChoices.currentMileage,
            id: vehcle.id,
            vehicleTypeId: vehcle.vehicleTypeId,
            mileageAtPMService: vehcle.mileageAtPMService,
            imageLocation: vehcle.imageLocation,
            vehicleNumber: vehcle.vehicleNumber,
            isApproved: vehcle.isApproved,
            isInShop: vehcle.isInShop,
            isClaimed: vehcle.isClaimed

        }

        return putVehicle(id, vehicleToSendToApi)

            .then((res) => {
                window.alert(`Report #${vehcle.id} has been succesfuly updated :)`)
                navigate("/")

            })
    }

    return (
        <div className="editVehicle-container">

            <form className="editVehicle-Form">
                <h2 className="editVehicle-Form__Vehicle Number">Update Current Mileage</h2>




                <fieldset>
                    <div className="form-group">
                        <label className="vehicleAdd-label" htmlFor="currentMileage">Current Mileage:</label>
                        <input
                            required autoFocus
                            type="number"
                            className="form-control"

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
                    Submit Change
                </button>
                <button
                    onClick={() => navigate("/")}
                    className="btn-primary">
                    Cancel
                </button>


            </form>
        </div>
    )

}