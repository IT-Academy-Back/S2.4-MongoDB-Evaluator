const fs = require('fs');
const Logger = require('js-logger');
Logger.useDefaults();

//function compareQueries(filePath, filePathExpected) {
const fileContentExpected = fs.readFileSync('script/result/expected.json', 'utf-8');
const fileContentResult = fs.readFileSync('script/result/myResult.json', 'utf-8');

const linesExpected = fileContentExpected.split('\n');
const linesResult = fileContentResult.split('\n');

  let resultQuery = [];
  let expectedQuery = [];
  let numberQuery = 0;

  
  for (let i = 0; i < linesResult.length; i++){
    
    const expectedLine = linesExpected[i].trim();
    const resultLine = linesResult[i].trim();
    
      if(resultLine.startsWith('//') || i === linesResult.length - 1) { 
        if(numberQuery > 0) {
            if(resultQuery.toString() === expectedQuery.toString()){                
                Logger.info("✔️ Query " + numberQuery + " OK");
            } else{
                Logger.error("❌ Query " + numberQuery + " ERROR");
            }    
            resultQuery = [];
            expectedQuery = [];
        }
      numberQuery = parseInt(resultLine.slice(2), 10);  
      continue;
    }

    else if (resultLine != '') {
      try {
        resultQuery.push(resultLine);
        expectedQuery.push(expectedLine);
      } catch (e) {
        console.error(`Error parsing JSON: ${resultLine}`, e);
      }
    }
  }