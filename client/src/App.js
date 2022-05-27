

import './style/app.css';
import {Routes,Route} from 'react-router-dom'

import Login from './components/Login';
import MinerStatics from './components/MinerStatics';
import MinerData from './components/MinerData';
import Sync from './components/Sync';
import MinerBalance from './components/MinerBalance';
import AddressBalancePeriod from './components/AddressBalancePeriod';
import TransactionDetail from './components/TransactionDetail';
function App() {
  return (
    <Routes>
       {/* <Route path ='/' element={<Login />}/> */}
       <Route path ='/' element={<Login />}/>
       <Route path ='/minerStatics' element={<MinerStatics/>} />
       <Route path ='/miners' element={<MinerData />} />
       <Route path ='/transactionDetals' element={<TransactionDetail />} />
       <Route path ='/addressBalance' element={<AddressBalancePeriod />} />
       <Route path ='/sync' element={<Sync />} />
    </Routes>
  );
}

export default App;
