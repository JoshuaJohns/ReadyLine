import React, { useEffect, useState } from "react";
import { getAllReports } from "../../models/reportManager";


const ShopList = () => {
    const [reports, setReports] = useState([]);

    //Get Methods
    const getPosts = () => {
        getAllReports().then(reports => setReports(reports));
    }

    /*--------------------------------------------------------------*/
    //useEffect Methods
    useEffect(() => {
        getPosts();
    }, []);




    return (<>
        <div className="homePage-shopList-div">
            {reports.map((report) => {
                return <p key={report.id}>{report.issue}</p>

            })}
        </div>


    </>)


}
export default ShopList;