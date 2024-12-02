// 데이터 불러오기 및 표시 실행

// 회원관리 데이터 불러오기 및 표시
// 일반 회원 데이터를 불러와 표시하기 위해 `fetchMembers` 호출
memberService.fetchMembers(1, memberKeywordInput.value, selectedSort, showMemberList);
// 기업 회원 데이터를 불러와 표시하기 위해 `fetchCorporationMembers` 호출
memberService.fetchCorporationMembers(1, corporationKeywordInput.value, showCorporationList);

// 지원현황 관리 데이터 불러오기 및 표시
applyService.fetchApply(1, ApplyKeywordInput.value, applySelectedSort, showApplyList);
applyService.fetchInterview(1, InterviewKeywordInput.value, interviewSelectedSort, showInterviewList);
applyService.fetchPosition(1, PositionKeywordInput.value, positionSelectedSort, showPositionList);

// 결제 관리 데이터 불러오기 및 표시
paymentService.fetchPayment(1, PaymentKeywordInput.value, paymentSelectedSort, showPaymentList);

// 공고 작성 관리 데이터 불러오기 및 표시