const fs = require('fs');

// 스트림 방식으로 파일 읽기
const readStream = fs.createReadStream('./Script/Chapter3/node3_5/file.txt', {
    highWaterMark: 64, // 기본값 : 64kb
    encoding: 'utf-8'
});

const data = [];
// 스트림에 있는 버퍼가 도착할 때마다 이벤트 리스너 실행
readStream.on('data', chunk => {
    // console.log(chunk);
    data.push(chunk);
    console.count(data);
});

readStream.on('end', () => {
    console.log(data.join(''));
});

readStream.on('error', error => {
    console.error(error);
});
