import { useDispatch, useSelector } from "react-redux";
import style from "../DonorLoginPage.module.css";
import { Form, useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
import { bloodBankDetailsActions } from "../../STORE/bloodBankDetails";

const BloodBankProfile = () => {
  const details = useSelector((store) => store.blood_bank_details);
  const empDetails=useSelector((store)=>store.employee_details)
  console.log('details\n')
  console.log(details)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(details);
  const mobileEvent = useRef();
  const emailEvent = useRef();
  const handleSubmit = (event) => {
    event.preventDefault();
    const bb_number = mobileEvent.current.value;
    const bb_email = emailEvent.current.value;
    if (
      bb_number === details.bb_number &&
      bb_email === details.bb_email
    ) {
      alert("Please change the value");
    } else {
      const values = {
        bb_number,
        bb_email,
        bbid: details.bbid,
      };
      axios
        .post("http://localhost:5000/modify_blood_bank", values)
        .then((res) => {
          if (res.data.Status === "Success") {
            console.log("Success");
            dispatch(
              bloodBankDetailsActions.update({bb_number,bb_email})
            );
            navigate("/blood_bank");
          } else {
            alert("Error");
          }
        })
        .catch((err) => {
          console.log(err.response.data.Error);
        });
    }
  };
  return (
    <>
      <div className={style.bbeDetails}>
        <Form className={style.profile} onSubmit={handleSubmit}>
          <label htmlFor="name">BLOOD BANK NAME</label>
          <input
            className={style.readClass}
            type="text"
            id="name"
            name="name"
            defaultValue={details.bbb_name}
            readOnly
          />
          <label htmlFor="pname">PARENT HOSPITAL NAME</label>
          <input
            className={style.readClass}
            type="text"
            id="pname"
            name="pname"
            defaultValue={details.parent_hs_name}
            readOnly
          />
          <label htmlFor="gen">CATEGORY</label>
          <input
            className={style.readClass}
            type="text"
            id="gen"
            name="gen"
            defaultValue={details.category}
            readOnly
          />
          <label htmlFor="state">STATE</label>
          <input
            className={style.readClass}
            type="text"
            id="state"
            name="state"
            defaultValue={details.state}
            readOnly
          />
          <label htmlFor="dis">DISTRICT</label>
          <input
            className={style.readClass}
            type="text"
            id="dis"
            name="dis"
            defaultValue={details.district}
            readOnly
          />
          <label htmlFor="add">CITY</label>
          <input
            className={style.readClass}
            type="text"
            id="add"
            name="add"
            defaultValue={details.city}
            readOnly
          />
          <label htmlFor="bg">ADDRESS1</label>
          <input
            className={style.readClass}
            type="text"
            id="bg"
            name="bg"
            defaultValue={details.address1}
            readOnly
          />
        <label htmlFor="age">ADDRESS2</label>
          <input
            type="text"
            className={style.readClass}
            id="age"
            name="age"
            defaultValue={details.address2}
            readOnly
          />
          <label htmlFor="pin">PINCODE</label>
          <input
            className={style.readClass}
            type="number"
            id="pin"
            name="pin"
            defaultValue={details.pincode}
            readOnly
          />
           <label htmlFor="ename">EMPLOYEE NAME</label>
          <input
            className={style.readClass}
            type="text"
            id="ename"
            name="ename"
            defaultValue={empDetails.emp_name}
            readOnly
          />
            <label htmlFor="eemail">EMPLOYEE EMAIL</label>
          <input
            className={style.readClass}
            type="email"
            id="eemail"
            name="eemail"
            defaultValue={empDetails.emp_email}
            readOnly
          />
          <label htmlFor="eemail">EMPLOYEE NUMBER</label>
          <input
            className={style.readClass}
            type="number"
            id="enum"
            name="enum"
            defaultValue={empDetails.emp_number}
            readOnly
          />
          <label htmlFor="mobile">BLOOD BANK MOBILE NUMBER</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            pattern="[0-9]{10}"
            defaultValue={details.bb_number}
            required
            autoComplete="off"
            ref={mobileEvent}
          />
          <label htmlFor="email">BLOOD BANK EMAIL</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            defaultValue={details.bb_email}
            autoComplete="off"
            ref={emailEvent}
          />
          <button type="method" className={style.update}>
            UPDATE
          </button>
        </Form>
      </div>
    </>
  );
};

export default BloodBankProfile;
