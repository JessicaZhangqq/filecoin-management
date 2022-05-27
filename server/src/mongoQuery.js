const { db } = require("./models/transaction")

db.transactionMinerWorker.aggregate( 
    [

        {"$group": { "_id": { address: "$address", miner: "$miner" } } }
    ]
)
//按miner读取各类型的总发生额 时间段内
query = [    
       {$match:{timestamp:{$gte:fromTimestamp,$lte:toTimestamp},miner:miner} },   
       {$group:{_id:{miner:"$miner",type:"$type"},totalValue:{$sum:"$value"}}} ,
       //倒叙排列
       {$sort:{miner:-1}}
       ]
     //miner address 组合
query = 
    [
        {"$group": { "_id": { address: "$address", miner: "$miner" } } }
    ]

// 读取所有地址的 各类型总额
query=[   {$match:{month:3,year:2022}},
    {"$group": { "_id": { address: "$address", miner: "$miner" ,type:"$type"},totalValue:{$sum:"$value"} } }
]

maxResult=await Transaction.find(query).sort({timestamp:-1}).limit(1).exec()
    minResult=await db.transactionMinerWorker.find(query).sort({timestamp:+1}).limit(1).exec()
    db.transactionMinerWorker.find({address:"f0130884"})

db.transactions.aggregate(
    [   {$match:{month:"3",year:"2022"}},
        {"$group": { "_id": { address: "$address", miner: "$miner" ,type:"$type"},totalValue:{$sum:"$value"} } }
    ]
)

db.transactions.aggregate(
    [   {$match:{month:"3",year:"2022"}},
        {"$group": { "_id": { address: "$miner", miner: "$miner" ,type:"$type"},totalValue:{$sum:"$value"} } }
    ]
)

db.transactionMinerWorker.find({miner:"f0130884"}).sort({timestamp:-1})

db.transactionMinerWorker.distinct("address")

db.transactionMinerWorker.find( { 'month' : { $type : 2 } } ).forEach( function (x) {   
    x.month = new Double(x.month); // convert field to string
    db.transactionMinerWorker.updateOne(x);
  });