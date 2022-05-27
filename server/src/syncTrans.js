const { default: mongoose } = require("mongoose");
const Transaction = require('./models/transaction')
const Miners = require('./models/miners');
const UpdateStatus = require("./models/timestamp");

const axios = require('axios');
// const { add } = require('cheerio/lib/api/traversing');
const decimalBase = 1000000000000000000;
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

mongoose.connect("mongodb://localhost/filfox")
//1646110800  三月1日  1650550500  1648699200 3.31

// var month = 2; // January
// var d = new Date(2022, month + 1, 0);
// console.log(d.toString()); // last day in January
// console.log(d.getTime()); // last day in January


var addressList =[
    'f0112667',
    'f01238519',
    'f01264125',
    'f0130884',
    'f01372912',
    'f01466173',
    'f01479781',
    'f0155050',
    'f01602479',
    'f01606675',
    'f01606849',
    'f01641612',
    'f01662887',
    'f01694304',
    'f01716466',
    'f01731371',
    'f01776738',
    'f0402661',
    'f0672951',
    'f092228',
    'f3q6dnekjxzpf7mvtwsljrghpfagefajlahmjwrl4mivn6yu2t6sitqek5s66ayued7nkpljnqwj6s66xw67vq',
    'f3q6igcc2rqkxgpqxtqszbk3r3hx3m2cdfsxfa7caabztc6hbx4tzupo6wwa4njk2y64t2hcbylfsxa63yjt4q',
    'f3qakz5gancba5m3ak3beykca5x5vzhgibaq2teatt4vsyag4lwo3pqkrwdgedbyiovtm7dlrtihtybha5te5q',
    'f3qdizy2qyfdnlyqtxhnsd7fiqfworulnfa2hkb6oshd6nusoogrk7otw7xi4gjqbyu4u77ojx2inspyvpwovq',
    'f3qe7phesjdoohqkcrleqpwsrkqvuwtmim77uespztqnbtvenq5aybgjli3zn7gfnheiptft2tmlwueiynzlbq',
    'f3qgpidj6eyib4gabrouzx765evux4loepigang3qcuqv3dmyedcmvip2x6g3mge3zn6gdiwkhoupitaffihmq',
    'f3qnmwvjek4de67ivyctcb2af457ga6uw7a5wfra4qscmojcfxtgnizhtezwsb2aoy7j5yzugpku4p6dq7625q',
    'f3qojncgvvcobibidmhs4c2bbmcjl3tcpwlxhf4334jai2mrxrxb3vh4bsqjvab5g3jaorris3kmxlphwc3ftq',
    'f3qolf55rtaejclw4slcvxefq5dlpd4wmwzobn5kpji5qezl5xkshr7qujixyniz7qggm4r745yv7judkasxsq',
    'f3qsvtbkbunuklkfd7pa5ol2ftljbifuziaynhgxkdpfinj3sxlwq5ipr2k6l3xy4paflxr5zmarvfs6g2soqq',
    'f3r7zwprrxqv77wdl3w2sre6a2htxehc5raex4es7mwggkqkrhtrpm2u2ktuu5t43hd2gqaonn5hq2ct46rh5a',
    'f3rfuhdclpqomogpmookmvw2ihbptwemty2llrbgokn5l2ly4tzl552zcgj75cyuha6lilwi554tdb7okn6awq',
    'f3rjntcvi5kidm4nk3eolvdnozahykeqlk74ip2jnxhk3xow2w3b3vqmpofcgethnr32zwqts2pq3cdcsb7e4q',
    'f3s4otir3hgq6fdbd343usawhh7yay6tzb2bermgmjg35e6fbnxswu47dcaa2x44tr7pkwpvy2d7bzzdvwgsgq',
    'f3s4r2vsyzoolg3znoavol6p5od5lw6sgl6ijvoygmk4xrwkyca2hcilub7naumstmawspcwn3rxtc6wrxqdqa',
    'f3se3ao66pqy6dvpzsifzeaqrksw23wcmkdusqdtsrf7kzxaq2hnz5g4yg2kvkb434e6yxifdp7pnzlbfgl2rq',
    'f3sqnmdy4i4nb4xgblergtls45hyuegnllltvlftphqj4wsgjdpatmxdmczmjgvyo2toswr3lkz33hiztcmr3q',
    'f3ss2626xwbftlxcnhhq5pqdqqpz5udmex7hgn67qic7sqmo5l24ggmzhzzdfxkgplkjjf2nwh3g7lf5x55zia',
    'f3su67way45h7phfrjkqiwr4c7jy5cctbntbwdewplxsvkgwq4vu6bwk4ys6vgtrfp46limbcz74jzexibwhyq',
    'f3sxjuao74whiwmcnd7ad7hltkrbquzu7tp3rjqwlqa5mpngyvdsvo4x4g5hx5zl6xnvvoitewpwboagkacdmq',
    'f3tb5dq22nginq6lfxnxyznc6vxofe73qeio7q5hvimdexsfhvsexsbkl3d2gaij6udi6vdc7poa3impojhpma',
    'f3thnzbbmdf5xyotnoeul54jnv57r7qazoenc2okkeflwju5ixkqid26peksvw2msoxjkn5vnthgthnhsoxvpq',
    'f3ua4rz2pdgor2ztv756lrz64xhgovmxkg5erzxgdgczxaarob4hheluyhzkif637f2jsfsh4pdeuy3tim3qka',
    'f3ue6jwqmpjxve3drlxdm5t6gtnewyujjhi76d324qi6dr2hmvi43uooyq2lbbe3tqaw5dmkeuucl3q6p6ln6a',
    'f3uls6elfv6emoqo74kwxuyid4hlf54qlb2m7qi7o5mcxv47tbbveotwqiz2l36g5xerbmcskad4adxdyqc7hq',
    'f3ultton3lkv67n6aijq64hcoza362rkif5nrbh44kexm7gjebzabovevjqzxf5bisqgh63s5oq6hkb44l3cyq',
    'f3ulwjmaumwrkk5pom6kgwtbtmdvlrb4aiaqo2qk2rzzodttkm2obzerxyh6764l6insts26ysmamy4p6vev6a',
    'f3up6nlhh2yswbhga5o42keabh7j5zfs3bxprt7r6tmb6mpnr3lc67c6hhhtfzts2oluav74vnu4qyorfvyjaa',
    'f3uqshbzcorkuwjacgqxdlzz5wcbztj3aujy6n3olak5wj2tv6daffztebqelulc7e56sbkcaazqnuvrzivpzq',
    'f3uuzal4coj6eje2k2ud5zapz55un7q5m3drnres52j2o7vfzijm2xobxbux6qjvfj7e4lskpzv3wv7jsxu7oq',
    'f3v4l4bobfan5ne3qbrnfomusfojdwo477okyvxwbi5qdo33pzugtctvjmczuhpmc5qd37cv4vt63xtvqyywfq',
    'f3va37ati2zdnwf4j55e7xwlzisrl3biuxho4xpoo2wbxolhjhbpikjvhvb3i23fplctqy5inw4zi225f6rbza',
    'f3vgdka3dcodiwlgq4ytfhj6cj7fu7zhye76jduxxovhxxocpxkl3dmctnishp6irapsiaf7n4qf4lmawpnmta',
    'f3vlrrox5bkbz6ufmeujgc7l3byhhdtd3yeigincx6m7d2envvmbzfegdeeggal2difuw4yzshms7hy6hab5za',
    'f3vmedrfibzpbaczhbw2wv5f365ufrxsuco3xtdhw6kegpe72cha2pq5nj7a2nyjpwxdpqrg7yyxygdksoqmta',
    'f3vqcmfxjgl56g7rkbafjfr5vqxhpfgyow7b2litnvm7j6crkp22obicvrbb7x7ya7qdparetchabewdq2ncmq',
    'f3vrvpai2ebi32hmjs56ovaqmpbkn7up3lf3e7dzm2qlq6txkxbe6ujl4tyrnpeaqu2y3g672dsqr6qfjnnysq',
    'f3vvfpxjai7p3ds43qzeu7u6ihm63ry2sqatjyfoanskqy5p3ioaz3ulpl5gbf4jp27ppehl4jatrz5lcgjf7a',
    'f3vvzixpuajbmdjlemfgpcrlprhxcjjisyjp2sk24dxbnxeno6myfnicjjhs65wo6f3ljqd5n7hjjwtg6fy4fq',
    'f3vxjm2tjmhsqrvzgvlwnzrii5rscwyhn4uty6pehk7oyyqwxwm33wyabszqw4woovbk4gf7q3nwyt3q6umq2a',
    'f3vz3gxddc4uot6b2adujg7ypyllilfohsa5ppboqe3iie7fjqqaz67e7na3jmljxt7fd35svy47bzyluylgea',
    'f3vzi4sqizrwvwhzvbbbr3k2rvhwlzvoillmzomx6ta2nz2mxkndzrvbsizm456sc544ile4yiuhiw5jirvmba',
    'f3w5acabi4aalimr7stt7dm2agzulr7vrupog337ygugxxq64ol3ow7xpj523vvp443y5fcvkusghf5kg2aenq',
    'f3w5m4funfxmr6igos3dwbatsneg34bhxzgx5inqnhojlx5j2i4u42kfdrdbufklgngk3kokupictckhkdkt2a',
    'f3w6kgn6j2yugosf32jkeatt7tj6lwyig3xkecu2ou4jwketdjr4uz77by6zsx5vve6su24ht7gyjznfgm3juq',
    'f3wawf3dgkoic4fn54avywljgjib4njamyn7mt5uu7yf4ffvebj3ta4qpz2qo7qokhcm5dznfmbv64vr5qvjya',
    'f3wb3yi47g52z4w7s44qzoaj35urz4erwsktp6azamz7izjvlgjgyynilaaxepw2jp2glzrfp5oxa6ge4zckmq',
    'f3wmudgbx54745ok2uudyfmtth7fmgvqifflbsrjjecdjutohflarwe5ictcjvj7nqsp2dzwenexucl7xugqna',
    'f3wo6xfrkjmzgddxzmrwwr7k7l4xht4khbqt2q3gfuw5y7knpd27bcoje2zqyupjgizjkaullteq6bmrusrzua',
    'f3wqvcfaof4iag6tecv5mi6h4wjj7macux6lxtvbp22bhydjdgt6bum47pyuv2jmwuhpwc26fq5kln33wjjjda',
    'f3wwz4e27vx6e24y2bh2lzasvsw2d6fv4lbi3zsdr72gsndtucfy72pz3dpatri4heovvt3xh7xl3w6yqmco7q',
    'f3wywoihtccidne6ajx6xzn2z6antxqvhciejqagzggadhutfjhuncj2nlrrrqm2gtreq5wffp32pvcb5bbfjq',
    'f3xdqrqsfhdxr2i3rfzzwciaprowdlgjuuewrm64gz4dqsk2gdu32shfs4lgnjqjygfkztfnhqlhl2ho5od2ua',
    'f3xfo2muulazpwzu6ae3szz5dppyza5phg55dbyiaht4wxbbxe7c72iuea2kqloj6ux5d37zotar3qcre7cbha'
  ]

const createUpdateSta = async(address,maxStamp,minStamp) =>{
    var lastUpdate = new Date().getTime()
     await  UpdateStatus.create({address:address,maxTimestamp: maxStamp,minTimestamp:minStamp,lastUpdate:lastUpdate})
}
const updateUpdateSta = async(address,maxStamp,minStamp) =>{
    console.log(maxStamp,minStamp)
    var lastUpdate = new Date().getTime()
    var str1 = new Date(lastUpdate)
    console.log('lastUpdate',lastUpdate)
    await  UpdateStatus.findOneAndUpdate({address:address},{maxTimestamp: maxStamp,minTimestamp:minStamp,lastUpdate:lastUpdate},(err,data)=>{
        if(err){
            throw err
        }else{
            console.log(data)
        }
    })
    UpdateStatus.bulkSave()
}

const createMaxMin = async (address) =>{ 
    console.log('create timestamp',address)
    var query = {address:address}
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
const getMaxMinWorker = async (address) =>{ 
    var query = {address:address}
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
const getTimestamp = async (address) =>{ 
    console.log('address',address)
    var query = {address:address}
    var maxStamp, minStamp
    var maxResult, minResult
    
    maxResult=await Transaction.find({address:"f0130884"}).sort({timestamp:-1}).limit(1).exec()
    minResult=await Transaction.find({address:"f0130884"}).sort({timestamp:+1}).limit(1).exec()
    console.log('maxResult',maxResult)
    maxStamp = maxResult[0]['timestamp']
    minStamp = minResult[0]['timestamp']
    console.log(maxStamp,minStamp)
    createUpdateSta(address,maxStamp,minStamp)
}
// 日期格式转化为可读
function convertDateFormat(dateObj) {
    var s,d;
    d = new Date(0);
    d.setUTCSeconds(dateObj);
    // s = d.getUTCFullYear()+ "/";
    // s += d.getUTCMonth() + 1+ "/"; //months from 1-12
    // s += d.getUTCDate();
    return d;
}
//process transactions
function processTransaction(transaction){
    // console.log('processTransaction')
    transaction["value"]=parseInt(transaction["value"])/decimalBase
    var dateObj = new Date(0); // The 0 there is the key, which sets the date to the epoch
    dateObj.setUTCSeconds(transaction["timestamp"]);
    transaction.date= dateObj
    transaction.month = dateObj.getUTCMonth() + 1; //months from 1-12
    transaction.day = dateObj.getUTCDate();
    transaction.year = dateObj.getUTCFullYear();
    // console.log(transaction)
    // console.log('end of addDMYtoTransaction')
}
//insert document to a collection
function insertManyDocument(url,document, myObj){
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      // var myobj = { name: "Company Inc", address: "Highway 37" };
      var dbo = db.db("filfox");
      dbo.collection(document).insertMany(myObj, function(err, res) {
        if (err) throw err;
        console.log("many document inserted");
        db.close();
      });
    });
  }
async function getTransWithTimestamp(address,maxTimestamp){
    // console.log('type ',type)
    var res = await axios.get(`https://filfox.info/api/v1/address/${address}/transfers?pageSize=100&page=0`)
    var data = await res.data
    //save the first page data into mongodb
     //calculate the size of pages in total,
     var pageSize = parseInt(data["totalCount"]/100)
     var timestamp
     var continueLoop = true
    if( data["totalCount"] >0){
        //page start from 0
        for(var i=0;i<=pageSize;i++){
           if(continueLoop){
                   console.log("page",i)
               //i is page number
               res = await axios.get(`https://filfox.info/api/v1/address/${address}/transfers?pageSize=100&page=${i}`)
               data = await res.data
               // console.log(data)
               for(var j=0;j<data["transfers"].length;j++){
                   //j is transaction number
                   timestamp = data["transfers"][j].timestamp
                   console.log('timestamp',timestamp)
                   if(timestamp > maxTimestamp){
                       console.log("transaction",j)
                       data["transfers"][j].miner=address
                       data["transfers"][j].address=address
                       processTransaction(data["transfers"][j])
                   }else{
                       continueLoop =false
                       data["transfers"].splice(j,1)

                   }
                }
             //insert the transaction of this page into db
             insertManyDocument(url,'transactions',data["transfers"])
           }else{
               //update maxtimestamp
               updateMaxMin(address)
               break;
           }
       }
            
    }
}
const getMaxMinAll = async()=>{
   
    var maxStamp, maxResult
    // minStamp = minResult[0]['timestamp']
    for(const add of addressList){
       await createMaxMin(add)
    }
}

const updateMaxMinAll = async()=>{
    
    var maxStamp, maxResult
    // minStamp = minResult[0]['timestamp']
    for(const address of addressList){
       updateMaxMin(address)
    }
}

const syncOneAddressTransaction = async(address)=>{
    var query = {miner:address}
    var maxStamp
    var maxResult
    var lastUpdate = new Date().getTime()
    maxResult=await Transaction.find(query).sort({timestamp:-1}).limit(1).exec()
    maxStamp = maxResult[0]['timestamp']
    getTransWithTimestamp(address,maxStamp)
}
// getMaxMin()
// 读取当前所有address的最新timestamp
getMaxMinAll()
// updateMaxMinAll()
// getMaxMinWorker('f3v6v2bew2tnvnlj7n4gmig4ldwnrb7wi4s33dbzspth7uryhbleswxuerlo25fq7an3yl6dpltppe77jutaza')
// updateMaxMinAll()


// createMaxMin("f0130884")
