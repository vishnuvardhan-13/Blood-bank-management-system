import axios from "axios";
import { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import DataTable from "react-data-table-component";
import style from "./PatientDetails.module.css"
import InfoPopup from "./InfoPopup";
const PatientDetails=()=>{
  var i=0;
    const [patientdata,setData]=useState([])
    const [spinner,setSpinner]=useState(true)
    const [page,setPage]=useState(1)
    const [perPage,setPerPage]=useState(6)
    const [popup,setPopup]=useState(false)
    const [allData,setAllData]=useState([])
    const column=[
        {name:"ID",cell:row=>row.patient_id},
        {name:'NAME',selector:row=>row.patient_name},
        {name:'NUMBER',selector:row=>row.patient_num},
        {name:'EMAIL',selector:row=>row.email},
        {name:'GENDER',selector:row=>row.gender},
        {name:"Information",selector:row=><button className={style.request} onClick={()=>handlePopup(row)}>INFORMATION</button>}
      ]

      const customStyle={
        headRow:{
          style:{
            backgroundColor:"red",
            color:"white",
            fontSize:'16px',
            fontWeight:"600"
          }
        },
        cells:{
          style:{
            fontSize:'15px',
          }
        },
    }    
    const handlePopup=(row)=>{
      setPopup(true)
      setAllData(row)
    }
    useEffect(()=>{
        const fetchData=async ()=>{
            console.log("yes")
            setSpinner(true)
            const res=await axios.get("http://localhost:5000/admin_patient_details")
            try{
                if(res.data.Status==="Success"){
                    setData(res.data.data)
                    setSpinner(false)
                }
                else{
                    alert("Error")
                }
            }
            catch(error){
                console.log(error)
            }
        }
        fetchData()
    },[])
    return(
        <>
        {spinner?<LoadingSpinner />:
          <div className={style.patient_table}>
          <DataTable
          columns={column}
          data={patientdata}
          pagination
          onChangePage={page => setPage(page)}
          onChangeRowsPerPage={perPage => setPerPage(perPage)}
          customStyles={customStyle}
        />
        </div> }
        <InfoPopup popup={popup} setPopup={setPopup} allData={allData}></InfoPopup>
        </>
    )
}

export default PatientDetails;