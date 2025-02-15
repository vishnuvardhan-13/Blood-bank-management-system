import express from "express";
import mysql from "mysql";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";

const salt = 10;
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "LAMBUys@94naik",
  database: "blood_bank",
});

db.connect((err, res) => {
  if (err) return console.error("connection error:" + err.stack);
  console.log("connected as id" + db.threadId);
});

const verifyDonor = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ Error: "You are not authenticated" });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        res.status(401).json({ Error: "Token is not correct" });
      } else {
        console.log(decoded);
        (req.donor_id = decoded.donor_id),
          (req.blood_group = decoded.blood_group),
          (req.name = decoded.name),
          (req.age = decoded.age),
          (req.gender = decoded.gender),
          (req.father_name = decoded.father_name),
          (req.mobile = decoded.mobile),
          (req.email = decoded.email),
          (req.state = decoded.state),
          (req.district = decoded.district),
          (req.address = decoded.address),
          (req.pincode = decoded.pincode),
          next();
      }
    });
  }
};

app.get("/donor", verifyDonor, (req, res) => {
  return res.status(200).json({
    Status: "Success",
    donor_id: req.donor_id,
    blood_group: req.blood_group,
    name: req.name,
    age: req.age,
    gender: req.gender,
    father_name: req.father_name,
    mobile: req.mobile,
    email: req.email,
    state: req.state,
    district: req.district,
    address: req.address,
    pincode: req.pincode,
  });
});

app.post("/donor_signup", (req, res) => {
  const sql =
    "INSERT INTO donor(`donor_id`,`blood_group`,`name`,`age`,`gender`,`father_name`,`mobile`,`email`,`state`,`district`,`address`,`pincode`,`password`) VALUES (?)";
  bcrypt.hash(req.body.password, salt, (err, hash) => {
    if (err) console.log({ Error: "Error for hashing password" });
    const values = [
      req.body.donor_id,
      req.body.blood_group,
      req.body.name,
      req.body.age,
      req.body.gender,
      req.body.father_name,
      req.body.mobile,
      req.body.email,
      req.body.state,
      req.body.district,
      req.body.address,
      req.body.pincode,
      hash,
    ];
    db.query(sql, [values], (err, dbres) => {
      if (err) {
        return res.status(500).json({ Error: err });
      } else {
        return res.status(200).json({ Status: "Success" });
      }
    });
  });
});
app.post("/donor_fgt_pass", (req, res) => {
  console.log(req.body);
  const sql = "UPDATE donor set password=(?) WHERE email=(?)";
  bcrypt.hash(req.body.password, salt, (err, hash) => {
    if (err) console.log({ Error: "Error for hashing password" });
    const values = [hash, req.body.email];
    db.query(sql, values, (err, data) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).json({ Error: err.message });
      } else {
        console.log("Query executed successfully:", data);
        res.status(200).json({ Status: "Success", message: data.message });
      }
    });
  });
});

app.post("/donor_login", (req, res) => {
  const sql =
    "SELECT `donor_id`,`blood_group`,`name`,`age`,`gender`,`father_name`,`mobile`,`email`,`state`,`district`,`address`,`pincode`,`password` FROM donor WHERE email=(?)";
  db.query(sql, [req.body.email], (err, data) => {
    if (err) {
      return res.status(404).json({ Error: err });
    }
    if (data.length > 0) {
      bcrypt.compare(req.body.password, data[0].password, (err, dbres) => {
        if (err) {
          return res.status(404).json({ Error: "Password compare error" });
        }
        if (dbres) {
          const donor_id = data[0].donor_id;
          const blood_group = data[0].blood_group;
          const name = data[0].name;
          const age = data[0].age;
          const gender = data[0].gender;
          const father_name = data[0].father_name;
          const mobile = data[0].mobile;
          const email = data[0].email;
          const state = data[0].state;
          const district = data[0].district;
          const address = data[0].address;
          const pincode = data[0].pincode;
          const token = jwt.sign(
            {
              donor_id,
              blood_group,
              name,
              age,
              gender,
              father_name,
              mobile,
              email,
              state,
              district,
              address,
              pincode,
            },
            "jwt-secret-key",
            { expiresIn: "1d" }
          );
          res.cookie("token", token);
          console.log("Token" + token);
          return res.status(200).json({ Status: "Success" });
        } else {
          return res.status(404).json({ Error: "Password not matched" });
        }
      });
    } else {
      return res.status(404).json({ Error: "No email existed" });
    }
  });
});
app.post("/modify_donor", (req, res) => {
  console.log(req.body);
  const sql =
    "UPDATE donor set blood_group=(?),mobile=(?),email=(?),age=(?) WHERE donor_id=(?)";
  db.query(
    sql,
    [
      req.body.blood_group,
      req.body.mobile,
      req.body.email,
      req.body.age,
      req.body.donor_id,
    ],
    (err, data) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).json({ Error: err.message });
      } else {
        console.log("Query executed successfully:", data);
        res.status(200).json({ Status: "Success" });
      }
    }
  );
});

app.post("/dlt_donor_acc", (req, res) => {
  const donor_id = req.body.donor_id;
  const reason = req.body.issue; // Assuming reason is passed from the frontend
  const improve = req.body.solution; // Assuming improve is passed from the frontend

  // Set session variables to pass parameters to the trigger
  const setSessionVariablesQuery = `
  SELECT @reason := ? AS reason, @improve := ? AS improve;
`;
  db.query(setSessionVariablesQuery, [reason, improve], (err) => {
    if (err) {
      console.error("Error setting session variables:", err);
      res.status(500).json({ Error: "Error setting session variables" });
      return;
    }

    // Execute the delete query
    const deleteQuery = "DELETE FROM donor WHERE donor_id = (?)";
    db.query(deleteQuery, [donor_id], (err, data) => {
      if (err) {
        console.error("Error executing delete query:", err);
        res.status(500).json({ Error: err.message });
      } else {
        console.log("Donor account deleted successfully:", data);
        res.status(200).json({ Status: "Success" });
      }
    });
  });
});

app.post("/request_donor", (req, res) => {
  const sql =
    "INSERT INTO request_donor(`patient_id`,`donor_id`,`status`)  VALUES (?)";
  console.log(req.body);
  const values = [req.body.patient_id, req.body.donor_id, req.body.status];
  db.query(sql, [values], (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ Error: "Duplicate Entry" });
    } else {
      console.log("Query executed successfully:", data);
      res.status(200).json({ Status: "Success" });
    }
  });
});
app.post("/donor_request", (req, res) => {
  const sql = `SELECT d.donor_id, d.blood_group, d.name, d.age, d.gender, d.mobile, d.email, r.status
  FROM donor d
  JOIN request_donor r ON d.donor_id = r.donor_id
  WHERE r.patient_id = (?)`;
  db.query(sql, [req.body.patient_id], (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ Error: "Duplicate Entry" });
    } else {
      console.log("Query executed successfully:", data);
      res.status(200).json({ Status: "Success", data: data });
    }
  });
});
app.post("/donor_details", (req, res) => {
  const sql = `SELECT p.patient_id,p.patient_name,p.patient_num,p.state,p.email,p.gender,p.blood_group,p.age,r.status
  FROM patient_details p
  JOIN request_donor r ON p.patient_id = r.patient_id
  WHERE r.donor_id = (?)`;
  console.log(req.body.donor_id);
  db.query(sql, [req.body.donor_id], (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ Error: "Duplicate Entry" });
    } else {
      console.log("Query executed successfully:", data);
      res.status(200).json({ Status: "Success", data: data });
    }
  });
});
app.post("/all_donor", (req, res) => {
  let values = [req.body.district, req.body.blood_group];
  let sql =
    "SELECT `donor_id`,`blood_group`,`name`,`age`,`gender`,`father_name`,`mobile`,`email`,`state`,`district`,`address`,`pincode` FROM donor WHERE district=(?) AND blood_group=(?)";
  if (values[1] === "all") {
    sql = "SELECT * FROM donor WHERE district=(?)";
    values.splice(1, 1);
  }
  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ Error: err.message });
    } else {
      console.log("Query executed successfully:", data);
      res.status(200).json({ Status: "Success", data: data });
    }
  });
});
app.post("/edit_details", (req, res) => {
  const sql =
    "UPDATE request_donor SET status=(?) WHERE patient_id=(?) AND donor_id=(?)";
  db.query(
    sql,
    ["Accepted", req.body.patient_id, req.body.donor_id],
    (err, data) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).json({ Error: err.message });
      } else {
        console.log("Query executed successfully:", data);
        res.status(200).json({ Status: "Success", data: data });
      }
    }
  );
});
app.post("/donor_logout", (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ Status: "Success" });
});

const verifyPatient = (res, req, next) => {
  const token = res.cookies.token;
  if (!token) {
    res.status(404).json({ Error: "You are not authenticated" });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        res.status(404).json({ Error: "Token is not correct" });
      } else {
        console.log(decoded);
        (res.patient_id = decoded.patient_id),
          (res.patient_name = decoded.patient_name),
          (res.patient_num = decoded.patient_num),
          (res.state = decoded.state),
          (res.district = decoded.district),
          (res.city = decoded.city),
          (res.pincode = decoded.pincode),
          (res.gender = decoded.gender),
          (res.email = decoded.email),
          (res.age = decoded.age),
          (res.blood_group = decoded.blood_group);
        next();
      }
    });
  }
};

app.get("/patient", verifyPatient, (req, res) => {
  return res.status(200).json({
    Status: "Success",
    patient_id: req.patient_id,
    patient_name: req.patient_name,
    patient_num: req.patient_num,
    state: req.state,
    district: req.district,
    city: req.city,
    pincode: req.pincode,
    gender: req.gender,
    email: req.email,
    age: req.age,
    blood_group: req.blood_group,
  });
});

app.post("/patient_signup", (req, res) => {
  const sql =
    "INSERT INTO patient_details(`blood_group`,`age`,`patient_id`,`patient_name`,`patient_num`,`state`,`district`,`city`,`pincode`,`email`,`gender`,`password`) VALUES (?)";
  bcrypt.hash(req.body.password, salt, (err, hash) => {
    if (err) console.log({ Error: "Error for hashing password" });
    const values = [
      req.body.blood_group,
      req.body.age,
      req.body.patient_id,
      req.body.patient_name,
      req.body.patient_num,
      req.body.state,
      req.body.district,
      req.body.city,
      req.body.pincode,
      req.body.email,
      req.body.gender,
      hash,
    ];
    db.query(sql, [values], (err, dbres) => {
      if (err) {
        return res.status(500).json({ Error: err });
      } else {
        return res.status(200).json({ Status: "Success" });
      }
    });
  });
});
app.post("/patient_login", (req, res) => {
  const sql =
    "SELECT `patient_id`,`patient_name`,`patient_num`,`state`,`district`,`city`,`pincode`,`email`,`gender`,`password`,`age`,`blood_group` FROM patient_details WHERE email=(?)";
  db.query(sql, [req.body.email], (err, data) => {
    if (err) {
      return res.status(404).json({ Error: err });
    }
    if (data.length > 0) {
      bcrypt.compare(req.body.password, data[0].password, (err, dbres) => {
        if (err) {
          return res.status(404).json({ Error: "Password compare error" });
        }
        if (dbres) {
          const patient_id = data[0].patient_id;
          const patient_name = data[0].patient_name;
          const patient_num = data[0].patient_num;
          const state = data[0].state;
          const district = data[0].district;
          const city = data[0].city;
          const pincode = data[0].pincode;
          const email = data[0].email;
          const gender = data[0].gender;
          const password = data[0].password;
          const age = data[0].age;
          const blood_group = data[0].blood_group;
          const token = jwt.sign(
            {
              patient_id,
              patient_name,
              patient_num,
              state,
              district,
              city,
              pincode,
              gender,
              email,
              password,
              age,
              blood_group,
            },
            "jwt-secret-key",
            { expiresIn: "1d" }
          );
          res.cookie("token", token);
          return res.status(200).json({ Status: "Success" });
        } else {
          return res.status(404).json({ Error: "Password not matched" });
        }
      });
    } else {
      return res.status(404).json({ Error: "No email existed" });
    }
  });
});
app.post("/modify_patient", (req, res) => {
  const sql =
    "UPDATE patient_details set patient_num=(?),email=(?),age=(?),blood_group=(?) WHERE patient_id=(?)";
  const values = [
    req.body.patient_num,
    req.body.email,
    req.body.age,
    req.body.blood_group,
    req.body.patient_id,
  ];
  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ Error: err.message });
    } else {
      console.log("Query executed successfully:", data);
      res.status(200).json({ Status: "Success" });
    }
  });
});

app.post("/dlt_patient_acc", (req, res) => {
  const reason = req.body.issue; // Assuming reason is passed from the frontend
  const improve = req.body.solution; // Assuming improve is passed from the frontend

  // Set session variables to pass parameters to the trigger
  const setSessionVariablesQuery = `
  SELECT @reason := ? AS reason, @improve := ? AS improve;
`;
  db.query(setSessionVariablesQuery, [reason, improve], (err) => {
    if (err) {
      console.error("Error setting session variables:", err);
      res.status(500).json({ Error: "Error setting session variables" });
      return;
    }

    const sql = "DELETE FROM patient_details WHERE patient_id=(?)";
    console.log(req.body);
    db.query(sql, [req.body.patient_id], (err, data) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).json({ Error: err.message });
      } else {
        console.log("Query executed successfully:", data);
        res.status(200).json({ Status: "Success" });
      }
    });
  });
});
app.post("/patient_fgt_pass", (req, res) => {
  const sql = "UPDATE patient_details set password=(?) WHERE email=(?)";
  bcrypt.hash(req.body.password, salt, (err, hash) => {
    if (err) console.log({ Error: "Error for hashing password" });
    const values = [hash, req.body.email];
    console.log(values);
    db.query(sql, values, (err, data) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).json({ Error: err.message });
      } else {
        console.log("Query executed successfully:", data);
        res.status(200).json({ Status: "Success", message: data.message });
      }
    });
  });
});

app.post("/request_patient", (req, res) => {
  const sql =
    "SELECT `blood_group`,`name`,`age`,`gender`,`mobile`,`email`,`state`,`district`,`address`,`pincode` FROM donor d JOIN dp_request dp ON d.donor_id=dp.donor_id AND patient_id IN(SELECT patient_id FROM patient_details WHERE patient_id=(?))";
  db.query(sql, [req.body.patient_id], (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ Error: err.message });
    } else {
      console.log("Query executed successfully:", data);
      res.status(200).json({ Status: "Success" });
    }
  });
});
app.post("/request_bp", (req, res) => {
  const sql =
    "SELECT state,district,city,bbb_name,parent_hs_name,bb_email,bb_number FROM blood_banks b JOIN request r ON r.bbid=b.bbid AND r.patient_id IN(SELECT patient_id FROM patient_details WHERE patient_id=(?))";
  db.query(sql, [req.body.patient_id], (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ Error: err.message });
    } else {
      console.log("Query executed successfully:", data);
      res.status(200).json({ Status: "Success" });
    }
  });
});
app.post("/patient_logout", (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ Status: "Success" });
});

app.post("/bb_signup", (req, res) => {
  const sql =
    "INSERT INTO blood_banks(`bbid`,`state`,`district`,`city`,`bbb_name`,`parent_hs_name`,`category`,`bb_email`,`bb_number`,`address1`,`address2`,`pincode`,`password`) VALUES (?)";
  bcrypt.hash(req.body.password, salt, (err, hash) => {
    if (err) console.log({ Error: "Error for hashing password" });
    const values = [
      req.body.bb_id,
      req.body.state,
      req.body.district,
      req.body.city,
      req.body.bbb_name,
      req.body.parent_hs_name,
      req.body.category,
      req.body.bb_email,
      req.body.bb_number,
      req.body.address1,
      req.body.address2,
      req.body.pincode,
      hash,
    ];
    db.query(sql, [values], (err, dbres) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ Error: err });
      } else {
        return res.status(200).json({ Status: "Success" });
      }
    });
  });
});
const verifyBloodBank = (res, req, next) => {
  const token = res.cookies.token;
  if (!token) {
    res.status(404).json({ Error: "You are not authenticated" });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        res.status(404).json({ Error: "Token is not correct" });
      } else {
        console.log(decoded);
        (res.bbid = decoded.bbid),
          (res.state = decoded.state),
          (res.district = decoded.district),
          (res.city = decoded.city),
          (res.bbb_name = decoded.bbb_name),
          (res.parent_hs_name = decoded.parent_hs_name),
          (res.category = decoded.category),
          (res.bb_email = decoded.bb_email),
          (res.bb_number = decoded.bb_number),
          (res.address1 = decoded.address1),
          (res.address2 = decoded.address2),
          (res.pincode = decoded.pincode),
          (res.emp_id = decoded.emp_id),
          next();
      }
    });
  }
};

app.get("/blood_bank", verifyBloodBank, (req, res) => {
  return res.status(200).json({
    Status: "Success",
    bbid: req.bbid,
    state: req.state,
    district: req.district,
    city: req.city,
    bbb_name: req.bbb_name,
    parent_hs_name: req.parent_hs_name,
    category: req.category,
    bb_email: req.bb_email,
    bb_number: req.bb_number,
    address1: req.address1,
    address2: req.address2,
    pincode: req.pincode,
    emp_id: req.emp_id,
  });
});

app.post("/blood_bank_login", (req, res) => {
  const sql =
    "SELECT `bbid`,`state`,`district`,`city`,`bbb_name`,`parent_hs_name`,`category`,`bb_email`,`bb_number`,`address1`,`address2`,`pincode`,`emp_id`,`password` FROM blood_banks WHERE bb_email=(?)";
  db.query(sql, [req.body.email], (err, data) => {
    if (err) {
      return res.status(404).json({ Error: err });
    }
    if (data.length > 0) {
      bcrypt.compare(req.body.password, data[0].password, (err, dbres) => {
        if (err) {
          return res.status(404).json({ Error: "Password compare error" });
        }
        if (dbres) {
          const bbid = data[0].bbid;
          const state = data[0].state;
          const district = data[0].district;
          const city = data[0].city;
          const bbb_name = data[0].bbb_name;
          const parent_hs_name = data[0].parent_hs_name;
          const category = data[0].category;
          const bb_email = data[0].bb_email;
          const bb_number = data[0].bb_number;
          const address1 = data[0].address1;
          const address2 = data[0].address2;
          const pincode = data[0].pincode;
          const emp_id = data[0].emp_id;
          const password = data[0].password;

          const token = jwt.sign(
            {
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
              password,
            },
            "jwt-secret-key",
            { expiresIn: "1d" }
          );
          res.cookie("token", token);
          console.log("success");
          return res.status(200).json({ Status: "Success" });
        } else {
          return res.status(404).json({ Error: "Password not matched" });
        }
      });
    } else {
      return res.status(404).json({ Error: "No email existed" });
    }
  });
});
app.post("/bb_fgt_pass", (req, res) => {
  const sql = "UPDATE blood_banks set password=(?) WHERE bb_email=(?)";
  bcrypt.hash(req.body.password, salt, (err, hash) => {
    if (err) console.log({ Error: "Error for hashing password" });
    const values = [hash, req.body.email];
    console.log(values);
    db.query(sql, values, (err, data) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).json({ Error: err.message });
      } else {
        console.log("Query executed successfully:", data);
        res.status(200).json({ Status: "Success", message: data.message });
      }
    });
  });
});
app.post("/modify_blood_bank", (req, res) => {
  const sql =
    "UPDATE blood_banks set bb_number=(?),bb_email=(?) WHERE bbid=(?)";
  const values = [req.body.bb_number, req.body.bb_email, req.body.bbid];
  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ Error: err.message });
    } else {
      console.log("Query executed successfully:", data);
      res.status(200).json({ Status: "Success" });
    }
  });
});
app.post("/dlt_bb_acc", (req, res) => {
  const reason = req.body.issue; // Assuming reason is passed from the frontend
  const improve = req.body.solution; // Assuming improve is passed from the frontend

  // Set session variables to pass parameters to the trigger
  const setSessionVariablesQuery = `
  SELECT @reason := ? AS reason, @improve := ? AS improve;
`;
  db.query(setSessionVariablesQuery, [reason, improve], (err) => {
    if (err) {
      console.error("Error setting session variables:", err);
      res.status(500).json({ Error: "Error setting session variables" });
      return;
    }
    const sql = "DELETE FROM blood_banks WHERE bbid=(?)";
    db.query(sql, [req.body.bbid], (err, data) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).json({ Error: err.message });
      } else {
        console.log("Query executed successfully:", data);
        res.status(200).json({ Status: "Success" });
      }
    });
  });
});
app.post("/bb_request_donor", (req, res) => {
  const sql =
    "INSERT INTO request_db(`bbid`,`donor_id`,`status`,`blood_group`)  VALUES (?)";
  console.log(req.body);
  const values = [
    req.body.bbid,
    req.body.donor_id,
    req.body.status,
    req.body.blood_group,
  ];
  db.query(sql, [values], (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ Error: "Duplicate Entry" });
    } else {
      console.log("Query executed successfully:", data);
      res.status(200).json({ Status: "Success" });
    }
  });
});
app.post("/blood_bank_request", (req, res) => {
  const sql = `SELECT d.donor_id, d.blood_group, d.name, d.age, d.gender, d.mobile, d.email, r.status
  FROM donor d
  JOIN request_db r ON d.donor_id = r.donor_id
  WHERE r.bbid = (?)`;
  db.query(sql, [req.body.bbid], (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ Error: "Duplicate Entry" });
    } else {
      console.log("Query executed successfully:", data);
      res.status(200).json({ Status: "Success", data: data });
    }
  });
});
app.post("/blood_bank_request_delete", (req, res) => {
  const sql = `DELETE FROM request_db WHERE donor_id=(?) AND bbid=(?)`;
  db.query(sql, [req.body.donor_id, req.body.bbid], (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ Error: "Duplicate Entry" });
    } else {
      console.log("Query executed successfully:", data);
      res.status(200).json({ Status: "Success", data: data });
    }
  });
});

app.post("/blood_bank_logout", (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ Status: "Success" });
});

app.post("/employee_signup", (req, res) => {
  const sql =
    "INSERT INTO employee(emp_id,emp_name,emp_email,emp_number,bb_name,bbid,gender,password) VALUES (?)";
  bcrypt.hash(req.body.password, salt, (err, hash) => {
    if (err) console.log({ Error: "Error for hashing password" });
    const values = [
      req.body.emp_id,
      req.body.emp_name,
      req.body.emp_email,
      req.body.emp_number,
      req.body.bb_name,
      req.body.bbid,
      req.body.gender,
      hash,
    ];
    db.query(sql, [values], (err, dbres) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ Error: err });
      } else {
        return res.status(200).json({ Status: "Success" });
      }
    });
  });
});

app.post("/blood_details", (req, res) => {
  console.log("blood_details");
  const values = req.body.map((obj) => [obj.bb_id, obj.blood_name, obj.count]);
  const sql =
    "INSERT INTO blood_details (`bb_id`,`blood_name`,`count`) VALUES ?";

  db.query(sql, [values], (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: "Error inserting data" });
    }
    return res.status(200).json({ message: "Data inserted successfully" });
  });
});
app.post("/update_empid", (req, res) => {
  const sql = "UPDATE blood_banks SET emp_id=(?) WHERE bbid=(?)";
  db.query(sql, [req.body.emp_id, req.body.bb_id], (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: "Error inserting data" });
    }
    return res.status(200).json({ message: "Data inserted successfully" });
  });
});
app.post("/blood_bank_details", (req, res) => {
  let sql =
    "SELECT * FROM blood_banks WHERE district=(?) AND bbid IN (SELECT bb_id FROM blood_details WHERE blood_name=(?) AND count>0)";
  let values = [req.body.district, req.body.blood_group];
  if (values[1] === "all") {
    sql =
      "SELECT * FROM blood_banks bb JOIN blood_details bd ON bb.bbid=bd.bb_id AND bd.count>0";
    values.splice(1, 1);
  }
  console.log(values);
  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ Error: "Duplicate Entry" });
    } else {
      console.log("Query executed successfully:", data);
      res.status(200).json({ Status: "Success", data: data });
    }
  });
});

app.post("/request_blood_bank", (req, res) => {
  const sql =
    "INSERT INTO request(`patient_id`,`bbid`,`status`,`blood_group`,`id`)  VALUES (?)";
  console.log(req.body);
  const values = [
    req.body.patient_id,
    req.body.bb_id,
    req.body.status,
    req.body.blood_group,
    req.body.id,
  ];
  db.query(sql, [values], (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ Error: "Duplicate Entry" });
    } else {
      console.log("Query executed successfully:", data);
      res.status(200).json({ Status: "Success" });
    }
  });
});
app.post("/patient_blood_bank_request", (req, res) => {
  const sql = `SELECT b.bbid,b.bbb_name,b.parent_hs_name,b.category,b.bb_email,b.bb_number,r.status,r.blood_group,r.id
  FROM blood_banks b
  JOIN request r ON b.bbid = r.bbid
  WHERE r.patient_id = (?)`;
  db.query(sql, [req.body.patient_id], (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ Error: "Duplicate Entry" });
    } else {
      console.log("Query executed successfully:", data);
      res.status(200).json({ Status: "Success", data: data });
    }
  });
});
app.post("/donor_request_delete", (req, res) => {
  const sql = `DELETE FROM request_donor WHERE donor_id=(?) AND patient_id=(?)`;
  db.query(sql, [req.body.donor_id, req.body.patient_id], (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ Error: "Duplicate Entry" });
    } else {
      console.log("Query executed successfully:", data);
      res.status(200).json({ Status: "Success", data: data });
    }
  });
});
app.post("/bb_request_delete", (req, res) => {
  console.log("yess");
  const sql = `DELETE FROM request WHERE patient_id = (?) AND bbid = (?) AND blood_group = (?)`;
  console.log(req.body);
  db.query(
    sql,
    [req.body.patient_id, req.body.bb_id, req.body.blood_group],
    (err, data) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).json({ Error: "Duplicate Entry" });
      } else {
        console.log("Query executed successfully:", data);
        res.status(200).json({ Status: "Success", data: data });
      }
    }
  );
});
app.post("/requested_bb_details", (req, res) => {
  const sql = `SELECT b.bbid,b.district,b.state,b.city,b.bbb_name,b.parent_hs_name,b.category,b.bb_email,b.bb_number,b.address1,b.address2,b.pincode,b.emp_id,r.status,r.blood_group
  FROM blood_banks b
  JOIN request_db r ON b.bbid = r.bbid
  WHERE r.donor_id = (?)`;
  console.log(req.body.donor_id);
  db.query(sql, [req.body.donor_id], (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ Error: "Duplicate Entry" });
    } else {
      console.log("Query executed successfully:", data);
      res.status(200).json({ Status: "Success", data: data });
    }
  });
});
app.post("/edit_blood_bank_details", (req, res) => {
  const sql =
    "UPDATE request_db SET status=(?) WHERE bbid=(?) AND donor_id=(?)";
  db.query(sql, ["Accepted", req.body.bbid, req.body.donor_id], (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ Error: err.message });
    } else {
      console.log("Query executed successfully:", data);
      res.status(200).json({ Status: "Success", data: data });
    }
  });
});
const verifyEmployee = (res, req, next) => {
  const token = res.cookies.token;
  if (!token) {
    res.status(404).json({ Error: "You are not authenticated" });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        res.status(404).json({ Error: "Token is not correct" });
      } else {
        console.log(decoded);
        (res.emp_id = decoded.emp_id),
          (res.emp_name = decoded.emp_name),
          (res.emp_email = decoded.emp_email),
          (res.emp_number = decoded.emp_number),
          (res.bb_name = decoded.bb_name),
          (res.bbid = decoded.bbid),
          (res.gender = decoded.gender),
          next();
      }
    });
  }
};

app.get("/employee", verifyEmployee, (req, res) => {
  return res.status(200).json({
    Status: "Success",
    emp_id: req.emp_id,
    emp_name: req.emp_name,
    emp_email: req.emp_email,
    emp_number: req.emp_number,
    bb_name: req.bb_name,
    bbid: req.bbid,
    gender: req.gender,
  });
});

app.post("/employee_login", (req, res) => {
  console.log(req.body);
  const sql =
    "SELECT `emp_id`,`emp_name`,`emp_email`,`emp_number`,`bb_name`,`bbid`,`gender`,`password` FROM employee WHERE emp_email=(?)";
  db.query(sql, [req.body.email], (err, data) => {
    if (err) {
      return res.status(404).json({ Error: err });
    }
    if (data.length > 0) {
      bcrypt.compare(req.body.password, data[0].password, (err, dbres) => {
        if (err) {
          return res.status(404).json({ Error: "Password compare error" });
        }
        if (dbres) {
          const emp_id = data[0].emp_id;
          const emp_name = data[0].emp_name;
          const emp_email = data[0].emp_email;
          const emp_number = data[0].emp_number;
          const bb_name = data[0].bb_name;
          const bbid = data[0].bbid;
          const password = data[0].password;
          const gender = data[0].gender;
          const token = jwt.sign(
            {
              emp_id,
              emp_name,
              emp_email,
              emp_number,
              bb_name,
              bbid,
              password,
              gender,
            },
            "jwt-secret-key",
            { expiresIn: "1d" }
          );
          res.cookie("token", token);
          console.log("success");
          return res.status(200).json({ Status: "Success" });
        } else {
          return res.status(404).json({ Error: "Password not matched" });
        }
      });
    } else {
      return res.status(404).json({ Error: "No email existed" });
    }
  });
});
app.post("/emp_fgt_pass", (req, res) => {
  const sql = "UPDATE employee set password=(?) WHERE emp_email=(?)";
  bcrypt.hash(req.body.password, salt, (err, hash) => {
    if (err) console.log({ Error: "Error for hashing password" });
    const values = [hash, req.body.email];
    console.log(values);
    db.query(sql, values, (err, data) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).json({ Error: err.message });
      } else {
        console.log("Query executed successfully:", data);
        res.status(200).json({ Status: "Success", message: data.message });
      }
    });
  });
});
app.post("/employee_details", (req, res) => {
  const sql =
    "SELECT `emp_id`,`emp_name`,`emp_email`,`emp_number`,`bb_name`,`bbid`,`gender` FROM employee WHERE emp_id=(?)";
  db.query(sql, [req.body.emp_id], (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ Error: err.message });
    } else {
      console.log("Query executed successfully:", data);
      res.status(200).json({ Status: "Success", data: data });
    }
  });
});
app.post("/get_blood_details", (req, res) => {
  const sql =
    "SELECT `bb_id`,`blood_name`,`count` FROM blood_details WHERE bb_id=(?)";
  db.query(sql, [req.body.bbid], (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ Error: err.message });
    } else {
      console.log("Query executed successfully:", data);
      res.status(200).json({ Status: "Success", data: data });
    }
  });
});
app.post("/edit_blood_details", (req, res) => {
  console.log("blood_details");

  const updates = req.body;
  updates.forEach((update) => {
    const { blood_name, count, bb_id } = update;
    console.log(update);
    console.log(blood_name, count, bb_id);
    const sql = `
    UPDATE blood_details 
    SET count = ?
    WHERE blood_name = ? AND bb_id= ?
  `;
    db.query(sql, [count, blood_name, bb_id], (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: "Error inserting data" });
      }
    });
  });
  return res
    .status(200)
    .json({ Status: "Success", message: "Data inserted successfully" });
});
app.post("/admin_login", (req, res) => {
  if (
    req.body.password === "1" &&
    req.body.email === "lambodarnaik@gmail.com"
  ) {
    return res.status(200).json({ Status: "Success" });
  } else if (req.body.email !== "lambodarnaik@gmail.com") {
    return res.status(401).json({ Error: "No email existed" });
  } else {
    return res.status(401).json({ Error: "Password not matched" });
  }
});
app.get("/admin_patient_details", (req, res) => {
  const sql =
    "SELECT `patient_id`,`patient_name`,`patient_num`,`state`,`district`,`city`,`pincode`,`email`,`gender`,`age`,`blood_group` FROM patient_details";
  db.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Error retrieving data" });
    } else {
      console.log(data);
      return res.status(200).json({ Status: "Success", data: data });
    }
  });
});
app.get("/admin_blood_bank_details", (req, res) => {
  const sql =
    "SELECT b.*,e.* FROM blood_banks b JOIN employee e ON b.bbid=e.bbid";
  db.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Error retrieving data" });
    } else {
      console.log(data);
      return res.status(200).json({ Status: "Success", data: data });
    }
  });
});
app.post("/admin_blood_details", (req, res) => {
  console.log(req.body);
  const sql = "SELECT * FROM blood_details WHERE bb_id=(?)";
  db.query(sql, [req.body.bbid], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Error retrieving data" });
    } else {
      console.log(data);
      return res.status(200).json({ Status: "Success", data: data });
    }
  });
});
app.get("/admin_donor_details", (req, res) => {
  const sql = "SELECT * FROM donor";
  db.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Error retrieving data" });
    } else {
      console.log(data);
      return res.status(200).json({ Status: "Success", data: data });
    }
  });
});
app.get("/deleted_acc", (req, res) => {
  // Define your queries
  const bloodBankQuery = "SELECT * FROM blood_bank_view";
  const donorQuery = "SELECT * FROM donor_view";
  const patientQuery = "SELECT * FROM patient_view";

  // Execute the queries in parallel
  db.query(bloodBankQuery, (err, bloodBankData) => {
    if (err) {
      console.error("Error executing blood bank query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    // Handle blood bank data

    db.query(donorQuery, (err, donorData) => {
      if (err) {
        console.error("Error executing donor query:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      // Handle donor data

      db.query(patientQuery, (err, patientData) => {
        if (err) {
          console.error("Error executing patient query:", err);
          res.status(500).json({ error: "Internal server error" });
          return;
        }
        // Handle patient data

        // Send all data back to the client
        if (
          bloodBankData.length > 0 ||
          donorData.length > 0 ||
          patientData.length > 0
        ) {
          res
            .status(200)
            .json({
              Status: "Success",
              bloodBankData: bloodBankData,
              donorData: donorData,
              patientData: patientData,
            });
        } else {
          res.status(200).json({
            Status: "No data available",
          });
        }
      });
    });
  });
});
app.get("/apply_trigger", (req, res) => {
  const sql = "SELECT * FROM deleted_accounts";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error executing patient query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    } else if (data.length > 0) {
      res.status(200).json({ Status: "Success", data: data });
    } else if (data.length < 0) {
      res.status(200).json({
        Status: "No data available",
      });
    }
  });
});
app.post("/delete_account", (req, res) => {
  const deleteQuery = "DELETE FROM deleted_accounts WHERE id = (?)";
  db.query(deleteQuery, [req.body.id], (err, data) => {
    if (err) {
      console.error("Error executing delete query:", err);
      res.status(500).json({ Error: err.message });
    } else {
      console.log("account deleted successfully:", data);
      res.status(200).json({ Status: "Success" });
    }
  });
});

app.listen(5000, () => {
  console.log("App listening port 5000.....");
});
