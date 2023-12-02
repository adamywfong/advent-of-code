const fs = require('fs');
const performance = require("perf_hooks").performance;

const startTime = performance.now();

const input = fs.readFileSync(__dirname + '/input.txt', 'utf8');
const dataArray = input.split("\r\n");
console.log(gameSum(dataArray));
const time = performance.now() - startTime;
console.log(`Timer: ${time}ms`)

function gameSum(games) {
  let sum = 0;
  for (let i=0;i<games.length;i++) {
    const pulls = games[i].split(": ")[1].split("; ");
    sum+=gamePower(pulls)
  };
  return sum;
};

function gamePower(pulls) {
  const minBalls = {
    "red": 0,
    "green": 0,
    "blue": 0
  };

  for (let i=0;i<pulls.length;i++) {
    const balls = pulls[i].split(', ');
    for (let j=0;j<balls.length;j++) {
      const ballColors = balls[j].split(' ')
      if (parseInt(ballColors[0]) > minBalls[ballColors[1]]) {
        minBalls[ballColors[1]]=parseInt(ballColors[0]);
      };
    };
  };
  return minBalls["red"]*minBalls["green"]*minBalls["blue"];
};