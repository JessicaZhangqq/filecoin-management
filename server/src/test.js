let dosomething =  (callback)=>{
        console.log('I did something!')
        callback()
}

function test(){
    finished=false
    let timeoutPromise = new Promise((resolve, reject) => {
        // setTimeout(function(){
        //   resolve('Success!');
        // }, 2000);
        dosomething(()=>{
            resolve('Success!')
        })
    
      });
    return timeoutPromise
}

var finished = true;

var i=0;
function looptest(){
    while(finished==true && i<5){
        test()
        .then((message) => {
             console.log(i,finished);
             finished=true
        })
    i++
    }
}
// setInterval(looptest,2000)
looptest()