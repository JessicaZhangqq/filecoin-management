const mongoose = require('mongoose');
const balanceSchema =new mongoose.Schema({
      // _id: mongoose.Types.ObjectId,
      address: String,
      value: Number,
      balance: Number,
      miner: String,
      date: String,
      day: Number,
      month: Number,
      year: Number,
      
     });

module.exports = mongoose.model('Balance',balanceSchema)