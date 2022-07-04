
import * as React from "react";
import axios from 'axios'
import { isLoading } from "../config";
import Alert from '@mui/material/Alert';
import {
    Link,
   
  } from "react-router-dom";
const Home=()=>{


const [pin,setPin]=React.useState('')
const [result,setResult]=React.useState(-1)
const [message,setMessage]=React.useState('')
const addPin=(i)=>{
    var newPin=pin.toString()+i.toString()
    
        if(pin.length<6)
        {
            setPin(newPin)
        }

        if(newPin.length==6)
        {
            isLoading.next(true)

            axios.post('/api/check',{secret:newPin}).then((res)=>{
                console.log(res.data)
                isLoading.next(false)
                setMessage(res.data.message)
                setResult(1)
                setTimeout(()=>setResult(-1),5000)
                setPin('')
            })
            .catch((e)=>{
                console.log(e)
                isLoading.next(false)
                setMessage('sorry, pin not found')
                setResult(0)
                
                setTimeout(()=>setResult(-1),5000)
                setPin('')
            })
        }
}
    return (<> 
    {result!=-1?<Alert className="m-4" severity={result==1?'success':"error"} > {message}</Alert>:''}

    <div className="h-100 d-flex " >
        
        
<div className="m-auto login-from ">
<div className="text-center my-2">
    <Link to="/login">
        <a className="btn btn-primary">Login</a>
    </Link>
</div>

<img src= '/logo.svg' className="my-3" />
<div className="d-flex justify-content-center">
    {Array.from(Array(6).keys()).map((item)=>{
        return <div key={item} className="input-from shadow">
      {pin[item]?pin[item]:''}
        </div>
    })
    
    }
    </div>
<div className="number-pad">
{Array.from(Array(9).keys()).map((item)=>{
        return <div key={item} className="col-4 ">
        <button className="btn bg-white mb-2 shadow" onClick={()=>addPin(item+1)}>
            {item+1}
        </button>
        </div>
    })
    
    }

<div className="col-4">
        <button className="btn bg-white shadow" onClick={()=>setPin('')}>
        x
        </button>
        </div>
        <div  className="col-4">
        <button className="btn bg-white shadow" onClick={()=>addPin(0)}>
           0
        </button>
        </div>
        <div className="col-4">
        <button className="btn bg-white shadow" onClick={()=>setPin(pin.slice(0, -1))}>
        <i className="bi bi-backspace"></i>
        </button>
        </div>
    
</div>
</div>
    </div></>)
}

export default Home;