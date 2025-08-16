import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";
import http from "../../services/http";
import "./style.scss";

const Dashboard = () => {
  let navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(true);

  const loadProjects = async () => {
    try {
      const resp = await http.get("/project/projects");
      console.log(resp.data);
      setProjects(resp.data.projects);
      setOpen(false);
    } catch (error) {
      console.log(error.response);
      setOpen(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {});

  return (
    <div className="dashboard">
      <div style={{ fontSize: "x-large", fontWeight: "500", margin: "20px" }}>
        My Projects
      </div>
      <hr />
      {projects.map((project) => (
        <div
          className="project"
          key={project}
          onClick={() => navigate(`/project/${project}`)}
        >
          {project}
        </div>
      ))}

      <br />
      <br />
      <br />
      <Link to="/createproject" className="link">
        Create New Project
      </Link>
      <br />
      <br />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Dashboard;
