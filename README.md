# sanghun-position

<h1>사회 초년생을 위한 기업 실무 체험 솔류션 - 'POSITION'</h1>
<img src="https://github.com/user-attachments/assets/08156fec-26a6-48c9-8095-a94e642a69ca">

<h2>1. 기획 배경</h2>
<img src="https://github.com/user-attachments/assets/7c44941b-7d36-4ce1-9193-a0ed65620396">
<br>
"졸업했는데 경력만?"이라는 기사를 통해 알 수 있듯, 많은 청년들이 취업 준비 과정에서 <strong>실무 경험 부족</strong>이라는 큰 벽에 직면하고 있습니다. 경험이 없어 취업이 어렵고, 취업이 어려워서 경험을 쌓을 기회조차 얻지 못하는 <strong>악순환이 반복</strong>되고 있습니다.<br><br>

이와 함께 최근 대기업들은 단순한 이윤 창출을 넘어 <strong>사회적 책임을 다하려는 움직임</strong>을 보이고 있습니다. 청년 취업 지원 활동을 통해 <strong>긍정적인 브랜드 이미지를 구축</strong>하고, 사회 문제 해결에 기여하고자 하는 노력이 두드러집니다.<br>

저희는 이러한 점에 주목하여 <strong>청년과 기업 간의 상생</strong>을 실현하고자 합니다. 기업은 정직원의 업무를 체험단에게 제공함으로써 <strong>비용을 절감</strong>하고, 청년들은 실무 경험과 이력서에 기재할 수 있는 <strong>경력을 쌓는 기회</strong>를 얻게 됩니다. 이를 위해, 저희는 사회 초년생들에게 <strong>실질적인 실무 경험과 경력을 제공</strong>하고, 취업 시장에서 <strong>경쟁력을 높일 수 있는</strong> 실무 체험 프로그램을 기획했습니다.
</div>

<h2>2. 기대 효과</h2>
<img src="https://github.com/user-attachments/assets/c2f5ef8d-cb6c-41ee-abff-e42762e8450f">

<strong>[실무 경험 제공]</strong><br>
사회 초년생들은 실질적인 업무를 통해 자신감을 얻고, 이력서에 기재할 수 있는 <strong>실무 경험을 확보</strong>하게 됩니다. 이를 통해 취업 시장에서 경쟁력을 갖추고 경력의 빈칸을 채울 수 있습니다.<br>

<strong>[기업 이미지 개선]</strong><br>
기업은 청년 취업 지원을 통해 사회적 책임을 다하는 모습을 보여줌으로써 <strong>긍정적인 브랜드 이미지를 구축</strong>하고, 사회적 가치를 창출하는 기업으로 평가받을 수 있습니다.<br>

<strong>[청년 취업 지원</strong>]<br>
이 프로그램은 청년들에게 취업에 필요한 <strong>실무 경험을 제공</strong>하여, 단기적으로는 취업 준비 과정의 부담을 완화하고 장기적으로는 <strong>청년 실업 문제 해결</strong>에 기여합니다.<br>

<strong>[청년과 기업 상생]</strong><br>
기업은 이 프로그램을 통해 <strong>인재</strong>를 쉽게 찾을 수 있고, 사회 초년생들은 <strong>실무 경험을 쌓을 기회</strong>를 얻게 됩니다. 이렇게 상생하는 구조는 기업의 인력 채용과 청년들의 경력 개발을 동시에 촉진합니다.<br>


<h2>3. 프로젝트 사용 툴</h2>

- 내용 
- 내용2
- 내용 3
- ㅇㅇ
- ㅇㅇ
- ㅇㅇ

<h2>4. ERD</h2>
<img src="https://github.com/user-attachments/assets/e2c4a86e-b6cc-4078-95f2-97785c66b6ae">

 
<h2>5. 담당 업무</h2>
5-1 프론트엔드<br>
<img src="https://github.com/user-attachments/assets/a20ec0fe-de2e-4c8b-ae87-a151143110bc">

▶ 문화공간 정보
- 문화공간 정보 출력
- 카카오맵 API 활용 지도 출력

▶ 모집 게시판
- 모집 게시판 작성
- 모집 게시판 수정
- 모집 게시판 상세
- 모집 게시판 목록

▶ 이벤트 게시판
- 이벤트 게시판 작성
- 이벤트 게시판 수정
- 이벤트 게시판 상세
-  게시판 목록

<br>
5-2 백엔드<br>
<img src="https://github.com/user-attachments/assets/ccd24e16-762f-4e4a-9dca-634c095d0421">
<img src="https://github.com/user-attachments/assets/5dfe716d-34b0-4f76-9f6a-05c5f127543c">


▶ 메인
- 헤더에 세션 삽입, 로그인 시 세션 유지
- 헤더와 메인 페이지에 각각의 게시판 링크 연결
- 각 게시판의 최신글 3개 출력과 각 항목 선택 시 상세 페이지 이동
- 사진 대표 이미지 썸네일과 글 제목, 작성일자 등 출력

▶ 고객센터
- 문의사항 폼 작성 시 문의 사항 등록
- Gmail SMTP API를 활용하여 답변 등록 

▶ 관리자 페이지 : 회원 목록
- 최신 회원 목록 10명 단위로 조회하여 페이징 처리(Restful)
- 회원 목록: 이름, 이메일, 휴대폰 번호 검색 처리(Restful)
- 회원 삭제: 삭제버튼 선택시 회원 상태 변경(Restful)
- 회원 각 항목 선택 시 모달팝업으로 회원 상세 정보 출력(Restful)
- 등급에 따른 등급 이미지 출력

▶ 관리자 페이지 : 모집 게시판
- 최신 모집게시글 목록 10 단위로 조회하여 페이징 처리(Restful)
- 모집 게시글 목록: 제목, 작성자, 모집 장소 검색 처리(Restful)
- 게시글 삭제: 모집 게시글 삭제(Restful)
- 게시글 각 항목 선택 시 상세 페이지 이동하여 출력
- 게시글 내 상세 이미지 다수일 경우 슬라이드 처리하여 출력

▶ 관리자 페이지 : 자유 게시판
- 최신 자유게시글 목록 10 단위로 조회하여 페이징 처리(Restful)
- 자유 게시글 목록: 제목, 작성자, 글 내용 검색 처리(Restful)
- 게시글 삭제: 자유 게시글 삭제(Restful)
- 게시글 각 항목 선택 시 상세 페이지 이동하여 출력
- 게시글 내 상세 이미지 다수일 경우 슬라이드 처리하여 출력

▶ 관리자 페이지 : 문의 게시판
- 최신 자유게시글 목록 10 단위로 조회하여 페이징 처리(Restful)
- 문의글 목록: 문의내용, 휴대폰 번호, 이메일 검색 처리(Restful)
- 문의글 삭제: 문의 게시글 삭제(Restful)
- 문의글 각 항목 선택 시 상세 페이지 이동하여 출력
- 문의글 답변 시 문의상태 변경
- 문의글 답변 시 SMTP Gmail을 사용하여 답변 내용 이메일 발송 처리 


<h2>6. 느낀점</h2>
<h3>6-1. 어려웠던 부분</h3>
<h4>📌 회원 등급 조회 시 참여수에 따른 비등가조인 쿼리문을 작성하는 게 어려웠다.</h4> <br>

<img src="https://github.com/dev-sein/dev-sein/assets/122762143/80b84e08-f718-4afc-a59b-75034fb4b34a"> <br>
<잘못된 코드><br>
member의 participationCount를 사용하여 grade의 gradeTitle을 조회하는 쿼리이다. 시행착오를 겪으며 어느정도 완성된 쿼리이나 계속해서 하단의 오류가 발생하였다. 그러나 내 코드에 대한 확신이 없어서 어느 부분을 수정해야할 지 찾아가는 것이 어려웠다. <br>

<img src="https://github.com/dev-sein/dev-sein/assets/122762143/c544ba9c-f1c6-4361-9948-97c3126e7ef9"> <br>
<오류 화면><br>
결과값은 memberId 마다 나와야 하기 때문에 무조건 하나의 값만 도출되어야 하는데(fetchOne) 결과값이 계속해서 여러개가 리턴되는 오류였다.<br> <br>
 
<img src="https://github.com/dev-sein/dev-sein/assets/122762143/43d76b4c-e12f-46d8-b581-1999b71fa97a"> <br>
<완성 코드><br>
 오류코드에서 where 절을 추가하면 쉽게 해결되는 코드였다. 그러나 문법에 대한 확신이 없어 헤매는 와중 마주친 오류에 원인을 찾기 어려웠다. 그래서 QueryDSL이 아닌 비등가조인 기본 예제들을 다시 한번 되짚어보며 빠진 부분을 찾고 해결했다. <br><br>
 
 ✔ JPA가 익숙하지 않은 상태에서 비등가조인을 작성하고자 할 때 문법 등 막막한 점이 있었다. 검색을 해보아도 <strong>QueryDSL 비등가조인</strong>에 대한 명확한 예제가 없어 직접 작성해가며 부딪히는 수밖에는 없었는데 제법 시간이 걸렸다. <strong>계속해서 주석을 달며 test를 해보는</strong> 수밖에는 없었다. 문제해결에 거의 다다랐을 때쯤에는 return 값을 계속 여러값을 불러와서 문제였는데, where 절에 memberId를 불러오지 않아 여러값을 불러왔었다. <strong>새로운 기술이라는 점을 의식하다보니, 기본적인 것을 놓친 것이다.</strong> 문제를 해결하고는 다소 허탈하긴 했으나, 구글의 도움 없이 내가 직접 새로운 기술을 적용시켰다는 점이 뿌듯했다. <br><br><br>

<h3>6-2. 문제를 해결했던 부분</h3>
<h4>📌Z-index로 해결한 카카오맵 슬라이드</h4>
🌩문제 상황🌩<br>
위도, 경도를 받아와 카카오맵 API를 사용하여 지도를 출력하는 코드에서 두 개 이상 지도를 불러올 경우 지도로 이동하는 화살표가 출력되지 않음.  <br><br>
🚨문제 원인🚨 <br>
z-index의 순서 문제 <br><br>
🚀해결 방법🚀<br>
어려울 수록 차근차근 확인해보는것이 방도임을 생각하며, 개발자모드에서 요소 하나하나를 선택해보았다. 카카오맵에서 자동으로 지정된 설정에는 지도가 가장 앞순위로 나와있었기 때문에 부가적으로 내가 설정해놓은 이미지 파일이 지도에 가려 이동이 어려웠다. 그래서 화살표에 별도로 z-index를 주어 화살표 클릭 시 지도가 출력될도록 하였다.

<br><br>

<h4>📌무조건 1페이지만! </h4>
🌩문제 상황🌩<br>
페이징 처리를 하였으나 페이지 항목의 어떠한 숫자를 눌러도 무조건 1페이지만 출력되었다.<br><br>
🚨문제 원인🚨 <br>
서비스 코드에서 page를 1로 지정해놓음.<br><br>
🚀해결 방법🚀<br>
테스트를 위해 test 파일에서 사용하던 코드를 그대로 사용하여 발생한 문제였다. 컨트롤러에서는 문제가 없었으나, 서비스 코드에서 무조건 1페이지로 출력되도록 하였기 때문에 어떤 버튼을 눌러도 1페이지만 출력되었다. 
<br><br>

<h3>5-4. 총평</h3>
<h4>🌟 기획: 유지·보수를 생각하자!  </h4>
저번 crossroads 프로젝트 때 느꼈던 점을 되짚어가며 빠진 부분이 없도록 세세하게 기획을 하였다. 수정 버튼, 뒤로 가기, 각 버튼을 눌렀을 때 모달 출력 등 사용자 편의성에 집중한 세세한 기능을 만들 수 있도록 하였다. 그렇게 진행하면 완성된 페이지를 만들 수 있을 거라고 생각했다. 그러나 직접 프로젝트를 진행하다보니, 주 게시판외 사용자의 편의를 위한 페이지 이동 등은 끝이 없다는 것을 깨닫게 되었다. '완성'하는 것이 아니라 계속해서 발전해나가고 수정하는 것이며, 왜 개발자들이 유지 보수를 위한 코드를 강조했는지 깨닫게 되었다.

 <h4>🌟 협업: <strong>프로젝트는 '내'가 아니라 '팀'이 하는 것</strong> </h4>
이번 프로젝트에서 특히나 느낀 점은 나의 작업도 중요하지만, 팀원들의 작업도 중요하다는 것이다. 관리자 게시판과 메인 게시판을 맡았기 때문에 다른 게시판의 진행률이 중요했다. 내가 이미 기능을 구현하더라도 게시판이 완성되지 않는다면 의미가 없으며 레이아웃 자체를 바꾸거나 기획을 변경해야 했기 때문이다. 또한 관리자 페이지였기 때문에 각각의 서비스에서 사용하는 메소드 이름이나 DTO 등 역시 중요하다는 것을 알게되었다. 코드를 공유하기 때문에 한쪽에서 보고 없이 변경을 하게 되면 상대방 코드에 영향을 미치며 오류가 발생하기 때문이다. 예를 들어 모집게시판에서 상세 내용을 불러오는 DTO 명이 변경된 적이 있었다. 그러나 그 사실이 공유되지 않아 관리자 페이지에서 모집 게시판의 이미지가 조회되지 않았다. 이런 오류 역시 사전에 상황 보고가 이루어졌다면 발생하지 않았을 것이기 때문에, 이런 일 이후로는 팀원 간 코드 변경에 대해 섬세하게 신경을 썼다. 나의 작업은 곧 다른 팀원에게 영향을 미친다는 점을 인지하게 되는 프로젝트였다. 
 
<h4>🌟 미래: 보완하는 개발자! </h4>
이번 프로젝트를 시작하며 세웠던 나의 목표는 '안 해본 것 해보기'였다. 지난 프로젝트에서는 회원가입이나 로그인, 게시글 작성 등 insert를 중심으로 진행했다면 이번엔 insert를 제외한 다른 기능들을 구현해보고 싶었다. 그래서 희망 파트를 정할 때 '관리자 페이지'를 지망하였고, 다행히 내가 맡아서 할 수 있었다.  저번 프로젝트에서 간단한 select 기능만 구현했었던 나는 페이징 처리와 검색을 하는데 있어 로직을 이해하지 못해 처음엔 난항을 겪었다. 그러나 구동되지 않는 코드를 붙잡고 이틀정도 씨름하다보니 input에서 입력한 값을 어떻게 받아오게 되는지 알게 되었다. 구동이 되지 않았던 이유는 아주 사소한 실수였지만, 어쩌면 내가 완벽하게 이해하지 못했기 때문에 실수가 발생했고, 그덕에 코드를 낱낱이 볼 수 있었다고 생각한다. 페이징처리와 검색, offset의 원리를 아예 몰랐으나 관리자 페이지가 갖게 되는 필연적인 반복적인 작업 덕분에 저번 프로젝트보다 성장했다고 느낀다. 이렇듯 나는 내가 미숙하거나 보완이 필요한 부분들을 계속해서 찾아낼 것이고, 직접 부딪혀가며 해결해내는 개발자가 될 것이다.
