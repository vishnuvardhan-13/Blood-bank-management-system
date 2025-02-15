import axios from "axios";
import { useEffect, useState } from "react";
import style from "../DonorLoginPage.module.css";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import PatientDelete from "./PatientDelete";
import NotAuthenticated from "../NotAuthenticated";
import { bloodBankDetailsActions } from "../../STORE/bloodBankDetails";
import BloodBankDelete from "./BloodBankDelete";
import { employeeDetailsActions } from "../../STORE/employeeDetails";

const BloodBankLoginPage = () => {
  const dispatch = useDispatch();
  const [bbid, setId] = useState();
  const [state, setState] = useState();
  const [district, setDis] = useState();
  const [city, setCity] = useState();
  const [bbb_name, setName] = useState();
  const [parent_hs_name, setPhsName] = useState();
  const [category, setCat] = useState();
  const [bb_email, setEmail] = useState();
  const [bb_number, setMob] = useState();
  const [address1, setAdd1] = useState();
  const [address2, setAdd2] = useState();
  const [pincode, setPin] = useState();
  const [emp_id, setEmp] = useState();
  const [profile, setProf] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [auth, setAuth] = useState(true);
  const [emp_name,setEName]=useState()
  const [emp_email,setEEmail]=useState()
  const [emp_number,setNum]=useState()
  const [gender,setGen]=useState()
  dispatch(employeeDetailsActions.values({emp_id,emp_name,emp_email,emp_number,bbb_name,bbid,gender}))
  dispatch(
    bloodBankDetailsActions.values({
      bbid,
      state,
      district,
      city,
      bbb_name,
      parent_hs_name,
      category,
      bb_email,
      bb_number,
      address1,
      address2,
      pincode,
      emp_id,
    })
  );

  const getData=async (emp_id)=>{
    const values={
      emp_id:emp_id
    }
    const res= await axios.post("http://localhost:5000/employee_details",values)
    try{
      if(res.data.Status==="Success"){
        setEName(res.data.data[0].emp_name)
        setEEmail(res.data.data[0].emp_email)
        setNum(res.data.data[0].emp_number)
        setGen(res.data.data[0].gender)
      }
    }
    catch(error){
      console.log(error)
    }
  }
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:5000/blood_bank")
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(res.data);
          setId(res.data.bbid),
            setState(res.data.state),
            setDis(res.data.district),
            setCity(res.data.city),
            setName(res.data.bbb_name),
            setPhsName(res.data.parent_hs_name),
            setCat(res.data.category),
            setEmail(res.data.bb_email),
            setMob(res.data.bb_number),
            setAdd1(res.data.address1),
            setAdd2(res.data.address2),
            setPin(res.data.pincode),
            setEmp(res.data.emp_id),
            console.log(res.data);

            getData(res.data.emp_id)
          setAuth(true);
        } else {
          console.log("Error");
        }
      })
      .catch((err) => {
        console.log(err);
        setAuth(false);
      });
  }, []);

  const handleLogout = () => {
    axios
      .post("http://localhost:5000/blood_bank_logout")
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
          <h4 className={style.p_header}> BLOOD BANK DETAILS</h4>
          <label htmlFor="name">NAME</label>
          <p id="name">{bbb_name}</p>
          <label htmlFor="pname">PARENT HOSPITAL NAME</label>
          <p id="pname">{parent_hs_name}</p>
          <label htmlFor="mobile">NUMBER</label>
          <p id="mobile">{bb_number}</p>
        </div> */}
        <hr />
        <div className={style.buttons}>
          <Link to="/blood_bank">
            <button>HOME</button>
          </Link>
          <Link to="blood_bank/profile">
            <button
              className={profile ? style.prof : style.p}
              onClick={() => setProf(true)}
            >
              PROFILE
            </button>
          </Link>
          <Link to="blood_bank/request_donor">
            <button className={style.bb}>DONOR REQUEST</button>
          </Link>
           <Link to="blood_bank/blood_count"><button>BLOOD COUNT</button></Link> 
           <Link to="blood_bank/delete_account">
          <button className={style.da}>
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

export default BloodBankLoginPage;
