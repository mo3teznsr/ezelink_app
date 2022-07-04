
import { Outlet } from "react-router-dom";
import * as React from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    Link,
   
  } from "react-router-dom";
import { isLoading } from "../../config";
const Layout=()=>{
    let navigate = useNavigate();
    const [user,setUser]=React.useState('')
    const getData=async()=>{
        isLoading.next(true)
        var token=await localStorage.getItem('token')
        if(token)
        {
        axios.defaults.headers.common = {'Authorization': `bearer ${token}`}
        axios.get('/api/auth').then(d=>{
            console.log(d)
            setUser(d)
            isLoading.next(false)
            
        })
        .catch((e)=>{
            console.log(e)
            axios.post('/api/auth/r').then((res)=>{
                localStorage.setItem('token',res.data.access_token)
                axios.defaults.headers.common = {'Authorization': `bearer ${res.data.access_token}`}
            }).catch(e=>{
                console.log(e)
                localStorage.removeItem('token')
                navigate('/login')
            })
            isLoading.next(false)
            
        })
    }
    else {
        isLoading.next(false)
        navigate('/login')
    }
    }
    React.useEffect( ()=>{
       getData()
    },[])


    return(<div className="row">
<nav className="navbar navbar-expand-lg bg-white px-4">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">ezeLink</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/admin/attendance">Attendance</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin/employees">Employee</Link>
        </li>
        <li className="nav-item ">
          <a className="nav-link" onClick={()=>{
            localStorage.removeItem('token')
            navigate('/login')
          }} to="#">Logout</a>
        </li>
       
      </ul>
    </div>
  </div>
</nav>
       
        <div className="col-12 p-4"><Outlet className="m-2" /> </div>
    </div>)
}

export default Layout;