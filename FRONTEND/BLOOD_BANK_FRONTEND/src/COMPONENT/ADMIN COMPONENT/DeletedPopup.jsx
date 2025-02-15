import style from "./PatientDetails.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faBars,
  faXmark,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const DeletedPopup = (props) => {
  const navigate=useNavigate()
  const handleRemove=()=>{
    const values={
      id:props.allData.id
    }
    axios.post("http://localhost:5000/delete_account",values)
    .then((res)=>{
      if(res.data.Status==="Success"){
        console.log("Success")
        props.setPopup(false)
        navigate("/admin")
      }
    })
    .catch((err)=>console.log(err))
  }

  return (
    <>
      {props.popup && (
        <div className={style.container}>
          <div className={style.popup_inner}>
            <div className={style.b}>
              <button
                className={style.wrong_button}
                onClick={() => props.setPopup(false)}
              >
                <FontAwesomeIcon icon={faXmark} flip size="2xl" />
              </button>
              <h1>{props.allData.table_name.toUpperCase()} INFORMATION</h1>
            </div>
            <div className={style.box}>
                <label htmlFor="id">ID</label>
                <input type="text" id="id" readOnly defaultValue={props.allData.id} />
                <label htmlFor="name">NAME</label>
                <input type="text" id="name" defaultValue={props.allData.name} readOnly />
                <label htmlFor="mobile">MOBILE NUMBER</label>
                <input
                  type="tel"
                  id="mobile"
                  defaultValue={props.allData.number}
                  readOnly
                />
                <label htmlFor="email">EMAIL</label>
                <input
                  type="email"
                  id="email"
                  defaultValue={props.allData.email}
                  readOnly
                />
                <label htmlFor="age">REASON TO DELETE ACCOUN</label>
                <input
                  type="text"
                  id="age"
                  defaultValue={props.allData.reason}
                  readOnly
                />
                <label htmlFor="group">IMPROVEMENT</label>
                <input
                  id="group"
                  name="group"
                  readOnly
                  defaultValue={props.allData.improve}
                />
              </div>
              {/* <div className={style.pat_personal_details}>
                <p>PERSONAL DETAILS</p>
              </div> */}
              <div className={style.box}>
                <label htmlFor="state">STATE</label>
                <input
                  type="text"
                  id="state"
                  defaultValue={"KARNATAKA"}
                  autoCapitalize="on"
                  readOnly
                />
                <label htmlFor="district">DISTRICT</label>
                <input
                  name="district"
                  id="district"
                  readOnly
                  defaultValue={props.allData.district}
                  autoCapitalize="on"
                />
                <label htmlFor="address">STREET ADDRESS/CITY</label>
                <input
                  type="text"
                  id="address"
                    readOnly
                    defaultValue={props.allData.city}
                  autoCapitalize="on"
                />
                <label htmlFor="pincode">PINCODE</label>
                <input
                  type="tel"
                  id="pincode"
                  readOnly
                  defaultValue={props.allData.pincode}
                />
              </div>
              <div className={style.box}>
              <label htmlFor="date">DELETED DATE</label>
              <input type="text" id="date" defaultValue={props.allData.deletion_time.split('T')[0]} readOnly/>
              <label htmlFor="time">DELETED TIME</label>
              <input type="text" id="time" defaultValue={props.allData.deletion_time.split('T')[1].split('.')[0]} readOnly/>
              </div>
                <button className={style.remove} onClick={handleRemove}>REMOVE</button>
            </div>
          </div>
      )}
    </>
  );
};

export default DeletedPopup;
