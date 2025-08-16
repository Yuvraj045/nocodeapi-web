import React, { useEffect, useState } from "react";
import { Add, Remove } from "@mui/icons-material";
import "./faq.scss";

const Faq = () => {
  const [display, setDisplay] = useState({});
  let [x, setx] = useState(true);
  const qparams = new URLSearchParams(window.location.search);
  const id = qparams.get("id");
  const questions = [
    {
      id: "p1",
      question: "What is use of SUPER-API?",
      answer:
        "Super API provide you a platform where you can create api endpoints for your projects. SUPER-API can be used to create api endpoints for your website, App or some other purpose.",
    },
    {
      id: "p2",
      question: "What is Project, Table and Column?",
      answer: `Project is workspace which combine of multiple table and their endpoints.\n
               Table consits of column and there endpoints.\n
               Column is part of table which defines data type of multiple variable in tables.\n
      `,
    },
    {
      id: "p3",
      question: "Project, Table and Column naming method?",
      answer: `Every name should start with lowecase letter and contains lowercase letters, digits and dash "-".\n
In case of project and Table name there should be atlest 5 charcters and in case of Column name there should be atlest 3 charcters.\n`,
    },
    {
      id: "p4",
      question: "What are Access levels in a Table?",
      answer: `Access levels define the access control on api endpoints.
Currently there are five Access levels:
We have, currently, maximum 5 privacy levels per end point.
1) Disable: Endpoint is disabled, no one can't access it.
2) Public: Enpoint is pulic, anyone with url can access it.
3) Secure with key: There is a key attached to each project. You need to provide that key in query in url to access endpoint. Example url : <code> https://..url..?key=<key></code>
4) Secure with Auth: Authentication service is provided with each project. You can select this option only when authentication is enbled. You need to provide auth token in headers named "x-auth-token" to access it. Example header :{"x-auth-token":"<authentication token>"}
5) Both Auth and Key: You have to provide both key and auth token.

** To Access point 4 and 5 you need to enable Authentication in your project.`,
    },
    {
      id: "p5",
      question: "What is Autentication in project and how to use it?",
      answer: `Authication is a service where you have some special routes like "/signin" , "/signup", etc are provided for user authentucation.
To Enable or disable user Authentication a button is provided on project.
On Enable Authentication :
If there is table with name "users" , username and password column will be added in it. Else "users" table will be created with two columns username ans password.`,
    },
    {
      id: "p6",
      question: "API endpoints working and request method?",
      answer: `There is predefined endpoints avalibale for each table:
1. POST : To Create new Element with given body. Body should be according to Schema or Columns generated in table.
2. GET : To Get all objects in a table.
3. GET by id : To Get particular object with given id.
4. PUT : To Update particular object with given id.
5. DELETE : To Delete particular object with given id.`,
    },
    {
      id: "p7",
      question: `API endpoints for "users" table on authentication enabled?`,
      answer: `There is some changes in api endpoints for table "users" on enabling Authentication.
Enpoints are following:
1. Signup (POST) : It is used to create new user in project.
2. Signin (POST) : It is used to validate username and password. It will return auth token for using in further requests.
3. All user: It is used to get all users in project.
4. GET profile: Project users can get their profile only.
5. PUT profile: Project users can update their profile only.
4. Delete profile: Project users can delete their profile only.`,
    },
    {
      id: "p8",
      question: "My project key got in unknown hands by mistake?",
      answer:
        "No worries, you can generate new key, that will invalidate all requests with old keys.",
    },
    {
      id: "p9",
      question:
        "What is API Auth or How to introduce User Authentication System in a project?",
      answer:
        "API Auth is a feature using which you can introduce or enable User Authentication system in your project with almost all flexibilities and freedom which is possible. You can enable/disable it by clicking ApiAuth button inside your desired project page.",
    },
    {
      id: "p10",
      question: "Can we use projects with our frontend application? How?",
      answer:
        "Yes! Call the required api using its provided endpoint with required body format designed by you, with appropriate query parameters, and headers from you front end application, and use the data/project however you want.",
    },
  ];

  var handleDisplay = (id) => {
    setx(!x);
    let newDisplay = display;

    newDisplay[id] = !newDisplay[id];
    console.log("id", newDisplay[id]);
    setDisplay(newDisplay);
  };
  useEffect(() => {
    var newDisplay = {};
    for (let i = 0; i < questions.length; i++) {
      newDisplay[questions[i]["id"]] = false;
    }
    if (id !== undefined) {
      newDisplay[id] = true;
    }
    setDisplay(newDisplay);
  }, []);

  return (
    <div className="faqs">
      <div className="head">FAQs</div>
      {questions.map((que) => (
        <div key={que.id} className="question">
          <div
            id={que.id}
            onClick={() => handleDisplay(que.id)}
            className="que"
          >
            <div>
              <b>{que.question}</b>
            </div>
            <div>{display[que.id] ? <Remove /> : <Add />}</div>
          </div>
          {display[que.id] && (
            <div className="ans">
              <b>Solution:</b>{" "}
              {que.answer.split("\n").map((str) => (
                <p key={str}>{str}</p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Faq;
