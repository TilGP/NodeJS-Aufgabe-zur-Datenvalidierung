const isValid = require('./dateValidator');
const logEvents = require('./logEvents');
const EventEmittiter = require('events');
class Emitter extends EventEmittiter {};

const logger = new Emitter();
logger.on('log', (msg) => logEvents(msg, 'output.json'));
logger.on('error', (msg) => logEvents(msg, 'error.txt'));

const parse = (file) => {
    var _file = file.split('\n')
    var result = '';

    for (var i = 0; i < _file.length; i++){
        const _fileData = _file[i].split(':');
        if(!_fileData.includes('')){
            let birthday = isValid(_fileData[0].split('-')[0], _fileData[0].split('-')[1], _fileData[0].split('-')[2]);
            if (birthday) {
                result += JSON.stringify({
                    name: `${_fileData[1]} ${_fileData[2]}`,
                    birthday: `${birthday.getDate()}.${birthday.getMonth()}.${birthday.getFullYear()}`,
                    salary: _fileData[3].slice(0, 1) + '.' + _fileData[3].slice(1)
                }) + ',';
            } else{
                logger.emit('error', `${_fileData[0]} is not a valid date!`);
            }    
        }   
    }
    logger.emit('log', `[${result.slice(0, -1)}]`);
    return JSON.parse(`[${result.slice(0, -1)}]`);
}

module.exports = parse;