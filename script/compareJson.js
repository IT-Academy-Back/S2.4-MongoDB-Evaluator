const fs = require('fs');

const fileContentExpected = fs.readFileSync('script/result/expected.json', 'utf-8');
const fileContentResult = fs.readFileSync('script/result/myResult.json', 'utf-8');

const linesExpected = fileContentExpected.split('\n');
const linesResult = fileContentResult.split('\n');

const report = [];
var queryOK = false;

let numberQuery = 0;

for (let i = 0; i < linesResult.length; i++){ 
  const trimmedLine = linesResult[i].trim();

  if (trimmedLine.startsWith('//')) {    
    if(queryOK) {
        report.push("✔️ Query " + numberQuery + " is OK");
     }  
     numberQuery = parseInt(trimmedLine.slice(2), 10);
     queryOK = true;   
  }
 
  else if(trimmedLine !== linesExpected[i].trim()) {
    report.push("❌ Query " + numberQuery + " ERROR:");
    report.push("EXPECTED DOCUMENT: " + linesExpected[i].trim());
    report.push("ACTUAL DOCUMENT: " + trimmedLine + "\n_ _ _ _ _ _ _ _ _ _");
    queryOK = false;
  }
}

console.log(report.join('\n'));
