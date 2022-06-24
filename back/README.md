# beb-04-second-02

## backend 설정

### 1. npm install

### 2. .env.copy파일 파일명 .env로 변경

### 3. mongoDB compass 다운로드

=> https://www.mongodb.com/try/download/compass
=> 다운로드 후 초기세팅 url을 .env 파일의 MONGO_URI 값으로 변경
=> 저장된 정보들을 GUI로 표현해줌

## ganache 연결, 토큰 관련 기능 테스트 방법

### 1. mongoDB users의 server라는 이름의 계정 삭제하지 말 것

=> server계정 password === password

### 2. server 계정의 privateKey로 메타마스크에 계정 가져오기

### 3. ganache 임시계정에서 server 계정으로 이더 보내주기

### 4. sol folder 들어가서 node deploy => server계정으로 토큰 컨트랙트 배포

### 5. http://localhost:4000/auth/register post 요청으로 테스트 유저 생성

### 6. login path로 로그인 한 후 포스트생성(토큰발급) 토큰 transfer, count, 포스트 삭제 등 기능 테스트(apiDocs 참고)
