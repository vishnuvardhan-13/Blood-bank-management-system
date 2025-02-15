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
import style from "../DonorLogin.module.css";

const PatientLogin = (props) => {
  const navigate = useNavigate();
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

  axios.defaults.withCredentials = true;
  const handleSubmit = (event) => {
    event.preventDefault();
    const values = {
      email: emailEvent.current.value,
      password: passwordEvent.current.value,
    };
    axios
      .post("http://localhost:5000/patient_login", values)
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log("Success");
          navigate("/patient");
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
  const handleForClick = (event) => {
    event.preventDefault();
    const values = {
      email: emailEvent.current.value,
      password: passwordEvent.current.value,
    };
    if (passwordEvent.current.value !== confirmEvent.current.value) {
      document.getElementById("confirmPass").focus();
      setCor(true);
    } else {
      axios
        .post("http://localhost:5000/patient_fgt_pass", values)
        .then((res) => {
          console.log(res.data);
          if (
            res.data.Status === "Success" &&
            res.data.message !== "(Rows matched: 0  Changed: 0  Warnings: 0"
          ) {
            console.log(res.data.message);
            setTrue(false);
            // setNoEmail(false);
            // setPassMatch(false);
          } else {
            setNoEmail(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const handleOnForgot = () => {
    setTrue(true);
    setCor(false);
    setNoEmail(false);
    setPassMatch(false);

    passwordEvent.current.value = "";
  };
  const wrongButtonClick = () => {
    setNoEmail(false);
    setPassMatch(false);
    props.setPLogpopup(false);
  };
  return (
    <>
      {props.plogPopup && (
        <div className={style.container}>
          <div className={style.popup_inner}>
            <div className={style.b}>
              <button className={style.wrong_button} onClick={wrongButtonClick}>
                <FontAwesomeIcon icon={faXmark} flip size="2xl" />
              </button>
              <h1 className={style.header}>PATIENT LOGIN</h1>
            </div>

            <Form method="POST" onSubmit={handleSubmit} className={style.box}>
              <label htmlFor="username">EMAIL</label>
              <div>
                <span className={style.username}>
                  <input type="email" id="username" ref={emailEvent} required />
                  <FontAwesomeIcon className={style.eye} icon={faEnvelope} />
                </span>
                {noEmail && <p className={style.error}>PLEASE DO REGISTER</p>}
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
              {forgotTrue && (
                <label htmlFor="confirmPass">CONFIRM PASSWORD</label>
              )}
              {forgotTrue && (
                <div className={style.confyPass}>
                  <input
                    type="password"
                    id="confirmPass"
                    name="confirmPass"
                    ref={confirmEvent}
                  />
                  {correct && (
                    <p className={style.passWrong}>YOUR PASSWORD IS WRONG</p>
                  )}
                </div>
              )}

              {forgotTrue ? (
                <button
                  onClick={() => setTrue(false)}
                  className={style.submitButton}
                >
                  LOGIN
                </button>
              ) : (
                <p onClick={handleOnForgot} className={style.forgotPass}>
                  Forgot Password?
                </p>
              )}
              {forgotTrue ? (
                <button className={style.submitButton} onClick={handleForClick}>
                  SUBMIT
                </button>
              ) : (
                <button type="method" className={style.submitButton}>
                  LOGIN
                </button>
              )}
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

export default PatientLogin;
