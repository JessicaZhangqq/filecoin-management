const mongoose = require('mongoose');
const minerStaticsSchema =new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    miner: String,
    balance: Number,
    totalRewards: Number,
    owner: {
        address:String,
        balance: Number
    } ,
    worker:  {
        address:String,
        balance: Number
    },
    controlAddresses: [{
        address:String,
        balance: Number
    }],
    preCommitDeposits: Number,
    vestingFunds: Number,
    initialPledgeRequirement: Number,
    availableBalance: Number,
    sectorPledgeBalance: Number,
    pledgeBalance: Number,
    address: String
     });

module.exports = mongoose.model('minerDetail',minerStaticsSchema)

