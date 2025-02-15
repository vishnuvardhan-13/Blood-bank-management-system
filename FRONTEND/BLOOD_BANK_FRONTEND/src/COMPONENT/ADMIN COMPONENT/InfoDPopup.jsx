import style from "./PatientDetails.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faBars,
  faXmark,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

const InfoDPopup = (props) => {
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
              <h1>DONOR INFORMATION</h1>
            </div>
            <div className={style.box}>
                <label htmlFor="id">DONOR ID</label>
                <input type="text" id="id" readOnly defaultValue={props.allData.donor_id} />
                <label htmlFor="name">NAME</label>
                <input type="text" id="name" defaultValue={props.allData.name} readOnly />
                <label htmlFor="mobile">MOBILE NUMBER</label>
                <input
                  type="tel"
                  id="mobile"
                  defaultValue={props.allData.mobile}
                  readOnly
                />
                <label htmlFor="email">EMAIL</label>
                <input
                  type="email"
                  id="email"
                  defaultValue={props.allData.email}
                  readOnly
                />
                <label htmlFor="age">AGE(18-70)</label>
                <input
                  type="number"
                  id="age"
                  defaultValue={props.allData.age}
                  readOnly
                />
                <label htmlFor="group">BLOOD GROUP</label>
                <input
                  id="group"
                  name="group"
                  readOnly
                  defaultValue={props.allData.blood_group}
                />
                <label htmlFor="gender">GENDER</label>
                <input
                  id="gender"
                  name="gender"
                  readOnly
                  defaultValue={props.allData.gender}
                />
              </div>
              <div className={style.pat_personal_details}>
                <p>PERSONAL DETAILS</p>
              </div>
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
                  defaultValue={props.allData.state}
                  autoCapitalize="on"
                />
                <label htmlFor="address">STREET ADDRESS/CITY</label>
                <input
                  type="text"
                  id="address"
                    readOnly
                    defaultValue={props.allData.address.toUpperCase()}
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
              <div className={style.pat_address}>
                <p>ADDRESS</p>
              </div>
            </div>
          </div>
      )}
    </>
  );
};

export default InfoDPopup;
