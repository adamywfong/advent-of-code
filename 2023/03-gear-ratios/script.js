const fs = require('fs');
const performance = require("perf_hooks").performance;

const startTime = performance.now();

const specChar = /[^0-9\r\n.]/;

const input = fs.readFileSync(__dirname + '/inputs/input.txt', 'utf8')
const dataArray = input.split("\r\n");

function findPartSum(stringArray) {
  let sum = 0;
  for (let row = 0; row < stringArray.length; row++) {
    let temp = ""
    let truthy = false; 
    for (let col = 0; col < stringArray[row].length; col++) {
      if (!isNaN(stringArray[row][col])) {
        temp += stringArray[row][col];

        if (!truthy) {
          // top left
          if (row != 0 && col != 0 && specChar.test(stringArray[row - 1][col - 1])) {
            truthy = true;
            continue
          }

          // top
          if (row != 0 && specChar.test(stringArray[row - 1][col])) {
            truthy = true;
            continue;
          }

          // top right
          if (row != 0 && col != stringArray[row].length - 1 && specChar.test(stringArray[row - 1][col + 1])) {
            truthy = true;
            continue;
          }

          // left
          if (col != 0 && specChar.test(stringArray[row][col - 1])) {
            truthy = true;
            continue;
          }

          // right
          if (col != stringArray[row].length - 1 && specChar.test(stringArray[row][col + 1])) {
            truthy = true;
            continue;
          }

          // bottom left
          if (row != stringArray.length - 1 && col != 0 && specChar.test(stringArray[row + 1][col - 1])) {
            truthy = true;
            continue;
          }

          // bottom
          if (row != stringArray.length - 1 && specChar.test(stringArray[row + 1][col]))  {
            truthy = true;
            continue;
          }

          // bottom right
          if (row != stringArray.length - 1 && col != stringArray[row].length - 1 && specChar.test(stringArray[row + 1][col + 1])) {
            truthy = true;
            continue;
          }
        }
        if (col == stringArray[row].length - 1 && truthy) {
            sum += parseInt(temp)
        }
      }
      if (isNaN(stringArray[row][col]) && temp.length) {
        if (truthy) {
          sum += parseInt(temp)
        }
        temp = "";
        truthy = false;
      }
    }
  }
  return sum;
}

const part1 = findPartSum(dataArray);
const time = performance.now() - startTime;
console.log(`Part 1: ${part1}\nCompleted in ${time}ms`)