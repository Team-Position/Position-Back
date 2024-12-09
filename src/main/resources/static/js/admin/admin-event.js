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

// 작성관리
// 공고 작성 관리 데이터 불러오기 및 표시
noticeService.fetchNotice(1, NoticeKeywordInput.value, noticeSelectSort, showNoticeList);
// 게시글 작성 관리 데이터 불러오기 및 표시
postService.fetchPost(1, PostKeywordInput.value, postSelectSort, showPostList);
// 댓글 작성 관리 데이터 불러오기 및 표시
replyService.fetchReply(1, ReplyKeywordInput.value, showReplyList);

// 후기관리
// 면접 후기 작성 관리 데이터 불러오기 및 표시
reviewService.fetchInterviewReview(1, InterviewReviewKeywordInput.value, interviewReviewSelectedSort, showInterviewReviewList);
// 포지션(인턴십) 후기 작성 관리 데이터 불러오기 및 표시
reviewService.fetchEvaluationCorporation(1, EvaluationCorporationKeywordInput.value, showEvaluationCorporationList);

// 문의 관리
// 일반 회원 문의 작성 관리 데이터 불러오기 및 표시
inquiryService.fetchMemberInquiry(1, MemberInquiryKeywordInput.value, memberInquirySelectSort, showMemberInquiryList);
// 기업 회원 문의 작성 관리 데이터 불러오기 및 표시
inquiryService.fetchCorporationInquiry(1, CorporationInquiryKeywordInput.value, corporationInquirySelectSort, showCorporationInquiryList);

// 기업 후기 신고 관리
// 기업 후기 신고 작성 관리 데이터 불러오기 및 표시
complainService.fetchComplain(1, ComplainKeywordInput.value, complainSelectedSort, showComplainList);



















