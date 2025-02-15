import { useEffect, useState } from "react";
import axios from "axios";
import style from "./DonorRequest.module.css"
import { useSelector } from "react-redux";
import LoadingSpinner from "../LoadingSpinner";
const PatientHome = () => {
  var i = 0;
  var j=0;
  const [donorData, setDonorData] = useState([]);
  const [bloodBankData, setBloodBankData] = useState([]);
  const [spinner,setSpinner]=useState(true)

  const details = useSelector((store) => store.patient_details);
  useEffect(() => {
    const fetchDonorData = async () => {
      setSpinner(true)
      const values = {
        patient_id: details.patient_id,
      };
      try {
        const res = await axios.post(
          "http://localhost:5000/donor_request",
          values
        );
        if (res.data.Status === "Success") {
          setDonorData([])
          setDonorData(res.data.data);
          i = 0;
        }
      } catch (err) {
        console.log(err);
      }
    };

    const fetchBloodBankData = async () => {
      const values = {
        patient_id: details.patient_id,
      };
      try {
        const res = await axios.post(
          "http://localhost:5000/patient_blood_bank_request",
          values
        );
        if (res.data.Status === "Success") {
          setBloodBankData([])
          setBloodBankData(res.data.data);
          j = 0;
          setSpinner(false)
        }
      } catch (err) {
        console.log(err);
      }
    };
    if(details && details.patient_id){
      fetchDonorData()
      fetchBloodBankData()

    }
  }, [details]);
  const handleDonorDelete=(id,name)=>{
    const values={
      patient_id:details.patient_id,
      donor_id:id
    }
    axios.post("http://localhost:5000/donor_request_delete",values)
    .then((res)=>{
      if(res.data.Status==="Success"){
        var newData=donorData.filter(item=>item.name!==name)
        setDonorData(newData)
      }
      else{
        alert("Error")
      }
    })
    .catch((err)=>console.log(err))
  }
  const handleBloodBankrDelete=(id,blood_group,name,unique_id)=>{
    const values={
      patient_id:details.patient_id,
      bb_id:id,
      blood_group:blood_group,
      id:unique_id
    }
    axios.post("http://localhost:5000/bb_request_delete",values)
    .then((res)=>{
      if(res.data.Status==="Success"){
        var newData=bloodBankData.filter(item=>item.id!==unique_id)
        setBloodBankData(newData)
      }
      else{
        alert("Error")
      }
    })
    .catch((err)=>console.log(err))
  }
  return (
    <>{
      spinner? <LoadingSpinner />:
      <div className={style.donor_data}>
        <h3>REQUESTED FOR DONOR</h3>
        {donorData.length > 0 ? (
          <div className={style.donor_container}>
            {donorData.map((data) => (
              <tr key={(i += 1)}>
                <label htmlFor="name">NAME</label>
                <p id="name">{data.name}</p>
                <label htmlFor="bg">BLOOD GROUP</label>
                <p id="bg">{data.blood_group}</p>
                <label htmlFor="gender">GENDER</label>
                <p id="gender">{data.gender}</p>
                <label htmlFor="email">EMAIL</label>
                <p id="email">{data.email}</p>
                {data.status !== "Requested" ? (
                  <div className={style.donor_number}>
                    <label htmlFor="mobile">NUMBER</label>
                    <p id="mobile">{data.mobile}</p>
                  </div>
                ): <p className={style.not_acc}>NOT ACCEPTED BY DONOR</p> }
                 <button className={style.remove} onClick={()=>handleDonorDelete(data.donor_id,data.name)}>REMOVE</button>
              </tr>
            ))}
          </div>
        ) : (
          <h3>NO DATA AVAILABLE</h3>
        )}
        <h3>REQUESTED FOR BLOOD BANK</h3>
        {bloodBankData.length > 0 ? (
          <div className={style.donor_container}>
            {bloodBankData.map((data) => (
              <tr key={(i += 1)}>
                <label htmlFor="bname">NAME</label>
                <p id="bname">{data.bbb_name}</p>
                <label htmlFor="bgender">PARENT HOSPITAL NAME</label>
                <p id="bgender">{data.parent_hs_name}</p>
                <label htmlFor="bbg">BLOOD GROUP</label>
                <p id="bbg">{data.blood_group}</p>
                <label htmlFor="bemail">EMAIL</label>
                <p id="bemail">{data.bb_email}</p>
                <label htmlFor="bmobile">NUMBER</label>
                    <p id="bmobile">{data.bb_number}</p>
                    <button className={style.remove_req} onClick={()=>handleBloodBankrDelete(data.bbid,data.blood_group,data.bbb_name,data.id)}>REMOVE</button>
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

export default PatientHome;
