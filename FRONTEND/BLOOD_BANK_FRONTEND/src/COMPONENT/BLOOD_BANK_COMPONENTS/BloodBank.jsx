import BloodBankLoginPage from "./BloodBankLoginPage"
import { Outlet } from "react-router-dom"
const BloodBank=()=>{
    return(
        <>
        <BloodBankLoginPage></BloodBankLoginPage>
        <Outlet></Outlet>
        </>

    )
}


export default BloodBank