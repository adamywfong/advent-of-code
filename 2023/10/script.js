const performance = require("perf_hooks").performance;
const fs = require('fs');

const startTime = performance.now();
const input = fs.readFileSync(__dirname + '/inputs/input.txt', 'utf8').split('\r\n')

const doPart1 = (input) => {
  let loop = []
  let start = findStart(input)
  while (start) {
    start = findNext(input, start)
    loop.push(0)
  }
  return (loop.length-1)/2
}

const doPart2 = (input) => {
  return NaN
}

const findStart = (input) => {
  let i=0;
  while (true) {
    if(input[i].includes('S')) break;
    i++
  }
  return {
    rowInd: i,
    columnInd: input[i].indexOf('S'),
    entryPoint: ''
  }
}

const findNext = (input, start) => {
  const {rowInd, columnInd, entryPoint} = start;
  if (input[rowInd].charAt(columnInd) == 'J') return entryPoint == 'W' ? {rowInd: rowInd-1, columnInd: columnInd, entryPoint: 'S'} : {rowInd: rowInd, columnInd: columnInd-1, entryPoint: 'E'}
  if (input[rowInd].charAt(columnInd) == '|') return entryPoint == 'S' ? {rowInd: rowInd-1, columnInd: columnInd, entryPoint: 'S'} : {rowInd: rowInd+1, columnInd: columnInd, entryPoint: 'N'}
  if (input[rowInd].charAt(columnInd) == '-') return entryPoint == 'W' ? {rowInd: rowInd, columnInd: columnInd+1, entryPoint: 'W'} : {rowInd: rowInd, columnInd: columnInd-1, entryPoint: 'E'}
  if (input[rowInd].charAt(columnInd) == '7') return entryPoint == 'W' ? {rowInd: rowInd+1, columnInd: columnInd, entryPoint: 'N'} : {rowInd: rowInd, columnInd: columnInd-1, entryPoint: 'E'}
  if (input[rowInd].charAt(columnInd) == 'L') return entryPoint == 'E' ? {rowInd: rowInd-1, columnInd: columnInd, entryPoint: 'S'} : {rowInd: rowInd, columnInd: columnInd+1, entryPoint: 'W'}
  if (input[rowInd].charAt(columnInd) == 'F') return entryPoint == 'E' ? {rowInd: rowInd+1, columnInd: columnInd, entryPoint: 'N'} : {rowInd: rowInd, columnInd: columnInd+1, entryPoint: 'W'}
  if (input[rowInd].charAt(columnInd) == 'S') {
    if (entryPoint != '') return false;
    if (/[|7F]/.test(input[rowInd-1].charAt(columnInd))) return {rowInd: rowInd-1, columnInd: columnInd, entryPoint: 'S'}
    if (/[|JL]/.test(input[rowInd+1].charAt(columnInd))) return {rowInd: rowInd+1, columnInd: columnInd, entryPoint: 'N'}
    if (/[LF\-]/.test(input[rowInd].charAt(columnInd-1))) return {rowInd: rowInd, columnInd: columnInd-1, entryPoint: 'E'}
    if (/[J7\-]/.test(input[rowInd].charAt(columnInd+1))) return {rowInd: rowInd, columnInd: columnInd+1, entryPoint: 'S'}
  }
}

const part1 = doPart1(input);
const part2 = doPart2(input);
const time = performance.now() - startTime;
console.log(`Part 1: ${part1}\nPart 2: ${part2}\nCompleted in ${time}ms`)