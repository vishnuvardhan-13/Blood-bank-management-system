import { useEffect, useState } from "react";
import axios from "axios";
import style from "./PATIENT_COMPONENT/DonorRequest.module.css";
import { useSelector } from "react-redux";
import LoadingSpinner from "./LoadingSpinner";
const DonorHome = () => {
  var i = 0;
  var j=0;
  const [donorData, setDonorData] = useState([]);
  const [bbData, setBbData] = useState([]);
  const [spinner,setSpinner]=useState(true)

  const details = useSelector((store) => store.details);
  useEffect(() => {
    if (details && details.donor_id) {
      fetchDonorData();
      fetchBloodBankData();
    }
  }, [details]);
  

  const fetchDonorData = async () => {
    setSpinner(true)
    const values = {
      donor_id:details.donor_id,
    };
    try {
      const res = await axios.post(
        "http://localhost:5000/donor_details",
        values
      );
      if (res.data.Status === "Success") {
        setDonorData(res.data.data);
        i = 0;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBloodBankData=async()=>{
    const values = {
      donor_id:details.donor_id,
    };
    try {
      const res = await axios.post(
        "http://localhost:5000/requested_bb_details",
        values
      );
      if (res.data.Status === "Success") {
        setBbData(res.data.data);
        j = 0;
        setSpinner(false)
      }
    } catch (err) {
      console.log(err);
    }
  }
  const handlePatientReq=(patient_id)=>{
    const values={
        patient_id:patient_id,
        donor_id:details.donor_id
    }
    axios.post("http://localhost:5000/edit_details",values)
    .then((res)=>{
        if(res.data.Status==="Success"){
            fetchDonorData()
            fetchBloodBankData()
        }
        else{
            console.log("Error")
        }

    })
    .catch((err)=>console.log(err))
  }

  const handleBloodBankReq=(bbid)=>{
    const values={
        bbid:bbid,
        donor_id:details.donor_id
    }
    axios.post("http://localhost:5000/edit_blood_bank_details",values)
    .then((res)=>{
        if(res.data.Status==="Success"){
          alert("updated")
            fetchBloodBankData();
        }
        else{
            console.log("Error")
        }

    })
    .catch((err)=>console.log(err))
  }

  return (
    <>
    {
      spinner?<LoadingSpinner className={style.spinner}></LoadingSpinner>:
    
      <div className={style.donor_data}>
        <h3>PATIENT REQUESTED FOR BLOOD</h3>
        {donorData.length > 0 ? (
          <div className={style.donor_container}>
            {donorData.map((data) => (
              <tr key={(i += 1)}>
                <label htmlFor="name">NAME</label>
                <p id="name">{data.patient_name}</p>
                <label htmlFor="bg">BLOOD GROUP</label>
                <p id="bg">{data.blood_group}</p>
                <label htmlFor="gender">GENDER</label>
                <p id="gender">{data.gender}</p>
                <label htmlFor="email">EMAIL</label>
                <p id="email">{data.email}</p>
                <label htmlFor="mobile">NUMBER</label>
                <p id="mobile">{data.patient_num}</p>
                {data.status === "Requested" ? (
                  <div className={style.patient_req_button}>
                    <button onClick={()=>handlePatientReq(data.patient_id)}>ACCEPT</button>
                  </div>
                ) : (
                  <div className={style.patient_req_button}>
                    <button>ACCEPTED</button>
                  </div>
                )}
              </tr>
            ))}
          </div>
        ) : (
          <h3>NO DATA AVAILABLE</h3>
        )}
        <h3>BLOOD BANK REQUESTED FOR BLOOD </h3>
        {bbData.length > 0 ? (
          <div className={style.donor_container}>
            {bbData.map((data) => (
              <tr key={(i += 1)}>
                <label htmlFor="name">NAME</label>
                <p id="name">{data.bbb_name}</p>
                <label htmlFor="bg">BLOOD GROUP</label>
                <p id="bg">{data.blood_group.toUpperCase()}</p>
                {/* <label htmlFor="gender">GENDER</label>
                <p id="gender">{data.gender}</p> */}
                <label htmlFor="email">EMAIL</label>
                <p id="email">{data.bb_email}</p>
                <label htmlFor="mobile">NUMBER</label>
                <p id="mobile">{data.bb_number}</p>
                {data.status === "Requested" ? (
                  <div className={style.patient_req_button}>
                    <button onClick={()=>handleBloodBankReq(data.bbid)}>ACCEPT</button>
                  </div>
                ) : (
                  <div className={style.patient_req_button}>
                    <button>ACCEPTED</button>
                  </div>
                )}
              </tr>
            ))}
          </div>
        ) : (
          <h3>NO DATA AVAILABLE</h3>
        )}
      </div>
}
    </>
  );
};

export default DonorHome;
