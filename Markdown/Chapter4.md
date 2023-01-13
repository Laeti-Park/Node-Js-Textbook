### 요청과 응답
- 클라이언트와 서버가 통신할 때 HTTP(HyperText Transfer Protocol)를 사용해 TCP Connection으로 연결해 요청으로 원하는 정보를 서버에 보내고, 서버에서 해당하는 내용은 응답으로 클라이언트에 받을 수 있음
- createServer : 인수로 요청한 콜백 함수를 실행할 수 있음
```javascript
const http = require('HTTP');
http.createServer((req, res) => {
    // 이벤트 리스너 응답
    // req : 요청에 관한 정보
    // res : 응답에 관한 정보
});
```
- req : request(요청)
- res : response(응답)

- Javascript에 응답 정보 기록
```javascript
const http = require('HTTP');
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); // 헤더(HEADER)
    res.write('<h1>Hello Node!</h1>'); // 본문(BODY)
    res.end('<p>Hello Server!</p>'); // 응답 종료 메서드
}).listen(8080, () => {
    console.log('8080 포트에서 서버 대기 중입니다.');
});
```

##### HTML 파일을 만들고 fs 모듈로 읽기
- HTTP 표준에서 정의된 HTTP 상태 코드로 서버 처리 정보를 확인할 수 있음
- [HTTP 상태 코드(HTTP Status Code)](https://developer.mozilla.org/ko/docs/Web/HTTP/Status)
  - 1XX(Informational) : 서버의 진행 정보를 나타냄
    - 100 : Continue(계속 요청을 요구 중)
    - 102 : Processing(요청을 처리 중)
  - 2XX(Successful) : 성공을 알림
    - 200 : OK(성공)
    - 201 : Created(요청을 처리해 특정 리소스가 만들어진 경우)
    - 204 : No Content(요청을 처리했으나 해당하는 데이터가 없는 경우)
  - 3XX(Redirection) : 리다이렉션(다른 페이지로 이동)
    - 301 : Moved Permanently(요청한 URL이 영구적으로 다른 URL로 옮겨진 경우)
    - 302 : Found(요청한 URL이 임시적으로 다른 URL로 옮겨진 경우)
    - 303 : See Other(302와 유사하며, GET 요청에서만 사용)
    - 307/308 : Temporary/Permanent Redirect(일시적/영구적으로 특정 요청에서만 다른 곳으로 옮겨진 경우)
  - 4XX(Client Error) : 요청 오류, 요청 자체에 오류가 발생 시 표시
    - 400 : Bad Request(요청한 쿼리가 잘못되거나 API가 잘못된 방식인 경우)
    - 401 : Unauthorized(권한이 없는 사람이 요청한 경우)
    - 403 : Forbidden(관리자 권한이 없는 사람이 요청한 경우)
    - 404 : Not Found(원하는 URL이 존재하지 않는 경우)
    - 405 : Method Not Allowed(해당 URL 한해서 쓰거나 삭제하는 기능이 허용되지 않은 경우)
    - 409 : Conflict(클라이언트가 만든 리소스로 충돌이 일어나는 경우)
  - 5XX(Server Error) : 서버 오류, 요청은 제대로 왔지만 서버에 오류 생긴 경우
    - 500 : Internal Server Error(서버에 문제가 발생해서 요청을 처리할 수 없는 경우)
    - 502 : Bad Gateway(중간에 있는 서버가 요청을 어떻게 처리할 지 모르는 경우)
    - 503 : Service Unavailable(특정한 요청을 처리할 준비가 되지 않은 경우)
```javascript
const http = require('HTTP');
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
```

### REST와 라우팅 사용
##### REST(REpresentation State Transfer)
![](../Image/img4-1.png)
- 무언가를 대표하는 것을 전송하는 것으로, 서버의 자원을 정의하고 자원에 대한 주소를 지정하는 방법
- 데이터를 그룹으로 분류해 클라이언트에 제공하는 것
- 소프트웨어 아키텍처를 디자인할 수 있는 스타일로 웹 서비스를 만들 때 지켜야하는 규칙들을 가지고 있음
- 주소와 메서드를 보고 요청의 내용을 쉽게 알 수 있음

##### RESTful System 6가지 규칙과 특징
- RESTful System 6 Guiding Constraints
- Client-Server Architecture : 브라우저 뿐만 아니라 모바일 등 다양한 애플리케이션에 데이터를 제공할 수 있는 아키텍처를 가지고 있음
- Statelessness : 하나의 요청이 다른 요청에 영향을 주지 않는 상태
- Cacheablilty : 캐시가 가능하다면 캐시를 할 수 있는 형태로 디자인
- Layered System : 하나의 API를 이용할 수 있도록 레이어 시스템을 구성
- Code on Demand : 클라이언트가 원하면 클라이언트에서 수행해야하는 코드를 서버에서 클라이언트로 보낼 수 있으며, 권장하는 사항
- **Uniform Interface** : RESTful System에서 가장 중요한 조건
	- Resource Identification in Requests : 클라이언트 요청을 통해 서버 내 어떠한 데이터를 원하는지 식별할 수 있어야하고 클라이언트가 이해할 수 있는 형태로 보냄
	- Resource Manipulation through Representations : 서버로부터 받은 해당 도메인을 대표하는 데이터를 통해 해당 리소스 처리 방식에 대한 정보를 알 수 있음
	- Self-Descriptive Messages : 서버에서 보내는 응답 데이터에는 클라이언트가 어떻게 처리해야하는지 설명되어 있음
	- Hypermmedia as the engine of application state(HATEOAS) : 서버에서 어떠한 URL이 있는지 클라이언트에서 알고 적절한 URL로 요청할 수 있음
##### RESTful 서버
- REST 규칙을 따르는 서버, REST 규칙을 지닌 URL로 구성된 것
##### 웹 API 기본 디자인 방식
- 동작 방식(CRUD) : Create(POST)/Read(GET)/Update(PUT)/Delete(DELETE)
- 동작 대상에 대한 동작 방식이 명확해야함
- 동작 대상이 명확해야함(GET/tags/?query=cool => query 값이 cool인 태그를 가져옴)
- API 이름에 동작 방식에 대한 내용은 생략할 수 있음
##### [요청 메서드](https://developer.mozilla.org/ko/docs/Web/HTTP/Methods) : 서버에 요청하는 경우 동작 방식을 정의
- HTTP 주소 하나가 여러 개의 요청 메서드를 가질 수 있음
- GET(Get) : 원하는 서버 자원을 가져오고자 할 때 사용
	- GET 요청을 하는 경우 캐시에서 가져올 수 있어 성능이 더 좋아짐
- POST(Create) : 서버 자원을 새로 등록하고자 할 때 사용
- PUT(Update) : 서버 자원을 요청에 들어 있는 자원으로 치환
- PATCH(Replace Partially) : 서버 자원 일부만 수정할 때 사용
- DELETE(Delete) : 서버 자원을 삭제하고자 할 때 사용
- HEAD(Get without Body) : 헤더 부분만 받고 싶을 때 사용
- OPTIONS(All Supported Methods for URL) : 요청을 하기 전에 통신 옵션을 설명하기 위해 사용
- TRACE(echoes the Received Request) : 요청에 대한 반응을 확인할 때 사용

### 쿠키와 세션
- 쿠키 : 웹 사이트 방문 시 저장되는 작은 기록 정보 파일
- 요청 헤더에 cookie를 통해 정보 확인
  - 쿠키명=쿠키값 : 기본적인 쿠키 값
  - Expires=날짜 : 만료 기한(기본값 : 클라이언트 종료될 때 까지)
  - Max-age=초 : 만료 기한, 날짜 대신 초를 입력하며 Expires보다 우선
  - Domain=도메인명 : 쿠키가 전송될 도메인을 특정(기본값 : 현재 도메인)
  - Path=URL : 쿠키가 전송될 URL 특정
  - Secure : HTTPS일 경우에만 쿠키 전송
  - HTTPOnly : 자바스크립트에서 쿠키 접근할 수 없음
```javascript
const http = require('HTTP');

http.createServer((req, res) => {
  console.log(req.url, req.headers.cookie);
  res.writeHead(200, { 'Set-Cookie': 'mycookie=test' }); // 브라우저에 쿠키 값 저장
  res.end('Hello Cookie');
})
  .listen(8083, () => {
    console.log('8083번 포트에서 서버 대기 중입니다!');
  });
```
- 세션 : 여러 페이지에 사용되는 정보 저장, 만료기간 또는 사용자가 브라우저를 닫아 서버와의 연결을 끝내는 시점
- 세션 쿠키 : 세션을 위해 사용하는 쿠키

### HTTPs와 HTTP2
##### HTTP
- 텍스트 형태로 정보를 주고 받음, 다른 사람들이 이해할 수 있음
- 헤더 부분이 압축되지 않은 형태
- 한 번에 하나의 파일만 주고 받을 수 있음

##### HTTP2 모듈
- 2015년부터 SSL 암호화로 보안과 성능을 개선한 HTTP/2 모듈을 사용할 수 있음
- 바이너리 형태로 정보를 주고 받음
- 헤더 부분이 압축된 형태
- Multiplexing : 여러 파일을 동시에 주고 받을 수 있어, 효율적인 요청과 응답 가능

##### HTTP3 모듈
- TCP를 기반으로 만든 HTTP와 다르게 udp 기반으로 통신이 가능한 형태로 개발 진행 중

##### HTTPS 모듈
- 서버에 암호화를 적용할 수 있음
- 암호화할 수 있는 인증서가 필요하며 인증 기관에서 유/무료로 구할 수 있음

### cluster 모듈
![](../Image/img4-2.png)
- 싱글 프로세스로 동작하는 노드가 CPU 코어를 모두 사용할 수 있게 해주는 모듈
- 마스터 프로세스는 CPU 개수만큼 워커 프로세스를 만들고 요청이 들어오면 워커 프로세스에 분배
- cluster 모듈 뿐만 아니라 pm2 등의 모듈로도 클러스트링 기능 구현 가능