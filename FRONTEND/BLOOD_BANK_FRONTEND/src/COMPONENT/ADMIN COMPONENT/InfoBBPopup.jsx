import style from "./PatientDetails.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect} from "react";
import axios from "axios"
import {
  faEnvelope,
  faBars,
  faXmark,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const InfoBBPopup = (props) => {
    const [bloodDet,setData]=useState([])
    useEffect(()=>{
        const fetchData=async ()=>{
            const values={
                bbid:props.allData.bbid
            }
            const res=await axios.post("http://localhost:5000/admin_blood_details",values)
            try{
                if(res.data.Status==="Success"){
                  console.log(res.data.data)
                    setData(res.data.data)
                }
                else{
                    alert("Error")
                }
            }
            catch(error){
                console.log(error)
            }
        }
        if(props&&props.allData.bbid){
            fetchData()
        }
    },[props.allData.bbid])

    console.log(bloodDet)
  return (
    <>
      {props.popup && (
        <div className={style.container}>
          <div className={style.popup_inner}>
            <div className={style.b}>
              <button
                className={style.wrong_button}
                onClick={() => props.setPopup(false)}
              >
                <FontAwesomeIcon icon={faXmark} flip size="2xl" />
              </button>
              <h1>BLOOD BANK INFORMATION</h1>
            </div>
            <div className={style.box}>
                <label htmlFor="id">BLOOD BANK ID</label>
                <input type="text" id="id" readOnly defaultValue={props.allData.bbid} />
                <label htmlFor="name">BLOOD BANK NAME</label>
                <input type="text" id="name" defaultValue={props.allData.bbb_name} readOnly />
                <label htmlFor="group">PARENT HOSPITAL NAME</label>
                <input
                  id="group"
                  name="group"
                  readOnly
                  defaultValue={props.allData.parent_hs_name}
                />
                <label htmlFor="mobile"> NUMBER</label>
                <input
                  type="tel"
                  id="mobile"
                  defaultValue={props.allData.bb_number}
                  readOnly
                />
                <label htmlFor="email">EMAIL</label>
                <input
                  type="email"
                  id="email"
                  defaultValue={props.allData.bb_email}
                  readOnly
                />
              </div>
              <div className={style.bb_personal_details}>
                <p>BLOOD BANK DETAILS</p>
              </div>
              <div className={style.box}>
                <label htmlFor="state">STATE</label>
                <input
                  type="text"
                  id="state"
                  defaultValue={"KARNATAKA"}
                  autoCapitalize="on"
                  readOnly
                />
                <label htmlFor="district">DISTRICT</label>
                <input
                  name="district"
                  id="district"
                  readOnly
                  defaultValue={props.allData.state}
                  autoCapitalize="on"
                />
                <label htmlFor="address">STREET ADDRESS/CITY</label>
                <input
                  type="text"
                  id="address"
                    readOnly
                    defaultValue={props.allData.city}
                  autoCapitalize="on"
                />
                <label htmlFor="pincode">PINCODE</label>
                <input
                  type="tel"
                  id="pincode"
                  readOnly
                  defaultValue={props.allData.pincode}
                />
              </div>
              <div className={style.pat_address}>
                <p>ADDRESS</p>
              </div>
              <div className={style.box}>
                <label htmlFor="address1">ADDRESS 1</label>
                <input
                  type="text"
                  id="address1"
                  readOnly
                  defaultValue={props.allData.address1}
                  autoCapitalize="on"
                />
                <label htmlFor="address2">ADDRESS 2</label>
                <input
                  type="text"
                  id="address2"
                  readOnly
                  defaultValue={props.allData.address2}
                  autoCapitalize="on"
                />
                <label htmlFor="pincode">PINCODE</label>
                <input
                  type="tel"
                  id="pincode"
                    readOnly
                    defaultValue={props.allData.pincode}
                 
                />
              </div>
              <div className={style.bb_postal_details}>
                <p>POSTAL ADDRESS</p>
              </div>
              <div className={style.box}>
                <label htmlFor="empid">EMPLOYEE ID</label>
                <input type="text" id="empid" defaultValue={props.allData.emp_id} readOnly />
                <label htmlFor="empname">EMPLOYEE NAME</label>
                <input
                  type="text"
                  id="empname"
                  readOnly
                  defaultValue={props.allData.emp_name}
                  autoCapitalize="on"
                />
                <label htmlFor="empemail">EMPLOYEE EMAIL</label>
                <input
                  type="email"
                  id="empemail"
                  readOnly
                  defaultValue={props.allData.emp_email}
                />
                <label htmlFor="empmobile">EMPLOYEE NUMBER</label>
                <input
                  type="tel"
                  id="empmobile"
                  readOnly
                  defaultValue={props.allData.emp_number}
                />
                <label htmlFor="gender">GENDER</label>
                <input name="gender" id="gender" readOnly defaultValue={props.allData.emp_number}                   
                
/>
              </div>
              <div className={style.bb_emp_details}>
                <p> EMPLOYEE DETAILS</p>
              </div>
              <div className={style.box}>
                <table className={style.blood_table}>
                    <thead >
                        <tr>
                            <th>Slno</th>
                            <th>BLOOD NAME</th>
                            <th>BLOOD COUNT</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                {bloodDet.map((data,index)=>(
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{data.blood_name}</td>
                        <td>{data.count}</td>
                    </tr>
                ))}
                    </tbody>
                </table>
              </div>
            </div>
          </div>
      )}
    </>
  );
};

export default InfoBBPopup;
