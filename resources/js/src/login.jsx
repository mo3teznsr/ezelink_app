
import {Link} from "react-router-dom";
import axios from "axios";
import * as React from "react";
import { isLoading } from "../config";
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
const Login=()=>{
    let navigate = useNavigate();
    const [email,setEmail]=React.useState('')
    const [result,setResult]=React.useState(-1)
    const [password,setPassword]=React.useState('')

    const auth=()=>{
        isLoading.next(true)
        
        axios.post('/api/auth/login',{email,password})
        .then((res)=>{
            isLoading.next(false)
            
            localStorage.setItem('token',res.data.access_token)
            axios.defaults.headers.common = {'Authorization': `bearer ${res.data.access_token}`}
            navigate('/admin/employees')
        })
        .catch((e)=>{
            isLoading.next(false)
            setResult(0)
            
        })
    }

    return(
    <div className="h-100 d-flex">

    <div className="login-from m-auto ">

    {result==0?<Alert severity={"error"} >wrong email or password </Alert>:''}


        <img src="/logo.svg" className="my-2" />
        <h4 className="text-center">Login</h4>

        
            <input className="form-control mb-2" onChange={(e)=>setEmail(e.target.value)} placeholder="Email" type="email" />
      

        
            <input className="form-control" placeholder="password" onChange={(e)=>setPassword(e.target.value)} type="password" />
       <button onClick={auth}
       className="btn btn-primary my-2 w-100">Login</button>
       <Link to="/"
       className="btn btn-secondary my-2 w-100">Home</Link>

    </div>
    </div>
    );
}


export default Login;