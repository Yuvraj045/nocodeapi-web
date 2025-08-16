import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CircularProgress, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import http from "../../services/http";

import "./create.scss";

const CreateTable = () => {
  const [schema, setSchema] = useState({});
  let [list, setList] = useState([]);
  let [name, setName] = useState("");
  let [tablename, setTablename] = useState("");
  let [loading, setLoading] = useState(false);

  let [open, setOpen] = useState(0);
  let [message, setMessage] = useState("");
  const navigate = useNavigate();
  let params = useParams();
  const project = params.project;

  const handleClose = () => setOpen(0);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleTablename = (e) => {
    setTablename(e.target.value);
  };

  const handleAddColumn = () => {
    if (/^([a-z][a-z0-9-]{2,})$/.test(name) === false) {
      setMessage("Column Name Invalid. Please Read Points.");
      setOpen(1);
      return;
    }
    if (name === "") {
      console.log("name required");
    } else {
      if (schema[name]) {
        console.log("column already exist", name, schema);
      } else {
        let newColumn = {
          type: "String",
          required: false,
        };
        const newSchema = schema;
        newSchema[name] = newColumn;
        setSchema(newSchema);
        let newList = list;
        newList.push(name);
        setList(newList);
        setName("");

        console.log(schema, list);
      }
    }
  };

  const handleRemoveColumn = (name) => {
    console.log(name);
    let newList = list.filter((col) => col !== name);
    let newSchema = schema;
    delete newSchema[name];
    setSchema(newSchema);
    setList(newList);

    console.log(list);
    console.log(schema);
  };

  const handletypeChange = (e, name) => {
    console.log(e.target.value, name);
    const nschema = schema;
    nschema[name].type = e.target.value;
    setSchema(nschema);
  };

  const handleRequiredChange = (e, name) => {
    console.log(e.target.value, name);
    const nschema = schema;
    nschema[name].required = e.target.value === "true" ? true : false;
    setSchema(nschema);
  };

  const handleSubmit = async () => {
    if (/^([a-z][a-z0-9-]{4,})$/.test(tablename) === false) {
      setMessage("Table Name Invalid. Please Read Points.");
      setOpen(1);
      return;
    }
    const finalSchema = schema;
    // list.forEach((col) => {
    //   if (finalSchema[col].type === "Array") finalSchema[col].type = [];
    // });
    console.log(finalSchema);
    try {
      const body = {
        project,
        name: tablename,
        schema: finalSchema,
      };
      console.log(body);
      setLoading(true);
      const resp = await http.post("/project/table", body);
      if (resp.status === 200) {
        setMessage("New Project Created");
        setOpen(1);
        setTimeout(() => {
          navigate("/project/" + project);
        }, 1000);
      }
    } catch (error) {
      setMessage(error.response.data.message || "Something went Wrong");
      setOpen(1);
      setLoading(false);
    }
  };
  useEffect(() => {});
  return (
    <div>
      <div className="createtable">
        <div className="hed"> Create new table in "{project}" </div>
        <label htmlFor="name">Table</label>
        <input
          type="text"
          id="name"
          onChange={(e) => handleTablename(e)}
        ></input>
        <br />
        <div style={{ fontSize: "small" }}>
          <br />
          <small>
            *Table name should be unique in mentioned project and start with
            lowercase letter only.
            <br />
            *Table name container only lowercase letters, digits and dash '-'.
            <br />
            *Table name contain atleat 5 characters.
            <br />
          </small>
        </div>
        <hr />
        Columns
        {list.map((col) => (
          <div key={col} className="column">
            <div>
              <span>Name: </span>
              <input type="text" className="width-s" value={col} readOnly />
              <span> Type: </span>
              <select
                className="width-s"
                onChange={(e) => handletypeChange(e, col)}
              >
                <option value="String">String</option>
                <option value="Number">Number</option>
                <option value="Boolean">Boolean</option>
                <option value="Object">Object</option>
                {/* <option value="Array">Array</option> */}
              </select>

              <span> Required: </span>
              <select
                className="width-s"
                onChange={(e) => handleRequiredChange(e, col)}
              >
                <option value="false">false</option>
                <option value="true">true</option>
              </select>
            </div>
            <div>
              <CloseIcon
                sx={{
                  float: "right",
                  cursor: "pointer",
                }}
                onClick={() => handleRemoveColumn(col)}
              />
            </div>
          </div>
        ))}
        <br />
        <input
          className="width-m"
          value={name}
          onChange={(e) => handleNameChange(e)}
        ></input>
        <button className="width-m" onClick={() => handleAddColumn()}>
          Add column
        </button>
        <div style={{ fontSize: "small" }}>
          <small>*Same condition applied as for Table name.</small>
        </div>
        <hr />
        <button className="width-m" onClick={handleSubmit} disabled={loading}>
          {!loading ? (
            "Create Table"
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

export default CreateTable;
