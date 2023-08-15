import React from "react";
import toast from "react-hot-toast";
//import PropTypes from "prop-types";
import "../CStyling/LogRes.css";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import serverImg from "../images/server.png";
import { useState, useContext, useEffect } from "react";
import MainState from "../Context/MainState";
import checkUserToken from "../Request/checkUserToken";
import fetchUserData from "../Request/fetchUserData";
import createUserToken from "../Request/createUserToken";
import createUserData from "../Request/createUserData";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function LogRes() {
  //state for token and isloggedin
  const {
    setisLoggedin,
    setuserData,
    setfirstTimer,
  } = useContext(MainState);
  //state for toggling login and reegistartion form
  const [form, setform] = useState("login");

  //state for phone number field
  const [phone, setphone] = useState("");

  //state for password field
  const [password, setpassword] = useState("");

  //state for first Name field
  const [fName, setfName] = useState("");

  //state for Last Name field
  const [lName, setlName] = useState("");

  //state for agreement field
  const [agree, setagree] = useState(false);

  const [prevPassVisibilty, setprevPassVisibilty] = useState(false);

  //prev password Visibility
  const prevPassVisibiltyHandler = () => {
    setprevPassVisibilty((prev) => !prev);
  };

  //on click form Change
  const formChangeHandler = () => {
    if (form === "login") setform("Register");
    else setform("login");
    setfName("");
    setlName("");
    setphone("");
    setpassword("");
    setagree(false);
    setprevPassVisibilty(false);
  };

  //on change handler for all input fields

  //fName
  const fNameChangeHandler = (event) => {
    if (
      event.target.value.trim().length < 20 &&
      event.target.value.match("^[a-zA-Z]*$")
    ) {
      setfName(event.target.value);
    }
  };

  //lName
  const lNameChangeHandler = (event) => {
    if (
      event.target.value.trim().length < 20 &&
      event.target.value.match("^[a-zA-Z]*$")
    ) {
      setlName(event.target.value);
    }
  };

  //phone
  const phoneChangeHandler = (event) => {
    if (
      event.target.value.match("^[0-9]*$") &&
      event.target.value.trim().length <= 10
    ) {
      setphone(event.target.value);
    }
  };

  //password
  const passwordChangeHandler = (event) => {
    if (event.target.value.trim().length < 30) setpassword(event.target.value);
  };

  //agreement
  const agreementChangeHandler = (event) => {
    setagree(event.target.checked);
  };

  // JSX element of Login Form
  const loginForm = (
    <>
      <label className="sr-only" htmlFor="inlineFormInputGroup">
        Phone
      </label>
      <div className="input-group mb-2">
        <div className="input-group-prepend">
          <div className="input-group-text">+91</div>
        </div>
        <input
          type="text"
          className="form-control"
          id="inlineFormInputGroup"
          placeholder="8240862633"
          onChange={phoneChangeHandler}
          value={phone}
        />
      </div>
      <div
        className="Warnings"
        style={{
          display: phone.length !== 10 && phone.length > 0 ? "block" : "none",
        }}
      >
        Must Be 10 Digit
      </div>
      <label className="sr-only" htmlFor="inlineFormInput">
        Password
      </label>
      <div className="input-group mb-3">
        <input
          type={!prevPassVisibilty ? "password" : "text"}
          className="form-control "
          id="inlineFormInput"
          placeholder="********"
          onChange={passwordChangeHandler}
          value={password}
        />
        <span
          className="input-group-text"
          onClick={prevPassVisibiltyHandler}
          style={{ cursor: "pointer" }}
        >
          {prevPassVisibilty ? <AiFillEye /> : <AiFillEyeInvisible />}
        </span>
      </div>
    </>
  );
  // JSX element of Registration Form
  const registrationForm = (
    <>
      {/* First Name */}
      <label className="sr-only" htmlFor="inlineFormInput">
        First Name
      </label>
      <input
        type="text"
        className="form-control mb-2"
        id="inlineFormInput"
        placeholder="Aritra"
        onChange={fNameChangeHandler}
        value={fName}
      />
      <div
        className="Warnings"
        style={{
          display: fName.length > 0 && fName.length < 3 ? "block" : "none",
        }}
      >
        Min 3 Charaters
      </div>

      {/* Last Name */}
      <label className="sr-only" htmlFor="inlineFormInput">
        Last Name
      </label>
      <input
        type="text"
        className="form-control mb-2"
        id="inlineFormInput"
        placeholder="Pal"
        onChange={lNameChangeHandler}
        value={lName}
      />
      <div
        className="Warnings"
        style={{
          display: lName.length > 0 && lName.length < 3 ? "block" : "none",
        }}
      >
        Min 3 Charaters
      </div>

      {/* Phone */}
      <label className="sr-only" htmlFor="inlineFormInputGroup">
        Phone
      </label>
      <div className="input-group mb-2">
        <div className="input-group-prepend">
          <div className="input-group-text">+91</div>
        </div>
        <input
          type="text"
          className="form-control"
          id="inlineFormInputGroup"
          placeholder="8240862633"
          onChange={phoneChangeHandler}
          value={phone}
        />
      </div>
      <div
        className="Warnings"
        style={{
          display: phone.length !== 10 && phone.length > 0 ? "block" : "none",
        }}
      >
        Must be 10 Digit
      </div>

      {/* Password */}
      <label className="sr-only" htmlFor="inlineFormInput">
        Password
      </label>
      <div className="input-group mb-3">
        <input
          type={!prevPassVisibilty ? "password" : "text"}
          className="form-control"
          id="inlineFormInput"
          placeholder="********"
          onChange={passwordChangeHandler}
          value={password}
        />
        <span
          className="input-group-text"
          onClick={prevPassVisibiltyHandler}
          style={{ cursor: "pointer" }}
        >
          {prevPassVisibilty ? <AiFillEye /> : <AiFillEyeInvisible />}
        </span>
      </div>

      <div
        className="Warnings"
        style={{
          display:
            password.length < 8 && password.length > 0 ? "block" : "none",
        }}
      >
        Must be 8 Charaters
      </div>
      <div className="form-check mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          id="autoSizingCheck"
          onChange={agreementChangeHandler}
          value={agree}
        />
        <label className="form-check-label" htmlFor="autoSizingCheck">
          <a href="/">Accept all Agreement</a>
        </label>
      </div>
    </>
  );

  // Button validation
  const signinValidate =
    phone.length === 10 && password.length > 0 ? false : true;
  const signupValidate =
    fName.length >= 3 &&
    lName.length >= 3 &&
    phone.length === 10 &&
    password.length >= 8 &&
    agree === true
      ? false
      : true;

  //Signin & signup operation
  const submitHandler = async () => {
    //Find out which Request Login or Register
    if (form === "login") {
      let Userphone = phone.length === 10 ? phone : false;
      let Userpassword = password.length > 0 ? password : false;
      //check if all right--------------------------------Login
      if (Userphone && Userpassword) {
        //proceed
        Userphone = "91" + Userphone;
        const token = await createUserToken(Userphone, Userpassword);
        if (token) {
          const UserObj = await toast.promise(
            fetchUserData(Userphone, token.id),
            {
              loading: "Logging In",
            }
          );
          if (UserObj) {
            UserObj.password = Userpassword;
            setuserData(UserObj);
            setisLoggedin(true);
            localStorage.setItem("token", token.id);
            setfirstTimer(true);
            toast.success("Loggedin successfully", { duration: 2000 });
          } else {
            setisLoggedin(false);
            toast.error("Something went wrong!", { duration: 2000 });
          }
        } else {
          toast.error("Phone or Password Invalid", { duration: 2000 });
        }
      } else {
        toast.error("Invalid Input! Please Check", { duration: 2000 });
      }
      //--------------------------------------------------Register
    } else if (form === "Register") {
      let Userphone = phone.length === 10 ? phone : false;
      let Userpassword = password.length >= 8 ? password : false;
      let Userfname = fName.length >= 3 ? fName : false;
      let Userlname = lName.length >= 3 ? lName : false;
      let Useragree = agree === true ? agree : false;

      //check if all right
      if (Userphone && Useragree && Userfname && Userlname && Userpassword) {
        //procceed
        Userphone = "91" + Userphone;
        const Userdata = {
          firstName: Userfname,
          lastName: Userlname,
          phone: Userphone,
          password: Userpassword,
          tosAgreement: Useragree,
        };
        const result = await createUserData(Userdata);
        if (result) {
          const token = await toast.promise(
            createUserToken(Userphone, Userpassword),
            {
              loading: "Signingup Please Wait!",
              success: "REgistered Successfully",
              error: "Something went Wrong Please Try again!",
            }
          );
          if (token) {
            Userdata.checks = [];
            setuserData(Userdata);
            setisLoggedin(true);
            setfirstTimer(true);
            localStorage.setItem("token", token.id);
            toast.success("LoggedIn Successfully", { duration: 2000 });
          } else {
            toast.error("Something Went Wrong!", { duration: 2000 });
          }
        } else {
          toast.error("Something Went Wrong!", { duration: 2000 });
        }
      } else {
        toast.error("Invalid Input! Please Check", { duration: 2000 });
      }
    } else {
      toast.error("Invalid Input", { duration: 2000 });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    checkUserToken(token).then((data) => {
      if (data) {
        fetchUserData(data.phone, token).then((userObj) => {
          if (userObj) {
            setuserData(userObj);
            setfirstTimer(true);
            setisLoggedin(true);
          } else {
            setisLoggedin(false);
          }
        });
      } else {
        setisLoggedin(false);
        localStorage.removeItem("token");
      }
    });
  }, []);
  return (
    <>
      <MDBContainer className="my-5 gradient-form shadow-lg p-3 mb-5 bg-grey rounded my-bg">
        <MDBRow>
          <MDBCol col="6" className="mb-5">
            <div className="d-flex flex-column ms-5">
              <div className="text-center">
                <img src={serverImg} style={{ width: "185px" }} alt="logo" />
                <h4 className="mt-1 mb-5 pb-1">Up Time Monitor System</h4>
              </div>
              {form === "login" ? loginForm : registrationForm}
              <div className="text-center pt-1 mb-5 pb-1">
                <button
                  className="btn  mb-4 w-100"
                  disabled={form === "login" ? signinValidate : signupValidate}
                  onClick={submitHandler}
                >
                  {form === "login" ? "Sign in" : "Sign up"}
                </button>
              </div>
            </div>
          </MDBCol>

          <MDBCol col="6" className="mb-5">
            <div className="d-flex flex-column  justify-content-center gradient-custom-1 h-100 mb-4">
              <div className="text-black px-3 py-4 p-md-5 mx-md-4">
                <button className="btn  mb-4 w-100" onClick={formChangeHandler}>
                  {form === "login" ? "Register" : "Login"}
                </button>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

/* LogRes.proptype = {
  log: PropTypes.string.isRequired,
}; */

export default LogRes;
