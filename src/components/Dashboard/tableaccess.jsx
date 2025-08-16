import React, { useEffect, useState } from "react";
import CopyIcon from "@mui/icons-material/ContentCopy";
import { Snackbar, CircularProgress } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import http from "../../services/http";
import "./style.scss";

const Access = (props) => {
  let navigate = useNavigate();
  const table = props.table;
  const project = props.info;

  let [temp, setTemp] = useState({ ...table });
  let [auth, setAuth] = useState(project.s_auth);
  let [open, setOpen] = useState(false);
  let [message, setMessage] = useState("");
  let [count, setCount] = useState(0);
  let [loading, setLoading] = useState(false);
  let [loading1, setLoading1] = useState(false);
  let isauth = project.apiAuth;

  const handleClose = () => setOpen(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setMessage("Copied!");
    setOpen(true);
  };
  const handleAuth = (e) => {
    setAuth(parseInt(e.target.value));
    setCount(count + 1);
  };

  const handleSecureUpdate = async (e, target) => {
    console.log(e.target.value, target);
    const newtemp = temp;
    newtemp[target] = parseInt(e.target.value);
    setTemp(newtemp);
    setCount(count + 1);
  };

  const handleSecureSubmit = async () => {
    console.log(temp);
    setLoading(true);
    const body = { ...temp };
    setLoading(true);
    try {
      const resp = await http.post(
        "/project/secure/" + project.name + "/" + table.name,
        body
      );
      if (resp.status === 200) {
        setOpen(true);
        setMessage(resp.data.message);
        setLoading(false);
        props.loadproject();
      }
    } catch (error) {
      console.log(error);
      setMessage(error.response?.data.message || "Something went Wrong");
      setOpen(true);
      setLoading(false);
    }
  };

  const handleSecureAuthSubmit = async () => {
    console.log(auth);
    setLoading(true);
    const body = { s_auth: auth };
    setLoading1(true);
    try {
      const resp = await http.post("/project/secureauth/" + project.name, body);
      if (resp.status === 200) {
        await props.loadproject();
        setOpen(true);
        setMessage(resp.data.message);
        setLoading1(false);
        props.loadproject();
      }
    } catch (error) {
      console.log("error", error);
      setMessage(error.response?.data.message || "Something went Wrong");
      setOpen(true);
      setLoading1(false);
    }
  };

  useEffect(() => {});

  return (
    <div className="access">
      {temp.name}.access
      <div className="helpButton" onClick={() => navigate("/faq?id=p4")}>
        help?
      </div>
      <br />
      {table.name === "users" && project.apiAuth ? (
        ////
        ///
        ///
        /// if table is users and api auth in enables
        <ul>
          <li>
            <div>
              <code>
                Signup/Signin (post):{" "}
                <span onClick={() => handleCopy(`/${table.name}/signup`)}>
                  /{table.name}/signup{" "}
                  <CopyIcon fontSize="x-small" sx={{ cursor: "pointer" }} />
                </span>{" "}
                <span onClick={() => handleCopy(`/${table.name}/signin`)}>
                  /{table.name}/signin{" "}
                  <CopyIcon fontSize="x-small" sx={{ cursor: "pointer" }} />
                </span>{" "}
                <br />
                <br />
                Signup/Signin Access:{" "}
                <select value={auth} onChange={(e) => handleAuth(e)}>
                  <option value="1">Disable</option>
                  <option value="2">Public Access</option>
                  <option value="3">Secrue with key</option>
                </select>
              </code>
              {project.s_auth !== auth && (
                <button
                  style={{ marginLeft: "20px" }}
                  onClick={handleSecureAuthSubmit}
                  disabled={loading1}
                >
                  {!loading1 ? (
                    "Save Change"
                  ) : (
                    <CircularProgress size={16} color="inherit" />
                  )}
                </button>
              )}
            </div>
          </li>
          <li>
            <code>
              get :{" "}
              <span onClick={() => handleCopy(`/${table.name}/all`)}>
                /{table.name}/all{" "}
                <CopyIcon fontSize="x-small" sx={{ cursor: "pointer" }} />
              </span>
              <select
                value={temp.s_get}
                onChange={(e) => handleSecureUpdate(e, "s_get")}
              >
                <option value="1">Disable</option>
                <option value="2">Public Access</option>
                <option value="3">Secrue with key</option>
                <option value="4">Secure with Auth</option>
                <option value="5">Both Auth and Key</option>
              </select>
            </code>
          </li>
          <li>
            <code>
              getbyid :{" "}
              <span onClick={() => handleCopy(`/${table.name}/profile`)}>
                /{table.name}/profile{" "}
                <CopyIcon fontSize="x-small" sx={{ cursor: "pointer" }} />
              </span>
              <select
                value={temp.s_getbyid}
                onChange={(e) => handleSecureUpdate(e, "s_getbyid")}
              >
                <option value="1">Disable</option>
                <option value="4">Secure with Auth</option>
                <option value="5">Both Auth and Key</option>
              </select>
            </code>
          </li>
          <li>
            <code>
              put :{" "}
              <span onClick={() => handleCopy(`/${table.name}/profile`)}>
                /{table.name}/profile{" "}
                <CopyIcon fontSize="x-small" sx={{ cursor: "pointer" }} />
              </span>
              <select
                value={temp.s_put}
                onChange={(e) => handleSecureUpdate(e, "s_put")}
              >
                <option value="1">Disable</option>
                <option value="4">Secure with Auth</option>
                <option value="5">Both Auth and Key</option>
              </select>
            </code>
          </li>
          <li>
            <code>
              delete :{" "}
              <span onClick={() => handleCopy(`/${table.name}/profile`)}>
                /{table.name}/profile{" "}
                <CopyIcon fontSize="x-small" sx={{ cursor: "pointer" }} />
              </span>
              <select
                value={temp.s_delete}
                onChange={(e) => handleSecureUpdate(e, "s_delete")}
              >
                <option value="1">Disable</option>
                <option value="4">Secure with Auth</option>
                <option value="5">Both Auth and Key</option>
              </select>
            </code>
          </li>
        </ul>
      ) : (
        ////
        ///
        ///
        /// if table is users and api auth in enables
        ///end
        <ul>
          <li>
            <code>
              post :{" "}
              <span onClick={() => handleCopy(`/${table.name}`)}>
                /{table.name}{" "}
                <CopyIcon fontSize="x-small" sx={{ cursor: "pointer" }} />
              </span>
              <select
                value={temp.s_post}
                onChange={(e) => handleSecureUpdate(e, "s_post")}
              >
                <option value="1">Disable</option>
                <option value="2">Public Access</option>
                <option value="3">Secrue with key</option>
                {isauth && (
                  <>
                    <option value="4">Secure with Auth</option>
                    <option value="5">Both Auth and Key</option>
                  </>
                )}
              </select>
            </code>
          </li>
          <li>
            <code>
              get :{" "}
              <span onClick={() => handleCopy(`/${table.name}`)}>
                /{table.name}{" "}
                <CopyIcon fontSize="x-small" sx={{ cursor: "pointer" }} />
              </span>
              <select
                value={temp.s_get}
                onChange={(e) => handleSecureUpdate(e, "s_get")}
              >
                <option value="1">Disable</option>
                <option value="2">Public Access</option>
                <option value="3">Secrue with key</option>
                {isauth && (
                  <>
                    <option value="4">Secure with Auth</option>
                    <option value="5">Both Auth and Key</option>
                  </>
                )}
              </select>
            </code>
          </li>
          <li>
            <code>
              getbyid :{" "}
              <span onClick={() => handleCopy(`/${table.name}/:id`)}>
                /{table.name}/:id{" "}
                <CopyIcon fontSize="x-small" sx={{ cursor: "pointer" }} />
              </span>
              <select
                value={temp.s_getbyid}
                onChange={(e) => handleSecureUpdate(e, "s_getbyid")}
              >
                <option value="1">Disable</option>
                <option value="2">Public Access</option>
                <option value="3">Secrue with key</option>
                {isauth && (
                  <>
                    <option value="4">Secure with Auth</option>
                    <option value="5">Both Auth and Key</option>
                  </>
                )}
              </select>
            </code>
          </li>
          <li>
            <code>
              put :{" "}
              <span onClick={() => handleCopy(`/${table.name}/:id`)}>
                /{table.name}/:id{" "}
                <CopyIcon fontSize="x-small" sx={{ cursor: "pointer" }} />
              </span>
              <select
                value={temp.s_put}
                onChange={(e) => handleSecureUpdate(e, "s_put")}
              >
                <option value="1">Disable</option>
                <option value="2">Public Access</option>
                <option value="3">Secrue with key</option>
                {isauth && (
                  <>
                    <option value="4">Secure with Auth</option>
                    <option value="5">Both Auth and Key</option>
                  </>
                )}
              </select>
            </code>
          </li>
          <li>
            <code>
              delete :{" "}
              <span onClick={() => handleCopy(`/${table.name}/:id`)}>
                /{table.name}/:id{" "}
                <CopyIcon fontSize="x-small" sx={{ cursor: "pointer" }} />
              </span>
              <select
                value={temp.s_delete}
                onChange={(e) => handleSecureUpdate(e, "s_delete")}
              >
                <option value="1">Disable</option>
                <option value="2">Public Access</option>
                <option value="3">Secrue with key</option>
                {isauth && (
                  <>
                    <option value="4">Secure with Auth</option>
                    <option value="5">Both Auth and Key</option>
                  </>
                )}
              </select>
            </code>
          </li>
        </ul>
        ////
        ///
        ///
        /// if table is users and api auth in enables
        ///end
      )}
      {(temp.s_get !== table.s_get ||
        temp.s_post !== table.s_post ||
        temp.s_delete !== table.s_delete ||
        temp.s_put !== table.s_put ||
        temp.s_getbyid !== table.s_getbyid) && (
        <button onClick={handleSecureSubmit} disabled={loading}>
          {!loading ? (
            "Save Change"
          ) : (
            <CircularProgress size={16} color="inherit" />
          )}
        </button>
      )}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        size="small"
        message={open && message}
      ></Snackbar>
    </div>
  );
};

export default Access;
