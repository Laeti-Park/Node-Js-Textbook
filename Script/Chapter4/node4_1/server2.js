const http = require('http');
const fs = require('fs').promises;

http.createServer(async (req, res) => {
    try {
        const data = await fs.readFile('./Script/Chapter3/node3_5/server.html');
        res.writeHead(200, { 'Content-Type': 'text' });
        res.end(data);
    } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(err.message);
    }
}).listen(8080, () => {
    console.log('8080번 포트에서 서버 대기 중');
});