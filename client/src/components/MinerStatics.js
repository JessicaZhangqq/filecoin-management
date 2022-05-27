import React, { useEffect } from 'react'
import './style.css'
import '../style/MinerStatics.css'
import { useState} from "react";
const axios = require('axios');
const API_URL = process.env.REACT_APP_API;

function MinerStatics() {
    const [results, setResults] = useState([])
    const [minerStatics, setMinerStatics] = useState([])
    const [miner,setMiner] = useState('all')
    const [from,setDateFrom] = useState(new Date().toLocaleDateString('en-CA'))
    const [to,setDateTo] = useState(new Date().toLocaleDateString('en-CA'))
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
        // var res = await axios.get(`API_URL/minerStatics/${miner}/${date}`)
        var res = await axios.post('http://localhost:8080/api/minerstatics',
             {miner: miner,from:from,to:to}
        )
        var data = await res.data 
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
        el.download = 'minerstatics.csv';
    }
  return (
    <div className='container'>
        <div className='searchMenu'>
            <div >
                <h2 className='center'>Miner Statics</h2>
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
                <label>From</label>
                <input type='date' name='from' value = {from} onChange= { (e)=>
                        setDateFrom(e.target.value) } />
                <label>To</label>
                <input type='date' name='to' value = {to} onChange= { (e)=>
                        setDateTo(e.target.value) } />
                <input type='submit' className='submit' />
            </form> 
            
                <a type="button" class="btn" onClick={onclickN}>Download</a>
          
        </div>
        {/* <div> {console.log(minerStatics.length)}</div> */}
        {minerStatics.length>0 ? (
            <div className='result'>
            <table>
                    <tr>
                        <th>Miner</th>
                        <th>Reward</th>
                        <th>Burn</th>
                        <th>Send</th>
                        <th>Receive</th>
                    </tr>
                    {
                        minerStatics.map((minerResult,index)=>(
                         <tr>   
                            <td >{minerResult.miner  }</td>
                            <td >{minerResult.reward? minerResult.reward: 'N/A'}</td>
                            <td >{minerResult.burn? minerResult.burn : 'N/A'}</td>
                            <td >{minerResult.send? minerResult.send:'N/A'}</td>
                            <td >{minerResult.receive? minerResult.receive: 'N/A'}</td>
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

export default MinerStatics