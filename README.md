
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


## Meaning
지난 프로젝트로 개인 포트폴리오 사이트를 만들긴 했지만 아무래도 React에 관련된 지식이나 경험이 부족하다는 생각이 들었습니다.
그래서 React의 기본기를 다지고자 상태 관리 라이브러리를 도입하기로 했습니다. 리서치 결과 여러 가지 상태 관리 라이브러리가 있다는 걸 알았지만,
제가 공부한 적 있는 것부터 정확히 이해하고 넘어가야 한다는 생각에 클론 코딩으로 해봤던 Redux를 선택했습니다.
하지만 세팅 도중 Redux-toolkit의 존재를 알게 되었고 보일러 플레이트를 줄이기 위해 Saga보다는 Redux-toolkit을 사용하는 것이 좋다고 판단했습니다.
실제로 toolkit을 사용해 보니까 전에 공부할 때 Reducer와 Saga를 치면서 느꼈던 불편함이 많이 사라지고 코드가 깔끔해져 너무 만족스러웠습니다.
여기에 점점 React에 필수가 되어가고 있는 Typescript도 함께 학습하면서 타입 지정의 중요성을 배워나갔으며, SockJs와 StompJS를 이용해 채팅 기능을 만들어봤습니다.
한 가지 아쉬운 점은 서버에서 게시글 데이터를 받을 때 더 좋은 코드를 찾지 못해 약간의 딜레이가 생기는걸 해결하지 못한 부분입니다.
이 경험을 통해 성능 최적화까지 생각해 코드를 작성해야 하는구나라는걸 배웠습니다.
<br />
<br />
그리고 Next.js의 기능 공부 겸 동적 웹사이트의 SSR(서버사이드 렌더링)을 학습하면서 정적 웹사이트에서 사용할 땐 몰랐던 Next.js의 여러 기능을 알 수 있었습니다.
배포 후에 tailwindCSS의 SSR과 Next.js의 SSR이 꼬여서 작동이 안 되는 현상이 나타나 많이 애먹었지만, 
Next.js에 대해 많이 배울 수 있는 작업이었습니다.
한가지 아쉬운 점은 검색 엔진 최적화(SEO)의 과정 중에서 도메인 최적화 작업을 경험하지 못했던 점입니다.
<br />
<br />
이번 프로젝트는 빠르게 기능 위주의 공부를 해보자는 취지의 팀 프로젝트였기 때문에 디자인에 대한 부담을 최대한 덜어내려고
최근에 급부상하고 있는 CSS라이브러리 Tailwindcss를 사용했습니다.
Bootstrap과 결이 비슷하지만, Bootstrap에 비해 Tailwindcss는 커스텀도 편하고 사용성이 더 좋았습니다.
또 Bootstrap을 사용한 디자인이 너무 식상하다면 Tailwindcss를 사용해 보는 것도 좋겠다는 생각을 했습니다.
반응형 제작을 수월하게 하기 위해 디자인 레이아웃 일부는 flowbite라는 라이브러리를 함께 사용했습니다.
<br />
<br />
그리고 첫 팀 프로젝트를 할 때 백엔드에 대한 이해도가 낮아 프론트단의 구조를 짜거나 팀원들과의 소통에 어려웠던 기억이 있어서
조금이지만 백엔드 작업을 맡아서 해봤습니다. 덕분에 SpringBoot에 대한 두려움을 조금이나마 극복할 수 있었고,
배울 때 전체적으로 이해가 잘 안 갔던 부분들이 어느 정도 정리가 되었습니다.
덕분에 SpringBoot를 조금씩 공부하면서 개인 프로젝트를 진행해 볼 수 있을 것 같다는 자신감이 생겼습니다.<br />
또, AWS lightsail을 사용해 프론트단의 배포를 해봤습니다. 지난 프로젝트에서는 배포와 관련된 작업에
거의 참여를 하지 못했었는데, 이번에 동적 웹사이트의 배포를 경험해 봄으로써 기획부터 배포까지 모든 사이클을 경험해 볼 수 있었습니다.
<br />
<br />
마지막으로, 조금이지만 Git을 사용하여 다른 사람과 처음 협업을 경험해 봤습니다. 이전 프로젝트에서는 프론트 파트를 혼자 관리했기 때문에
Git의 사용법을 올바르게 숙지하지 못했었지만 이번 프로젝트로 Git으로 관리하는 방법을 배우게 되었습니다.

<br/>

## 멤버구성

|이름|역할|Github|
|---|---|------|
|이태일|프론트엔드|https://github.com/k1k2brz|
|변현석|백엔드|https://github.com/B-HS|
|김형준|백엔드|https://github.com/PorkbellyBigfan|

## 개발 일정
[ACO Project 일정](https://github.com/TEAM-ACO)

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
