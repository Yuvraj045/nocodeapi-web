import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CircularProgress, Snackbar, Backdrop } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import http from "../../services/http";

import "./create.scss";

const EditTable = () => {
  const [schema, setSchema] = useState({});
  let [list, setList] = useState([]);
  let [name, setName] = useState("");
  let [loading, setLoading] = useState(false);
  let [backdrop, setbackdrop] = useState(true);

  let [open, setOpen] = useState(0);
  let [message, setMessage] = useState("");
  const navigate = useNavigate();
  let params = useParams();
  const project = params.project;
  const tablename = params.table;

  const handleClose = () => setOpen(0);

  const handleNameChange = (e) => {
    setName(e.target.value);
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
    console.log(finalSchema);
    try {
      const body = {
        project,
        name: tablename,
        schema: finalSchema,
      };
      console.log(body);
      setLoading(true);
      const resp = await http.put("/project/table", body);
      if (resp.status === 200) {
        setMessage("Table Schema Updated");
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

  const loadtable = async () => {
    try {
      setbackdrop(true);
      const resp = await http.get("/project/" + project);
      if (resp.status === 200) {
        let newschema = {};
        let newlist = [];
        resp.data.tables.forEach((table) => {
          if (table.name === tablename) {
            newschema = JSON.parse(table.schema);
            newlist = Object.keys(newschema);
          }
        });
        setSchema(newschema);
        setList(newlist);
        console.log(newschema, newlist);
        setbackdrop(false);
      }
    } catch (error) {
      console.log(error);
      setMessage(error.response?.data.message || "Something went Wrong");
      setOpen(1);
      setLoading(false);
    }
  };
  useEffect(() => {
    loadtable();
  }, []);
  return (
    <div>
      <div className="createtable">
        <div className="hed">
          {" "}
          Editing table "{tablename}" in "{project}"{" "}
        </div>
        <label htmlFor="name">Table Name</label>
        <input type="text" id="name" value={tablename} readOnly></input>
        <br />
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
        <hr />
        <button className="width-m" onClick={handleSubmit} disabled={loading}>
          {!loading ? (
            "Update Table"
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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}
      >
        <CircularProgress size={72} color="inherit" />
      </Backdrop>
    </div>
  );
};

export default EditTable;
