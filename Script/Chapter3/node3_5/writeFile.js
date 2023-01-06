const fs = require('fs').promises;

fs.writeFile('./Script/Chapter3/node3_5/writeme.txt', "글을 작성했습니다.")
    .then(() => {
        return fs.readFile('./Script/Chapter3/node3_5/writeme.txt');
    })
    .then((data) => {
        console.log(data.toString());
    })
    .catch((err) => {
        console.error(err);
    });