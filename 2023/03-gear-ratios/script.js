const fs = require('fs');
const performance = require("perf_hooks").performance;



const startTime = performance.now();

const specChars = /[^0-9\r\n.]/g;

const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')
const dataArray = input.replaceAll(specChars, "a").split("\r\n");
const numbers = input.match(/[0-9]+/g);
console.log(numbers);

function findPartSum(dataArray) {
  let temp = dataArray;
  let sum = 0;
  for (let i=1;i<dataArray.length-1;i++){
    for (let j=1; j<dataArray[i].length-1;j++){
      if (dataArray[i].charAt(j) == "a"){
        sum += extractPartNumbers(temp,i,j);
      }
    }
  }
  return sum
}

function extractPartNumbers(stringArray, stringIndex, charIndex) {
  
}

// const dataMatrix = input.replaceAll(specChars, "a").split("\r\n").map((line => line.split('')));
// console.log(findPartNumbers(dataMatrix));
// const time = performance.now() - startTime;
// console.log(`Timer: ${time}ms`)



// function findPartNumbers(dataMatrix) {
//   let sum = 0;
//   for (let i = 1; i < dataMatrix.length - 1; i++) {
//     for (let j = 1; j < dataMatrix[i].length - 1; j++) {
//       if (dataMatrix[i][j].match(/\d/)) {
//         if (dataMatrix[i - 1][j - 1] == "a" ||
//           dataMatrix[i - 1][j] == "a" ||
//           dataMatrix[i - 1][j + 1] == "a" ||
//           dataMatrix[i][j - 1] == "a" ||
//           dataMatrix[i][j + 1] == "a" ||
//           dataMatrix[i + 1][j - 1] == "a" ||
//           dataMatrix[i + 1][j] == "a" ||
//           dataMatrix[i + 1][j + 1] == "a") {
//           sum += parseInt(dataMatrix[i][j]);
//         }
//       }
//     }
//     if (dataMatrix[i][0].match(/\d/)) {
//       if (dataMatrix[i - 1][0] == "a" ||
//         dataMatrix[i - 1][1] == "a" ||
//         dataMatrix[i][1] == "a" ||
//         dataMatrix[i + 1][0] == "a" ||
//         dataMatrix[i + 1][1] == "a") {
//         sum += parseInt(dataMatrix[i][0]);
//       }
//     }
//     if (dataMatrix[i][dataMatrix[i].length - 1].match(/\d/)) {
//       if (dataMatrix[i - 1][dataMatrix[i].length - 1] == "a" ||
//         dataMatrix[i - 1][dataMatrix[i].length - 2] == "a" ||
//         dataMatrix[i][dataMatrix[i].length - 2] == "a" ||
//         dataMatrix[i + 1][dataMatrix[i].length - 1] == "a" ||
//         dataMatrix[i + 1][dataMatrix[i].length - 2] == "a") {
//         sum += parseInt(dataMatrix[i][dataMatrix[i].length - 1]);
//       }
//     }
//   }
//   for (let j=1;j<dataMatrix.length-1;j++){
//     if (dataMatrix[0][j].match(/\d/)) {
//       if (dataMatrix[0][j-1] == "a" ||
//         dataMatrix[0][j+1] == "a" ||
//         dataMatrix[1][j-1] == "a" ||
//         dataMatrix[1][j+1] == "a" ||
//         dataMatrix[1][j-1] == "a") {
//         sum += parseInt(dataMatrix[0][j]);
//       }
//     }
//     if (dataMatrix[dataMatrix.length -1][j].match(/\d/)) {
//       if (dataMatrix[dataMatrix.length -1][j-1] == "a" ||
//         dataMatrix[dataMatrix.length -1][j+1] == "a" ||
//         dataMatrix[dataMatrix.length -2][j-1] == "a" ||
//         dataMatrix[dataMatrix.length -2][j+1] == "a" ||
//         dataMatrix[dataMatrix.length -2][j-1] == "a") {
//         sum += parseInt(dataMatrix[dataMatrix.length -1][j]);
//       }
//     }
//   }
//   if(dataMatrix[0][0].match(/\d/) && dataMatrix[0][1] == "a" || dataMatrix[1][1] == "a" || dataMatrix[1][0] == "a") {
//     sum += parseInt(dataMatrix[0][0]);
//   }
//   if(dataMatrix[dataMatrix.length-1][0].match(/\d/) && dataMatrix[dataMatrix.length-1][1] == "a" || dataMatrix[dataMatrix.length-2][1] == "a" || dataMatrix[dataMatrix.length-2][0] == "a") {
//     sum += parseInt(dataMatrix[dataMatrix.length-1][0]);
//   }
//   if(dataMatrix[dataMatrix.length-1][dataMatrix.length-1].match(/\d/) && dataMatrix[dataMatrix.length-1][dataMatrix.length-2] == "a" || dataMatrix[dataMatrix.length-2][dataMatrix.length-2] == "a" || dataMatrix[dataMatrix.length-2][dataMatrix.length-1] == "a") {
//     sum += parseInt(dataMatrix[dataMatrix.length-1][dataMatrix.length-1]);
//   }
//   if(dataMatrix[0][dataMatrix.length-1].match(/\d/) && dataMatrix[0][dataMatrix.length-2] == "a" || dataMatrix[1][dataMatrix.length-2] == "a" || dataMatrix[1][dataMatrix.length-1] == "a") {
//     sum += parseInt(dataMatrix[0][dataMatrix.length-1]);
//   }
//   return sum
// }