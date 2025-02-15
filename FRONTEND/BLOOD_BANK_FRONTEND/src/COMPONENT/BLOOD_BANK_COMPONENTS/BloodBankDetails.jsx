import { useRef } from "react";
import style from "../DonorDetails.module.css";
import { Form, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

const BloodBankDetails = () => {
  const disEvent = useRef();
  const bgEvent = useRef();
  const [records, setRecords] = useState([]);
  const [filterRecords, setFilterRec] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(6);
  const [bg, setBg] = useState();
  var column = [];
  if (bg === "All") {
    column = [
      { name: "ID", cell: (row) => row.id },
      { name: "NAME", selector: (row) => row.bbb_name },
      { name: "HOSPITAL NAME", selector: (row) => row.parent_hs_name },
      { name: "EMAIL", selector: (row) => row.bb_email },
      { name: "BLOOD GROUP", selector: (row) => row.blood_name },
      { name: "BLOOD COUNT(UNIT)", selector: (row) => row.count },
    ];
  } else {
    column = [
      { name: "ID", cell: (row) => row.id },
      { name: "NAME", selector: (row) => row.bbb_name },
      { name: "HOSPITAL NAME", selector: (row) => row.parent_hs_name },
      { name: "EMAIL", selector: (row) => row.bb_email },
    ];
  }
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
  const handleSearch = (event) => {
    event.preventDefault();
    const values = {
      district: disEvent.current.value,
      blood_group: bgEvent.current.value.toLowerCase(),
    };
    setBg(bgEvent.current.value);
    axios
      .post("http://localhost:5000/blood_bank_details", values)
      .then((res) => {
        if (res.data.Status === "Success") {
          setRecords([]);
          const modifyData = res.data.data;
          const newData = modifyData.map((item, index) => ({
            ...item,
            id: index + 1,
          }));
          setRecords(newData);
          setFilterRec(newData);
          console.log(newData);
        } else {
          console.log("Error");
        }
      })
      .catch((err) => console.log(err));
  };
  console.log("data");
  console.log(records);

  const handleFilter = (event) => {
    const newData = filterRecords.filter((row) =>
      row.blood_name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    console.log(newData);
    setRecords(newData);
  };
  return (
    <>
      <div className={style.container}>
        <Form method="POST" onSubmit={handleSearch} className={style.form}>
        <h3 className={style.header}>FOR MAKING REQUEST PLEASE LOGIN</h3>
          <label htmlFor="state">STATE</label>
          <input
            type="text"
            id="state"
            name="state"
            defaultValue="KARNATAKA"
            readOnly
          />
          <label htmlFor="district">DISTRICT</label>
          <select
            name="district"
            ref={disEvent}
            id="district"
            required
            autoComplete="off"
            autoCapitalize="on"
          >
            <option>select</option>
            <option value="bagalkot">Bagalkot</option>
            <option value="ballari">Ballari (Bellary)</option>
            <option value="belagavi">Belagavi (Belgaum)</option>
            <option value="bengaluru-rural">Bengaluru Rural</option>
            <option value="bengaluru-urban">Bengaluru Urban</option>
            <option value="bidar">Bidar</option>
            <option value="chamarajanagar">Chamarajanagar</option>
            <option value="chikballapur">Chikballapur</option>
            <option value="chikkamagaluru">Chikkamagaluru (Chikmagalur)</option>
            <option value="chitradurga">Chitradurga</option>
            <option value="dakshina-kannada">Dakshina Kannada</option>
            <option value="davanagere">Davanagere</option>
            <option value="dharwad">Dharwad</option>
            <option value="gadag">Gadag</option>
            <option value="hassan">Hassan</option>
            <option value="haveri">Haveri</option>
            <option value="kalaburagi">Kalaburagi (Gulbarga)</option>
            <option value="kodagu">Kodagu (Coorg)</option>
            <option value="kolar">Kolar</option>
            <option value="koppal">Koppal</option>
            <option value="mandya">Mandya</option>
            <option value="mysuru">Mysuru (Mysore)</option>
            <option value="raichur">Raichur</option>
            <option value="ramanagara">Ramanagara</option>
            <option value="shivamogga">Shivamogga (Shimoga)</option>
            <option value="tumakuru">Tumakuru (Tumkur)</option>
            <option value="udupi">Udupi</option>
            <option value="uttara-kannada">Uttara Kannada (Karwar)</option>
            <option value="vijayapura">Vijayapura (Bijapur)</option>
            <option value="yadgir">Yadgir</option>
          </select>
          <label htmlFor="bg">BLOODGROUP</label>
          <select name="bg" id="bg" ref={bgEvent} required>
            <option>All</option>
            <option>A-</option>
            <option>A+</option>
            <option>AB-</option>
            <option>AB+</option>
            <option>B-</option>
            <option>O-</option>
            <option>O+</option>
          </select>
          <button type="method" className={style.search_button}>
            SEARCH
          </button>
        </Form>
        {bg !== "All" && records.length > 0 && (
          <div style={{ padding: "10px" }} className={style.data_table}>
            <DataTable
              columns={column}
              data={records}
              pagination
              onChangePage={(page) => setPage(page)}
              onChangeRowsPerPage={(perPage) => setPerPage(perPage)}
              customStyles={customStyle}
            />
          </div>
        )}
        {bg !== "All" && records.length === 0 && <p>BLOOD IS NOT AVAILABLE</p>}
        {bg === "All" && (
          <div style={{ padding: "10px" }} className={style.data_table}>
            <div style={{ display: "flex", justifyContent: "right" }}>
              <input
                type="text"
                placeholder="seach for blood group"
                autoCapitalize="true"
                onChange={handleFilter}
                style={{ width: "320px", padding: "6px 10px" }}
              />
            </div>
            <DataTable
              columns={column}
              data={records}
              pagination
              onChangePage={(page) => setPage(page)}
              onChangeRowsPerPage={(perPage) => setPerPage(perPage)}
              customStyles={customStyle}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default BloodBankDetails;
