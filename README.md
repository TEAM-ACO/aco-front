
# aco-front

[ACO 홈페이지 바로가기](http://43.200.152.148:3075/)

# Project Aco

![aco](https://user-images.githubusercontent.com/102219209/233780939-5594e3d6-b3ad-4876-89e1-3df8165be9ed.PNG)

## Technology Stacks
<br />

|파트|개발 기술|
|---|-------|
|Frontend|<div><img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=HTML5&logoColor=white" /> <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=CSS3&logoColor=white" /> <img src="https://img.shields.io/badge/Javascript-F7DF1E?style=flat&logo=Javascript&logoColor=white" /> <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white" /> <img src="https://img.shields.io/badge/Redux-764abc?style=flat&logo=Redux&logoColor=white" /> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white" /> <img src="https://img.shields.io/badge/Next.JS-000000?style=flat&logo=Next.js&logoColor=white" /> <img src="https://img.shields.io/badge/Tailwindcss-a5f3fc?style=flat&logo=Tailwindcss&logoColor=white" /></div>|
|Backend|<div><img src="https://img.shields.io/badge/Java-007396?style=flat&logo=Java&logoColor=white" /> <img src="https://img.shields.io/badge/SpringBoot-6DB33F?style=flat&logo=Springboot&logoColor=white" /> <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=MySQL&logoColor=white" /> <img src="https://img.shields.io/badge/Docker-2496ED?style=flat&logo=Docker&logoColor=white" /> <img src="https://img.shields.io/badge/Redis-E34F26?style=flat&logo=Redis&logoColor=white" /></div>|
|Deployment|<img src="https://img.shields.io/badge/AWS Lightsail-232F3E?style=flat&logo=AmazonAWS&logoColor=white" />|
|Management|<img src="https://img.shields.io/badge/Git-F05032?style=flat&logo=Git&logoColor=white" />|

<br />

## About Project
* 3인 팀 프로젝트
* 환경보호를 위한 기록 커뮤니티라는 주제로 간단한 분리수거 방법부터 친환경Tip이나 제로웨이스트, 미니멀 라이프 등 나의 발자취를 기록하고 공유하는 SNS 공간을 만들었습니다.


## 주요 기능
- 사용자, 게시글 작성에 대한 CRUD
- 해당 게시글에 대한 좋아요, 신고, 댓글과 대댓글 기능
- 게시글 검색, 태그를 이용한 검색기능
- 채팅 기능
- 관리자 페이지


## 담당 파트
* **Frontend**
  * React(Hooks)와 Javascript ES6+ 문법을 사용한 UI개발
  * Redux-toolkit을 사용한 상태관리
  * Next.js를 사용한 동적 웹 페이지의 SSR
  * TailwindCSS을 사용한 디자인과 퍼블리싱
  * 반응형 웹
  * StompJS와 SockJS를 사용한 채팅 구현
  * REST API 서버 연동
  * 회원가입과 신고를 제외한 프론트엔드 전체 담당
  
* **Backend**
  * 비밀번호 변경, 좋아요 기능
  
* **Deployment**
  * AWS Lightsail을 사용한 프론트엔드 파트 배포


## 문제해결 및 메모

<a href="https://wonderfulwonder.tistory.com/14"
    target="_blank" rel="noreferrer noopener">Next.js의 CORS에러</a>
<br />
<a href="https://wonderfulwonder.tistory.com/17"
    target="_blank" rel="noreferrer noopener">FormData사용시 FileReader로 이미지 리스트 만들기</a>
<br />
<a href="https://wonderfulwonder.tistory.com/16"
    target="_blank" rel="noreferrer noopener">검색 구현을 위한 Reducer사용</a>
<br />
<a href="https://wonderfulwonder.tistory.com/95"
    target="_blank" rel="noreferrer noopener">Sock.js와 Stomp.js를 사용한 채팅 구현</a>
<br />
<a href="https://wonderfulwonder.tistory.com/22"
    target="_blank" rel="noreferrer noopener">tailwindCSS사용시 Next의 SSR이 동작하지 않는 경우</a>
<br />
<a href="https://wonderfulwonder.tistory.com/20"
    target="_blank" rel="noreferrer noopener">AWS Llightsail에서 Burstable Zone을 넘어갔을 때의 Swap Memory사용</a>


## 미해결 문제점

### 백엔드 설계부터 수정이 필요한 문제

서버에서 게시글 받아올 때 댓글 API를 따로 보내야 게시글+댓글이 받아지는 현상이 있어 댓글이 늘어날수록 최적화에 불리해집니다.

### 사진 첨부시 가끔 첨부가 되지 않는 경우

원인을 찾는중입니다.

<br />


## 프로젝트 후기

### Meaning

**이번 프로젝트는 빠르게 기능이나 기술 위주의 공부를 해보자는 취지였기 때문에 사용하고 싶은 기술들을 다 도입했습니다.**
<br />
먼저 Redux-toolkit을 사용해 Redux + Redux-Saga 보다 보일러 플레이트를 줄여 코드를 깔끔하게 하고 작업시간을 단축시켰습니다.
<br />
또, Typescript나 Next.js를 더 심도있게 배울 수 있었고, 처음으로 SockJs와 StompJS를 이용해 채팅 기능을 만들어 볼 수 있었습니다.
<br />
그리고 Tailwindcss와 UI 라이브러리인 flowbite까지 사용을 해보며 디자인을 이렇게 쉽게 해도 되는건가? 라는 생각이 들 정도로 빠르게
UI를 구현할 수 있었습니다.


### 백엔드를 알아야 하는 이유

이전 프로젝트를 할 때 백엔드에 대한 이해도가 낮아서 소통에 어려움을 겪었던 기억이 있습니다. <br />
그래서 이번 프로젝트는 원활한 소통을 위해 조금이지만 백엔드 작업을 맡아서 했습니다.
덕분에 SpringBoot에 대한 두려움을 조금이나마 극복할 수 있었고, 전체적으로 이해가 잘 안갔던 부분들이 어느 정도 정리가 됨으로써
소통을 빠르게 할 수 있었기에 작업 효율이 올랐습니다.


### 기록의 중요함

공부한 부분과 문제해결 과정을 블로그나 메모장에 기록하여 비슷한 문제가 발생했을 때 금방 해결할 수 있었고,
기억에도 잘 남아서 작업을 효율적으로 할 수 있었습니다.
<br />
<br />
매주 작업 파트를 작성하고 매일 어떤 파트를 진행할지 주고받음으로써 프로젝트의 진행도를 쉽게 파악할 수 있었습니다.

### 기타

AWS lightsail을 사용해 프론트단의 배포를 해봄으로써 기획부터 배포까지 모든 사이클을 경험해 볼 수 있었습니다.

### 아쉬운점

SEO의 과정중 도메인 최적화 작업을 경험하지 못해 검색엔진에 노출되는 정도를 확인하지 못해서 아쉬웠고, <br/>
백엔드 파트를 좀 더 많이 참여하지 못한게 아쉽습니다.


## 멤버구성

|이름|역할|Github|
|---|---|------|
|이태일|프론트엔드|https://github.com/k1k2brz|
|변현석|백엔드|https://github.com/B-HS|
|김형준|백엔드|https://github.com/PorkbellyBigfan|

## 개발 일정
[ACO Project 일정](https://github.com/orgs/TEAM-ACO/projects)

## Backend 개발 환경
[백엔드 상세페이지](https://github.com/TEAM-ACO/aco-back/wiki)

# Install JavaScript Packages
```
npm install
```
# Run Frontend Server
```
npm run dev
```
