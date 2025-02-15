import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";
import { useState,useEffect } from "react";
import DataTable from "react-data-table-component";
import style from "./PatientDetails.module.css"
import DeletedPopup from "./DeletedPopup";

const AdminHome = () => {
    const [popup,setPopup]=useState(false)
    const [allData,setAllData]=useState([])
    const [donorData,setDonor]=useState([])
    const [bloodBankData,setBloodBank]=useState([])
    const [patientData,setPatient]=useState([])
    const [deletedData,setDeletedData]=useState([])
    const [spinner,setSpinner]=useState(true)
    const [message,setMessage]=useState("")
    const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(6);

  const fetchData=async ()=>{
    setSpinner(true)
const res=await axios.get("http://localhost:5000/deleted_acc")
    try{
        if(res.data.Status==="Success"){
            setDonor(res.data.donorData)
            setBloodBank(res.data.bloodBankData)
            setPatient(res.data.patientData)
            setSpinner(false)
            console.log(res.data.donorData)
        }
        else{
            setMessage(res.data.Status)
            setSpinner(false)
        }
    }
    catch(error){
        console.log(error)
    }
}
  const fetchDeltedData=async ()=>{
    setSpinner(true)
    const res=await axios.get("http://localhost:5000/apply_trigger")
        try{
            if(res.data.Status==="Success"){
                setDeletedData(res.data.data)
                setSpinner(false)
            }
            else{
                setMessage(res.data.Status)
                setSpinner(false)
            }
        }
        catch(error){
            console.log(error)
        }
  }
  useEffect(() => {
    fetchData()
    fetchDeltedData()
  }, []);
  const column = [
    { name: "ID", cell: (row) => row.id },
    { name: "NAME", selector: (row) => row.name },
    { name: "REASON", selector: (row) => row.reason},
    {name:"Information",selector:row=><button className={style.request} onClick={()=>handlePopup(row)}>INFORMATION</button>}
  ];
  const accColumn=[
    {name:"ID",selector:(row)=>row.id},
    {name:"NAME",selector:(row)=>row.name}
  ]
  const customStyle = {
    headRow: {
      style: {
        backgroundColor: "red",
        color: "white",
        fontSize: "16px",
        fontWeight: "600",
      },
    },
    cells: {
      style: {
        fontSize: "15px",
      },
    },
  };
  const handlePopup=(row)=>{
    setPopup(true)
    setAllData(row)
  }
  return (
    <>
    {spinner&& <LoadingSpinner/>}
    {message===""&&<div className={style.deleted_table}>
      <h2>DELETED ACCOUNTS</h2>
      <DataTable
              columns={accColumn}
              data={deletedData}
              pagination
              onChangePage={(page) => setPage(page)}
              onChangeRowsPerPage={(perPage) => setPerPage(perPage)}
              customStyles={customStyle}
            />
        <h2>DELETED BLOOD BANKS ACCOUNT</h2>
            <DataTable
              columns={column}
              data={bloodBankData}
              pagination
              onChangePage={(page) => setPage(page)}
              onChangeRowsPerPage={(perPage) => setPerPage(perPage)}
              customStyles={customStyle}
            />
        <h2>DELETED DONORS ACCOUNT</h2>
            <DataTable
              columns={column}
              data={donorData}
              pagination
              onChangePage={(page) => setPage(page)}
              onChangeRowsPerPage={(perPage) => setPerPage(perPage)}
              customStyles={customStyle}
            />
        <h2>DELETED PATIENTS ACCOUNT</h2>
            <DataTable
              columns={column}
              data={patientData}
              pagination
              onChangePage={(page) => setPage(page)}
              onChangeRowsPerPage={(perPage) => setPerPage(perPage)}
              customStyles={customStyle}
            />
          </div>}
          <DeletedPopup popup={popup} setPopup={setPopup} allData={allData}></DeletedPopup>
        {message!==""&& <div className={style.message}>{message}</div> }
    </>
  );
};

export default AdminHome;
