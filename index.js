//execution queues order: direct call (8),nextTick (3), Promise(2), IO (readFile), setImmediate(1), setTimeout
//after ReadFile is done direct callback (4) nextTick (7), then setImmediate (6), then setTimeout(6)
//event loop phases: Poll, Check, Close, Timer, Pending
//Poll IO related like fileSystem and network
//check setImmediate triggered callbacks
//close EventEmitter close Event
//timer setTimeout and setInterval
//pending special system events are run in this phase like when a net.Socket TCP socket throws an ECONNREFUSED error
//nextTick microtask queue and promise microtask queue are processed for each event loop phase

const fs = require('fs');
//add setImmediate to check queue
setImmediate(() => console.log(1));
//add promise resolve to promise microtask queue
Promise.resolve().then(() => console.log(2));
//add process.nextTick to process nextTick microtask queue
process.nextTick(() => console.log(3));
//add readFile to poll queue once its ready
fs.readFile(__filename, () => {
    //directly printed after readFile
    console.log(4);
    //add setTimeout to timer queue
    setTimeout(() => console.log(5));
    //add setImmediate to check queue
    setImmediate(() => console.log(6));
    //add log 7 to the nextTick microtask queue
    process.nextTick(() => console.log(7));
});
//directly printed to the screen
console.log(8);
