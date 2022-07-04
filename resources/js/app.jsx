import './bootstrap';
import * as React from "react";


import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Main from './main';


const root = ReactDOM.createRoot(
    document.getElementById("app")
  );

  root.render (
        <React.StrictMode>
        <BrowserRouter>
       <Main />
        </BrowserRouter>
      </React.StrictMode>
    );


