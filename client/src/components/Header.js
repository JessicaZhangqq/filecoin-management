import React from 'react'
import logo from '../logo.png';
import '../style/header.css';

function Header() {
  return (
    <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h3>Filecoin Management</h3>
        </header>
        <div>
        <ul className='header'>
          <li>
             <a href="minerStatics">节点统计</a>
          </li>
          <li>
            <a href="addressBalance">期间统计</a>
          </li>
          <li>
            <a href="transactionDetals">Transactions</a>
          </li>
          <li>
            <a href="miners">Miners</a>
          </li>
          <li>
            <a href="sync">Sync </a>
          </li>
        </ul>
        </div>
     
    </div>
  )
}

export default Header