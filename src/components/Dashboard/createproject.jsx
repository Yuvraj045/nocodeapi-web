import React, { useState } from "react";
import { CircularProgress, Snackbar } from "@mui/material";
import http from "../../services/http";
import "./create.scss";
import { useNavigate } from "react-router-dom";

const CreateProject = () => {
  let [name, setName] = useState();
  let [loading, setLoading] = useState(false);
  let [open, setOpen] = useState(0);
  let [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleClose = () => setOpen(0);

  const handleSubmit = async () => {
    if (/^([a-z][a-z0-9-]{4,})$/.test(name)) {
      setLoading(true);
      try {
        const body = { name: name };
        const resp = await http.post("/project/create", body);
        if (resp.status === 200) {
          setMessage("New Project Created");
          setOpen(1);
          setTimeout(() => {
            navigate("/project/" + name);
          }, 1000);
        }
      } catch (error) {
        setMessage(error.response.data.message || "Something went Wrong");
        setOpen(1);
        setLoading(false);
      }
    } else {
      setMessage("Project Name Invalid. Read Points.");
      setOpen(1);
    }
  };
  return (
    <div>
      <div className="createproject">
        <div className="hed"> Create new Project here </div>
        <hr />
        <br />
        <label htmlFor="name">Project Name</label>
        <input
          type="text"
          id="name"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <br />
        <br />
        <small>
          *Project name should be unique and name start with lowercase letter
          only.
          <br />
          *Project name container only lowercase letters, digits and dash '-'.
          <br />
          *Project name contain atleat 5 characters.
          <br />
        </small>
        <br />

        <button className="width-m" onClick={handleSubmit} disabled={loading}>
          {!loading ? (
            "Create Project"
          ) : (
            <CircularProgress size={16} color="inherit" />
          )}
        </button>
      </div>
      <Snackbar
        open={open !== 0}
        autoHideDuration={6000}
        onClose={handleClose}
        size="small"
        message={open === 1 && message}
      ></Snackbar>
    </div>
  );
};

export default CreateProject;
