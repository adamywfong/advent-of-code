const fs = require('fs');
const performance = require("perf_hooks").performance;

const startTime = performance.now();

const input = fs.readFileSync(__dirname + '/inputs/input.txt', 'utf8');
const dataArray = input.split("\r\n");
const numReds = 12;
const numGreens = 13;
const numBlues = 14;
console.log(gameSum(dataArray, numReds, numGreens, numBlues))
const time = performance.now() - startTime;
console.log(`Timer: ${time}ms`)

function gameSum(games, numReds, numGreens, numBlues) {
  let sum = 0;
  for (let i=0;i<games.length;i++) {
    const pulls = games[i].split(": ")[1].split("; ");
    if (isLegal(pulls, numReds, numGreens, numBlues)) {
      sum += i+1;
    };
  };
  return sum;
};


function isLegal(pulls, numReds, numGreens, numBlues) {
  const maxNums = [
    ["red", numReds],
    ["green", numGreens],
    ["blue", numBlues]
  ];
  const map = new Map(maxNums);

  for (let i=0;i<pulls.length;i++) {
    const balls = pulls[i].split(', ');
    for (let j=0;j<balls.length;j++) {
      const ballColors = balls[j].split(' ')
      if (parseInt(ballColors[0]) > map.get(ballColors[1])) {
        return false;
      };
    };
  };
  return true;
}