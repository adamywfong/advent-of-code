const performance = require("perf_hooks").performance;
const fs = require('fs');

const startTime = performance.now();
const cardStrength = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']
const jokerStrength = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J']
const input = fs.readFileSync(__dirname + '/inputs/input.txt', 'utf8').split('\r\n')

function compareHands(a,b) {
  const typeOfA = handType(a);
  const typeOfB = handType(b);
  if (typeOfA > typeOfB) return -1
  if (typeOfA < typeOfB) return 1
  for (let i=0; i < 5; i++) {
    if (cardStrength.indexOf(a.charAt(i)) < cardStrength.indexOf(b.charAt(i))) return -1
    if (cardStrength.indexOf(a.charAt(i)) > cardStrength.indexOf(b.charAt(i))) return 1
  }
  return 0;
}

// 5, 4, FH, 3, 22, 2, high
function handType(hand) {
  let cardsInHand = [0,0,0,0,0,0,0,0,0,0,0,0,0]
  for (let i=0; i < 5; i++) {
    cardsInHand[cardStrength.indexOf(hand.charAt(i))]++
  }
  if (cardsInHand.includes(5)) return 6;
  if (cardsInHand.includes(4)) return 5;
  if (cardsInHand.includes(3) && cardsInHand.includes(2)) return 4;
  if (cardsInHand.includes(3)) return 3;
  if (cardsInHand.filter((card) => card==2).length == 2) return 2;
  if (cardsInHand.includes(2)) return 1;
  return 0;
}

function compareJokers(a,b) {
  const typeOfA = jokerType(a);
  const typeOfB = jokerType(b);
  if (typeOfA > typeOfB) return -1
  if (typeOfA < typeOfB) return 1
  for (let i=0; i < 5; i++) {
    if (jokerStrength.indexOf(a.charAt(i)) < jokerStrength.indexOf(b.charAt(i))) return -1
    if (jokerStrength.indexOf(a.charAt(i)) > jokerStrength.indexOf(b.charAt(i))) return 1
  }
  return 0;
}

function jokerType(hand) {
  let cardsInHand = [0,0,0,0,0,0,0,0,0,0,0,0,0]
  for (let i=0; i < 5; i++) {
    cardsInHand[jokerStrength.indexOf(hand.charAt(i))]++
  }
  const jokers = cardsInHand.pop();
  const pairs = cardsInHand.filter((card) => card==2)
  if (Math.max(...cardsInHand) + jokers ==5) return 6;
  if (Math.max(...cardsInHand) + jokers ==4) return 5;
  if (Math.max(...cardsInHand) + jokers ==3 && (pairs.length==2 || pairs.length==1 && !jokers)) return 4;
  if (Math.max(...cardsInHand) + jokers ==3) return 3;
  if (pairs.length == 2) return 2;
  if (cardsInHand.includes(2) || jokers) return 1;
  return 0;
}

input.sort(compareHands);

let winnings = 0;
let topRank = input.length
for (let i=0; i<input.length; i++) {
  winnings += parseInt(input[i].split(' ')[1])*(topRank-i)
}
const part1=winnings;

input.sort(compareJokers);

winnings = 0;
for (let i=0; i<input.length; i++) {
  winnings += parseInt(input[i].split(' ')[1])*(topRank-i)
}

const part2 = winnings;
const time = performance.now() - startTime;
console.log(`Part 1: ${part1}\nPart 2: ${part2}\nCompleted in ${time}ms`)