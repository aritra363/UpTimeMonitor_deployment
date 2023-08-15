import React from "react";
import { useContext, useState } from "react";
import MainState from "../../Context/MainState";
import {
  IoUnlinkSharp,
  IoAddCircleOutline,
  IoAddCircleSharp,
} from "react-icons/io5";
import { MdOutlineHttp, MdAccessTimeFilled } from "react-icons/md";
import { BsSignpost2Fill } from "react-icons/bs";
import "../../CStyling/AddLinks.css";
import { toast } from "react-hot-toast";
import addLink from "../../Request/addLink";
import ViewLinks from "./ViewLinks";

function AddLinks() {
  const { userData, setneedRefresh, setoptionComponent } =
    useContext(MainState);
  //state for url
  const [url, seturl] = useState("");
  //state for protocol
  const [protocol, setprotocol] = useState("https");
  //state for protocol
  const [method, setmethod] = useState("get");
  //state for timeout
  const [timeout, settimeout] = useState(5);
  //state for Successcode
  const [successcode, setsuccesscode] = useState([]);
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
      const id = await toast.promise(
        addLink(linkObj, localStorage.getItem("token")),
        {
          loading: "Adding Link wait!",
        }
      );
      if (id) {
        //api call success and also link saved
        userData["checks"].push(id);
        setoptionComponent(() => {
          return (
            <>
              <ViewLinks />
            </>
          );
        });
        setneedRefresh((prev) => !prev);
        toast.success("Link Added successfully", { duration: 2000 });
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
          <IoAddCircleOutline size="20" />
          &nbsp;
          <span style={{ fontWeight: "bold", fontSize: "20px" }}>
            Add Links
          </span>
        </div>
      </div>
      {userData["checks"].length < 5 ? (
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
                  <option value="https">https</option>
                  <option value="http">http</option>
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
                  <option value="get">GET</option>
                  <option value="post">POST</option>
                  <option value="put">PUT</option>
                  <option value="delete">DELETE</option>
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
                  <option value="5">5</option>
                  <option value="4">4</option>
                  <option value="3">3</option>
                  <option value="2">2</option>
                  <option value="1">1</option>
                </select>
                <span className="input-group-text" id="addon-wrapping">
                  Seconds
                </span>
              </div>
              <small className="text-muted">
                Provide the Timeout Seconds max 5 min 1<br />
                Timeout is the time in seconds upto which the server will wait
                for response
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
                  <IoAddCircleSharp />
                </i>{" "}
                Add
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p style={{ color: "red" }}>Not more than 5 Links allowed</p>
      )}
    </div>
  );
}

export default AddLinks;
