import { useState } from "react";
import "./App.css";
import DonorLogin from "../COMPONENT/DonorLogin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import PatientLogin from "../COMPONENT/PATIENT_COMPONENT/PatientLogin";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BloodBankLogin from "../COMPONENT/BLOOD_BANK_COMPONENTS/BloodBankLogin";
import AdminLogin from "../COMPONENT/ADMIN COMPONENT/AdminLogin";

function App() {
  const navigate=useNavigate()
  const [show, setShow] = useState(false);
  const [logPopup,setLogpopup]=useState(false)
  const [plogPopup,setPLogpopup]=useState(false)
  const [blogPopup,setBLogpopup]=useState(false)
  const [alogPopup,setALogpopup]=useState(false)

  const handleMenuClick = () => {
    setShow(true);
  };
  const handleWrongClick = () => {
    setShow(false);
  };
  return (
    <>
      <div className="navbar">
        <div className="logo">
          <img src="logo.jpg" alt="blood_bank_logo" />
        </div>
        <div className={show ? "dashboard" : "active dashboard"}>
        <button className="dash_button" onClick={()=>navigate("/")}>HOME</button>
          <button className="dash_button" onClick={()=>setLogpopup(true)}>DONOR LOGIN</button>
          <DonorLogin logPopup={logPopup} setLogpopup={setLogpopup}></DonorLogin>
          <button className="dash_button" onClick={()=>setBLogpopup(true)}>BLOOD BANK LOGIN</button>
          <BloodBankLogin blogPopup={blogPopup} setBLogpopup={setBLogpopup}></BloodBankLogin>
          <button className="dash_button" onClick={()=>setPLogpopup(true)} >PATIENT LOGIN</button>
          <PatientLogin plogPopup={plogPopup} setPLogpopup={setPLogpopup}></PatientLogin>
          <button className="dash_button" onClick={()=>setALogpopup(true)}>ADMIN</button>
          <AdminLogin alogPopup={alogPopup} setALogpopup={setALogpopup}></AdminLogin>
        </div>
        <div className="menu_button">
          {show ? (
            <button className="menu_comp_button" onClick={handleWrongClick}>
              <FontAwesomeIcon icon={faXmark} flip size="2xl" />
            </button>
          ) : (
            <button className="menu_comp_button" onClick={handleMenuClick}>
              <FontAwesomeIcon icon={faBars} flip size="2xl" />
            </button>
          )}
        </div>
      </div>
      <Outlet></Outlet>

    </>
    
  );
}

export default App;
