import AdminLoginPage from "./AdminLoginPage"
import { Outlet } from "react-router-dom"
const Admin=()=>{
    return(
        <>
        <AdminLoginPage></AdminLoginPage>
        <Outlet></Outlet>
        </>

    )
}


export default Admin