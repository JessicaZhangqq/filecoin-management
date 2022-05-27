import React from 'react'
import { useState, useEffect } from 'react'
const axios = require('axios');

function AddressBalancePeriod() {
  const [minersData,setMinersData] = useState([])

  useEffect(() => {
    const getTasks = async() =>{
       
        var res = await axios.get('http://localhost:8080/api/miners')
        var data = await res.data 
        console.log('minersData useEffect')
        await setMinersData(data)
        console.log('minersdata length',minersData.length)
       
    }
    getTasks()
}, [])

  return (
    <div className='center'>
      <h3>Miners</h3>     
      {minersData.length>0 ? (
            <div className='result '>
            <table >
                    <tr >
                        <th>Miner</th>
                        <th>Entity</th>
                        <th>Country</th>
                    </tr>
                    {
                        minersData.map((miner,index)=>(
                         <tr>   
                            <td >{miner.Address}</td>
                            <td >{miner.Entity}</td>
                            <td >{miner.Location}</td>
                        </tr>    
                        ))
                    }  
            </table>
        </div>
        )
        :( 'not data to show')
        }
    </div>
  )
}

export default AddressBalancePeriod