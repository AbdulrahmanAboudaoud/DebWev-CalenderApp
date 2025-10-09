import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Login from "./pages/Login/Login";
import reportWebVitals from "./reportWebVitals";
import NavBar from "./components/navbar/NavBar";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <NavBar />
    <Login />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
