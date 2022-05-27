import React, { useEffect } from 'react'
import './style.css'
import '../style/MinerStatics.css'
import { useState} from "react";
const axios = require('axios');
const API_URL = process.env.REACT_APP_API;

function TransactionDetail() {
    const [minerStatics, setMinerStatics] = useState([])
    const [results, setResults] = useState([])
    const [miner,setMiner] = useState('f0130884')
    const [from,setDateFrom] = useState(new Date().toLocaleDateString('en-CA'))
    const [to,setDateTo] = useState(new Date().toLocaleDateString('en-CA'))
    const[pageNumber,setPage] = useState(0)
    const[totalPage,setTotalPage] = useState(null)
    const miners =[
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
   }
    useEffect(() => {
        const getTasks = () =>{
           var resultPage = results.slice((pageNumber-1)*20, pageNumber*20)
           setMinerStatics(resultPage)
        }
        getTasks()
    }, [pageNumber,minerStatics])

    const prePageOnClick = (e) =>{
        if(pageNumber===1){
            alert('This is the first page!')
        }else{
            setPage(pageNumber-1)
        }
    }
    const nextPageOnClick = (e) =>{
        if(pageNumber===totalPage){
            alert('This is the last page!')
        }else{
            setPage(pageNumber+1)
        }
        
    }
    const onSubmit = async (e)=>{
        e.preventDefault();
        console.log('onsubmit')
        // var res = await axios.get(`API_URL/minerStatics/${miner}/${date}`)
        var res = await axios.post('http://localhost:8080/api/transactions',
                {miner: miner,from:from,to:to}
        )
        var data = await res.data 
        console.log('data')
        // console.log(data)
       
        setResults(data)
        setPage(1)
        setTotalPage(parseInt(data.length/20))
        var resultPage = results.slice((pageNumber-1)*20, pageNumber*20)
        setMinerStatics(resultPage)
        console.log('minerStatics',minerStatics)
        console.log('totalPage',totalPage)
        console.log(pageNumber)
        
    } 
    // hand download event
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
        el.download = 'transactions.csv';
    }
  return (
    <div className='container'>
       
        <div className='searchMenu'>
            <div >
                <h2 className='center'>Miner Transactions</h2>
            </div>
            <form className='center' onSubmit={onSubmit} >
                <label>Miner</label>
                <select id="miner" name="miner"  onChange= { onChange }>
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
            <a type="button" className="btn" onClick={onclickN}>Download</a>
        </div>
        {minerStatics.length>0 ? (
            <div className='result'>
            <table>
                    <tr>
                        <th>Miner</th>
                        <th>Height</th>
                      
                        <th>From</th>
                    
                        <th>To</th>
                        <th>Type</th>
                        <th>Value</th>
                        <th>Address</th>
                        <th>Timestamp</th>
                        <th>Date</th>
                        {/* <th>Month</th>
                        <th>Day</th> */}
                    </tr>
                    {
                        minerStatics.map((miner,index)=>(
                         <tr>   
                            <td >{miner.miner}</td>
                            <td >{miner.height}</td>
                            
                            <td  className='address'>{miner.from}</td>
                            <td >{miner.to}</td>
                            <td >{miner.type}</td>
                            <td >{miner.value}</td>
                            <td >{miner.address}</td>
                            <td className='date'>{miner.timestamp}</td>
                            <td >{miner.year+'/'+miner.month+'/'+miner.day}</td>
                            {/* <td >{miner.month}</td>
                            <td >{miner.day}</td> */}
                        </tr>    
                        ))
                    }  
            </table>

        </div>
        )
        :( 'not data to show')
        }
        <div className='pagination'>
            <button onClick={prePageOnClick}>Previous</button>
            <ul className='footer' >
                {
                  Array.apply(0, Array(totalPage)).map((x, i)=> {
                    return <li className='page' key={i}  value= {i+1} onClick={(e)=>{
                        setPage(e.target.value)
                    }}>{i+1}</li>;
                  }) 
                }
            </ul>
            <button onClick={nextPageOnClick}>Next</button>
        </div>
    </div>
  )
}

export default TransactionDetail