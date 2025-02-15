import axios from "axios";
import { useEffect, useState } from "react";
import style from "./DonorLoginPage.module.css";
import { useDispatch } from "react-redux";
import { detailsActions } from "../STORE/storeDetails";
import { Link } from "react-router-dom";
import DonorDelete from "./DonorDelete";
import NotAuthenticated from "./NotAuthenticated";

const DonorLoginPage = () => {
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
  dispatch(
    detailsActions.values({
      address,
      age,
      blood_group,
      district,
      donor_id,
      email,
      father_name,
      gender,
      mobile,
      name,
      pincode,
      state,
    })
  );
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:5000/donor")
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(res.data);
          setAddress(res.data.address);
          setAge(res.data.age);
          setBg(res.data.blood_group);
          setDis(res.data.district);
          setId(res.data.donor_id);
          setEmail(res.data.email);
          setFn(res.data.father_name);
          setGen(res.data.gender);
          setMob(res.data.mobile);
          setName(res.data.name);
          setPin(res.data.pincode);
          setState(res.data.state);
          setAuth(true);
        } else {
          console.log("Erroe");
        }
      })
      .catch((err) => {
        console.log(err);
        setAuth(false);
      });
  }, []);

  const handleLogout = () => {
    axios
      .post("http://localhost:5000/donor_logout")
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
          Be a hero in someone's story. Donate blood, and be the reason someone
          smiles again.
        </p>
      </div>
      <div className={style.dashboard}>
        {/* <div className={style.p_details}> */}
          {/* <h4 className={style.p_header}> PERSONAL DETAILS</h4>
          <label htmlFor="name">NAME</label>
          <p id="name">{name}</p>
          <label htmlFor="mobile">NUMBER</label>
          <p id="mobile">{mobile}</p>
          <label htmlFor="age">AGE</label>
          <p id="age">{age}</p>
          <label htmlFor="bg">BLOOD GROUP</label>
          <p>{blood_group}</p> */}
        {/* </div> */}
        <hr />
        <div className={style.buttons}>
          <Link to="/donor">
            <button>HOME</button>
          </Link>
          <Link to="donor/profile">
            <button
              className={profile ? style.prof : style.p}
              onClick={() => setProf(true)}
            >
              PROFILE
            </button>
          </Link>
          <Link to="donor/delete_account">
          <button className={style.da} onClick={() => setConfirm(true)}>
            DELETE ACCOUNT
          </button>
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

export default DonorLoginPage;
