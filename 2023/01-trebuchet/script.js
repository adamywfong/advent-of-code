function recoverValue(datum, isPart2) {
  // get unicode value of 0 and 9
  const charCodeZero = "0".charCodeAt(0);
  const charCodeNine = "9".charCodeAt(0);
  const digitStrings = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
  let first;
  let last;

  for (let i = 0; i < datum.length; i++) {
    const charCode = datum.charCodeAt(i)
    // check if character is digit (unicode between 0 and 9)
    if (charCode >= charCodeZero && charCode <= charCodeNine) {

      //check if first has already been found
      if (typeof first != "number") {
        first = parseInt(datum.charAt(i));
      }
      last = parseInt(datum.charAt(i));
      continue
    }

    if (isPart2) {
      // check if spelled digit starts on this index
      for (let j = 1; j < digitStrings.length; j++) {
        if (datum.startsWith(digitStrings[j], i)) {
          if (typeof first != "number") {
            first = j;
          }
          last = j;
        }
      }
    }
  }
  return first * 10 + last;
}

function findSum(dataArray, isPart2) {
  let sum = 0;
  for (let i = 0; i < dataArray.length; i++) {
    sum += recoverValue(dataArray[i], isPart2);
  }
  return sum;
}

const fs = require('fs');
const performance = require("perf_hooks").performance;


const startTime = performance.now();

const input = fs.readFileSync(__dirname + '/data.txt', 'utf8');
const dataArray = input.split("\n");

const part1 = findSum(dataArray, false);
const part2 = findSum(dataArray, true);

const time = performance.now() - startTime;

console.log(`Part 1: ${part1}\nPart 2: ${part2}\nCompleted in ${time}ms`);

