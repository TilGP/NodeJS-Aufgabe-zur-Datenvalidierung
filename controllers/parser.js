const isValid = require('./dateValidator');
const logEvents = require('./logEvents');
const EventEmittiter = require('events');
class Emitter extends EventEmittiter {};

const logger = new Emitter();
logger.on('output', (msg) => logEvents(msg, 'output.html', false));
logger.on('error', (msg) => logEvents(msg, 'error.txt', true));

const parse = (file) => {
    var _file = file.split('\n')
    var result = '';

    for (var i = 1; i < _file.length; i++){
        const _fileData = _file[i].split(':');
        if(!_fileData.includes('')){
            let birthday = isValid(_fileData[0].split('-')[0], _fileData[0].split('-')[1], _fileData[0].split('-')[2]);
            if (birthday) {
                result += `
                <div>
                    <p>Name: ${_fileData[1]} ${_fileData[1]}</p>
                    <p>Geburtsdatum: ${birthday.getDate()}.${birthday.getMonth()}.${birthday.getFullYear()}</p>
                    <p>Einkommen: ${_fileData[3].slice(0, 1) + '.' + _fileData[3].slice(1)}</p>
                </div>
                <br>
                <br>
                `;
            } else{
                logger.emit('error', `${_fileData[0]} is not a valid date!`);
            }    
        }   
    }
    logger.emit('output', `
        <!DOCTYPE html>
        <html lang="de">
        <head>
            <meta charset="UTF-8">
            <title>Personen</title>
        </head>
        <body>
            ${result}
        </body>
        </html>
    `);
}

module.exports = parse;