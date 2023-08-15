import React from "react";
import { useContext } from "react";
import MainState from "../../Context/MainState";
import { FaUserAlt, FaPhone } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";

function ChangePassword() {
  const { userData } = useContext(MainState);
  const phone = userData.phone.toString();
  return (
    <div className="card">
      <div className="card-header">
        <div style={{ display: "flex", alignItems: "center" }}>
          <RiLockPasswordLine size="20" />
          &nbsp;
          <span style={{ fontWeight: "bold", fontSize: "20px" }}>
            Change Password
          </span>
        </div>
      </div>
      <div className="card-body">
        <div className="card-text">
          <div style={{ display: "flex", alignItems: "center" }}>
            <FaUserAlt />
            &nbsp;
            <span style={{ fontWeight: "bold" }}>Name</span> :{" "}
            {userData.firstName + " " + userData.lastName}
          </div>
        </div>
        &nbsp;&nbsp;
        <div className="card-text">
          <div style={{ display: "flex", alignItems: "center" }}>
            <FaPhone />
            &nbsp;
            <span style={{ fontWeight: "bold" }}>Phone</span> :{" "}
            {`+(${phone.substring(0, 2)})` + phone.substring(2, phone.length)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
