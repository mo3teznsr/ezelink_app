import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { IconButton, InputAdornment } from '@mui/material';
import { isLoading } from '../../config';

export default function AddEmployee(props) {

const randPin=()=>{
    var pin =GenPin()
    while(props.employees.find(item=>item.pin==pin))
    {
        pin=GenPin()
    }
    console.log(pin)
    setPin(pin)
}

const GenPin=()=>{
    return Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
}





const [name,setName]=React.useState(props.item?props.item.name:'')
const [employee_id,setId]=React.useState(props.item?props.item.employee_id:'')
const [pin,setPin]=React.useState(props.item?props.item.secret:'')

React.useEffect(()=>{
  
console.log(props.item)
    randPin()
   
},[])
const save=()=>{
    isLoading.next(true)
    
        axios.post('/api/employee',{name,employee_id,secret:pin}).then(d=>{
            props.getData()
            props.hide()
            isLoading.next(false)
        })
        .catch(e=>{console.log(e)
            isLoading.next(false)
        })
   
   
}
  return (
    <div>
     
      <Dialog open={props.show} >
        <DialogTitle>Employess {props.item?'update':"create"}</DialogTitle>
        <DialogContent>

          <TextField margin="dense" value={employee_id} label="id" onChange={(e)=>setId(e.target.value)} fullWidth variant="standard" />

          <TextField margin="dense" value={name} label="name" onChange={(e)=>{
             setName(e.target.value)
          }} fullWidth variant="standard" />

          <TextField margin="dense" value={pin}  label="pin"
           onChange={(e)=>{
           setPin(e.target.value)
        }}
           InputProps={{
            endAdornment: <InputAdornment position="start">
                <IconButton onClick={()=>randPin()}><i className="bi bi-arrow-repeat"></i></IconButton>
            </InputAdornment>,
          }}
            fullWidth variant="standard" />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.hide} >Cancel</Button>
          <Button onClick={save}>save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
