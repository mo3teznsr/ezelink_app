import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import AddEmployee from './addEmployee';
import axios from 'axios';
import { isLoading } from '../../config';
import Switch from '@mui/material/Switch';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import {  InputAdornment } from '@mui/material';



const Employee=()=>{
const [employees,setEmployees]=React.useState([])
const [show,setShow]=React.useState(false)
const [show1,setShow1]=React.useState(false)
const [item,setItem]=React.useState({secret:"",name:"",employee_id:""})
const [Ename,setEname]=React.useState('')
const getData=()=>{
    isLoading.next(true)
    axios.get('/api/employee').then((res)=>{
        console.log(res.data)
        setEmployees(res.data)
        isLoading.next(false)
    })
    .catch(e=>{
        isLoading.next(false)
        console.log(e)
    })
}


React.useEffect(()=>{
   setTimeout(()=> getData(),2000)
},[])
const hide=()=>{setShow(false)}
    return(<div className='p2'>
 <Paper
      
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 ,borderRadius:"0.5rem",m:".5rem auto"}}
    >
      
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search ...."
        inputProps={{ 'aria-label': 'search .....' }}
      />
     <i className="bi bi-search"></i>
   
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: '10px' }} onClick={()=>{
        setItem({secret:"",name:"",employee_id:""})
        setShow(!show)
        
    }} aria-label="directions">
      <i className="bi bi-plus-circle-fill"></i>
      </IconButton>
    </Paper>
  
<div className='bg-white shadow p-2 border-md rounded'>
    <table className='table '>
        <thead>
            <tr>
                <th>#ID</th>
                <th>Name</th>
                <th>PIN</th>
                <th>status</th>
                <th></th>
            </tr>
        </thead>

        <tbody>
            {employees.map((employee,index)=>{
                return (
                    <tr key={index}>
                        <td>{employee.employee_id}</td>
                        <td>{employee.name}</td>
                        <td>{employee.secret}</td>
                        <td>{employee.status==1?'active':'inactive'}</td>
                        <td><button className='btn' onClick={()=>{
                           
                            setItem(employee)
                          //  console.log(item,employee)
                            setShow1(true)
                        }} ><i className="bi bi-pencil-fill"></i> </button> </td>
                        
                    </tr>
                    
                )
            })}
        </tbody>
    </table>
    </div>
    <AddEmployee item={item} update={(e)=>setItem(e)} getData={getData} show={show} hide={hide} employees={employees} />
    <Dialog open={show1} >
        <DialogTitle>Employess update</DialogTitle>
        <DialogContent>

          <TextField margin="dense" value={item.employee_id} label="id" onChange={(e)=>{
             let newItem={id:item.id,employee_id:e.target.value,name:item.name,secret:item.secret,status:item.status}
             
             setItem(newItem)
          }} fullWidth variant="standard" />

          <TextField margin="dense" value={item.name} label="name" onChange={(e)=>{
           let newItem={id:item.id,employee_id:item.employee_id,name:e.target.value,secret:item.secret,status:item.status}
             
              setItem(newItem)
          }} fullWidth variant="standard" />

          <TextField margin="dense" value={item.secret}  label="pin"
           onChange={(e)=>{
          
            let newItem={id:item.id,employee_id:item.employee_id,name:item.name,secret:e.target.value,status:item.status}
             
            setItem(newItem)
           
        }}
           InputProps={{
            endAdornment: <InputAdornment position="start">
                <IconButton onClick={()=>randPin()}><i className="bi bi-arrow-repeat"></i></IconButton>
            </InputAdornment>,
          }}
            fullWidth variant="standard" />
            <label>Active</label>
             <Switch checked={item.status==1} onChange={()=>{
                let newItem={id:item.id,employee_id:item.employee_id,name:item.name,secret:item.secret,status:item.status==1?0:1}
             
                setItem(newItem)
             }} name="Active" />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{
            setShow1(false)
            
          }} >Cancel</Button>
          <Button onClick={()=>{
            setShow1(false)
            axios.put('/api/employee/'+item.id,item)
            .then((res)=>getData())
            .catch(e=>console.log(e))

          }}>save</Button>
        </DialogActions>
      </Dialog>
    </div>)
}


export default Employee;