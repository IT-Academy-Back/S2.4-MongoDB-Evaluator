const fs = require('fs');

const inputFile = 'query/queries.js';
const outputFile = 'query/toExecute.js';

const input = fs.readFileSync(inputFile, 'utf8');
const lines = input.split('\n');

let queryCount = 0;

const formatedQueries = lines
  .map(line => line.trim())
  .filter(line => line.startsWith('db.restaurants.'))
  .map(query => {
    queryCount++;
    const clean = query.replace(/;$/, '');
    if (clean.includes('.forEach')) return clean; 
    return `print('//${queryCount}.');\n${clean}.forEach(doc => print(JSON.stringify(doc)));`;
  });

const finalOutput = formatedQueries.join('\n\n');

fs.writeFileSync(outputFile, finalOutput, 'utf8');

console.log(`Formatted file saved as "${outputFile}"`);

