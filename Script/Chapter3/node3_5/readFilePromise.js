const fs = require('fs').promises;

fs.readFile('./Script/Chapter3/node3_5/readme.txt')
    .then((data) => {
        console.log(data);
        console.log(data.toString());
    })
    .catch((err) => {
        console.error(err);
    });