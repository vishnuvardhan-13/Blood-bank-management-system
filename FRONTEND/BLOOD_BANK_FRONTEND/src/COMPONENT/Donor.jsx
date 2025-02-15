import DonorLoginPage from "./DonorLoginPage"
import { Outlet } from "react-router-dom"
const Donor=()=>{
    return(
        <>
        <DonorLoginPage></DonorLoginPage>
        <Outlet></Outlet>
        </>

    )
}


export default Donor