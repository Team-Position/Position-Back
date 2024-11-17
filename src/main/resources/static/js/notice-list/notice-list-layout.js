const noticePaging = document.querySelector(".PageBox");
const listBody = document.querySelector('.list-body');
const sortingSelect = document.querySelector(".sorting-select select");
const ongoingBtn = document.getElementById("ongoing-btn");
const closedBtn = document.getElementById("closed-btn");
const statusInput = document.getElementById("notice-status");
const loadingScreen = document.getElementById("ingRecruitLoading"); // 로딩 화면 요소

// 공고 목록 데이터를 받아서 DOM에 추가하는 함수
const showNoticeList = ({notices, pagination}, status) => {
    listBody.innerHTML = ''; // 목록 초기화
    let pagingText = "";

    let text = ''; // 텍스트 초기화

    notices.forEach(notice => {
        // 마감일까지 남은 일수 계산
        const daysLeft = calculateDaysLeft(notice.noticeEndDate); // noticeWorkEndDate를 사용하여 남은 일수 계산

        text += `
            <div id="rec-${notice.id}" class="list-item">
                <div class="box-item">
                    <div class="col notification-info">
                        <div class="job-tit">
                            <a class="str-tit" id="rec-link-${notice.id}" 
                               href="/corporation/notice-preview?id=${notice.id}" 
                               target="_blank" title="${notice.noticeTitle}">
                                <span>${notice.noticeTitle}</span>
                            </a>
                            
                        </div>
                        <div class="job-meta">
                            <span class="job-sector">${notice.noticeJobCategoryName || '직무 미정'}</span>
                        </div>
                    </div>
                    <div class="col recruit-info">
                        <ul>
                            <li><p class="work-place">근무 기간: ${formatDate(notice.noticeWorkStartDate)} ~ ${formatDate(notice.noticeWorkEndDate)}</p></li>
                            <li><p class="career">경력: ${notice.noticeCareer}</p></li>
                            <li><p class="education">학력: ${notice.noticeEducation}</p></li>
                            <li><p class="work-time">근무 시간: ${formatTime(notice.noticeWorkStartTime)} ~ ${formatTime(notice.noticeWorkEndTime)}</p></li>
                        </ul>
                    </div>
                    <div class="col support-info">
                        <button class="sri-btn-md delete-btn" data-id="${notice.id}">
                            <span class="sri-btn-immediately">삭제하기</span>
                        </button>
                        <p class="support-detail">
                           ${
                                daysLeft > 0
                                    ? `<span class="date">D-${daysLeft}일</span>`
                                    : daysLeft === 0 
                                        ? `<span class="date">D-DAY</span>`
                                        : ""
                            }
                        <span class="deadlines">${timeForToday(notice.createdDate)} 등록</span>
                    </p>
                    </div>
                </div>
                <div class="similar-recruit"></div>
            </div>
        `;
    });

    // 누적된 HTML 문자열을 한 번에 설정
    listBody.innerHTML = text;

    // 이전 버튼
    if (pagination.prev) {
        pagingText += `
        <button class="BtnType SizeS BtnPrev" onclick="goToPage(${pagination.startPage - 1})">
            이전
        </button>
    `;
    }

    // 페이지 번호
        for (let i = pagination.startPage; i <= pagination.endPage; i++) {
            if (pagination.page === i) {
                pagingText += `
                <span class="BtnType SizeS active">${i}</span>
            `;
            } else {
                pagingText += `
                <span class="BtnType SizeS" onclick="goToPage(${i})">${i}</span>
            `;
            }
        }

    // 다음 버튼
        if (pagination.next) {
            pagingText += `
            <button class="BtnType SizeS BtnNext" onclick="goToPage(${pagination.endPage + 1})">
                다음
            </button>
        `;
        }

    // 페이지네이션 HTML 삽입
        noticePaging.innerHTML = pagingText;

    // 삭제 버튼 클릭 이벤트 리스너 추가
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const noticeId = button.getAttribute('data-id'); // 공고 ID 가져오기
            const confirmed = confirm("정말로 이 공고를 삭제하시겠습니까?"); // 삭제 확인
            if (confirmed) {
                await noticeService.remove(noticeId); // 공고 삭제
                loadNotices(); // 공고 목록 새로 고침
            }
        });
    });

    hideLoading(); // 로딩 화면 숨기기

};

// 로딩 화면 표시 함수
const showLoading = () => {
    loadingScreen.style.display = 'block';
};

// 로딩 화면 숨김 함수
const hideLoading = () => {
    loadingScreen.style.display = 'none';
};

/// 공고 목록 로드 함수
const loadNotices = (page = 1, order = 'recent', status = statusInput.value) => {
    showLoading(); // 로딩 화면 표시
    noticeService.getNoticeList(page, order, status, (data) => {
        showNoticeList(data, status);
    });
};

// 버튼 클릭 시 상태 변경 및 공고 목록 로드
ongoingBtn.addEventListener("click", () => {
    statusInput.value = 'ongoing'; // 상태를 진행 중으로 설정
    loadNotices();
});

closedBtn.addEventListener("click", () => {
    statusInput.value = 'closed'; // 상태를 마감으로 설정
    loadNotices();
});

// 페이지 전환 함수
function goToPage(page) {
    const order = sortingSelect.value; // 드롭다운에서 선택된 정렬 기준을 가져옵니다.
    const status = statusInput.value; // 현재 상태 값을 가져옵니다.
    loadNotices(page, order, status); // 상태를 유지하면서 공고 목록 로드
}

// 드롭다운 변경 시 공고 목록 로드
sortingSelect.addEventListener("change", () => {
    loadNotices(1, sortingSelect.value); // 기본 정렬 기준으로 목록 로드
});

// 페이지 로드 시 공고 목록 가져오기
document.addEventListener('DOMContentLoaded', () => {
    loadNotices(); // 기본 정렬 기준과 상태로 목록 로드
});

// 날짜 형식을 'YYYY-MM-DD'로 변환하는 함수
const formatDate = (dateString) => {
    if (!dateString) return '날짜 정보 없음'; // 날짜 정보가 없을 때의 기본값 설정
    const date = new Date(dateString);
    return isNaN(date) ? '유효하지 않은 날짜' : date.toISOString().split('T')[0]; // 유효한 날짜가 아니면 기본 메시지 반환
};

// 시간 형식을 'HH:MM'로 변환하는 함수
const formatTime = (timeString) => {
    if (!timeString) return '시간 정보 없음'; // 시간 정보가 없을 때의 기본값 설정
    const time = new Date(`1970-01-01T${timeString}Z`);
    return isNaN(time) ? '유효하지 않은 시간' : time.toISOString().substring(11, 16); // 유효한 시간이 아니면 기본 메시지 반환
};

function timeForToday(datetime) {
    const today = new Date();
    const date = new Date(datetime);

    let gap = Math.floor((today.getTime() - date.getTime()) / 1000 / 60);

    if (gap < 1) {
        return "방금 전";
    }

    if (gap < 60) {
        return `${gap}분 전`;
    }

    gap = Math.floor(gap / 60);

    if (gap < 24) {
        return `${gap}시간 전`;
    }

    gap = Math.floor(gap / 24);

    if (gap < 31) {
        return `${gap}일 전`;
    }

    gap = Math.floor(gap / 31);

    if (gap < 12) {
        return `${gap}개월 전`;
    }

    gap = Math.floor(gap / 12);

    return `${gap}년 전`;
}

function calculateDaysLeft(endDate) {
    const today = new Date();
    const end = new Date(endDate);

    // 마감일까지의 차이를 밀리초로 계산
    const difference = end - today;

    // 차이를 일수로 계산
    return Math.ceil(difference / (1000 * 60 * 60 * 24));
}

// 공고 목록 가져오기 및 렌더링
// const loadNotices = () => {
//     noticeService.getNoticeList((notices) => {
//         showNoticeList(notices);
//     });
// };

// // 페이지 로드 시 공고 목록 가져오기
// document.addEventListener('DOMContentLoaded', loadNotices);
