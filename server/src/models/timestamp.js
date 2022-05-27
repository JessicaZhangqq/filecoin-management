const mongoose = require('mongoose');
const timestampSchema =new mongoose.Schema({
    //   _id: mongoose.Types.ObjectId,
      address: String,
      maxTimestamp: Number,
      minTimestamp: Number,
      lastUpdate: Number
     });

module.exports = mongoose.model('Timestamp',timestampSchema)