<div align="center">
  <h1> 📷 프로그래머스 고양이 사진 검색 사이트 (Vainlia JS) </h1>
  
본 레포에는 <a href='https://programmers.co.kr/skill_check_assignments/4'>2020 Dev-Matching: 웹 프론트엔드 개발자(상반기)' 고양이 사진 검색 사이트</a> 문제 풀이 후 복기한 결과물을 담았습니다.</br>
라이브러리나 프레임워크 없이 Vanilia JS로 구현하였으며, </br>복기를 통해 주요 구현 과정, 개념, 코드를 정리하고 CSS 커스터마이징 및 기능을 추가하였습니다.</br>
복기 전 첫 풀이의 원본 코드는 https://github.com/kina94/Vanila-JS-Bowl 에서 확인할 수 있습니다.

<a href='https://main--vanilajs-cat-searching-site.netlify.app/'>바로가기</a>

![image](https://user-images.githubusercontent.com/66938939/168445885-76e666b4-cd72-4725-a885-f238086773f8.png)
</div>
<hr/>

## 기능 설명🍀</a>
* 랜덤 고양이 움짤 출력
  * 상단 놀라는 고양이를 누르면 랜덤한 고양이 움짤을 출력합니다.
* 랜덤 고양이 사진 출력
  * 오른쪽 하단의 고양이 버튼 클릭 시 랜덤한 고양이 사진을 출력합니다.
* 키워드 검색
  * 키워드 입력 후 엔터를 누르면 원하는 고양이 검색 가능 (API 서버가 불안정하여 로딩이 안 되는 경우가 있습니다.💦)
* 최근 검색 기록 관리
  * 검색 기록 추가 및 최근 검색 기록 삭제가 가능합니다.
* LocalStorage
  * 로컬스토리지를 이용하여 새로고침해도 최근에 검색된 고양이를 다시 불러옵니다.
* 반응형
  * 반응형을 지원합니다. 작은 화면에서는 최근 검색 삭제가 불가능합니다.
