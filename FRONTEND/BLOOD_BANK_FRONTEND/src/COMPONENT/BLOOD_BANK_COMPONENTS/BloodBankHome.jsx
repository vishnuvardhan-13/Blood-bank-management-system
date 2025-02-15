import { useEffect, useState } from "react";
import axios from "axios";
import style from "../PATIENT_COMPONENT/DonorRequest.module.css"
import { useSelector } from "react-redux";
import LoadingSpinner from "../LoadingSpinner";
const BloodBankHome = () => {
  var i = 0;
  var j=0;
  const [donorData, setDonorData] = useState([]);
  const [bloodBankData, setBloodBankData] = useState([]);
  const [spinner,setSpinner]=useState(true)

  const details = useSelector((store) => store.blood_bank_details);
  useEffect(() => {
    const fetchDonorData = async () => {
      setSpinner(true)
      const values = {
        bbid: details.bbid,
      };
      try {
        const res = await axios.post(
          "http://localhost:5000/blood_bank_request",
          values
        );
        if (res.data.Status === "Success") {
          setDonorData([])
          setDonorData(res.data.data);
          i = 0;
          setSpinner(false)
        }
      } catch (err) {
        console.log(err);
      }
    };
    if(details && details.bbid){
      fetchDonorData()
    }
  }, [details]);
  const handleDonorDelete=(id,name)=>{
    const values={
      bbid:details.bbid,
      donor_id:id
    }
    axios.post("http://localhost:5000/blood_bank_request_delete",values)
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
  return (
    <>
    {
      spinner?<LoadingSpinner />:
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
      </div>
}
    </>
  );
};

export default BloodBankHome;
