import style from "./DonorLogin.module.css";
import { Link } from "react-router-dom";

const NotAuthenticated=()=>{
    return (
        <>
            <div className={style.donor_popup}>
        <div className={style.donor_popup_inner}>
          <span className={style.donor_child}>YOU ARE NOT LOGGED IN SO PLEASE LOGIN</span>
          <Link to="/">
            {" "}
            <button className={style.close_button} >OK</button>
          </Link>
        </div>
      </div>
        </>
    )
}

export default NotAuthenticated