import axios from 'axios'
import * as React from 'react'
import { isLoading } from '../../config'



const Day=()=>{

    const [result,setResult]=React.useState([])
    const [date,setDate]=React.useState('')

    const getResult=(e)=>{
        setDate(e.target.value)
        isLoading.next(true)
        axios.post('/api/attendance/day',{day:e.target.value})
        .then((res)=>{
            isLoading.next(false)
        setResult(res.data)
        })
        .catch(e=>{
            isLoading.next(false)
            console.log(e)})
    }
   
    return(
        <>
        <div className='p-4'>
            <input className='form-control' value={date} type="date" onChange={getResult} />
        </div>

        <div class="bg-white rounded m-4 p-4">
            <table className='table'>
                <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Name</th>
                        <th>Checkin</th>
                        <th>Checkout</th>
                    </tr>
                </thead>
                <tbody>
                    {result.map((item,index)=>(<tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.checkin?item.checkin:'-'}</td>
                        <td>{item.checkout?item.checkout:'-'}</td>
                    </tr>))}
                </tbody>
            </table>
        </div>
        </>
    )
}


export default Day