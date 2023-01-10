### npm
- Node Package Manager : javascript 패키지가 등록되어 있는 곳으로 Node.js로 javascript 프로그램을 실행할 수 있음
  - 패키지 : npm에 업로드된 노드 모듈로 패키지간에 의존 관계가 있음
- yarn : 페이스북에서 내놓은 패키지 매니저로 npm 서버가 너무 느릴 경우 yarn 패키지로 대체 가능

### package.json
- 설치한 패키지 버전을 관리하는 파일
- 노드 프로젝트를 시작하기 전에는 폴더 내부에 무조건 packgae.json부터 만들고 시작해야함
- npm init를 통해 프로젝트를 생성할 수 있음
  - package name : 패키지 이름, package.json의 name속성에 저장
  - version : 패키지의 버전(기본 값 : 1.0.0), Major.Minor.Patch로 구분
    - Patch : 버그 발생 등으로 오류 패치 시 버전 값 증가
    - Minor : 작은 기능 등이 추가될 경우 버전 값 증가
    - Major : 기능들이 대부분 수정되거나 기능 사용에 변경사항 발생 시 버전 값 증가
  - entry point : javascript 실행 파일 진입점
  - test command : 코드를 테스트할 때 입력할 명령어, package.json의 test속성에 저장
  - git repository : 코드를 저장해둔 깃(Git) 저장소 주소, package.json의 repository 속성에 저장
  - keywords : 키워드는 npm 공식 홈페이지에 패키지 등록 시 찾을 수 있는 키워드, package.json의 keywords 속성에 저장
  - license : 해당 패키지 라이선스
- script 속성은 npm 명령어를 사용하고 싶을 때 저장해두는 부분, npm run [스크립트 명령어]로 실행
- npm install(i) [패키지명]으로 패키지를 설치할 수 있음
  - --save-dev(-D) : 개발용 패키지임을 나타냄
  - --global(-g) : 전역 설치 시 필요

### npm 명령어
- npm outdated : 업데이트할 수 있는 패키지 확인
- npm update [패키지명] : 패키지 버전을 Wanted로 업데이트
- npm uninstall(rm) [패키지명] : 패키지 제거
- npm search [검색어] : npm 패키지 검색
- npm adduser : npm 로그인, 패키지 배포할 때 필요
- npm whoami : npm 로그인한 사용자 확인
- npm logout : npm 로그아웃
- npm version [버전] : package.json 버전 올림
- npm deprecate [패키지명] [버전] [메시지] : 해당 패키지를 설치할 때 경고 메시지를 띄움
- npm publish : 자신이 만든 패키지 배포할 때 사용
- npm unpublish : 24시간 이내 배포한 패키지 제거
- npm ci : package.json 대신 package-lock.json에 기반해 패키지 설치