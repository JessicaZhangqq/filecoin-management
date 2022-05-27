import React, { useEffect } from 'react'
import './style.css'
import '../style/MinerStatics.css'
import { useState} from "react";
const axios = require('axios');
const API_URL = process.env.REACT_APP_API;

function AddressBalancePeriod() {
    const [results, setResults] = useState([])
    const [minerStatics, setMinerStatics] = useState([])
    const [miner,setMiner] = useState('all')
    const [year,setYear] = useState(new Date().getFullYear())
    const [month,setMonth] = useState(new Date().getMonth())
    const miners =[
        'all',
        'f0130884', 
        'f092228',
        'f0112667',
        'f0155050',
        'f0402661',
        'f0672951',
        'f01602479',
        'f01606675',
        'f01606849',
        'f01641612',
        'f01238519',
        'f01264125',
        'f01466173',
        'f01694304',
        'f01731371',
        'f01776738',
        'f01372912',
        'f01479781',
        'f01662887',
        'f01716466',
        'f01716454'

    ]
    
    const onChange = (e)=>{
         setMiner(e.target.value)
         console.log('slect option on change') 
         console.log('miner is',miner)
         console.log('value is',e.target.value)
    }
    
    const onSubmit = async (e)=>{
        e.preventDefault();
        console.log('onsubmit')
       var monthInt=parseInt(month)
        // var res = await axios.get(`API_URL/minerStatics/${miner}/${date}`)
        var res = await axios.post('http://localhost:8080/api/monthEndResults',
             {year:year,month:monthInt}
        )
        var data = await res.data 
        console.log(data[0]["miner-fee"])
        setResults(data)
        setMinerStatics(data)
    } 
    
    const onclickN = async(e)=>{
        var json = results
        var fields = Object.keys(json[0])
        var replacer = function(key, value) { return value === null ? '' : value } 
        var csv = json.map(function(row){
        return fields.map(function(fieldName){
            return JSON.stringify(row[fieldName], replacer)
        }).join(',')
        })
        csv.unshift(fields.join(',')) // add header column
        csv = csv.join('\r\n');
        var dataF = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);
        var el = e.currentTarget;
        el.href = dataF;
        el.target = '_blank';
        el.download = 'addressBalanceByPeriod.csv';
    }
  return (
    <div className='container'>
        <div className='searchMenu'>
            <div >
                <h2 className='center'>Address Trail Balance</h2>
            </div>
            <form className='center' onSubmit={onSubmit} >
                <label>Miner</label>
                <select id="miner" name="miner"  onChange= { onChange }>
                         {/* <option value='all'>All</option> */}
                    {
                        miners.map((miner,index)=>(
                            <option value={miner}>{miner}</option>
                        ))
                    }  
                </select>
                <label>Year</label>
                <select  name='year' value = {year} onChange= { (e)=>
                        setYear(e.target.value) } >
                    <option value='2022'>2022</option>
                </select>
                <label>Month</label>
                <select  name='month' value = {month} onChange= { (e)=>
                        setMonth(e.target.value) } >
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='7'>7</option>
                    <option value='8'>8</option>
                    <option value='9'>9</option>
                    <option value='10'>10</option>
                    <option value='11'>11</option>
                    <option value='12'>12</option>
                </select>
                
                <input type='submit' className='submit' />
            </form> 
            
                <a type="button" className="btn" onClick={onclickN}>Download</a>
          
        </div>
        {/* <div> {console.log(minerStatics.length)}</div> */}
        {minerStatics.length>0 ? (
            
            <div className='result'>
            <table>
                    <tr>
                        <th>Address</th>
                        <th>Miner</th>
                        <th>Reward</th>
                        <th>Gas</th>
                        <th>Send</th>
                        <th>Receive</th>
                    </tr>
                    {   
                        minerStatics.map((minerResult,index)=>(
                           
                         <tr>   
                            <td className='address' >{minerResult.address  }</td>
                            <td >{minerResult.miner  }</td>
                            <td >{minerResult.reward? minerResult.reward: 0}</td>
                            {/* <td >{minerResult["burn-fee"]+minerResult["miner-fee"]+minerResult["burn"] }</td> */}
                            <td >{minerResult.gas? minerResult.gas : 0}</td>
                            <td >{minerResult.send? minerResult.send:0}</td>
                            <td >{minerResult.receive? minerResult.receive: 0}</td>
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