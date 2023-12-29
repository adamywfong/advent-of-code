const performance = require("perf_hooks").performance;
const fs = require('fs');

const startTime = performance.now();
const input = fs.readFileSync(__dirname + '/inputs/input.txt', 'utf8').split('\r\n')

const doPart1 = (input) => {
  let sum = 0
  for (const row of input) {
    const rowArray = row.split(' ').map((x) => parseInt(x))
    sum += extrapolate(rowArray, true)
  }
  return sum;
}

const doPart2 = (input) => {
  let sum = 0
  for (const row of input) {
    const rowArray = row.split(' ').map((x) => parseInt(x))
    sum += extrapolate(rowArray, false)
  }
  return sum;
}

const extrapolate = function(array, forwards) {
  let differenceArray = []
  let isAllZeroes = true;
  for (let i=1; i<array.length; i++) {
    differenceArray.push(array[i] - array[i-1])
    if (differenceArray[differenceArray.length-1] != 0) isAllZeroes=false
  }
  if (isAllZeroes) return array[0]
  return forwards ? extrapolate(differenceArray) + array[array.length-1] : array[0] - extrapolate(differenceArray)
}

const part1 = doPart1(input);
const part2 = doPart2(input);
const time = performance.now() - startTime;
console.log(`Part 1: ${part1}\nPart 2: ${part2}\nCompleted in ${time}ms`)