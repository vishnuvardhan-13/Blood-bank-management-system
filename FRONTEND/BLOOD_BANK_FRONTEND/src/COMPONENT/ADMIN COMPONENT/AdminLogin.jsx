import style from "../DonorLogin.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  faEyeSlash,
  faEye,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import axios from "axios";
const AdminLogin = (props) => {
  const navigate=useNavigate();
  const emailEvent = useRef();
  const passwordEvent = useRef();
  const confirmEvent = useRef();
  const [correct, setCor] = useState(false);
  const [show, setShow] = useState(false);
  const [forgotTrue, setTrue] = useState(false);
  const [noEmail, setNoEmail] = useState(false);
  const [passMatch, setPassMatch] = useState(false);

  const handleEyeClick = () => {
    setShow(true);
  };
  const handleShowEyeClick = () => {
    setShow(false);
  };

  axios.defaults.withCredentials=true
  const handleSubmit = (event) => {
    event.preventDefault();
    const values = {
      email: emailEvent.current.value,
      password: passwordEvent.current.value,
    };
    axios
      .post("http://localhost:5000/admin_login", values)
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log("Success");
          navigate("/admin")
        } 
      })
      .catch((err) => {
        console.log(err.response.data.Error);
        if (err.response.data.Error === "Password not matched") {
          document.getElementById("password").focus();

          setPassMatch(true);
          setNoEmail(false);
        } else if (err.response.data.Error === "No email existed") {
          document.getElementById("username").focus();
          setNoEmail(true);
          setPassMatch(false);
        }
      });
  };
  
  const wrongButton=()=>{
    setNoEmail(false);
    setPassMatch(false);
        props.setALogpopup(false)
  }
  return (
    <>
      {props.alogPopup && (
        <div className={style.container}>
          <div className={style.popup_inner}>
            <div className={style.b}>
              <button
                className={style.wrong_button}
                onClick={wrongButton}
              >
                <FontAwesomeIcon icon={faXmark} flip size="2xl" />
              </button>
              <h1 className={style.header}>ADMIN LOGIN</h1>
            </div>

            <Form method="POST" onSubmit={handleSubmit} className={style.box}>
              <label htmlFor="username">EMAIL</label>
              <div>
                <span className={style.username}>
                  <input type="email" id="username" ref={emailEvent} required />
                  <FontAwesomeIcon className={style.eye} icon={faEnvelope} />
                </span>
                {noEmail && (
                    <p className={style.error}>PLEASE DO REGISTER</p>
                  )}
              </div>
              <label htmlFor="password">PASSWORD</label>
              {show ? (
                <div>
                  <span className={style.dont_show}>
                    <input
                      type="text"
                      id="password"
                      ref={passwordEvent}
                      autoComplete="off"
                    />
                    <FontAwesomeIcon
                      icon={faEye}
                      onClick={handleShowEyeClick}
                      className={style.eye}
                    />
                  </span>
                  {passMatch && (
                    <p className={style.error}>PASSWORD NOT MATCHED</p>
                  )}
                </div>
              ) : (
                <div>
                  <span className={style.dont_show}>
                  <input
                    type="password"
                    id="password"
                    ref={passwordEvent}
                    autoComplete="off"
                  />
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    className={style.eye}
                    onClick={handleEyeClick}
                  />
                </span>
                {passMatch && (
                    <p className={style.error}>PASSWORD NOT MATCHED</p>
                  )}
                </div>
              )}
                <button type="method" className={style.submitButton}>
                  LOGIN
                </button>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminLogin;
