import { useDispatch, useSelector } from "react-redux";
import style from "./DonorLoginPage.module.css";
import { Form, useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios"
import { detailsActions } from "../STORE/storeDetails";
const DonorProfile = () => {
  const details = useSelector((store) => store.details);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  console.log("Profile");
  console.log(details);
  const mobileEvent = useRef();
  const emailEvent = useRef();
  const ageEvent = useRef();
  const bgEvent = useRef();
  const handleSubmit = (event) => {
    event.preventDefault();
    const age=ageEvent.current.value
    const mobile=mobileEvent.current.value
    const email=emailEvent.current.value
    const blood_group=bgEvent.current.value
    if(age===details.age && mobile===details.mobile && email===details.email && blood_group===details.blood_group){
        alert("Please change the value")
    }
    else{
        const values={
            age,mobile,email,blood_group,donor_id:details.donor_id
        }
        axios
        .post("http://localhost:5000/modify_donor", values)
        .then((res) => {
          if (res.data.Status === "Success") {
            console.log("Success");
            console.log(age)
            dispatch(detailsActions.update({age,mobile,email,blood_group}))
            navigate("/donor")
          } else {
            alert("Error");
          }
        })
        .catch((err) => {
          console.log(err.response.data.Error);
    })}
  };
  return (
    <>
      <div>
        <Form className={style.profile} onSubmit={handleSubmit}>
          <label htmlFor="name">NAME</label>
          <input
            className={style.readClass}
            type="text"
            id="name"
            name="name"
            defaultValue={details.name}
            readOnly
          />
          <label htmlFor="father_name">FATHER NAME</label>
          <input
            className={style.readClass}
            type="text"
            id="father_name"
            name="father_name"
            defaultValue={details.father_name}
            readOnly
          />
          <label htmlFor="gen">GENDER</label>
          <input
            className={style.readClass}
            type="text"
            id="gen"
            name="gen"
            defaultValue={details.gender}
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
          <label htmlFor="add">ADDRESS</label>
          <input
            className={style.readClass}
            type="text"
            id="add"
            name="add"
            defaultValue={details.address}
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
          <label htmlFor="age">AGE(18-70)</label>
          <input
            type="text"
            pattern="[1-6][9]|[2-6][0-9]|[1-9][8]"
            id="age"
            name="age"
            ref={ageEvent}
            defaultValue={details.age}
            required
          />
          <label htmlFor="mobile">MOBILE NUMBER</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            pattern="[0-9]{10}"
            defaultValue={details.mobile}
            required
            autoComplete="off"
            ref={mobileEvent}
          />
          <label htmlFor="email">EMAIL</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            defaultValue={details.email}
            autoComplete="off"
            ref={emailEvent}
          />
          <label htmlFor="bg">BLOOD GROUP</label>
          <input
            type="text"
            id="bg"
            name="bg"
            defaultValue={details.blood_group}
            required
            ref={bgEvent}
          />
          <button type="method" className={style.update}>
            UPDATE
          </button>
        </Form>
      </div>
    </>
  );
};

export default DonorProfile;
