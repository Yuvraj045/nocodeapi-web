import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Backdrop, CircularProgress, Snackbar } from "@mui/material";
import http from "../../services/http";
import { Add, Remove, Edit } from "@mui/icons-material";
import CopyIcon from "@mui/icons-material/ContentCopy";
import Access from "./tableaccess";
import {BACKEND_URL} from "../../services/const"
import "./style.scss";

const Project = () => {
  let navigate = useNavigate();
  let [count, setCount] = useState(0);
  let [display, setDisplay] = useState({});
  let [info, setinfo] = useState({});
  let [open, setOpen] = useState(true);
  let [message, setMessage] = useState("");
  let [open1, setOpen1] = useState(false);
  let params = useParams();
  let [tables, setTables] = useState([]);

  const project = params.project;

  const handleClose = () => setOpen1(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setMessage("Copied!");
    setOpen1(true);
  };

  const handleTableToggle = (name) => {
    let newdis = display;
    if (display[name] === true) {
      newdis[name] = false;
    } else {
      newdis[name] = true;
    }
    setDisplay(newdis);
    setCount(count + 1);
  };
  const loadProject = async () => {
    setOpen(true);
    try {
      setinfo({});
      setTables([]);
      setCount(count + 1);
      console.log("/project/" + project);
      const resp = await http.get("/project/" + project);
      const pinfo = { ...resp.data };
      delete pinfo.tables;
      setinfo(pinfo);
      setTables(resp.data.tables);
      setCount(count + 1);
      setOpen(false);
    } catch (error) {
      console.log(error.response);
      setOpen(false);
    }
  };

  const handleSettingChange = async (target) => {
    setOpen(true);
    try {
      console.log(target);
      const resp = await http.get("/project/" + target + "/" + info.name);
      console.log(resp.data);
      loadProject();
      setOpen(false);
    } catch (error) {
      console.log(error.response);
      setOpen(false);
    }
  };

  useEffect(() => {
    loadProject();
  }, []);

  useEffect(() => {}, [count]);

  return (
    <div className="tables">
      <div
        style={{
          fontSize: "x-large",
          fontWeight: "500",
          margin: "20px",
          textAlign: "center",
        }}
      >
        Project - "{project}"
      </div>
      KEY :{" "}
      <code className="keycopy" onClick={() => handleCopy(info.key)}>
        {info.key} <CopyIcon fontSize="x-small" sx={{ cursor: "pointer" }} />
      </code>
      <br />
      <br />
      URL :{" "}
      <code
        className="keycopy"
        onClick={() => handleCopy(`${BACKEND_URL}/api/` + info.name)}
      >
        {`${BACKEND_URL}/api/` + info.name}{" "}
        <CopyIcon fontSize="x-small" sx={{ cursor: "pointer" }} />
      </code>
      <br />
      <br />
      Authentication : {info.name && !info.apiAuth ? "Disabled" : "Enabled"}
      <br />
      {info.name && !info.apiAuth ? (
        <button className="btn" onClick={() => handleSettingChange("apiauth")}>
          Enable ApiAuth
        </button>
      ) : (
        <button
          className="btn"
          onClick={() => handleSettingChange("removeapiauth")}
        >
          Disbale ApiAuth
        </button>
      )}{" "}
      <button
        className="btn"
        onClick={() => handleSettingChange("generatekey")}
      >
        {" "}
        Generate New Key
      </button>
      <hr />
      <div style={{ fontSize: "large", fontWeight: "500" }}>
        Tables
        <div className="helpButton" onClick={() => navigate("/faq")}>
          help?
        </div>
      </div>
      {tables.map((table) => (
        <div key={table.name}>
          <div className="table" onClick={() => handleTableToggle(table.name)}>
            <div>{table.name}</div>
            <div>{display[table.name] ? <Remove /> : <Add />}</div>
          </div>
          <div
            className={
              "tabledetails " + (display[table.name] ? "" : "tablehide")
            }
          >
            {table.name}.schema:{" "}
            <Edit
              sx={{ float: "right", cursor: "pointer" }}
              onClick={() => navigate(`/edittable/${project}/${table.name}`)}
            />
            <pre>{JSON.stringify(JSON.parse(table.schema), null, 4)}</pre>
            <Access info={info} table={table} loadproject={loadProject} />
          </div>
        </div>
      ))}
      <br />
      <br />
      <Link to={`/createtable/${project}`} className="link">
        Create New Table
      </Link>
      <br />
      <br />
      <br />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={open1}
        autoHideDuration={4000}
        onClose={handleClose}
        size="small"
        message={open1 && message}
      ></Snackbar>
    </div>
  );
};

export default Project;
