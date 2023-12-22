const performance = require("perf_hooks").performance;
const fs = require('fs');

function minLocation(input) {
  let min = Number.MAX_VALUE;
  let [seeds, seedToSoil, soilToFert, fertToWater, waterToLight, lightToTemp, tempToHumid, humidToLoc] = input.split('\r\n\r\n');
  seeds = seeds.split(': ')[1].split(' ')
  const maps = [
    seedToSoil.split(':\r\n')[1].split('\r\n'),
    soilToFert.split(':\r\n')[1].split('\r\n'),
    fertToWater.split(':\r\n')[1].split('\r\n'),
    waterToLight.split(':\r\n')[1].split('\r\n'),
    lightToTemp.split(':\r\n')[1].split('\r\n'),
    tempToHumid.split(':\r\n')[1].split('\r\n'),
    humidToLoc.split(':\r\n')[1].split('\r\n')
  ]
  for (const seed of seeds) {
    let temp = parseInt(seed)
    for (const map of maps) {
      for (const rowSTR of map) {
        const row = rowSTR.split(' ')
        if ((temp >= parseInt(row[1])) && (temp < (parseInt(row[1]) + parseInt(row[2])))) {
          temp = temp - parseInt(row[1]) + parseInt(row[0]);
          break;
        }
      }
    }
    if (min > temp) min = temp;
  }
  return min
}




const startTime = performance.now();
const input = fs.readFileSync(__dirname + '/inputs/input.txt', 'utf8')

const part1 = minLocation(input);
// // const part2 = totalCards(data)
const time = performance.now() - startTime;
console.log(`Part 1: ${part1}\nCompleted in ${time}ms`)