
import * as React from "react";
import Home from "./src/home";
import '../css/app.css'; 
import {
  Routes,
  Route,
} from "react-router-dom";
import { Backdrop } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import '../css/app.css'; 
import {isLoading} from './config'
import Login from "./src/login";
import Layout from "./src/admin/layout";
import Employee from "./src/admin/employee";
import Attendance from "./src/admin/attendance";
const Main=()=>{
const [open,setOpen]=React.useState(false)

React.useEffect(()=>{
    isLoading.subscribe((val)=>{
        setOpen(val)
    })

    
                })

    return (<>
     <div id="app">
        <Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={open}

>
  <CircularProgress color="inherit" />
</Backdrop>
        <Routes>
        
        <Route path="/" element={<Home />}></Route>
        <Route path="admin" element={<Layout />}>
        <Route path="attendance" element={<Attendance />}></Route>
          <Route path="employees" element={<Employee />}></Route>
        </Route>

        <Route path="/login" element={<Login />}></Route>
        
        </Routes>
        </div></>)
}


export default Main;