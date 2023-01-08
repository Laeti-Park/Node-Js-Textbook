const fs = require('fs');

const writeStream = fs.createWriteStream('./Script/Chapter3/node3_5/writeme2.txt');
writeStream.on('finish', () => {
    console.log('파일 쓰기 완료');
});

writeStream.write('나는 글을 쓴다.');
writeStream.write('나는 뇌절 쓴다.');
writeStream.end();