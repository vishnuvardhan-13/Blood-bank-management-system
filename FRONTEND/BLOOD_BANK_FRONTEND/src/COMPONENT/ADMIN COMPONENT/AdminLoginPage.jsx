import axios from "axios";
import { useEffect, useState } from "react";
import style from "../DonorLoginPage.module.css";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import NotAuthenticated from "./NotAuthenticated";

const AdminLoginPage = () => {
  const dispatch = useDispatch();
  const [address, setAddress] = useState();
  const [age, setAge] = useState();
  const [blood_group, setBg] = useState();
  const [donor_id, setId] = useState();
  const [email, setEmail] = useState();
  const [district, setDis] = useState();
  const [father_name, setFn] = useState();
  const [gender, setGen] = useState();
  const [mobile, setMob] = useState();
  const [name, setName] = useState();
  const [pincode, setPin] = useState();
  const [state, setState] = useState();
  const [profile, setProf] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [auth, setAuth] = useState(true);
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
  };
  return (
    <>
      <div className={style.navbar}>
        <div className={style.logo}>
          <img src="logo.jpg" alt="logo" />
        </div>
        <p className={style.quote}>
          Be a hero in someone's story. Donate blood, and be the reason someone
          smiles again.
        </p>
      </div>
      <div className={style.dashboard}>
        {/* <div className={style.p_details}>
          <h4 className={style.p_header}> PERSONAL DETAILS</h4>
          <label htmlFor="name">NAME</label>
          <p id="name">ADMIN</p>
          <label htmlFor="mobile">NUMBER</label>
          <p id="mobile">8978675645</p>
          <label htmlFor="bg">BLOOD GROUP</label>
          <p id="bg">O+</p>
        </div> */}
        <hr />
        <div className={style.buttons}>
          <Link to="/admin">
            <button>HOME</button>
          </Link>
          <Link to="admin/patient">
            <button
              className={profile ? style.prof : style.p}
              onClick={() => setProf(true)}
            >
              PATIENT
            </button>
          </Link>
          <Link to="admin/blood_bank">
            <button className={style.da}>BLOOD BANKS</button>
          </Link>
          <Link to="admin/donor">
            <button className={style.da}>DONOR</button>
          </Link>
          <Link to="/">
            <button className={style.lg} onClick={handleLogout}>
              LOGOUT
            </button>
          </Link>
        </div>
      </div>
      {!auth && <NotAuthenticated></NotAuthenticated>}
    </>
  );
};

export default AdminLoginPage;
