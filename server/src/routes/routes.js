const { default: mongoose } = require("mongoose");
var fs = require('fs')
// var json2xls = require('json2xls');
module.exports = () => {
  const json2xls = require('json2xls');
  const isJson = require('is-json')
  const fs = require('fs')
  const express = require("express");
  const router = express.Router();
  const Transaction = require('../models/transaction')
  const Balance = require('../models/balance')
  const MinerReward = require('../models/minerReward')
  const Miners = require('../models/miners')
  const MinerStatics = require('../models/minerDetail')
  mongoose.connect("mongodb://localhost/filfox")
  url = "mongodb+srv://jessicazhang:BHmU6iByiAA3Ymk1@cluster0.w574b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  /**** Routes ****/

  const minerList=[
    'f0155050',  'f01602479',
    'f0112667',  'f0672951',
    'f01641612', 'f01606675',
    'f0130884',  'f092228',
    'f01776738', 'f01694304',
    'f01264125', 'f01606849',
    'f01238519', 'f01731371',
    'f01372912', 'f01479781',
    'f01662887', 'f0402661',
    'f01466173', 'f01716466'
  ]
  const wcList = [
    'f3v6v2bew2tnvnlj7n4gmig4ldwnrb7wi4s33dbzspth7uryhbleswxuerlo25fq7an3yl6dpltppe77jutaza',
    'f3s4otir3hgq6fdbd343usawhh7yay6tzb2bermgmjg35e6fbnxswu47dcaa2x44tr7pkwpvy2d7bzzdvwgsgq',
    'f3rp7d3tp23leia6fx6rq5net5xe5qsumgeattmcnpye4d5nlk2t7ikee3fpwjhkdg2tctr7tqxi6e6mbqudsq',
    'f3sxjuao74whiwmcnd7ad7hltkrbquzu7tp3rjqwlqa5mpngyvdsvo4x4g5hx5zl6xnvvoitewpwboagkacdmq',
    'f3vrvpai2ebi32hmjs56ovaqmpbkn7up3lf3e7dzm2qlq6txkxbe6ujl4tyrnpeaqu2y3g672dsqr6qfjnnysq',
    'f3vxjm2tjmhsqrvzgvlwnzrii5rscwyhn4uty6pehk7oyyqwxwm33wyabszqw4woovbk4gf7q3nwyt3q6umq2a',
    'f3ta6m5o3u5xkn67y236zfruhti5xk5c6em3fxnta5wnwk6mptnulwjedlbuigh7hbtovwxf4jj47hrlmznyma',
    'f3va37ati2zdnwf4j55e7xwlzisrl3biuxho4xpoo2wbxolhjhbpikjvhvb3i23fplctqy5inw4zi225f6rbza',
    'f3r2smu4icyge3bmbgbrajccgzcqinr362es5uylyi25iecnr4r652a53si3dwgs7ewl3ptkif6lof4nzlr4qq',
    'f3vvzixpuajbmdjlemfgpcrlprhxcjjisyjp2sk24dxbnxeno6myfnicjjhs65wo6f3ljqd5n7hjjwtg6fy4fq',
    'f3r7zwprrxqv77wdl3w2sre6a2htxehc5raex4es7mwggkqkrhtrpm2u2ktuu5t43hd2gqaonn5hq2ct46rh5a',
    'f3xd3lnxr4gh4dlrtrz7xgydurmit7a22luadw2lsn3mn7thcfjirvcnv7ocj73dc4zyd75qk2udi6ngr7dyxq',
    'f3qln4t7f6m7xfmvctq565hf5n4drnykxwwm7snqjp5irz33pnumwm7ksqi4g52fqy5a7it645st3tf3hfapha',
    'f3sqnmdy4i4nb4xgblergtls45hyuegnllltvlftphqj4wsgjdpatmxdmczmjgvyo2toswr3lkz33hiztcmr3q',
    'f3uls6elfv6emoqo74kwxuyid4hlf54qlb2m7qi7o5mcxv47tbbveotwqiz2l36g5xerbmcskad4adxdyqc7hq',
    'f3w5acabi4aalimr7stt7dm2agzulr7vrupog337ygugxxq64ol3ow7xpj523vvp443y5fcvkusghf5kg2aenq',
    'f3uqshbzcorkuwjacgqxdlzz5wcbztj3aujy6n3olak5wj2tv6daffztebqelulc7e56sbkcaazqnuvrzivpzq',
    'f3wawf3dgkoic4fn54avywljgjib4njamyn7mt5uu7yf4ffvebj3ta4qpz2qo7qokhcm5dznfmbv64vr5qvjya',
    'f3wb3yi47g52z4w7s44qzoaj35urz4erwsktp6azamz7izjvlgjgyynilaaxepw2jp2glzrfp5oxa6ge4zckmq',
    'f3u2frya4upurpa6ov4rrkptyoaywjcadbrds4np5doi64fmg4jxmccarxgwkjr4akl6p664hvtj6nvicg33pq',
    'f3qxlnocqg7yiwwxvqhnywia37yzwxrv5srcfafken4nwmnnmercjmyv65ospfvoedcrq3cu5ejeca22nfzhaq',
    'f3ua4rz2pdgor2ztv756lrz64xhgovmxkg5erzxgdgczxaarob4hheluyhzkif637f2jsfsh4pdeuy3tim3qka',
    'f3s4r2vsyzoolg3znoavol6p5od5lw6sgl6ijvoygmk4xrwkyca2hcilub7naumstmawspcwn3rxtc6wrxqdqa',
    'f3s4r2vsyzoolg3znoavol6p5od5lw6sgl6ijvoygmk4xrwkyca2hcilub7naumstmawspcwn3rxtc6wrxqdqa',
    'f3urnjmgbtmpdirfw6z3ctpwcs4qk3gyn5rfw5desmd3jwbsq655i73ba4x2sk22no3q32lz6lgw7anvvko3bq',
    'f3xf4cdhnxpcis2t4mgivi3ti2iyvydrir6cxeigahppxj4e475b4aaeuws3mupaxmwaali3ciz5wzq33vvrda',
    'f3ulwjmaumwrkk5pom6kgwtbtmdvlrb4aiaqo2qk2rzzodttkm2obzerxyh6764l6insts26ysmamy4p6vev6a',
    'f3vkj3d3clhq6udx25dsgwjow4mpwbq7yvf4em4vsw3ohdx6lnr6k5cyeyf2g7jssye3bda7rwv4risto652ya',
    'f3xdqrqsfhdxr2i3rfzzwciaprowdlgjuuewrm64gz4dqsk2gdu32shfs4lgnjqjygfkztfnhqlhl2ho5od2ua',
    'f3uorvoosl5lerdutjlklly7yu2dsyicso7rfd4wdabfvdo5vvwmwe4rhnbmkedfk6mtof5wgfwih7oz2klbiq',
    'f3up6nlhh2yswbhga5o42keabh7j5zfs3bxprt7r6tmb6mpnr3lc67c6hhhtfzts2oluav74vnu4qyorfvyjaa',
    'f3wmudgbx54745ok2uudyfmtth7fmgvqifflbsrjjecdjutohflarwe5ictcjvj7nqsp2dzwenexucl7xugqna',
    'f3wpu42epdfsssrr4laobxr5w7muduzumv7pjepvoa6phfez7gtqiebsa2wwc4nvvwbeuddjh7xllgvr4ponfa',
    'f3wzk4anlxsppwrg3t32ossv65pjwxsxuqmsqstizysc47exq63nfyiwxwsrcztltfzlcq4f5u6pbwhryhqnla',
    'f3vvfpxjai7p3ds43qzeu7u6ihm63ry2sqatjyfoanskqy5p3ioaz3ulpl5gbf4jp27ppehl4jatrz5lcgjf7a',
    'f3vzi4sqizrwvwhzvbbbr3k2rvhwlzvoillmzomx6ta2nz2mxkndzrvbsizm456sc544ile4yiuhiw5jirvmba',
    'f3vgdka3dcodiwlgq4ytfhj6cj7fu7zhye76jduxxovhxxocpxkl3dmctnishp6irapsiaf7n4qf4lmawpnmta',
    'f3wqvcfaof4iag6tecv5mi6h4wjj7macux6lxtvbp22bhydjdgt6bum47pyuv2jmwuhpwc26fq5kln33wjjjda',
    'f3xfo2muulazpwzu6ae3szz5dppyza5phg55dbyiaht4wxbbxe7c72iuea2kqloj6ux5d37zotar3qcre7cbha',
    'f3ss2626xwbftlxcnhhq5pqdqqpz5udmex7hgn67qic7sqmo5l24ggmzhzzdfxkgplkjjf2nwh3g7lf5x55zia',
    'f3q6igcc2rqkxgpqxtqszbk3r3hx3m2cdfsxfa7caabztc6hbx4tzupo6wwa4njk2y64t2hcbylfsxa63yjt4q',
    'f3thnzbbmdf5xyotnoeul54jnv57r7qazoenc2okkeflwju5ixkqid26peksvw2msoxjkn5vnthgthnhsoxvpq',
    'f3udhjgzordbmxgg7mcaolkfi64zblr3uw736nqu2y6agkh2ebtg67q4qc2mg44wt6z7rqdooc6exmzf3u3uyq',
    'f3wr24vqgvrizbitmnhqsua54yuuubrp7q4elmfn43yiinl5ipssn5fgcsqulrer4khzvd22ttvlxevynry6ka',
    'f3se3ao66pqy6dvpzsifzeaqrksw23wcmkdusqdtsrf7kzxaq2hnz5g4yg2kvkb434e6yxifdp7pnzlbfgl2rq',
    'f3su67way45h7phfrjkqiwr4c7jy5cctbntbwdewplxsvkgwq4vu6bwk4ys6vgtrfp46limbcz74jzexibwhyq',
    'f3vz3gxddc4uot6b2adujg7ypyllilfohsa5ppboqe3iie7fjqqaz67e7na3jmljxt7fd35svy47bzyluylgea',
    'f3qgpidj6eyib4gabrouzx765evux4loepigang3qcuqv3dmyedcmvip2x6g3mge3zn6gdiwkhoupitaffihmq',
    'f3vmedrfibzpbaczhbw2wv5f365ufrxsuco3xtdhw6kegpe72cha2pq5nj7a2nyjpwxdpqrg7yyxygdksoqmta',
    'f3wwz4e27vx6e24y2bh2lzasvsw2d6fv4lbi3zsdr72gsndtucfy72pz3dpatri4heovvt3xh7xl3w6yqmco7q',
    'f3ue6jwqmpjxve3drlxdm5t6gtnewyujjhi76d324qi6dr2hmvi43uooyq2lbbe3tqaw5dmkeuucl3q6p6ln6a',
    'f3wo6xfrkjmzgddxzmrwwr7k7l4xht4khbqt2q3gfuw5y7knpd27bcoje2zqyupjgizjkaullteq6bmrusrzua',
    'f3ultton3lkv67n6aijq64hcoza362rkif5nrbh44kexm7gjebzabovevjqzxf5bisqgh63s5oq6hkb44l3cyq',
    'f3rfuhdclpqomogpmookmvw2ihbptwemty2llrbgokn5l2ly4tzl552zcgj75cyuha6lilwi554tdb7okn6awq',
    'f3tb5dq22nginq6lfxnxyznc6vxofe73qeio7q5hvimdexsfhvsexsbkl3d2gaij6udi6vdc7poa3impojhpma',
    'f3qojncgvvcobibidmhs4c2bbmcjl3tcpwlxhf4334jai2mrxrxb3vh4bsqjvab5g3jaorris3kmxlphwc3ftq',
    'f3vqcmfxjgl56g7rkbafjfr5vqxhpfgyow7b2litnvm7j6crkp22obicvrbb7x7ya7qdparetchabewdq2ncmq',
    'f3qdizy2qyfdnlyqtxhnsd7fiqfworulnfa2hkb6oshd6nusoogrk7otw7xi4gjqbyu4u77ojx2inspyvpwovq',
    'f3q6dnekjxzpf7mvtwsljrghpfagefajlahmjwrl4mivn6yu2t6sitqek5s66ayued7nkpljnqwj6s66xw67vq',
    'f3qakz5gancba5m3ak3beykca5x5vzhgibaq2teatt4vsyag4lwo3pqkrwdgedbyiovtm7dlrtihtybha5te5q',
    'f3uuzal4coj6eje2k2ud5zapz55un7q5m3drnres52j2o7vfzijm2xobxbux6qjvfj7e4lskpzv3wv7jsxu7oq',
    'f3w6kgn6j2yugosf32jkeatt7tj6lwyig3xkecu2ou4jwketdjr4uz77by6zsx5vve6su24ht7gyjznfgm3juq',
    'f3vlrrox5bkbz6ufmeujgc7l3byhhdtd3yeigincx6m7d2envvmbzfegdeeggal2difuw4yzshms7hy6hab5za',
    'f3sfgekq462uzidxk72zd5x225cv2ukqmo2p2f7wstyoljq5iena5v7pmn3uqzbaddipbeb6yhsko4g7jbyroq',
    'f3qolf55rtaejclw4slcvxefq5dlpd4wmwzobn5kpji5qezl5xkshr7qujixyniz7qggm4r745yv7judkasxsq',
    'f3rjntcvi5kidm4nk3eolvdnozahykeqlk74ip2jnxhk3xow2w3b3vqmpofcgethnr32zwqts2pq3cdcsb7e4q',
    'f3tb7jirgn5qxjhwsqzmlkh6eu3q2t56gnlnsn34k7r7qgml4uxyo37soqvjvnwq3uvukniecnml6ktv5be5aq',
    'f3tdngwf36id7zmtnjxpwxqgohfvi5d3dzljhyrd2uz6ws6awkbbrwutqr6enumxkqtafcy53ymuyfteixfqaa',
    'f3w5m4funfxmr6igos3dwbatsneg34bhxzgx5inqnhojlx5j2i4u42kfdrdbufklgngk3kokupictckhkdkt2a',
    'f3qe7phesjdoohqkcrleqpwsrkqvuwtmim77uespztqnbtvenq5aybgjli3zn7gfnheiptft2tmlwueiynzlbq',
    'f3v4l4bobfan5ne3qbrnfomusfojdwo477okyvxwbi5qdo33pzugtctvjmczuhpmc5qd37cv4vt63xtvqyywfq',
    'f3wasdjh3a7v6e5jj4nbuam5qpta6c4fonanu43j44kkjflrwheno4ivuja5l33sf3ydi63wviiguihdjki6gq',
    'f3xe5xlzpg6kqtdyrxvfqpam3dksarhct23q7cczsn7wwm4np4ghg556o6ye3p3nlj32efhcmr2qmv4y5iqliq',
    'f3qnmwvjek4de67ivyctcb2af457ga6uw7a5wfra4qscmojcfxtgnizhtezwsb2aoy7j5yzugpku4p6dq7625q',
    'f3qsvtbkbunuklkfd7pa5ol2ftljbifuziaynhgxkdpfinj3sxlwq5ipr2k6l3xy4paflxr5zmarvfs6g2soqq',
    'f3wywoihtccidne6ajx6xzn2z6antxqvhciejqagzggadhutfjhuncj2nlrrrqm2gtreq5wffp32pvcb5bbfjq'
  ]
  async function getAmountList(month,year){
    var resultList=[]
    const amountStart= await Balance.find({month:month,year:year}).sort("address")
    const amountEnd= await Balance.find({month:month+1,year:year}).sort("address")
    // console.log(amountStart)
    for(var i=0;i<amountEnd.length;i++){
        if(amountEnd[i].address==amountStart[i].address)
        {   var result={}
            result["amount"]=  amountEnd[i].balance-amountStart[i].balance
            result.address=  amountEnd[i].address
            result.miner=  amountEnd[i].miner
            resultList.push(result)
            // console.log(result)
        }
    }
    // console.log('type of address',resultList)
    return resultList
  }
  router.get('/', async (req, res) => {
    res.json({msg: "Hello, who are you!"});
  });
  router.post('/transactions', async (req, res) => {
   console.log('req',req.body)
   var miner = req.body["miner"]
   var fromdate = req.body["from"]
   var todate = req.body["to"]
   var query ={}
   console.log('miner is ',miner)
    query.miner=miner
        //如果from to日期都不为空
    if(fromdate&&todate){
      const fromTimestamp = new Date(fromdate)
      const toTimestamp = new Date(todate)
        query.timestamp ={$gte:fromTimestamp/1000,$lte:toTimestamp/1000}
      }
    //  如果from 有 to空
    if(fromdate&& !todate){
      const fromTimestamp = new Date(fromdate)
      query.timestamp = fromTimestamp/1000
    }    
    //如果from true to 空
    if(!fromdate&&todate){
      const toTimestamp = new Date(todate)
      query.timestamp = toTimestamp/1000
    }  
   console.log('query',query)
    Transaction.find(query,function(err, arr) {
      if(err){
        throw err
        res.status(500).json({ err: err })
        return
      }
      res.send(arr )
      console.log(arr)
    })
  });
  // find index of an json array while one property value matches
  function findIndexMiner(address,arr){
    // console.log(address)
    // console.log(arr)
    for(var i=0;i<arr.length;i++){
       if(arr[i].address==address){
         return i
         console.log('found it',i)
       }
    }
 }
 
 //把 burn 和miner = gas
 async function processMinerResult(arr){  
  // burn, reward,receive
  var addressResultList=[]
  arr.forEach((a)=>{
      var indexOfMiner = findIndexMiner(a._id.address,addressResultList)
      if(indexOfMiner>=0){
      addressResultList[indexOfMiner][a._id.type]= (a.totalValue)
      }else{
        //address不存在列表中，加上 第一次设置address 值
        var addresData={}
        addresData[a._id.type]= (a.totalValue)
        addresData.address= (a._id.address)
        addresData.miner= (a._id.miner)
        
      // console.log("addresData",addresData)
        addressResultList.push(addresData)
   }
   })
   addressResultList.map((a)=>{
    if(!a.reward){
      a.reward=0
    }
    if(!a.send){
      a.send=0;
    }
    if(!a.receive){
      a.receive=0;
    }
    if(!a.burn){
      a.gas=0
    }else{
      a.gas=a.burn
      delete a.burn
    }
   })
   return addressResultList
 }
 //firt need get the arr where type = send/receive,
 //second, need the amount of that period
 async function processWCResult(arr,month,year){  
  //  console.log('arr',arr)
  // burn, reward,receive
  var addressResultList=[]
  var amountList =await getAmountList(month,year)
  // console.log('amountList',amountList[0])
  arr.forEach((a)=>{
      var indexOfMiner = findIndexMiner(a._id.address,amountList)
      if(indexOfMiner>=0){
        amountList[indexOfMiner][a._id.type]= (a.totalValue)
      }
   })
  //  console.log('amount list after loop array arr',amountList)
//calculate gas fee
amountList.forEach(a=>{
  if(!a.send){
    a.send=0;
  }
  if(!a.receive){
    a.receive=0;
  }
  a.gas = a.amount-a.send-a.receive
  delete a.amount
  a.reward=0
})
// console.log(amountList)
   return amountList
 }
 //test
 router.post('/test',async(req,res)=>{
console.log('hi,test')
 await getAmountList(5)
 })
 //节点数据统计，聚合
  router.post('/minerStatics', async (req, res) => {
   console.log('/minerstatics')
   var minerResultList = [
     {miner:"f092228"},
     {miner:"f0130884"},
     {miner:"f0112667"},
     {miner:"f0155050"},
     {miner:"f0402661"},
     {miner:"f0672951"},
     {miner:"f01602479"},
     {miner:"f01606675"},
     {miner:"f01606849"},
     {miner:"f01641612"},
     {miner:"f01238519"},
     {miner:"f01264125"},
     {miner:"f01466173"},
     {miner:"f01694304"},
     {miner:"f01731371"},
     {miner:"f01776738"},
     {miner:"f01372912"},
     {miner:"f01479781"},
     {miner:"f01662887"},
     {miner:"f01716466"},
     {miner:"f01716454"},
   ]
   console.log(req.body)
   var fromdate = req.body["from"]
   var todate = req.body["to"]
   var miner = req.body["miner"]
   
    var query ={}
  if(miner=='all'){
      //如果from to日期都不为空
      if(fromdate&&todate){
        const fromTime = new Date(fromdate)
        const toTime = new Date(todate)
        const fromTimestamp = fromTime/1000
        const toTimestamp = toTime/1000
        query = [    
          {$match:{timestamp:{$gte:fromTimestamp,$lte:toTimestamp}} },   
          {$group:{_id:{miner:"$miner",type:"$type"},totalValue:{$sum:"$value"}}} ,
          //倒叙排列
          {$sort:{miner:-1}}
          ]
        }
      //  如果from有 to空
      if(fromdate&& !todate){
        const fromTimestamp = new Date(fromdate)
        const timestamp = fromTimestamp/1000
        query = [    
          {$match:{timestamp:{$gte:toTimestamp}} },   
          {$group:{_id:{miner:"$miner",type:"$type"},totalValue:{$sum:"$value"}}} ,
          //倒叙排列
          {$sort:{miner:-1}}
          ]
      }    
      //如果from空 to有
      if(!fromdate&&todate){
        const toTimestamp = new Date(todate)
        const timestamp = toTimestamp/1000
        query = [    
          {$match:{timestamp:{$lte:toTimestamp}} },   
          {$group:{_id:{miner:"$miner",type:"$type"},totalValue:{$sum:"$value"}}} ,
          //倒叙排列
          {$sort:{miner:-1}}
          ]
        }  
    }else{
      //如果from to日期都不为空
  if(fromdate&&todate){
    const fromTime = new Date(fromdate)
    const toTime = new Date(todate)
    const fromTimestamp = fromTime/1000
    const toTimestamp = toTime/1000
    query = [    
      {$match:{timestamp:{$gte:fromTimestamp,$lte:toTimestamp},miner:miner} },   
      {$group:{_id:{miner:"$miner",type:"$type"},totalValue:{$sum:"$value"}}} ,
      //倒叙排列
      {$sort:{miner:-1}}
      ]
    }
  //  如果from有 to空
  if(fromdate&& !todate){
    const fromTimestamp = new Date(fromdate)
    const timestamp = fromTimestamp/1000
    query = [    
      {$match:{timestamp:{$gte:toTimestamp},miner:miner} },   
      {$group:{_id:{miner:"$miner",type:"$type"},totalValue:{$sum:"$value"}}} ,
      //倒叙排列
      {$sort:{miner:-1}}
      ]
  }    
  //如果from空 to有
  if(!fromdate&&todate){
    const toTimestamp = new Date(todate)
    const timestamp = toTimestamp/1000
    query = [    
      {$match:{timestamp:{$lte:toTimestamp},miner:miner} },   
      {$group:{_id:{miner:"$miner",type:"$type"},totalValue:{$sum:"$value"}}} ,
      //倒叙排列
      {$sort:{miner:-1}}
      ]
    }  
    }
      
      var resultArr
    Transaction.aggregate(query,function(err, arr) {
      if(err){
        throw err
        res.status(500).json({ err: err })
        return
      }
      console.log('arr',arr)
      console.log('length',arr.length)
      if(arr.length>0){
            // console.log('arr',arr)
          arr.forEach((a)=>{
            // console.log(a.totalValue)
            
            var indexOfMiner = findIndexMiner(a._id.miner,minerResultList)
            // console.log(indexOfMiner)
            // if(indexOfMiner!= -1){
              console.log(indexOfMiner,a._id.miner)
              minerResultList[indexOfMiner][a._id.type]= (a.totalValue)
            // }
          })
          console.log('minerResultList befor',minerResultList)

          const finalResult =  minerResultList.filter((minerResult) => Object.keys(minerResult).length >1)
          console.log('minerResultList after',finalResult)
          res.send(finalResult )
      }else{
        res.send([])
      }
     
    })
   
  });
  //节点数据统计，聚合
  router.post('/addressBalance', async (req, res) => {
    const sectorOutput= 'transaction'+Date.now()+'.xlsx'
    console.log('/address balance by period')
    var addressResultList = []
    console.log(req.body)
    var year = req.body["year"]
    var month = req.body["month"]
    var miner = req.body["miner"]
     var query ={}
   if(miner=='all'){
         query = [    
           {$match:{year:2022,month:3} },   
           {$group:{_id:{address:"$address",miner:"$miner",type:"$type"},totalValue:{$sum:"$value"}}} ,
           //倒叙排列
           {$sort:{miner:-1}}
           ]
     }else{
      query = [    
        {$match:{year:year,month:month,miner:miner} },   
        {$group:{_id:{miner:miner,address:"$address",type:"$type"},totalValue:{$sum:"$value"}}} ,
        //倒叙排列
        {$sort:{miner:-1}}
        ]
     }
       var resultArr
     Transaction.aggregate(query,function(err, arr) {
       if(err){
         throw err
         res.status(500).json({ err: err })
         return
       }
      //  console.log('arr',arr)
       console.log('length',arr.length)
       if(arr.length>0){
             // console.log('arr',arr)
           arr.forEach((a)=>{
            //  console.log('a',a)
             // console.log(a.totalValue)
             var indexOfMiner = findIndexMiner(a._id.address,addressResultList)
            //  console.log("indexOfMiner",indexOfMiner)
             if(indexOfMiner>=0){
               //address存在列表中
              // console.log(indexOfMiner,a._id.address)
              addressResultList[indexOfMiner][a._id.type]= (a.totalValue)
              
             }else{
               //address不存在列表中，加上 第一次设置address 值
               var addresData={}
               addresData[a._id.type]= (a.totalValue)
               addresData.address= (a._id.address)
               addresData.miner= (a._id.miner)
               
              // console.log("addresData",addresData)
               addressResultList.push(addresData)
             }
          })
           console.log('minerResultList',addressResultList)
          //  const finalResult =  addressResultList.filter((minerResult) => Object.keys(minerResult).length >1)
          //  console.log('minerResultList after',finalResult[0])
           res.send(addressResultList )
          var myJsonString = JSON.stringify(addressResultList);
           xls = json2xls(JSON.parse(myJsonString));
           console.log(sectorOutput);
           console.log('type of xls',typeof(xls))
           fs.writeFileSync(sectorOutput, xls, 'binary');
           console.log('it is json')
         
       }else{
         res.send([])
       }
      
     })
    
   });
      //每月返回所有地址的各类型发生额，gas, reward,send,receive, address,miner
  router.post('/monthEndResults', async (req, res) => {
    const sectorOutput= 'transaction'+Date.now()+'.xlsx'
    console.log('/address balance by period')
    var addressResultList = []
    console.log(req.body)
    var year = req.body["year"]
    var month = req.body["month"]
     var resultMiner 
     var resultWc 
     var resultAll

    queryMiner = [    
      {$match:{year:year,month:month,address:{$in :minerList}} },   
      {$group:{_id:{address:"$address",miner:"$miner",type:"$type"},totalValue:{$sum:"$value"}}} ,
      //倒叙排列
      {$sort:{miner:-1}}
      ]
    queryWC = [    
        {$match:{year:year,month:month,address:{$in: wcList},type:{$in:["send","receive"]}} },   
        {$group:{_id:{address:"$address",miner:"$miner",type:"$type"},totalValue:{$sum:"$value"}}} ,
        //倒叙排列
        {$sort:{miner:-1}}
        ] 
       var resultArr
       var arrMiner ,arrWC
       var resultMiner,resultWc
  //处理miner数据
    try{
       arrMiner=await Transaction.aggregate(queryMiner)
    }catch(e){
      console.log('error, query miner')
      console.log(e)
    }
    if(arrMiner.length>0){
       resultMiner=await  processMinerResult(arrMiner,month)
      console.log('type of resultMiner',typeof(resultMiner))
    }
// worker controller  取得send receive的结果
    try{
      arrWC=await Transaction.aggregate(queryWC)
    }catch(e){
      console.log('error, query worker controller')
      console.log(e)
    }
    if(arrWC.length>0){
       resultWc=await processWCResult(arrWC,month,year)
    }
    
  const finalResult= resultMiner.concat(resultWc)
  // resultMiner.forEach((a)=>{
  // resultWc.push(a)
  // })
  
  console.log('finalResult',finalResult[0],finalResult[finalResult.length-1])
  res.send(finalResult)
    // console.log('result workers and controllers',resultWc)
  });
  
   router.post('/minerReward', async (req, res) => {
     console.log('minerReward')
    const sectorOutput= 'minerReward.xlsx'
    var addressResultList = []
     var query ={}
      query = [    
        {$match:{} },   
        {$group:{_id:{miner:"$miner",type:"$type",year:"$year",month:"$month",day:"$day"},totalValue:{$sum:"$value"}}} ,
        //倒叙排列
        {$sort:{miner:-1}}
        ]
       var resultArr
       MinerReward.aggregate(query,function(err, arr) {
       if(err){
         throw err
         res.status(500).json({ err: err })
         return
       }
      //  console.log('arr',arr)
       console.log('length',arr.length)
       if(arr.length>0){
             // console.log('arr',arr)
           arr.forEach((a)=>{
               var addresData={}
               addresData.miner= (a._id.miner)
               addresData.type= (a._id.type)
               addresData.month= (a._id.month)
               addresData.day= (a._id.day)
               addresData.year= (a._id.year)
               addresData.total= (a.totalValue)
               console.log(addresData)
               addressResultList.push(addresData)
          })
           console.log('minerResultList',addressResultList)
          //  const finalResult =  addressResultList.filter((minerResult) => Object.keys(minerResult).length >1)
          //  console.log('minerResultList after',finalResult[0])
         res.send(addressResultList )
          var myJsonString = JSON.stringify(addressResultList);
           xls = json2xls(JSON.parse(myJsonString));
           console.log(sectorOutput);
           console.log('type of xls',typeof(xls))
           fs.writeFileSync(sectorOutput, xls, 'binary');
           console.log('it is json')
          // fs.write(sectorOutput)
          //  res.download(sectorOutput,(err)=> {
          //      if(err){
          //          fs.unlinkSync(sectorOutput)
          //          res.send('Unable to download the excel file')
          //        }
                //  fs.unlinkSync(sectorOutput)
          //  })
       }else{
         res.send([])
       }
      
     })
    
   });
  //下载节点统计结果到本地
  router.post('/minerstaticsDownload', async (req, res) =>{
    console.log('/minerstatics')
   
    const sectorOutput= 'minerStatics.xlsx'
    var minerResultList = [
      {miner:"f092228"},
      {miner:"f0130884"},
      {miner:"f0112667"},
      {miner:"f0155050"},
      {miner:"f0402661"},
      {miner:"f0672951"},
      {miner:"f01602479"},
      {miner:"f01606675"},
      {miner:"f01606849"},
      {miner:"f01641612"},
      {miner:"f01238519"},
      {miner:"f01264125"},
      {miner:"f01466173"},
      {miner:"f01694304"},
      {miner:"f01731371"},
      {miner:"f01776738"},
      {miner:"f01372912"},
      {miner:"f01479781"},
      {miner:"f01662887"},
      {miner:"f01716466"},
      {miner:"f01716454"},
    ]
    console.log(req.body)
    var fromdate = req.body["from"]
    var todate = req.body["to"]
    var miner = req.body["miner"]
    
     var query ={}
   if(miner=='all'){
       //如果from to日期都不为空
       if(fromdate&&todate){
         const fromTime = new Date(fromdate)
         const toTime = new Date(todate)
         const fromTimestamp = fromTime/1000
         const toTimestamp = toTime/1000
         query = [    
           {$match:{timestamp:{$gte:fromTimestamp,$lte:toTimestamp}} },   
           {$group:{_id:{miner:"$miner",type:"$type"},totalValue:{$sum:"$value"}}} ,
           //倒叙排列
           {$sort:{miner:-1}}
           ]
         }
       //  如果from有 to空
       if(fromdate&& !todate){
         const fromTimestamp = new Date(fromdate)
         const timestamp = fromTimestamp/1000
         query = [    
           {$match:{timestamp:{$gte:toTimestamp}} },   
           {$group:{_id:{miner:"$miner",type:"$type"},totalValue:{$sum:"$value"}}} ,
           //倒叙排列
           {$sort:{miner:-1}}
           ]
       }    
       //如果from空 to有
       if(!fromdate&&todate){
         const toTimestamp = new Date(todate)
         const timestamp = toTimestamp/1000
         query = [    
           {$match:{timestamp:{$lte:toTimestamp}} },   
           {$group:{_id:{miner:"$miner",type:"$type"},totalValue:{$sum:"$value"}}} ,
           //倒叙排列
           {$sort:{miner:-1}}
           ]
         }  
     }else{
       //如果from to日期都不为空
   if(fromdate&&todate){
     const fromTime = new Date(fromdate)
     const toTime = new Date(todate)
     const fromTimestamp = fromTime/1000
     const toTimestamp = toTime/1000
     query = [    
       {$match:{timestamp:{$gte:fromTimestamp,$lte:toTimestamp},miner:miner} },   
       {$group:{_id:{miner:"$miner",type:"$type"},totalValue:{$sum:"$value"}}} ,
       //倒叙排列
       {$sort:{miner:-1}}
       ]
     }
   //  如果from有 to空
   if(fromdate&& !todate){
     const fromTimestamp = new Date(fromdate)
     const timestamp = fromTimestamp/1000
     query = [    
       {$match:{timestamp:{$gte:toTimestamp},miner:miner} },   
       {$group:{_id:{miner:"$miner",type:"$type"},totalValue:{$sum:"$value"}}} ,
       //倒叙排列
       {$sort:{miner:-1}}
       ]
   }    
   //如果from空 to有
   if(!fromdate&&todate){
     const toTimestamp = new Date(todate)
     const timestamp = toTimestamp/1000
     query = [    
       {$match:{timestamp:{$lte:toTimestamp},miner:miner} },   
       {$group:{_id:{miner:"$miner",type:"$type"},totalValue:{$sum:"$value"}}} ,
       //倒叙排列
       {$sort:{miner:-1}}
       ]
     }  
     }
       
       var resultArr
     Transaction.aggregate(query,function(err, arr) {
       if(err){
         throw err
         res.status(500).json({ err: err })
         return
       }
       console.log('arr',arr)
       if(arr.length>0){
             console.log('arr',arr)
           arr.forEach((a)=>{
             console.log(a.totalValue)
             
             var indexOfMiner = findIndexMiner(a._id.miner,minerResultList)
             // console.log(indexOfMiner)
             minerResultList[indexOfMiner][a._id.type]= (a.totalValue)
           
           })
           console.log('minerResultList befor',minerResultList)
 
           const finalResult =  minerResultList.filter((minerResult) => Object.keys(minerResult).length >1)
           console.log('minerResultList after',finalResult)
          //  res.send(finalResult )
          var myJsonString = JSON.stringify(finalResult);
//  
    if(isJson(myJsonString)){
      console.log('isJson ?it is json')
       xls = json2xls(JSON.parse(myJsonString));
       console.log(sectorOutput);
       console.log('type of xls',typeof(xls))
       fs.writeFileSync(sectorOutput, xls, 'binary');
       console.log('it is json')
       res.download('',(err)=> {
           if(err){
               fs.unlinkSync(sectorOutput)
               res.send('Unable to download the excel file')
             }
            //  fs.unlinkSync(sectorOutput)
       })
    }
       }else{
         res.send([])
       }
      
     })
    
   });
  router.get('/miners', async (req, res) => {
    console.log('/miners')
     // const transactionModel= new Transaction()
     // await transaction.
     Miners.find({},function(err, arr) {
       if(err){
         throw err
         res.status(500).json({ err: err })
         return
       }
       console.log('arr:',arr)
       res.send(arr )
     })
   });
  router.get('/hello/:name', async (req, res) => {
    res.json({msg: `Hello, ${req.params.name}`});
  });

  return router;
}
