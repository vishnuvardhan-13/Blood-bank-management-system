import axios from "axios";
import { useEffect, useState } from "react";
import style from "../DonorLoginPage.module.css";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import PatientDelete from "./PatientDelete";
import { patientDetailsActions } from "../../STORE/patientDetails";
import NotAuthenticated from "../NotAuthenticated";

const PatientLoginPage = () => {
  const dispatch = useDispatch();
  const [city, setAddress] = useState();
  const [age, setAge] = useState();
  const [blood_group, setBg] = useState();
  const [patient_id, setId] = useState();
  const [email, setEmail] = useState();
  const [district, setDis] = useState();
  const [gender, setGen] = useState();
  const [patient_num, setMob] = useState();
  const [patient_name, setName] = useState();
  const [pincode, setPin] = useState();
  const [state, setState] = useState();
  const [profile, setProf] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [auth, setAuth] = useState(true);
  dispatch(
    patientDetailsActions.values({
      city,
      age,
      blood_group,
      district,
      patient_id,
      email,
      gender,
      patient_num,
      patient_name,
      pincode,
      state,
    })
  );
  axios.defaults.withCredentials = true;
  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/patient");
    try {
      if (res.data.Status === "Success") {
        console.log(res.data);
        setAddress(res.data.city);
        setAge(res.data.age);
        setBg(res.data.blood_group);
        setDis(res.data.district);
        setId(res.data.patient_id);
        setEmail(res.data.email);
        setGen(res.data.gender);
        setMob(res.data.patient_num);
        setName(res.data.patient_name);
        setPin(res.data.pincode);
        setState(res.data.state);
        console.log(res.data);
        setAuth(true);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
      setAuth(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    axios
      .post("http://localhost:5000/patient_logout")
      .then((res) => {
        location.reload(true);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className={style.navbar}>
        <div className={style.logo}>
          <img src="logo.jpg" alt="logo" />
        </div>
        <p className={style.quote}>
          Courage doesn't always roar. Sometimes courage is the quiet voice at
          the end of the day saying, 'I will try again tomorrow.
        </p>
      </div>
      <div className={style.dashboard}>
        {/* <div className={style.p_details}>
          <h4 className={style.p_header}> PERSONAL DETAILS</h4>
          <label htmlFor="name">NAME</label>
          <p id="name">{patient_name}</p>
          <label htmlFor="mobile">NUMBER</label>
          <p id="mobile">{patient_num}</p>
          <label htmlFor="age">AGE</label>
          <p id="age">{age}</p>
          <label htmlFor="bg">BLOOD GROUP</label>
          <p id="bg">{blood_group}</p>
        </div> */}
        <hr />
        <div className={style.buttons}>
          <Link to="/patient">
            <button>HOME</button>
          </Link>
          <Link to="patient/profile">
            <button
              className={profile ? style.prof : style.p}
              onClick={() => setProf(true)}
            >
              PROFILE
            </button>
          </Link>
          <Link to="patient/request_blood_bank">
            <button className={style.bb}>BLOOD BANK REQUEST</button>
          </Link>
          <Link to="patient/request_donor">
            <button className={style.bb}>DONOR REQUEST</button>
          </Link>
          <Link to="patient/delete_account">
            <button className={style.da}>DELETE ACCOUNT</button>
          </Link>
          <Link to="/">
            <button className={style.lg} onClick={handleLogout}>
              LOGOUT
            </button>
          </Link>
        </div>
      </div>
      {confirm && (
        <PatientDelete confirm={confirm} setConfirm={setConfirm}>
          DO YOU WANT TO DELETE YOUR ACCOUNT?
        </PatientDelete>
      )}
      {!auth && <NotAuthenticated></NotAuthenticated>}
    </>
  );
};

export default PatientLoginPage;
