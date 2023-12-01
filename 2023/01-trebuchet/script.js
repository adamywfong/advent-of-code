function recoverValue(datum) {
  // get unicode value of 0 and 9
  const charCodeZero = "0".charCodeAt(0);
  const charCodeNine = "9".charCodeAt(0);
  const digitStrings = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine" ];
  let first;
  let last;

  for (let i=0; i<datum.length;i++) {
    const charCode = datum.charCodeAt(i)
    // check if character is digit (unicode between 0 and 9)
    if (charCode >= charCodeZero && charCode<= charCodeNine) {

      //check if first has already been found
      if (typeof first != "number") {
        first = parseInt(datum.charAt(i));
      }
      last = parseInt(datum.charAt(i));
      continue
    }

    // check if spelled digit starts on this index
    for (let j=1; j<digitStrings.length; j++) {
      if (datum.startsWith(digitStrings[j],i)) {
        if (typeof first != "number") {
          first = j;
        }
        last=j;
      }
    }

  }
  return first*10 + last;
}

function findSum(dataArray) {
  let sum = 0;
  for (let i=0; i<dataArray.length; i++) {
    sum += recoverValue((dataArray[i]));
  }
  return sum;
}

const fs = require('fs')

fs.readFile('./data.txt', 'utf8', function(err, data){ 
  const dataArray = data.split("\n");
  console.log(findSum(dataArray));
});

