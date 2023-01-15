const express = require('express');

const app = express();
app.set('port', process.env.PORT || 3000); // 서버가 실행될 포트 설정 process.env 객체에 PORT 속성이 없으면 3000번 포트 이용

app.use((req, res, next) => {
    console.log('모든 요청에서 다 실행됩니다.');
    next(); // 다음 미들웨어로 넘어가는 함수
});

app.get( // 주소에 대한 GET 요청이 올 경우 동작에 대한 미들웨어 정의
    // 라우터에 미들웨어를 여러 개 장착할 수 있음
    '/', // 주소
    (req, res, next) => { // 미들웨어 매개 변수
    console.log('GET / 요청에만 실행');
    next();
}, (req, res) => {
    throw new Error('에러 처리 미들웨어로 이동');
});

app.use((err, req, res, next) => { // 에러 처리 미들웨어
    console.error(err);
    res.status(500).send(err.message);
}); 

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});