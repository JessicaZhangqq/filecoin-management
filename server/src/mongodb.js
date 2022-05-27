var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
 
 //insert one document to a collection
 function insertOneDocument(document, myObj){
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      // var myobj = { name: "Company Inc", address: "Highway 37" };
      var dbo = db.db("filfox");
      dbo.collection(document).insertOne(myObj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
      });
    });
  } 
//更新表transaction中地址的最大和最小时间戳
  const createMaxMin = async (address) =>{ 
    var query = {miner:address}
    var maxStamp, minStamp
    var maxResult, minResult
    var lastUpdate = new Date().getTime()
    maxResult=await Transaction.find(query).sort({timestamp:-1}).limit(1).exec()
    minResult=await Transaction.find(query).sort({timestamp:+1}).limit(1).exec()
    maxStamp = maxResult[0]['timestamp']
    minStamp = minResult[0]['timestamp']
    console.log(maxStamp,minStamp)
    createUpdateSta(address,maxStamp,minStamp)
}
//执行aggregate聚合函数

//