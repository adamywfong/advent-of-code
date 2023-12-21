const fs = require('fs');
const performance = require("perf_hooks").performance;

const startTime = performance.now();

const specChar = /[^0-9\r\n.]/;

const input = fs.readFileSync(__dirname + '/inputs/input.txt', 'utf8')
const dataArray = input.split("\r\n");

function findPartSum(dataArray) {
  let sum = 0;
  for (let row = 0; row < dataArray.length; row++) {
    let temp = ""
    let truthy = false;
    for (let col = 0; col < dataArray[row].length; col++) {
      if (!isNaN(dataArray[row][col])) {
        temp += dataArray[row][col];

        if (!truthy) {
          // top left
          if (row != 0 && col != 0 && specChar.test(dataArray[row - 1][col - 1])) {
            truthy = true;
            continue
          }

          // top
          if (row != 0 && specChar.test(dataArray[row - 1][col])) {
            truthy = true;
            continue;
          }

          // top right
          if (row != 0 && col != dataArray[row].length - 1 && specChar.test(dataArray[row - 1][col + 1])) {
            truthy = true;
            continue;
          }

          // left
          if (col != 0 && specChar.test(dataArray[row][col - 1])) {
            truthy = true;
            continue;
          }

          // right
          if (col != dataArray[row].length - 1 && specChar.test(dataArray[row][col + 1])) {
            truthy = true;
            continue;
          }

          // bottom left
          if (row != dataArray.length - 1 && col != 0 && specChar.test(dataArray[row + 1][col - 1])) {
            truthy = true;
            continue;
          }

          // bottom
          if (row != dataArray.length - 1 && specChar.test(dataArray[row + 1][col])) {
            truthy = true;
            continue;
          }

          // bottom right
          if (row != dataArray.length - 1 && col != dataArray[row].length - 1 && specChar.test(dataArray[row + 1][col + 1])) {
            truthy = true;
            continue;
          }
        }
        if (col == dataArray[row].length - 1 && truthy) {
          sum += parseInt(temp)
        }
      }
      if (isNaN(dataArray[row][col]) && temp.length) {
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

function findGearSum(dataArray) {
  let gearRatioSum = 0;
  for (let row = 0; row < dataArray.length; row++) {
    for (let col = 0; col < dataArray.length; col++) {
      if (/\*/.test(dataArray[row][col])) {
        let adjacent = []

        // top left
        if (row != 0 && col != 0 && /\d/.test(dataArray[row - 1][col - 1])) adjacent.push('tl')
        // top
        if (row != 0 && /\d/.test(dataArray[row - 1][col])) adjacent.push('t')

        // top right
        if (row != 0 && col != dataArray.length - 1 && /\d/.test(dataArray[row - 1][col + 1])) adjacent.push('tr')

        // left
        if (col != 0 && /\d/.test(dataArray[row][col - 1])) adjacent.push('l')

        // right
        if (col != dataArray.length - 1 && /\d/.test(dataArray[row][col + 1])) adjacent.push('r')

        // bottom left
        if (row != dataArray.length - 1 && col != 0 && /\d/.test(dataArray[row + 1][col - 1])) adjacent.push('bl')

        // bottom
        if (row != dataArray.length - 1 && /\d/.test(dataArray[row + 1][col])) adjacent.push('b')

        // bottom right
        if (row != dataArray.length - 1 && col != dataArray.length - 1 && /\d/.test(dataArray[row + 1][col + 1])) adjacent.push('br')


        // collapse top and bottom rows if multiple numbers are adjacent to eachother
        if (adjacent.includes('tl') && adjacent.includes('t')) adjacent.shift()
        if (adjacent.includes('tr') && adjacent.includes('t')) adjacent.splice(1, 1)
        if (adjacent.includes('bl') && adjacent.includes('b')) adjacent.splice(adjacent.indexOf('bl'), 1)
        if (adjacent.includes('br') && adjacent.includes('b')) adjacent.splice(adjacent.indexOf('br'), 1)

        if (adjacent.length != 2) continue

        let gearRatio = 1;

        if (adjacent.includes('tl')) {
          let i = col - 1
          let temp = ""
          while (!isNaN(dataArray[row - 1][i]) && col >= 0) {
            temp = dataArray[row - 1][i] + temp
            i--
          }
          gearRatio = gearRatio * parseInt(temp)
        }

        if (adjacent.includes('t')) {
          let i = col
          let temp = ""
          while (!isNaN(dataArray[row - 1][i]) && col >= 0) {
            temp = dataArray[row - 1][i] + temp
            i--
          }
          i = col + 1
          while (!isNaN(dataArray[row - 1][i]) && col <= dataArray[row].length - 1) {
            temp = temp + dataArray[row - 1][i]
            i++
          }
          gearRatio = gearRatio * parseInt(temp)
        }

        if (adjacent.includes('tr')) {
          let i = col + 1
          let temp = ""
          while (!isNaN(dataArray[row - 1][i]) && col <= dataArray[row].length - 1) {
            temp = temp + dataArray[row - 1][i]
            i++
          }
          gearRatio = gearRatio * parseInt(temp)
        }

        if (adjacent.includes('l')) {
          let i = col - 1
          let temp = ""
          while (!isNaN(dataArray[row][i]) && col >= 0) {
            temp = dataArray[row][i] + temp
            i--
          }
          gearRatio = gearRatio * parseInt(temp)
        }

        if (adjacent.includes('r')) {
          let i = col + 1
          let temp = ""
          while (!isNaN(dataArray[row][i]) && col <= dataArray[row].length - 1) {
            temp = temp + dataArray[row][i]
            i++
          }
          gearRatio = gearRatio * parseInt(temp)
        }

        if (adjacent.includes('bl')) {
          let i = col - 1
          let temp = ""
          while (!isNaN(dataArray[row + 1][i]) && col >= 0) {
            temp = dataArray[row + 1][i] + temp
            i--
          }
          gearRatio = gearRatio * parseInt(temp)
        }

        if (adjacent.includes('b')) {
          let i = col
          let temp = ""
          while (!isNaN(dataArray[row + 1][i]) && col >= 0) {
            temp = dataArray[row + 1][i] + temp
            i--
          }
          i = col + 1
          while (!isNaN(dataArray[row + 1][i]) && col <= dataArray[row].length - 1) {
            temp = temp + dataArray[row + 1][i]
            i++
          }
          gearRatio = gearRatio * parseInt(temp)
        }

        if (adjacent.includes('br')) {
          let i = col + 1
          let temp = ""
          while (!isNaN(dataArray[row + 1][i]) && col <= dataArray[row].length - 1) {
            temp = temp + dataArray[row + 1][i]
            i++
          }
          gearRatio = gearRatio * parseInt(temp)
        }

        gearRatioSum += gearRatio;
      }
    }
  }
  return gearRatioSum
}

const part1 = findPartSum(dataArray);
const part2 = findGearSum(dataArray);
const time = performance.now() - startTime;
console.log(`Part 1: ${part1}\nPart 2: ${part2}\nCompleted in ${time}ms`)