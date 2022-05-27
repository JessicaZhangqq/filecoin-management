import React from 'react'
import './style.css'
import '../style/MinerStatics.css'
import {useEffect,useState} from 'react'
function Sync() {
    const[ recentDate,setDate] = useState(null)
  return (
    <div className='container'>
        <h3>Sync data up to date</h3>
        <div>
            <div>
                <lable>last updadted on {recentDate} </lable>
                <button className='btn'>Sync Transaction</button>
            </div>
            <div>
                <label> last updated on {recentDate}</label>
            <button className='btn'>Sync Transaction Up to Date</button>
            </div>
        </div>
    </div>
  )
}

export default Sync