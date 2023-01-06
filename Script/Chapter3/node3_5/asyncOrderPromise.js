const fs = require('fs');

console.log('시작');

fs.readFile('./Script/Chapter3/node3_5/readme.txt')
    .then((data) => {
        console.log('1번', data.toString());
        return fs.readFile('./Script/Chapter3/node3_5/readme.txt');
    })
    .then((data) => {
        console.log('2번', data.toString());
        return fs.readFile('./Script/Chapter3/node3_5/readme.txt');
    })
    .then((data) => {
        console.log('3번', data.toString());
        console.log('끝');
    }).catch((err) => {
        console.error(err);
    });