// 관리자 회원 관리
// 일반 회원 정보 & 기업 회원 정보
const memberService = (() => {
    const fetchMembers = async (page, keyword = "", sortType = "", callback) => {
        try {
            const response = await fetch(`/admin/position/members/${page}?keyword=${keyword}&types=${sortType}`);
            if (!response.ok) throw new Error('회원 정보 fetch 실패');

            const data = await response.json();
            if (callback && data.members && data.pagination) {
                callback({ members: data.members, pagination: data.pagination });
            }
        } catch (error) {
            console.error("오류:", error);
        }
    };
    
    const fetchCorporationMembers = async (page, keyword="",callback) => {
        try {
            page = page || 1;
            const response = await fetch(`/admin/position/corporation-members/${page}?keyword=${keyword}`);

            // 응답 실패 상태일 경우 에러 메시지
            if (!response.ok) throw new Error('기업 회원 정보 fetch 실패');

            // 응답 데이터를 JSON으로 받음
            const data = await response.json();

            // 데이터가 유효한 경우 콜백 호출
            if (callback && data.corporations && data.pagination) {
                callback( { corporations: data.corporations, pagination: data.pagination });
            } else {
                console.error("응답 데이터 형식이 올바르지 않습니다.")
            }
        } catch (error) {
            console.error("오류입니다:", error);
        }
    };

    return { fetchMembers: fetchMembers, fetchCorporationMembers: fetchCorporationMembers };
})();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 지원 현황 관리

const applyService = (() => {
    // 지원 현황 데이터를 서버에서 가져오는 비동기 함수
    const fetchApply = async (page, keyword = "", sortType = "", callback) => {
        try {
            page = page || 1;
            // /position/apply 경로로 GET 요청
            const response = await fetch(`/admin/position/apply/${page}?keyword=${keyword}&types=${sortType}`);

            // 응답 실패 상태일 경우 에러 메시지
            if (!response.ok) throw new Error('지원 현황 fetch 실패');

            // 응답 데이터를 JSON으로 변환
            const data = await response.json();

            // 콜백 함수가 있을 경우 데이터를 콜백 함수에 전달
            if (callback && data.applies && data.pagination) {
                callback({ applies: data.applies, pagination: data.pagination });
            }
        } catch (error) {
            // 오류가 발생할 경우 에러 메시지 출력
            console.error("오류입니다:", error);
        }
    };

    // 면접 현황 데이터를 서버에서 가져오는 비동기 함수
    const fetchInterview = async (page, keyword = "", sortType = "", callback) => {
        try {
            page = page || 1;
            // /position/interview 경로로 GET 요청
            const response = await fetch(`/admin/position/interview/${page}?keyword=${keyword}&types=${sortType}`);

            // 응답 실패 상태일 경우 에러 메시지
            if (!response.ok) throw new Error('면접 현황 fetch 실패');

            // 응답 데이터를 JSON으로 변환
            const data = await response.json();

            // 콜백 함수가 있을 경우 데이터를 콜백 함수에 전달
            if (callback && data.interviews && data.pagination) {
                callback({ interviews: data.interviews, pagination: data.pagination });
            }
        } catch (error) {
            // 오류가 발생할 경우 에러 메시지 출력
            console.error("오류입니다:", error);
        }
    };

    // 포지션 현황 데이터를 서버에서 가져오는 비동기 함수
    const fetchPosition = async (page, keyword = "", sortType = "", callback) => {
        try {
            page = page || 1;
            // /positoin/position 경로로 GET 요청
            const response = await fetch(`/admin/position/position/${page}?keyword=${keyword}&types=${sortType}`);

            // 응답 실패 상태일 경우 에러 메시지
            if (!response.ok) throw new Error('포지션 현황 fetch 실패');

            // 응답 데이터를 JSON으로 변환
            const data = await response.json();

            // 콜백 함수가 있을 경우 데이터를 콜백 함수에 전달
            if (callback && data.positions && data.pagination) {
                callback({ positions: data.positions, pagination: data.pagination });
            }
        } catch (error) {
            // 오류가 발생할 경우 에러 메시지 출력
            console.error("오류입니다:", error);
        }
    };

    // 각 함수들을 객체로 반환하여 외부에서 사용할 수 있도록 함
    return { fetchApply: fetchApply, fetchInterview: fetchInterview, fetchPosition: fetchPosition };
})();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 결제 관리
// 지원료 결제

const paymentService = (() => {
    const fetchPayment = async (page, keyword = "", sortType = "", callback) => {
        try {
            page = page || 1;
            const response = await fetch(`/admin/position/payment/${page}?keyword=${keyword}&types=${sortType}`);

            // 응답 실패 상태일 경우 에러 메시지
            if (!response.ok) throw new error('결제 정보 fetch 실패');

            // 응답 데이터를 JSON으로 받음
            const data = await response.json();

            // 데이터가 유효한 경우 콜백 호출
            if (callback && data.payments && data.pagination) {
                callback({ payments: data.payments, pagination: data.pagination });
            } else {
                console.error("응답 데이터 형식이 올바르지 않습니다");
            }
        } catch (error) {
            // 오류가 발생할 경우 에러 메시지를 출력
            console.error("오류입니다:", error);
        }
    };

    return { fetchPayment: fetchPayment };
})();

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 작성 관리

// 공고 작성 관리
const noticeService = (() => {
    // 공고 작성 데이터를 서버에서 가져오는 비동기 함수
    const fetchNotice = async (page, keyword = "", sortType = "", callback) => {
        try {
            page = page || 1;
            // /admin/positioin/notice 경로로 요청
            const response = await fetch(`/admin/position/notice/${page}?keyword=${keyword}&types=${sortType}`);

            // 응답 실패 상태일 경우 에러 메시지
            if (!response.ok) throw new error(`공고 작성 정보 fetch 실패`);

            // 응답 데이터를 JSON으로 받음
            const data = await response.json();

            // 데이터가 유효한 경우 콜백 호출
            if (callback && data.notices && data.pagination) {
                callback({ notices: data.notices, pagination: data.pagination });
            } else {
                console.error("응답 데이터 형식이 올바르지 않습니다");
            }
        } catch (error) {
            // 오류가 발생할 경우 에러 메시지를 출력
            console.error("오류입니다", error);
        }
    };

    return { fetchNotice: fetchNotice };
})();

// 게시글 작성 관리

const postService = (() => {
    // 게시글 데이터를 서버에서 가져오는 비동기 함수
    const fetchPost = async (page, keyword = "", sortType = "", callback) => {
        try {
            page = page || 1;
            // /admin/position/post 경로로 요청
            const response = await fetch(`/admin/position/post/${page}?keyword=${keyword}&types=${sortType}`);

            // 응답 실패 상태일 경우 에러 메시지
            if (!response.ok) throw new error('게시글 정보 fetch 실패');

            // 응답 데이터를 JSON으로 받음
            const data = await response.json()

            // 데이터가 유효한 경우 콜백 호출
            if (callback && data.posts && data.pagination) {
                callback({ posts: data.posts, pagination: data.pagination });
            } else {
                console.error("응답 데이터 형식이 올바르지 않습니다");
            }
        } catch (error) {
            // 오류가 발생할 경우 에러 메시지를 출력
            console.error("오류입니다:", error);
        }
    };

    return { fetchPost: fetchPost };
})();

// 댓글 작성 관리
const replyService = (() => {
    // 댓글 데이터를 서버에서 가져오는 비동기 함수
    const fetchReply = async (page, keyword = "", callback) => {
        try {
            page = page || 1;
            // /admin/position/reply 경로로 요청
            const response = await fetch(`/admin/position/reply/${page}?keyword=${keyword}`);

            // 응답 실패 상태일 경우 에러 메시지
            if (!response.ok) throw new error('댓글 정보 fetch 실패');

            // 응답 데이터를 JSON으로 받음
            const data = await response.json();

            // 데이터가 유효한 경우 콜백 호출
            if (callback && data.replies && data.pagination) {
                callback({ replies: data.replies, pagination: data.pagination });
            } else {
                console.error("응답 데이터 형식이 올바르지 않습니다");
            }
        } catch (error) {
            // 오류가 발생할 경우 에러 메시지를 출력
            console.error("오류입니다:", error);
        }
    };

    return { fetchReply: fetchReply };
})();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 후기 관리

// 면접 후기 & 인턴십 후기(기업) & 인턴십 후기(인턴)

// 후기 관리
const reviewService = (() => {
    // 면접 후기 데이터를 서버에서 가져오는 비동기 함수
    const fetchInterviewReview = async (page, keyword = "", sortType = "", callback) => {
        try {
            page = page || 1;
            // /position/interview-review 경로로 GET 요청
            const response = await fetch(`/admin/position/interview-review/${page}?keyword=${keyword}&types=${sortType}`);

            // 응답 실패 상태일 경우 에러 메시지
            if (!response.ok) throw new Error('면접 후기 fetch 실패');

            // 응답 데이터를 JSON으로 변환
            const data = await response.json();

            // 데이터가 유효한 경우 콜백 호출
            if (callback && data.interviewReviews && data.pagination) {
                callback({ interviewReviews: data.interviewReviews, pagination: data.pagination });
            } else {
                console.error("응답 데이터 형식이 올바르지 않습니다");
            }
        } catch (error) {
            // 오류가 발생할 경우 에러 메시지 출력
            console.error("오류입니다:", error);
        }
    };

    // 포지션(인턴십) 후기(기업) 데이터를 서버에서 가져오는 비동기 함수
    const fetchEvaluationCorporation = async (page, keyword = "", callback) => {
        try {
            page = page || 1;
            // /position/evaluation-corporation 경로로 GET 요청
            const response = await fetch(`/admin/position/evaluation-corporation/${page}?keyword=${keyword}`);

            // 응답 실패 상태일 경우 에러 메시지
            if (!response.ok) throw new Error('포지션(인턴십) 후기(기업) fetch 실패');

            // 응답 데이터를 JSON으로 변환
            const data = await response.json();

            // 콜백 함수가 있을 경우 데이터를 콜백 함수에 전달
            if (callback && data.evaluationCorporations && data.pagination) {
                callback({ evaluationCorporations: data.evaluationCorporations, pagination: data.pagination });
            } else {
                console.error("응답 데이터 형식이 올바르지 않습니다");
            }
        } catch (error) {
            // 오류가 발생할 경우 에러 메시지 출력
            console.error("오류입니다:", error);
        }
    };

    // 각 함수들을 객체로 반환하여 외부에서 사용할 수 있도록 함
    return {
        fetchInterviewReview: fetchInterviewReview,
        fetchEvaluationCorporation: fetchEvaluationCorporation,
    };
})();

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 관리자 문의 관리

// inquiryService 객체 생성
const inquiryService = (() => {
    // 일반 회원 문의 데이터를 서버에서 가져오는 비동기
    const fetchMemberInquiry = async (page, keyword = "", sortType = "", callback) => {
        try {
            page = page || 1;

            // /admin/position/members 경로로 GET 요청
            const response = await fetch(`/admin/position/member-inquiry/${page}?keyword=${keyword}&types=${sortType}`);

            // 응답 실패 상태일 경우 에러 메시지
            if (!response.ok) throw new Error('일반 회원 문의 fetch 실패');

            // 응답 데이터를 JSON으로 변환
            const data = await response.json();

            // 콜백 함수가 생길 경우, 가져온 데이터를 콜백 함수에 전달
            if (callback && data.inquiries && data.pagination) {
                callback({ inquiries: data.inquiries, pagination: data.pagination });
            }
        } catch (error) {
            // 오류가 발생할 경우 에러 메시지를 출력
            console.error("오류입니다:", error);
        }
    };

    const fetchCorporationInquiry = async (page, keyword = "", sortType = "", callback) => {
        try {
            page = page || 1;

            const response = await fetch(`/admin/position/corporation-inquiry/${page}?keyword=${keyword}&types=${sortType}`);
            if (!response.ok) throw new Error('기업 회원 문의 fetch 실패');

            const data = await response.json();
            if (callback && data.inquiries && data.pagination) {
                callback({ inquiries: data.inquiries, pagination: data.pagination });
            }
        } catch (error) {
            console.error("오류입니다:", error);
        }
    };

    return { fetchMemberInquiry: fetchMemberInquiry, fetchCorporationInquiry: fetchCorporationInquiry };
})();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 신고 관리
// 기업 후기 신고
const complainService = (() => {
    // 기업 후기 신고 데이터를 서버에서 가져오는 비동기 함수
    const fetchComplain = async (page, keyword = "", sortType = "", callback) => {
        try {
            page = page || 1;
            // /admin/position/complain 경로로 요청
            const response = await fetch(`/admin/position/complain/${page}?keyword=${keyword}&types=${sortType}`);

            // 응답 실패 상태일 경우 에러 메시지
            if (!response.ok) throw new error(`회원 정보 fetch 실패`);

            // 응답 데이터를 JSON으로 받음
            const data = await response.json();

            // 데이터가 유효한 경우 콜백 호출
            if (callback && data.complains && data.pagination) {
                callback({ complains: data.complains, pagination: data.pagination });
            } else {
                console.error("응답 데이터 형식이 올바르지 않습니다");
            }
        } catch (error) {
            // 오류가 발생할 경우 에러 메시지를 출력
            console.error("오류입니다:", error);
        }
    };

    return { fetchComplain: fetchComplain };
})();






















