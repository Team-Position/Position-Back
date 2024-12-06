// 관리자 회원 관리

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
    const fetchReply = async (page, keyword = "", sortType = "", callback) => {
        try {
            page = page || 1;
            // /admin/position/reply 경로로 요청
            const response = await fetch(`/admin/position/reply/${page}?keyword=${keyword}&types=${sortType}`);

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
    const fetchInterviewReview = async (callback) => {
        try {
            // /position/interview-review 경로로 GET 요청
            const response = await fetch('/position/interview-review');

            // 응답 실패 상태일 경우 에러 메시지
            if (!response.ok) throw new Error('면접 후기 fetch 실패');

            // 응답 데이터를 JSON으로 변환
            const interviewReviewData = await response.json();

            // 콜백 함수가 있을 경우 데이터를 콜백 함수에 전달
            if (callback) {
                callback(interviewReviewData);
            }
        } catch (error) {
            // 오류가 발생할 경우 에러 메시지 출력
            console.error("오류입니다:", error);
        }
    };

    // 인턴십 후기(기업) 데이터를 서버에서 가져오는 비동기 함수
    const fetchEvaluationCorporation = async (callback) => {
        try {
            // /position/evaluation-corporation 경로로 GET 요청
            const response = await fetch('/position/evaluation-corporation');

            // 응답 실패 상태일 경우 에러 메시지
            if (!response.ok) throw new Error('인턴십 후기(기업) fetch 실패');

            // 응답 데이터를 JSON으로 변환
            const corporationReviewData = await response.json();

            // 콜백 함수가 있을 경우 데이터를 콜백 함수에 전달
            if (callback) {
                callback(corporationReviewData);
            }
        } catch (error) {
            // 오류가 발생할 경우 에러 메시지 출력
            console.error("오류입니다:", error);
        }
    };

    // 인턴십 후기(인턴) 데이터를 서버에서 가져오는 비동기 함수
    const fetchEvaluationPositioner = async (callback) => {
        try {
            // /position/evaluation-positioner 경로로 GET 요청
            const response = await fetch('/position/evaluation-positioner');

            // 응답 실패 상태일 경우 에러 메시지
            if (!response.ok) throw new Error('인턴십 후기(인턴) fetch 실패');

            // 응답 데이터를 JSON으로 변환
            const positionerReviewData = await response.json();

            // 콜백 함수가 있을 경우 데이터를 콜백 함수에 전달
            if (callback) {
                callback(positionerReviewData);
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
        fetchEvaluationPositioner: fetchEvaluationPositioner
    };
})();

// 면접 후기 데이터를 표시하는 함수
const displayInterviewReviews = (interviewReviews) => {
    // 면접 후기 데이터가 표시될 컨테이너 선택
    const interviewreviewListDiv = document.querySelector('#InterviewReview-section .ReviewTable_container');

    // 기존 데이터 제거 (헤더 행 제외)
    const existingRows = interviewreviewListDiv.querySelectorAll('.ReviewTable_row:not(.ReviewTable_header)');
    existingRows.forEach(row => row.remove());

    // `interviewReviews` 배열 내의 각 면접 후기 데이터를 반복하여 새 행 생성
    interviewReviews.forEach(review => {
        const reviewRow = document.createElement('div');
        reviewRow.classList.add('ReviewTable_row');

        // 각 면접 후기 데이터 (기업명, 면접일, 후기 내용, 작성자)를 포함하는 HTML 작성
        reviewRow.innerHTML = `
            <div class="ReviewTable_cell"><input type="checkbox" class="reviewCheckbox" /></div>
            <div class="ReviewTable_cell">${review.corporationName || ''}</div>
            <div class="ReviewTable_cell">${review.interviewDate || ''}</div>
            <div class="ReviewTable_cell">${review.reviewContent || ''}</div>
            <div class="ReviewTable_cell">${review.reviewerName || ''}</div>
            <div class="ReviewTable_cell"><button class="editBtn">수정</button></div>
        `;

        // 새로 생성한 면접 후기 행을 컨테이너에 추가
        interviewreviewListDiv.appendChild(reviewRow);
    });
};

// 인턴십 후기(기업) 데이터를 표시하는 함수
const displayEvaluationCorporation = (corporationReviews) => {
    // 인턴십 후기(기업) 데이터가 표시될 컨테이너 선택
    const evaluationcorporationListDiv = document.querySelector('#CorporationReview-section .ReviewTable_container');

    // 기존 데이터 제거 (헤더 행 제외)
    const existingRows = evaluationcorporationListDiv.querySelectorAll('.ReviewTable_row:not(.ReviewTable_header)');
    existingRows.forEach(row => row.remove());

    // `corporationReviews` 배열 내의 각 인턴십 후기(기업) 데이터를 반복하여 새 행 생성
    corporationReviews.forEach(review => {
        const reviewRow = document.createElement('div');
        reviewRow.classList.add('ReviewTable_row');

        // 각 인턴십 후기(기업) 데이터 (기업명, 인턴십 기간, 후기 내용, 작성자)를 포함하는 HTML 작성
        reviewRow.innerHTML = `
            <div class="ReviewTable_cell"><input type="checkbox" class="reviewCheckbox" /></div>
            <div class="ReviewTable_cell">${review.corporationName || ''}</div>
            <div class="ReviewTable_cell">${review.internshipPeriod || ''}</div>
            <div class="ReviewTable_cell">${review.reviewContent || ''}</div>
            <div class="ReviewTable_cell">${review.reviewerName || ''}</div>
            <div class="ReviewTable_cell"><button class="editBtn">수정</button></div>
        `;

        // 새로 생성한 인턴십 후기(기업) 행을 컨테이너에 추가
        evaluationcorporationListDiv.appendChild(reviewRow);
    });
};

// 인턴십 후기(인턴) 데이터를 표시하는 함수
const displayEvaluationPositioner = (positionerReviews) => {
    // 인턴십 후기(인턴) 데이터가 표시될 컨테이너 선택
    const evaluationpositionerListDiv = document.querySelector('#PositionerReview-section .ReviewTable_container');

    // 기존 데이터 제거 (헤더 행 제외)
    const existingRows = evaluationpositionerListDiv.querySelectorAll('.ReviewTable_row:not(.ReviewTable_header)');
    existingRows.forEach(row => row.remove());

    // `positionerReviews` 배열 내의 각 인턴십 후기(인턴) 데이터를 반복하여 새 행 생성
    positionerReviews.forEach(review => {
        const reviewRow = document.createElement('div');
        reviewRow.classList.add('ReviewTable_row');

        // 각 인턴십 후기(인턴) 데이터 (기업명, 인턴십 시작일, 후기 내용, 작성자)를 포함하는 HTML 작성
        reviewRow.innerHTML = `
            <div class="ReviewTable_cell"><input type="checkbox" class="reviewCheckbox" /></div>
            <div class="ReviewTable_cell">${review.corporationName || ''}</div>
            <div class="ReviewTable_cell">${review.startDate || ''}</div>
            <div class="ReviewTable_cell">${review.reviewContent || ''}</div>
            <div class="ReviewTable_cell">${review.reviewerName || ''}</div>
            <div class="ReviewTable_cell"><button class="editBtn">수정</button></div>
        `;

        // 새로 생성한 인턴십 후기(인턴) 행을 컨테이너에 추가
        evaluationpositionerListDiv.appendChild(reviewRow);
    });
};

// 데이터 불러오기 및 표시 실행
// 면접 후기 데이터를 불러와 표시하기 위해 `fetchInterviewReview` 호출
reviewService.fetchInterviewReview(displayInterviewReviews);

// 인턴십 후기(기업) 데이터를 불러와 표시하기 위해 `fetchEvaluationCorporation` 호출
reviewService.fetchEvaluationCorporation(displayEvaluationCorporation);

// 인턴십 후기(인턴) 데이터를 불러와 표시하기 위해 `fetchEvaluationPositioner` 호출
reviewService.fetchEvaluationPositioner(displayEvaluationPositioner);

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 관리자 문의 관리

// inquiryService 객체 생성
const inquiryService = (() => {
    // 일반 회원 데이터를 서버에서 가져오는 비동기
    const fetchMemberInquiry = async (callback) => {
        try {
            // /admin/position/members 경로로 GET 요청
            const response = await fetch('/admin/position/member-inquiry');

            // 응답 실패 상태일 경우 에러 메시지
            if (!response.ok) throw new Error('일반 회원 문의 fetch 실패');
            // 응답 데이터를 json으로 파싱
            const inquiry = await response.json();
            // 콜백 함수가 생길 경우, 가져온 데이터를 콜백 함수에 전달
            if (callback) {
                callback(inquiry);
            }
        } catch (error) {
            // 오류가 발생할 경우 에러 메시지를 출력
            console.error("오류입니다:", error);
        }
    };

    const fetchCorporationInquiry = async (callback) => {
        try {
            const response = await fetch('/admin/position/corporation-inquiry');
            if (!response.ok) throw new Error('기업 회원 문의 fetch 실패');

            const corporationInquiry = await response.json();
            if (callback) {
                callback(corporationInquiry);
            }
        } catch (error) {
            console.error("오류입니다:", error);
        }
    };

    return { fetchMemberInquiry: fetchMemberInquiry, fetchCorporationInquiry: fetchCorporationInquiry };
})();



// 일반 문의 데이터를 표시하는 함수
const displayMemberInquiries = (inquiries) => {
    const memberInquiryDiv = document.querySelector('#inquiry-section .memberinquiryTable_container');

    // 기존 행 삭제
    const existingRows = memberInquiryDiv.querySelectorAll('.inquiryTable_row:not(.inquiryTable_header)');
    existingRows.forEach(row => row.remove());

    inquiries.forEach(inquiry => {
        const inquiryRow = document.createElement('div');
        inquiryRow.classList.add('inquiryTable_row');

        // 일반 문의 데이터(체크박스, 문의 유형, 생성 날짜, 제목, 내용, 이메일, 수정 버튼)를 포함하는 HTML 작성
        inquiryRow.innerHTML = `
            <div class="inquiryTable_cell"><input type="checkbox" class="inquiryCheckbox" /></div>
            <div class="inquiryTable_cell">${inquiry.inquiryCategory || ''}</div>
            <div class="inquiryTable_cell">${inquiry.createdDate || ''}</div>
            <div class="inquiryTable_cell">${inquiry.inquiryTitle || ''}</div>
            <div class="inquiryTable_cell">${inquiry.inquiryContent || ''}</div>
            <div class="inquiryTable_cell">${inquiry.memberEmail || ''}</div>
            <div class="inquiryTable_cell">${inquiry.inquiryStatus || ''}</div>
            <div class="inquiryTable_cell"><button class="editBtn">수정</button></div>
        `;

        memberInquiryDiv.appendChild(inquiryRow);
    });
};

// 기업 문의 데이터를 표시하는 함수
const displayCorporationInquiries = (inquiries) => {
    const corporationInquiryDiv = document.querySelector('#inquiry-section .corporationinquiryTable_container');

    // 기존 행 삭제
    const existingRows = corporationInquiryDiv.querySelectorAll('.inquiryTable_row:not(.inquiryTable_header)');
    existingRows.forEach(row => row.remove());

    inquiries.forEach(inquiry => {
        const inquiryRow = document.createElement('div');
        inquiryRow.classList.add('inquiryTable_row');

        // 기업 문의 데이터(체크박스, 문의 유형, 생성 날짜, 제목, 내용, 이메일, 수정 버튼)를 포함하는 HTML 작성
        inquiryRow.innerHTML = `
            <div class="inquiryTable_cell"><input type="checkbox" class="inquiryCheckbox" /></div>
            <div class="inquiryTable_cell">${inquiry.inquiryCategory || ''}</div>
            <div class="inquiryTable_cell">${inquiry.createdDate || ''}</div>
            <div class="inquiryTable_cell">${inquiry.inquiryTitle || ''}</div>
            <div class="inquiryTable_cell">${inquiry.inquiryContent || ''}</div>
            <div class="inquiryTable_cell">${inquiry.memberEmail || ''}</div>
            <div class="inquiryTable_cell">${inquiry.inquiryStatus || ''}</div>
            <div class="inquiryTable_cell"><button class="editBtn">수정</button></div>
        `;

        corporationInquiryDiv.appendChild(inquiryRow);
    });
};

// 데이터 불러오기 및 표시
inquiryService.fetchMemberInquiry(displayMemberInquiries);
inquiryService.fetchCorporationInquiry(displayCorporationInquiries);

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 신고 관리
// 기업 후기 신고

const complainService = (() => {
    // 후기 신고 데이터를 서버에서 가져오는 비동기 함수
    const fetchComplain = async (callback) => {
        try {
            // /position/complain 경로로 GET 요청
            const response = await fetch('/position/complain');

            // 응답 실패 상태일 경우 에러 메시지
            if (!response.ok) throw new Error('후기 신고 fetch 실패');

            // 응답 데이터를 JSON으로 변환
            const complainData = await response.json();

            // 콜백 함수가 있을 경우 데이터를 콜백 함수에 전달
            if (callback) {
                callback(complainData);
            }
        } catch (error) {
            // 오류가 발생할 경우 에러 메시지 출력
            console.error("오류입니다:", error);
        }
    };

    return {
        fetchComplain: fetchComplain,
    };
})();

// 후기 신고 데이터를 표시하는 함수
const displayComplains = (complains) => {
    // 후기 신고가 표시될 컨테이너 선택
    const complainListDiv = document.querySelector('#Complain-section .complainTable_container');

    // 기존 데이터 제거 (헤더 행 제외)
    const existingRows = complainListDiv.querySelectorAll('.complainTable_row:not(.complainTable_header)');
    existingRows.forEach(row => row.remove());

    // `complains` 배열 내의 각 신고 데이터를 반복하여 새 행 생성
    complains.forEach(complain => {
        const complainRow = document.createElement('div');
        complainRow.classList.add('complainTable_row');

        // 각 신고 데이터 (기업명, 신고일, 후기 내용, 신고자, 상태)를 포함하는 HTML 작성
        complainRow.innerHTML = `
            <div class="complainTable_cell"><input type="checkbox" class="complainCheckbox" /></div>
            <div class="complainTable_cell">${complain.corporationName || ''}</div>
            <div class="complainTable_cell">${complain.complainDate || ''}</div>
            <div class="complainTable_cell">${complain.reviewContent || ''}</div>
            <div class="complainTable_cell">${complain.complainantName || ''}</div>
            <div class="complainTable_cell">${complain.complainStatus || ''}</div>
            <div class="complainTable_cell"><button class="editBtn">처리</button></div>
        `;

        // 새로 생성한 신고 행을 컨테이너에 추가
        complainListDiv.appendChild(complainRow);
    });
};

// 후기 신고 데이터를 가져와 화면에 표시
complainService.fetchComplain(displayComplains);




