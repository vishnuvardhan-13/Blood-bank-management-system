import style from "./DonorReg.module.css";
import { Form, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {
  faEnvelope,
  faBars,
  faXmark,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
const DonorRegister = (props) => {
  const navigate = useNavigate();
  const nameEvent = useRef();
  const fnameEvent = useRef();
  const mobileEvent = useRef();
  const emailEvent = useRef();
  const ageEvent = useRef();
  const bgEvent = useRef();
  const genderEvent = useRef();
  const distEvent = useRef();
  const addressEvent = useRef();
  const pincodeEvent = useRef();
  const paswordEvent = useRef();
  const [show, setShow] = useState(false);

  const handleEyeClick = () => {
    setShow(true);
  };
  const handleShowEyeClick = () => {
    setShow(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const id = String(
      Date.now().toString(32) + Math.random().toString(16)
    ).replace(/\./g, "");
    const values = {
      donor_id: id,
      blood_group: bgEvent.current.value,
      name: nameEvent.current.value.toUpperCase(),
      age: ageEvent.current.value,
      gender: genderEvent.current.value,
      father_name: fnameEvent.current.value.toUpperCase(),
      mobile: mobileEvent.current.value,
      email: emailEvent.current.value,
      state: "KARNATAKA",
      district: distEvent.current.value,
      address: addressEvent.current.value,
      pincode: pincodeEvent.current.value,
      password: paswordEvent.current.value,
    };
    axios
      .post("http://localhost:5000/donor_signup", values)
      .then((res) => {
        if (res.data.Status === "Success") {
          props.setDpopup(false);
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
    console.log(values);
  };
  return (
    <>
      {props.dPopup && (
        <div className={style.container}>
          <div className={style.popup_inner}>
            <div className={style.b}>
              <button
                className={style.wrong_button}
                onClick={() => props.setDpopup(false)}
              >
                <FontAwesomeIcon icon={faXmark} flip size="2xl" />
              </button>
              <h1>DONOR REGISTRATION FORM</h1>
            </div>
            {/* donor_idblood_groupnameagegenderfather_namemobileemailstatedistrictaddresspincodepassword */}
            <Form method="POST" onSubmit={handleSubmit}>
              <div className={style.box}>
                <label htmlFor="name">DONOR NAME</label>
                <input
                  type="text"
                  id="name"
                  ref={nameEvent}
                  required
                  autoCapitalize="on"
                  autoComplete="off"
                />
                <label htmlFor="fname">FATHER NAME</label>
                <input
                  type="text"
                  id="fname"
                  ref={fnameEvent}
                  required
                  autoCapitalize="on"
                  autoComplete="off"
                />
                <label htmlFor="mobile">MOBILE NUMBER</label>
                <input
                  type="tel"
                  id="mobile"
                  ref={mobileEvent}
                  pattern="[0-9]{10}"
                  required
                  autoComplete="off"
                />
                <label htmlFor="email">EMAIL</label>
                <input
                  type="email"
                  id="email"
                  ref={emailEvent}
                  required
                  autoComplete="off"
                />
                <label htmlFor="age">AGE(18-70)</label>
                <input
                  type="number"
                  id="age"
                  ref={ageEvent}
                  pattern="[1-6][9]|[2-6][0-9]|[1-9][8]"
                  required
                  autoComplete="off"
                />
                <label htmlFor="group">BLOOD GROUP:</label>
                <select
                  id="group"
                  name="group"
                  ref={bgEvent}
                  required
                  autoComplete="off"
                >
                  <option>select</option>
                  <option>A-</option>
                  <option>A+</option>
                  <option>AB-</option>
                  <option>AB+</option>
                  <option>B-</option>
                  <option>O-</option>
                  <option>O+</option>
                </select>
                <label htmlFor="gender">SELECT GENDER:</label>
                <select
                  id="gender"
                  name="gender"
                  ref={genderEvent}
                  required
                  autoComplete="off"
                >
                  <option>select</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div className={style.personal_details}>
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
                <select
                  name="district"
                  ref={distEvent}
                  id="district"
                  required
                  autoComplete="off"
                  autoCapitalize="on"
                >
                  <option>select</option>
                  <option value="bagalkot">Bagalkot</option>
        <option value="ballari">Ballari (Bellary)</option>
        <option value="belagavi">Belagavi (Belgaum)</option>
        <option value="bengaluru-rural">Bengaluru Rural</option>
        <option value="bengaluru-urban">Bengaluru Urban</option>
        <option value="bidar">Bidar</option>
        <option value="chamarajanagar">Chamarajanagar</option>
        <option value="chikballapur">Chikballapur</option>
        <option value="chikkamagaluru">Chikkamagaluru (Chikmagalur)</option>
        <option value="chitradurga">Chitradurga</option>
        <option value="dakshina-kannada">Dakshina Kannada</option>
        <option value="davanagere">Davanagere</option>
        <option value="dharwad">Dharwad</option>
        <option value="gadag">Gadag</option>
        <option value="hassan">Hassan</option>
        <option value="haveri">Haveri</option>
        <option value="kalaburagi">Kalaburagi (Gulbarga)</option>
        <option value="kodagu">Kodagu (Coorg)</option>
        <option value="kolar">Kolar</option>
        <option value="koppal">Koppal</option>
        <option value="mandya">Mandya</option>
        <option value="mysuru">Mysuru (Mysore)</option>
        <option value="raichur">Raichur</option>
        <option value="ramanagara">Ramanagara</option>
        <option value="shivamogga">Shivamogga (Shimoga)</option>
        <option value="tumakuru">Tumakuru (Tumkur)</option>
        <option value="udupi">Udupi</option>
        <option value="uttara-kannada">Uttara Kannada (Karwar)</option>
        <option value="vijayapura">Vijayapura (Bijapur)</option>
        <option value="yadgir">Yadgir</option>
                </select>
                <label htmlFor="address">STREET ADDRESS</label>
                <input
                  type="text"
                  id="address"
                  ref={addressEvent}
                  required
                  autoComplete="off"
                  autoCapitalize="on"
                />
                <label htmlFor="pincode">PINCODE</label>
                <input
                  type="tel"
                  id="pincode"
                  pattern="[0-9]{6}"
                  ref={pincodeEvent}
                  required
                  autoComplete="off"
                />
              </div>
              <div className={style.address}>
                <p>ADDRESS</p>
              </div>
              <div className={style.pass}>
                <label htmlFor="password">PASSWORD</label>
                {show ? (
                  <div className={style.dont_show}>
                    <input
                      type="text"
                      id="password"
                      ref={paswordEvent}
                      autoComplete="off"
                    />
                    <FontAwesomeIcon
                      icon={faEye}
                      onClick={handleShowEyeClick}
                      className={style.eye}
                    />
                  </div>
                ) : (
                  <div className={style.dont_show}>
                    <input
                      type="password"
                      id="password"
                      ref={paswordEvent}
                      autoComplete="off"
                    />
                    <FontAwesomeIcon
                      icon={faEyeSlash}
                      className={style.eye}
                      onClick={handleEyeClick}
                    />
                  </div>
                )}
              </div>
              <button type="submit" className={style.sub_button}>
                SUBMIT
              </button>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

export default DonorRegister;
