const fs = require('fs');
const os = require('os');

const EventEmitter = require('events'); // This 'events' is basically a class

class Logger extends EventEmitter{
    log(message){
        this.emit("message", {message});
    }
}

const logger = new Logger()
const logFile = './eventlog.txt'

const logToFile = (event) => {
    const logMessage = `${new Date().toISOString()} - ${event.message} \n`
    fs.appendFileSync(logFile,logMessage);
}


logger.on('message',logToFile) // 'on' Keep on listening for the message

setInterval(()=> {
    const memoryUsage = (os.freemem() / os.totalmem()) * 100;
    logger.log(`Current Memeory Usage: ${memoryUsage.toFixed(2)}`);
},3000)

logger.log(`Application Started`)
logger.log(`Application Event Applied`);