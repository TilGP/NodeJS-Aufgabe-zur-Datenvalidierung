const fsPromises = require('fs').promises;
const fs = require('fs');
const path = require('path');

const logEvents = async (message, logFile) => {
    console.log(message);

    try{
        if (!fs.existsSync(path.join(__dirname, '..', 'out'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'out'));
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'out', logFile), message + '\n');
    } catch (err){
        console.error(err);
    }
}

module.exports = logEvents;