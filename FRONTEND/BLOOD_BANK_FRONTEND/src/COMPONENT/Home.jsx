import "../Routes/App.css";
import { useState } from "react";
import DonorRegister from "../COMPONENT/DonorRegister";
import PatientRegister from "./PatientRegister";
import { Link } from "react-router-dom";
import BloodBankRegister from "./BLOOD_BANK_COMPONENTS/BloodBankRegister";

const Home = () => {
  const [dPopup, setDpopup] = useState(false);
  const [pPopup, setPpopup] = useState(false);
  const [bPopup,setBpopup]=useState(false)
  const donorStyle = {
    backgroundColor: "#fff3b0",
  };
  const bbStyle = {
    backgroundColor: "#73d2de",
  };
  const bbrStyle = {
    backgroundColor: "#218380",
  };
  const prStyle = {
    backgroundColor: "#386641",
  };
  const drStyle = {
    backgroundColor: "#004e89",
  };
  if (dPopup || pPopup || bPopup) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  return (
    <>
      <div className="main">
       <Link to="/donor_details"> <button style={donorStyle}>DONOR</button></Link>
       <Link to="/blood_bank_details"><button style={bbStyle}>BLOOD BANK</button></Link> 
        <button style={bbrStyle} onClick={()=>setBpopup(true)}>BLOOD BANK REGISTER</button>
        <button style={prStyle} onClick={()=>setPpopup(true)}>PATIENT REGISTER</button>
        <button style={drStyle} onClick={() => setDpopup(true)}>
          DONOR REGISTER
        </button>
      </div>
      <DonorRegister dPopup={dPopup} setDpopup={setDpopup}></DonorRegister>
      <PatientRegister pPopup={pPopup} setPpopup={setPpopup}></PatientRegister>
      <BloodBankRegister bPopup={bPopup} setBpopup={setBpopup}></BloodBankRegister>

      {/* <div className="footer"></div> */}
    </>
  );
};

export default Home;
