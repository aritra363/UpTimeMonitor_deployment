import React from "react";
import { useContext, useState } from "react";
import MainState from "../../Context/MainState";
import { IoUnlinkSharp, IoAddCircleSharp } from "react-icons/io5";
import { MdOutlineHttp, MdAccessTimeFilled } from "react-icons/md";
import { BsSignpost2Fill } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import "../../CStyling/EditLinks.css";
import { toast } from "react-hot-toast";
import editLink from "../../Request/editLink";
import { renderMatches, useNavigate } from "react-router-dom";
import ViewLinks from "./ViewLinks";

function EditLinks({
  linkid,
  linkurl,
  linkmethod,
  linkprotocol,
  linksuccesscode,
  linktimeout,
}) {
  const navigate = useNavigate();
  const { userData, setoptionComponent, setneedRefresh } =
    useContext(MainState);
  //state for url
  const [url, seturl] = useState(linkurl);
  //state for protocol
  const [protocol, setprotocol] = useState(linkprotocol);
  //state for protocol
  const [method, setmethod] = useState(linkmethod);
  //state for timeout
  const [timeout, settimeout] = useState(Number(linktimeout));
  //state for Successcode
  const [successcode, setsuccesscode] = useState(linksuccesscode);
  //url Field handler
  const urlHandler = (e) => {
    seturl(e.target.value);
  };
  //protocol Field handler
  const protocolHandler = (e) => {
    setprotocol(e.target.value);
  };
  //method Field handler
  const methodHandler = (e) => {
    setmethod(e.target.value);
  };
  //timeout Field handler
  const timeoutHandler = (e) => {
    settimeout(Number(e.target.value));
  };
  //successcode Field handler
  const successcodeHandler = (e) => {
    if (e.target.checked) {
      setsuccesscode((prev) => [...prev, Number(e.target.value)]);
    } else {
      setsuccesscode((prev) => {
        return prev.filter((current) => current != e.target.value);
      });
    }
  };
  //addlink handler
  const addLinkHandler = async () => {
    //validation
    //url pattern
    const urlpatt =
      /^\s*(http\:\/\/)?([a-z\d\-]{1,63}\.)*[a-z\d\-]{1,255}\.[a-z]{2,6}\s*$/;
    const url_v = url.match(urlpatt) ? true : false;
    const protocol_v = protocol.length != 0 ? true : false;
    const method_v = method.length != 0 ? true : false;
    const timeout_v = timeout != "" ? true : false;
    const successcode_v = successcode.length != 0 ? true : false;
    //checking
    if (url_v && protocol_v && method_v && timeout_v && successcode_v) {
      //validation Passed
      //create addLink object
      const linkObj = {
        protocol,
        method,
        url,
        timeout,
        successcode,
      };
      //make api call
      const result = await toast.promise(
        editLink(linkid, linkObj, localStorage.getItem("token")),
        {
          loading: "Updating Link wait!",
        }
      );
      if (result) {
        //api call success and also link edited
        setoptionComponent(() => {
          return (
            <>
              <ViewLinks />
            </>
          );
        });
        setneedRefresh((prev) => !prev);
        toast.success("Link Edited successfully", { duration: 2000 });
      }
    } else {
      //validation Failed
      toast.error(
        "Url must be a valid url & minimum One Success code should be checked",
        { duration: 5000 }
      );
    }
  };
  return (
    <div className="card">
      <div className="card-header">
        <div style={{ display: "flex", alignItems: "center" }}>
          <BiEdit size="20" />
          &nbsp;
          <span style={{ fontWeight: "bold", fontSize: "20px" }}>
            Edit Links
          </span>
        </div>
      </div>

      <div
        className="card-body"
        style={{ overflow: "scroll", maxHeight: "75vh" }}
      >
        <div className="card-text">
          <div className="form-group">
            <div className="input-group flex-nowrap">
              <span className="input-group-text" id="addon-wrapping">
                <IoUnlinkSharp />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="URL"
                aria-label="Url"
                aria-describedby="addon-wrapping"
                onChange={urlHandler}
                value={url}
              />
            </div>
            <small className="text-muted">
              Provide the URL (without http or https and only http and https
              link allowed)
            </small>
            <div className="input-group flex-nowrap">
              <span className="input-group-text" id="addon-wrapping">
                <MdOutlineHttp />
              </span>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={protocolHandler}
              >
                <option
                  value="http"
                  selected={protocol === "http" ? true : false}
                >
                  http
                </option>
                <option
                  value="https"
                  selected={protocol === "https" ? true : false}
                >
                  https
                </option>
              </select>
            </div>
            <small className="text-muted">
              Provide the Protocol http or https (default https)
            </small>
            <div className="input-group flex-nowrap">
              <span className="input-group-text" id="addon-wrapping">
                <BsSignpost2Fill />
              </span>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={methodHandler}
              >
                <option value="put" selected={method === "put" ? true : false}>
                  PUT
                </option>
                <option value="get" selected={method === "get" ? true : false}>
                  GET
                </option>

                <option
                  value="delete"
                  selected={method === "delete" ? true : false}
                >
                  DELETE
                </option>
                <option
                  value="post"
                  selected={method === "post" ? true : false}
                >
                  POST
                </option>
              </select>
            </div>
            <small className="text-muted">
              Provide the Method (default GET)
            </small>
            <div className="input-group flex-nowrap">
              <span className="input-group-text" id="addon-wrapping">
                <MdAccessTimeFilled />
              </span>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={timeoutHandler}
              >
                <option value="5" selected={timeout === 5 ? true : false}>
                  5
                </option>
                <option value="4" selected={timeout === 4 ? true : false}>
                  4
                </option>
                <option value="3" selected={timeout === 3 ? true : false}>
                  3
                </option>
                <option value="2" selected={timeout === 2 ? true : false}>
                  2
                </option>
                <option value="1" selected={timeout === 1 ? true : false}>
                  1
                </option>
              </select>
              <span className="input-group-text" id="addon-wrapping">
                Seconds
              </span>
            </div>
            <small className="text-muted">
              Provide the Timeout Seconds max 5 min 1<br />
              Timeout is the time in seconds upto which the server will wait for
              response
            </small>
            <br />
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>
              <label className="form-label">Success Codes</label>
            </span>
            <div
              className="card-body"
              style={{
                border: "1px solid #ebebeb",
                backgroundColor: "#ebebeb",
                borderRadius: "5px",
              }}
            >
              <div className="card-text">
                <div className="input-group flex-nowrap align-items-center justify-content-center">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox1"
                      value="200"
                      onChange={successcodeHandler}
                      checked={successcode.includes(200) ? true : false}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox1"
                    >
                      200
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox2"
                      value="201"
                      onChange={successcodeHandler}
                      checked={successcode.includes(201) ? true : false}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox2"
                    >
                      201
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox3"
                      value="202"
                      onChange={successcodeHandler}
                      checked={successcode.includes(202) ? true : false}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox3"
                    >
                      202
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox1"
                      value="203"
                      onChange={successcodeHandler}
                      checked={successcode.includes(203) ? true : false}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox1"
                    >
                      203
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox2"
                      value="204"
                      onChange={successcodeHandler}
                      checked={successcode.includes(204) ? true : false}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox2"
                    >
                      204
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox3"
                      value="205"
                      onChange={successcodeHandler}
                      checked={successcode.includes(205) ? true : false}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox3"
                    >
                      205
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox1"
                      value="206"
                      onChange={successcodeHandler}
                      checked={successcode.includes(206) ? true : false}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox1"
                    >
                      206
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox2"
                      value="207"
                      onChange={successcodeHandler}
                      checked={successcode.includes(207) ? true : false}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox2"
                    >
                      207
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox3"
                      value="208"
                      onChange={successcodeHandler}
                      checked={successcode.includes(208) ? true : false}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox3"
                    >
                      208
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox1"
                      value="226"
                      onChange={successcodeHandler}
                      checked={successcode.includes(226) ? true : false}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox1"
                    >
                      226
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <small className="text-muted">Provide the Success codes</small>
          </div>
          <div className="row justify-content-end">
            <button
              className="col-4 btn btn-primary effect"
              onClick={addLinkHandler}
            >
              <i>
                {" "}
                <FaEdit />
              </i>{" "}
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditLinks;
