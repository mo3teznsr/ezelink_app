import * as React from 'react'
import Day from './day'



const Attendance=()=>{

    const [type,setType]=React.useState(0)

    return(
        <>
        <h3 className='text-center'>Attendance</h3>

        <button 
        onClick={()=>setType(0)}
        className={type==0?'btn btn-primary mx-1':'btn btn-secondary mx-1'}>
            Day
        </button>

        <button 
        onClick={()=>setType(1)}
        className={type==1?'btn btn-primary':'btn btn-secondary'}>
            Month
        </button>

        {type==0?<Day />:""}
        </>
    )
}


export default Attendance