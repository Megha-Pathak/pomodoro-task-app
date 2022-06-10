import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { AuthContextProvider } from "./context/auth-context";
import { BrowserRouter } from "react-router-dom";
import { TaskContextProvider } from "./context/task-context";

// Call make Server
makeServer();
ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TaskContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TaskContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
