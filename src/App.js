import { Routes, Route } from "react-router-dom";

import { Dashboard, Signin, Signup, Verify, Reset, Navbar, Project, CreateTable, CreateProject, Faq, EditTable, Footer } from "./components/_index";


import auth from "./services/auth";
import React from 'react';


function App() {
  const user = auth.getUser();
  console.log(user);

  return (

    <div style={{ minWidth: "600px" }}>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/faq" element={<Faq />} />

        <Route path="/signin" element={<Signin />} />
        <Route path="/verify/:token" element={<Verify />} />
        <Route path="/reset/:token" element={<Reset />} />
        {!user && <Route path='*' element={<Signin />} />}
        {user && <React.Fragment>
          <Route path="/project/:project" element={< Project />} />
          <Route path="/createtable/:project" element={<CreateTable />} />
          <Route path="/edittable/:project/:table" element={<EditTable />} />

          <Route path="/createproject" element={<CreateProject />} />
          <Route path="/" element={<Dashboard />} />
        </React.Fragment>}

      </Routes>
      <Footer />

    </div>
  );
}

export default App;
