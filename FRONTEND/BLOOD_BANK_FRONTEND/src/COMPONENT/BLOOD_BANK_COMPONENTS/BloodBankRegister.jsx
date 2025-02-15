import style from "./Register.module.css";
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

const BloodBankRegister = (props) => {
  const id = String(
    Date.now().toString(32) + Math.random().toString(16)
  ).replace(/\./g, "");
  const emp_id = String(
    Date.now().toString(32) + Math.random().toString(16)
  ).replace(/\./g, "");
  const navigate = useNavigate();
  const bbnameEvent = useRef();
  const phsnameEvent = useRef();
  const catEvent = useRef();
  const mobileEvent = useRef();
  const emailEvent = useRef();
  const distEvent = useRef();
  const addressEvent = useRef();
  const address1Event = useRef();
  const address2Event = useRef();
  const pincodeEvent = useRef();
  const passwordEvent = useRef();
  const empnameEvent = useRef();
  const empemailEvent = useRef();
  const empnumEvent = useRef();
  const emppassEvent = useRef();
  const genderEvent = useRef();

  const [show, setShow] = useState(false);
  const [empShow, setEmpShow] = useState(false);
  const [valid, setValid] = useState(true);

  const handleEyeClick = () => {
    setShow(true);
  };
  const handleShowEyeClick = () => {
    setShow(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const values = {
      bb_id: id,
      emp_id: emp_id,
      bbb_name: bbnameEvent.current.value.toUpperCase(),
      parent_hs_name: phsnameEvent.current.value.toUpperCase(),
      category: catEvent.current.value,
      bb_number: mobileEvent.current.value,
      bb_email: emailEvent.current.value,
      state: "KARNATAKA",
      district: distEvent.current.value,
      city: addressEvent.current.value,
      address1: address1Event.current.value,
      address2: address2Event.current.value,
      pincode: pincodeEvent.current.value,
      password: passwordEvent.current.value,
    };
    const emp_value = {
      emp_id: emp_id,
      emp_name: empnameEvent.current.value.toString(),
      emp_number: empnumEvent.current.value,
      emp_email: empemailEvent.current.value,
      bb_name: bbnameEvent.current.value.toUpperCase(),
      bbid: id,
      gender: genderEvent.current.value,
      password: emppassEvent.current.value,
    };
    const update_values = {
      bb_id: id,
      emp_id: emp_id,
    };
    const bc_values = [
      { bb_id: id, blood_name: "A+", count: 0 },
      { bb_id: id, blood_name: "O+", count: 0 },
      { bb_id: id, blood_name: "B+", count: 0 },
      { bb_id: id, blood_name: "AB+", count: 0 },
      { bb_id: id, blood_name: "A-", count: 0 },
      { bb_id: id, blood_name: "O-", count: 0 },
      { bb_id: id, blood_name: "B-", count: 0 },
      { bb_id: id, blood_name: "AB-", count: 0 },
    ];
    const fetchData = async () => {
      try {
        const res = await axios.post("http://localhost:5000/bb_signup", values);
        if (res.data.Status === "Success") {
          console.log("Success");
          return true;
        } else {
          setValid(false);
          return false;
        }
      } catch (err) {
        console.log(err);
        alert("email is already registered");
        return false;
      }
    };

    (async () => {
      const valid = await fetchData();
      if (valid) {
        try {
          await axios.post("http://localhost:5000/employee_signup", emp_value);
          console.log("Employee signup success");

          // Make blood_details API call
          await axios.post("http://localhost:5000/blood_details", bc_values);
          console.log("blood_details success");

          // Make update_empid API call
          await axios.post("http://localhost:5000/update_empid", update_values);
          console.log("update_empid success");
          props.setBpopup(false);
        } catch (err) {
          console.log(err);
        }
      }
    })();
  };
  return (
    props.bPopup && (
      <>
        <div className={style.bb_container}>
          <div className={style.bb_popup_inner}>
            <div className={style.b}>
              <button
                className={style.bb_wrong_button}
                onClick={() => props.setBpopup(false)}
              >
                <FontAwesomeIcon icon={faXmark} flip size="2xl" />
              </button>
              <h1>BLOOD BANK REGISTRATION FORM</h1>
            </div>
            <Form method="POST" onSubmit={handleSubmit}>
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
                  <option value="">select</option>
                  <option value="bagalkot">Bagalkot</option>
                  <option value="ballari">Ballari (Bellary)</option>
                  <option value="belagavi">Belagavi (Belgaum)</option>
                  <option value="bengaluru-rural">Bengaluru Rural</option>
                  <option value="bengaluru-urban">Bengaluru Urban</option>
                  <option value="bidar">Bidar</option>
                  <option value="chamarajanagar">Chamarajanagar</option>
                  <option value="chikballapur">Chikballapur</option>
                  <option value="chikkamagaluru">
                    Chikkamagaluru (Chikmagalur)
                  </option>
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
                  <option value="uttara-kannada">
                    Uttara Kannada (Karwar)
                  </option>
                  <option value="vijayapura">Vijayapura (Bijapur)</option>
                  <option value="yadgir">Yadgir</option>
                </select>
                <label htmlFor="caddress">STREET ADDRESS/CITY</label>
                <input
                  type="text"
                  id="caddress"
                  ref={addressEvent}
                  required
                  autoComplete="off"
                  autoCapitalize="on"
                />
              </div>
              <div className={style.bb_address}>
                <p>BLOOD BANK ADDRESS</p>
              </div>
              <div className={style.box}>
                <label htmlFor="name">BLOOD BANK NAME</label>
                <input
                  type="text"
                  id="name"
                  ref={bbnameEvent}
                  required
                  autoCapitalize="on"
                  autoComplete="off"
                />
                <label htmlFor="phs_name">PARENT HOSPITAL NAME</label>
                <input
                  type="text"
                  id="phs_name"
                  name="phs_name"
                  ref={phsnameEvent}
                  required
                  autoComplete="off"
                />
                <label htmlFor="category">CATEGORY</label>
                <select
                  name="category"
                  id="category"
                  ref={catEvent}
                  required
                  autoComplete="off"
                >
                  <option value="">select</option>
                  <option>Govt</option>
                  <option>Red Cross</option>
                  <option>Charitable/Vol</option>
                  <option>Private</option>
                </select>
                <label htmlFor="email">BLOOD BANK EMAIL</label>
                <input
                  type="email"
                  id="email"
                  ref={emailEvent}
                  pattern="/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/"
                  required
                  autoComplete="off"
                />
                <label htmlFor="mobile">CONTACT NUMBER</label>
                <input
                  type="tel"
                  id="mobile"
                  ref={mobileEvent}
                  pattern="[0-9]{10}"
                  required
                  autoComplete="off"
                />
              </div>
              <div className={style.bb_personal_details}>
                <p>BLOOD BANK DETAILS</p>
              </div>
              <div className={style.box}>
                <label htmlFor="address">ADDRESS 1</label>
                <input
                  type="text"
                  id="address"
                  ref={address1Event}
                  required
                  autoComplete="off"
                  autoCapitalize="on"
                />
                <label htmlFor="address">ADDRESS 2</label>
                <input
                  type="text"
                  id="address1"
                  ref={address2Event}
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
              <div className={style.bb_postal_details}>
                <p>POSTAL ADDRESS</p>
              </div>

              <div className={style.pass}>
                <label htmlFor="password">PASSWORD</label>
                {show ? (
                  <div className={style.dont_show}>
                    <input
                      type="text"
                      id="password"
                      ref={passwordEvent}
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
                      id="password1"
                      ref={passwordEvent}
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
              <div className={style.emp_box}>
                <label htmlFor="empname">EMPLOYEE NAME</label>
                <input
                  type="text"
                  id="empname"
                  ref={empnameEvent}
                  required
                  autoCapitalize="on"
                  autoComplete="off"
                />
                <label htmlFor="empemail">EMPLOYEE EMAIL</label>
                <input
                  type="email"
                  pattern="/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/"
                  id="empemail"
                  ref={empemailEvent}
                  required
                  autoComplete="off"
                />
                <label htmlFor="empmobile">EMPLOYEE NUMBER</label>
                <input
                  type="tel"
                  id="empmobile"
                  ref={empnumEvent}
                  pattern="[0-9]{10}"
                  required
                  autoComplete="off"
                />
                <label htmlFor="gender">GENDER</label>
                <select name="gender" id="gender" ref={genderEvent}>
                  <option value="">select</option>
                  <option>MALE</option>
                  <option>FEMALE</option>
                </select>
              </div>
              <div className={style.bb_emp_details}>
                <p> EMPLOYEE DETAILS</p>
              </div>
              <div className={style.pass}>
                <label htmlFor="password">PASSWORD</label>
                {empShow ? (
                  <div className={style.dont_show}>
                    <input
                      type="text"
                      id="password2"
                      ref={emppassEvent}
                      autoComplete="off"
                    />
                    <FontAwesomeIcon
                      icon={faEye}
                      onClick={() => setEmpShow(false)}
                      className={style.eye}
                    />
                  </div>
                ) : (
                  <div className={style.dont_show}>
                    <input
                      type="password"
                      id="password3"
                      ref={emppassEvent}
                      autoComplete="off"
                    />
                    <FontAwesomeIcon
                      icon={faEyeSlash}
                      className={style.eye}
                      onClick={() => setEmpShow(true)}
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
      </>
    )
  );
};

export default BloodBankRegister;
