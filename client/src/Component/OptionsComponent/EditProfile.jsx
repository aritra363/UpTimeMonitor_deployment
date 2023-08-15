import React from "react";
import { useContext, useState } from "react";
import MainState from "../../Context/MainState";
import editUserData from "../../Request/editUserData";
import { FaUserAlt, FaEdit } from "react-icons/fa";
import { AiTwotoneEdit, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { RiLockPasswordLine, RiLockPasswordFill } from "react-icons/ri";
import { toast } from "react-hot-toast";
import "../../CStyling/EditProfile.css";

function EditProfile() {
  const { userData } = useContext(MainState);
  //state for local inputfield
  const [fName, setfName] = useState(userData.firstName);
  const [lName, setlName] = useState(userData.lastName);
  const [prevPass, setPrevPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [pToggle, setpToggler] = useState(false);
  const [prevPassVisibilty, setprevPassVisibilty] = useState(false);
  const [newPassVisibilty, setnewPassVisibilty] = useState(false);

  //handler for input fields
  //firstname
  const fNameHandler = (e) => {
    if (
      e.target.value.trim().length < 20 &&
      e.target.value.match("^[a-zA-Z]*$")
    )
      setfName(e.target.value);
  };
  //lastname
  const lNameHandler = (e) => {
    if (
      e.target.value.trim().length < 20 &&
      e.target.value.match("^[a-zA-Z]*$")
    )
      setlName(e.target.value);
  };
  //previous Password
  const prevPassHandler = (e) => {
    setPrevPass(e.target.value);
  };
  //new Password
  const newPassHandler = (e) => {
    if (e.target.value.trim().length < 30) setNewPass(e.target.value);
  };
  //Password toggler
  const pToggleHandler = () => {
    setpToggler((prev) => !prev);
  };
  //prev password Visibility
  const prevPassVisibiltyHandler = () => {
    setprevPassVisibilty((prev) => !prev);
  };
  //new password Visibility
  const newPassVisibiltyHandler = () => {
    setnewPassVisibilty((prev) => !prev);
  };
  //update Handler
  const updateHandler = async () => {
    //check if password is present in state
    if (userData.hasOwnProperty("password")) {
      //check for validation
      if (pToggle) {
        //check for Name and Password
        let validate =
          fName.length >= 3 &&
          lName.length >= 3 &&
          newPass.length >= 8 &&
          prevPass.length >= 0
            ? true
            : false;
        if (validate) {
          //validation Successful
          //check if the previous password matches
          if (prevPass === userData.password) {
            //check if all fields are not same as previous
            let fName_v = false;
            let lName_v = false;
            let newPass_v = false;
            if (fName === userData.firstName) fName_v = true;
            if (lName === userData.lastName) lName_v = true;
            if (newPass === userData.password) newPass_v = true;
            //now check which one is unique and can be updated
            if (fName_v && lName_v && newPass_v) {
              toast.error("Nothing Changed to be updated", { duration: 2000 });
            } else {
              //there is min 1 field that can be updated
              //make a object to pass to api
              let updateObj = {};
              if (!fName_v) updateObj.firstName = fName;
              if (!lName_v) updateObj.lirstName = lName;
              if (!newPass_v) updateObj.password = newPass;
              updateObj.phone = userData.phone;
              console.log(updateObj);
              //api call
              const result = await toast.promise(
                editUserData(updateObj, localStorage.getItem("token")),
                {
                  loading: "Updating Wait!",
                }
              );
              if (result) {
                if (!fName_v) userData.firstName = fName;
                if (!lName_v) userData.lastName = lName;
                if (!newPass_v) userData.password = newPass;
                toast.success("Updated Successfully", { duration: 2000 });
              } else {
                toast.error("Server Error,Please Try again!", {
                  duration: 3000,
                });
              }
            }
          } else {
            //previous password doesnt matches
            toast.error("Previous Password doesnt match!", { duration: 2000 });
          }
        } else {
          //validation failed
          toast.error(
            "First Name & Last Name cannot be less than 3 Characters and more than 20 Characters,Password must be min 8 Characters",
            { duration: 4000 }
          );
        }
      } else {
        //Only check for name (password will not be updated)
        let validate = fName.length >= 3 && lName.length >= 3 ? true : false;
        if (validate) {
          let fName_v = false;
          let lName_v = false;
          if (fName === userData.firstName) fName_v = true;
          if (lName === userData.lastName) lName_v = true;
          //now check which one is unique and can be updated
          if (fName_v && lName_v) {
            toast.error("Nothing Changed to be updated", { duration: 2000 });
          } else {
            //there is min 1 field that can be updated
            //make a object to pass to api
            let updateObj = {};
            if (!fName_v) updateObj.firstName = fName;
            if (!lName_v) updateObj.lastName = lName;
            updateObj.phone = userData.phone;
            console.log(updateObj);
            //api call
            const result = await toast.promise(
              editUserData(updateObj, localStorage.getItem("token")),
              {
                loading: "Updating Wait!",
              }
            );
            if (result) {
              if (!fName_v) userData.firstName = fName;
              if (!lName_v) userData.lastName = lName;
              toast.success("Updated Successfully", { duration: 2000 });
            } else {
              toast.error("Server Error,Please Try again!", { duration: 3000 });
            }
          }
        } else {
          //validation failed
          toast.error(
            "First Name & Last Name cannot be less than 3 Characters and more than 20 Characters",
            { duration: 4000 }
          );
        }
      }
    } else {
      toast.error("Please Relogin to Update,and dont Refresh!");
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <div style={{ display: "flex", alignItems: "center" }}>
          <FaEdit size="20" />
          &nbsp;
          <span style={{ fontWeight: "bold", fontSize: "20px" }}>
            Edit Profile
          </span>
        </div>
      </div>
      <div className="card-body">
        <div className="container text-center">
          <div className="card-text">
            <form className="row g-3" name="Name">
              <div className="col-md-6">
                <label htmlFor="inputfName" className="form-label">
                  FirstName
                </label>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <FaUserAlt />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="inputfName"
                    onChange={fNameHandler}
                    value={fName}
                  />
                </div>
                <div
                  className="Warnings"
                  style={{
                    display: fName.length < 3 ? "block" : "none",
                  }}
                >
                  Min 3 Charaters
                </div>
              </div>

              <div className="col-md-6">
                <label htmlFor="inputlName" className="form-label">
                  LastName
                </label>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <FaUserAlt />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="inputlName"
                    onChange={lNameHandler}
                    value={lName}
                  />
                </div>
                <div
                  className="Warnings"
                  style={{
                    display: lName.length < 3 ? "block" : "none",
                  }}
                >
                  Min 3 Charaters
                </div>
              </div>
            </form>
            <div className="input-group mb-3">
              <button className="btn btn-primary" onClick={pToggleHandler}>
                <i>
                  {" "}
                  <RiLockPasswordLine />
                </i>{" "}
                Change Password
              </button>
            </div>
            <form
              className="row g-3"
              name="Password"
              style={{ display: `${pToggle ? "" : "none"}` }}
            >
              <div className="col-md-6">
                <label htmlFor="prevPassword" className="form-label">
                  Previous Password
                </label>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <RiLockPasswordFill />
                  </span>
                  <input
                    type={!prevPassVisibilty ? "password" : "text"}
                    className="form-control"
                    id="prevPassword"
                    onChange={prevPassHandler}
                    value={prevPass}
                  />
                  <span
                    className="input-group-text"
                    onClick={prevPassVisibiltyHandler}
                    style={{ cursor: "pointer" }}
                  >
                    {prevPassVisibilty ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </span>
                </div>
              </div>
              <div className="col-md-6">
                <label htmlFor="newPassword" className="form-label">
                  New Password
                </label>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <RiLockPasswordFill />
                  </span>
                  <input
                    type={!newPassVisibilty ? "password" : "text"}
                    className="form-control"
                    id="newPassword"
                    onChange={newPassHandler}
                    value={newPass}
                  />

                  <span
                    className="input-group-text"
                    onClick={newPassVisibiltyHandler}
                    style={{ cursor: "pointer" }}
                  >
                    {newPassVisibilty ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </span>
                </div>
                <div
                  className="Warnings"
                  style={{
                    display: newPass.length < 8 ? "block" : "none",
                  }}
                >
                  Must be 8 Charaters
                </div>
              </div>
            </form>
            <div className="row justify-content-end">
              <button
                className="col-4 btn btn-primary effect"
                onClick={updateHandler}
              >
                <i>
                  {" "}
                  <AiTwotoneEdit />
                </i>{" "}
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
