import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import style from "./Bloodcount.module.css";

const BloodCount = () => {
  const [bloodDetails, setData] = useState([]);
  const details = useSelector((store) => store.blood_bank_details);
  var i = 0;
  
  useEffect(() => {
    const fetchData = () => {
      const values = {
        bbid: details.bbid,
      };
      axios
        .post("http://localhost:5000/get_blood_details", values)
        .then((res) => {
          if (res.data.Status === "Success") {
            setData(res.data.data);
          } else {
            alert("Error");
          }
        })
        .catch((err) => console.log(err));
    };
    if (details && details.bbid) {
      fetchData();
    }
  }, [details]);

  const handleUpdate=()=>{
    console.log(bloodDetails)
    const newValues=[...bloodDetails]
    axios.post("http://localhost:5000/edit_blood_details", newValues)
    .then((res) => {
        if (res.data.Status === "Success") {
          alert("Data Updated")
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  }
  const handleChange=(newValue,index)=>{
    const updatedBloodDetails = [...bloodDetails];
    updatedBloodDetails[index].count = Number(newValue);
    setData(updatedBloodDetails);
  }
  return (
    <>
      {bloodDetails.length > 0 && (
        <div className={style.blood_table}>
          <table>
            <thead className={style.blood_header}>
              <tr>
                <th>Slno</th>
                <th>BLOOD NAME</th>
                <th>BLOOD COUNT(UNIT)</th>
              </tr>
            </thead>
            <tbody className={style.blood_count}>
              {bloodDetails.map((data,index) => (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{data.blood_name}</td>
                  <td>
                    <input type="number" min="0" defaultValue={data.count} onChange={(event)=>handleChange(event.target.value,index)}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className={style.blood_update} onClick={()=>handleUpdate()}>UPDATE</button>
        </div>
      )}
    </>
  );
};

export default BloodCount;
