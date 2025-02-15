import PatientLoginPage from "./PatientLoginPage"
import { Outlet } from "react-router-dom"
const Patient=()=>{
    return(
        <>
        <PatientLoginPage></PatientLoginPage>
        <Outlet></Outlet>
        </>

    )
}


export default Patient