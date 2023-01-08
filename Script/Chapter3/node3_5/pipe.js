const fs = require('fs');
const zlib = require('zlib'); // 파일을 압축하는 라이브러리

const readStream = fs.createReadStream('readme.txt');
const zlibStream = zlib.createGzip(); // 파일을 압축된 형태로 사용 가능
const writeStream = fs.createWriteStream('writeme3.zip');
const piping = readStream.pipe(zlibStream).pipe(writeStream); // readStream 내용의 writeStream 연결
piping.on('finish', () => {
    console.log('done!');
});