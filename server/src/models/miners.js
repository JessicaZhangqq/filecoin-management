const mongoose = require('mongoose');
const minersSchema =new mongoose.Schema({
      _id: mongoose.Types.ObjectId,
      entity: String,
      location: String,
      address:String
     });

module.exports = mongoose.model('Miners',minersSchema)