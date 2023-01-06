const fs = require('fs');

console.log('시작');
let data = fs.readFileSync('./Script/Chapter3/node3_5/readme.txt');
console.log('1번', data.toString());
data = fs.readFileSync('./Script/Chapter3/node3_5/readme.txt');
console.log('2번', data.toString());
data = fs.readFileSync('./Script/Chapter3/node3_5/readme.txt');
console.log('3번', data.toString());
console.log('끝');
