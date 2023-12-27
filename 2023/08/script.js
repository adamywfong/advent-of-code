const performance = require("perf_hooks").performance;
const fs = require('fs');

const startTime = performance.now();
const input = fs.readFileSync(__dirname + '/inputs/input.txt', 'utf8').split('\r\n')

const sequence = input[0].split('')
const nodes = input.slice(2)

nodes.sort();

function doPart1(sequence, nodes) {
  let i = 0;
  let nodeInd = 0;
  let node = 'AAA'
  while (node != 'ZZZ') {
    let move = sequence[i % sequence.length];
    switch (move) {
      case 'L':
        node = nodes[nodeInd].substring(7, 10)
        break
      default:
        node = nodes[nodeInd].substring(12, 15)
        break;
    }
    nodeInd = getNodeIndex(nodes, node);
    i++;
  }
  return i;
}

function doPart2(sequence, nodes) {

  let nodesInd = [];
  let currNodes = [];
  for (let j = 0; j < nodes.length; j++) {
    if (nodes[j].charAt(2) == 'A') {
      nodesInd.push(j);
      currNodes.push(nodes[j].substring(0, 3))
    }
  }

  let loopLengths = [];
  for (let j=0; j< currNodes.length; j++) {
    let i=0;
    while (currNodes[j].charAt(2) != 'Z') {
      let move = sequence[i % sequence.length];
      switch (move) {
        case 'L':
          currNodes[j] = nodes[nodesInd[j]].substring(7, 10)
          break
        default:
          currNodes[j] = nodes[nodesInd[j]].substring(12, 15)
          break;
      }
      nodesInd[j] = getNodeIndex(nodes, currNodes[j]);
      i++;
    }
    loopLengths.push(i);
  }

  return loopLengths.reduce((acc,curr) => acc*curr/gcd(acc,curr))
}

const gcd = (a,b) => (b === 0 ? a : gcd(b, a % b))

function getNodeIndex(nodes, node) {
  let start = 0;
  let end = nodes.length - 1;
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (nodes[mid].startsWith(node)) return mid
    if (nodes[mid].substring(0, 3) < node) start = mid + 1;
    else end = mid - 1;
  }
  return -1
}

const part1 = doPart1(sequence, nodes);
const part2 = doPart2(sequence, nodes);
const time = performance.now() - startTime;
console.log(`Part 1: ${part1}\nPart 2: ${part2}\nCompleted in ${time}ms`)