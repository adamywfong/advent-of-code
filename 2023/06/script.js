const performance = require("perf_hooks").performance;
const fs = require('fs');

const startTime = performance.now();
const input = fs.readFileSync(__dirname + '/inputs/input.txt', 'utf8')

function winOptions(input) {
  const times = input.split('\r\n')[0].split(':')[1].trim().split(/\s+/)
  const distances = input.split('\r\n')[1].split(':')[1].trim().split(/\s+/)
  let product = 1;
  for (let i = 0; i < times.length; i++) {
    const time = parseInt(times[i]);
    const distance = parseInt(distances[i]);
    for (let j = 1; j <= time / 2; j++) {
      // j * (t-j) = tj-j^2 
      if (j * time - j * j > distance) {
        // number of integers between a and b = b - a + 1
        product = product * ((time - j) - j + 1)
        break
      }
    }
  }
  return product;
}

function winOption(input) {
  const time = parseInt(input.split('\r\n')[0].split(':')[1].replace(/\s+/g, ""))
  const distance = parseInt(input.split('\r\n')[1].split(':')[1].replace(/\s+/g, ""))
  if (time/2 * time/2 < distance) return 0;
  for (let j = 1; j <= time / 2; j++) {
    if (j * time - j * j > distance) {
      return (time - 2 * j + 1)
    }
  }
}


const part1 = winOptions(input);
const part2 = winOption(input);
const time = performance.now() - startTime;
console.log(`Part 1: ${part1}\nPart 2: ${part2}\nCompleted in ${time}ms`)