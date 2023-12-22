const performance = require("perf_hooks").performance;
const fs = require('fs');

function sumRows(dataArray) {
  let sum = 0;
  for (let i=0; i<dataArray.length; i++) {
    let winningnums = dataArray[i].split(' | ')[0].trim().split(': ')[1].trim().split(/[\s]+/);
    let gamenums = dataArray[i].split(' | ')[1].trim().split(/[\s]+/);
    sum += gameval(winningnums, gamenums)
  }
  return sum
}

function gameval(winningnums, gamenums) {
  let val = 0;
  for (let i=0; i<winningnums.length; i++) {
    if (gamenums.includes(winningnums[i])) {
      if(val>0) {
        val = val*2;
      } else {
      val++;
      }
    }
  }
  return val;
}

function totalCards(dataArray) {
  let cards = new Array(dataArray.length).fill(1);
  for (let i=0; i<dataArray.length; i++) {
    let winningnums = dataArray[i].split(' | ')[0].trim().split(': ')[1].trim().split(/[\s]+/);
    let gamenums = dataArray[i].split(' | ')[1].trim().split(/[\s]+/);
    let j = cardsWonInGame(winningnums,gamenums);
    while (j > 0) {
      cards[i+j] += cards[i];
      j--;
    }
  } 
  return cards.reduce((accumulator, currentValue) => accumulator + currentValue);
}

function cardsWonInGame(winningnums, gamenums) {
  let val = 0;
  for (let i=0; i<winningnums.length; i++) {
    if (gamenums.includes(winningnums[i])) val++;
  }
  return val;
}

const startTime = performance.now();
const input = fs.readFileSync(__dirname + '/inputs/input.txt', 'utf8')
const data = input.split('\r\n');
const part1 = sumRows(data);
const part2 = totalCards(data)
const time = performance.now() - startTime;
console.log(`Part 1: ${part1}\nPart 2: ${part2}\nCompleted in ${time}ms`)
