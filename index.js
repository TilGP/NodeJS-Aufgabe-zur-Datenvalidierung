const path = require('path');
const fs = require('fs');
const parse = require('./controllers/parser');

const file = fs.readFileSync(path.join(__dirname, 'in', 'personen.csv'), 'utf8');

console.log(parse(file));