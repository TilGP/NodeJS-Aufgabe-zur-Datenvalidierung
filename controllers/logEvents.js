const fsPromises = require('fs').promises;
const fs = require('fs');
const path = require('path');

const logEvents = async (message, logFile, append) => {
    console.log(message);

    try{
        if (!fs.existsSync(path.join(__dirname, '..', 'out'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'out'));
        }
        if (append){
            await fsPromises.appendFile(path.join(__dirname, '..', 'out', logFile), message + '\n')
        } else {
        await fsPromises.writeFile(path.join(__dirname, '..', 'out', logFile), message);
        }

    } catch (err){
        console.error(err);
    }
}

module.exports = logEvents;