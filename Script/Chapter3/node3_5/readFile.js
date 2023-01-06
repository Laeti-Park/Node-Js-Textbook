const fs = require('fs');

fs.readFile('./Script/Chapter3/node3_5/readme.txt', (err, data) => {
    if (err) {
        throw err;
    }
    console.log(data);
    console.log(data.toString());
});