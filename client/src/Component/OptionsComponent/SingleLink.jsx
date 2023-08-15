import React from "react";
import { useContext } from "react";
import MainState from "../../Context/MainState";
import { IoUnlinkSharp, IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import { MdOutlineHttp, MdAccessTimeFilled } from "react-icons/md";
import { FcEmptyTrash, FcEditImage } from "react-icons/fc";
import {
  BsSignpost2Fill,
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from "react-icons/bs";
import EditLinks from "./EditLinks";
import "../../CStyling/SingleLink.css";
import red from "../../icons/red.png";
import green from "../../icons/green.png";

function SingleLink({
  id,
  num,
  url,
  protocol,
  method,
  successcode,
  timeout,
  linkState,
}) {
  const { delLinkId, setdelLinkId, setmodal, modal, setoptionComponent } =
    useContext(MainState);
  //mapping the success code
  const Scode = successcode.map((item, index) => {
    if (index === 0) {
      return <span key={index}>{item}</span>;
    } else {
      return <span key={index}>,{item}</span>;
    }
  });
  if (url.search("https://") !== -1) url = url.replace("https://", "");

  if (url.search("http://") !== -1) {
    url = url.replace("http://", "");
  }
  const deleteLinkHandler = (linkId) => {
    setmodal(true);
    setdelLinkId(linkId);
  };
  const editLinkHandler = (
    linkid,
    linkurl,
    linkmethod,
    linkprotocol,
    linksuccesscode,
    linktimeout
  ) => {
    setoptionComponent(() => {
      return (
        <>
          <EditLinks
            linkid={linkid}
            linkurl={linkurl}
            linkmethod={linkmethod}
            linkprotocol={linkprotocol}
            linksuccesscode={linksuccesscode}
            linktimeout={linktimeout}
          />
        </>
      );
    });
  };
  return (
    <div className="card">
      <div className="card-header d-flex p-2 bd-highlight flex-row mb-3">
        <div
          className="d-flex p-2 flex-fill justify-content-start"
          style={{ display: "flex", alignItems: "center" }}
        >
          <IoUnlinkSharp size="20" />
          &nbsp;
          <span style={{ fontWeight: "bold", fontSize: "20px" }}>
            {`Link #${num}`}
          </span>
        </div>

        <div className="d-flex p-2 flex-fill justify-content-end">
          <span
            className="bin bin-01"
            onClick={() =>
              editLinkHandler(id, url, method, protocol, successcode, timeout)
            }
          >
            <FcEditImage size={30} />
          </span>
          &nbsp;&nbsp;
          <span className="bin bin-01" onClick={() => deleteLinkHandler(id)}>
            <FcEmptyTrash size={30} />
          </span>
          &nbsp;&nbsp;
          <span>
            <img
              src={linkState == "up" ? green : red}
              height="16px"
              width="16px"
            />
          </span>
        </div>
      </div>
      <div className="card-body">
        <div className="card-text">
          <div style={{ display: "flex", alignItems: "center" }}>
            <FaExternalLinkSquareAlt />
            &nbsp;
            <span style={{ fontWeight: "bold" }}>URL</span> :
            <a href={`${protocol}://${url}`} target="_blank">
              {url}
            </a>
          </div>
        </div>
        &nbsp;&nbsp;
        <div className="card-text">
          <div style={{ display: "flex", alignItems: "center" }}>
            <MdOutlineHttp />
            &nbsp;
            <span style={{ fontWeight: "bold" }}>Protocol</span> : {protocol}
          </div>
        </div>
        &nbsp;&nbsp;
        <div className="card-text">
          <div style={{ display: "flex", alignItems: "center" }}>
            <BsSignpost2Fill />
            &nbsp;
            <span style={{ fontWeight: "bold" }}>Method</span> : {method}
          </div>
        </div>
        &nbsp;&nbsp;
        <div className="card-text">
          <div style={{ display: "flex", alignItems: "center" }}>
            <IoCheckmarkDoneCircleSharp />
            &nbsp;
            <span style={{ fontWeight: "bold" }}>Successcode</span> : {Scode}
          </div>
        </div>
        &nbsp;&nbsp;
        <div className="card-text">
          <div style={{ display: "flex", alignItems: "center" }}>
            <MdAccessTimeFilled />
            &nbsp;
            <span style={{ fontWeight: "bold" }}>Timeout(secs)</span> :{" "}
            {timeout}
          </div>
        </div>
        &nbsp;&nbsp;
        <div className="card-text">
          <div style={{ display: "flex", alignItems: "center" }}>
            {linkState == "up" ? (
              <BsFillArrowUpCircleFill />
            ) : (
              <BsFillArrowDownCircleFill />
            )}
            &nbsp;
            <span style={{ fontWeight: "bold" }}>State</span> :{" "}
            <span style={{ color: `${linkState == "up" ? "green" : "red"}` }}>
              <b>{linkState}</b>
            </span>
          </div>
        </div>
        &nbsp;&nbsp;
      </div>
    </div>
  );
}

SingleLink.defaultProps = {
  linkState: "down",
};

export default SingleLink;
