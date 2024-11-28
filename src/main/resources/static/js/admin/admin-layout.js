// 회원 관리
// 모든 목록 컨테이너를 가져옴
const MemberListLayout = document.querySelector(".UserTable_container"); // 회원 목록 표시
const MemberListPaging = document.querySelector(".pagination-list.member"); // 페이지네이션 요소
const CorporationListLayout = document.querySelector(".CorporationTable_container"); // 기업 회원 목록 표시
const CorporationPaging = document.querySelector(".pagination-list.corporation"); // 페이지네이션 요소
const memberKeywordInput = document.getElementById("memberSearchInput"); // 검색어 입력 필드
const corporationKeywordInput = document.getElementById("corporationSearchInput"); // 검색어 입력 필드
const sortOptions = document.querySelectorAll(".sort-filter-option"); // 정렬 옵션
let selectedSort = "가입일 순"; // 기본 정렬 설정

// 정렬 옵션 이벤트 설정
sortOptions.forEach((option) => {
    option.addEventListener("click", () => {
        // 선택한 옵션의 data-type 속성을 가져와서 selectedSort에 저장
        selectedSort = option.getAttribute("data-type");

        // 기존 선택 해제하고 새로운 선택 항목에 selected 클래스 추가
        sortOptions.forEach((opt) => opt.classList.remove("selected"));
        option.classList.add("selected");

        // 검색어와 정렬 기준을 사용하여 멤버 목록 새로고침
        fetchAndShowMembers(1);
    });
});

// 검색어 초기화
// URL 쿼리 문자열에서 "keyword"라는 이름의 매개변수 값을 가져옴
// 만약 URL에 "keyword" 매개변수가 없다면 기본값으로 빈 문자열("")을 할당함
// URLSearchParams() : 객체 인스턴스를 반환
// window.location.search : 현재 페이지의 쿼리 스트링에 접근하여 현재 페이지 URL의 쿼리 스트링 부분을 가져온다.
memberKeywordInput.value = new URLSearchParams(window.location.search).get("keyword") || "";

// 검색어 입력 시 검색 실행
memberKeywordInput.addEventListener("input", () => {
    fetchAndShowMembers(1);
});

// 페이지 이동 - fetchAndShowMembers 호출
function goToPage(page) {
    fetchAndShowMembers(page);
}

document.addEventListener('DOMContentLoaded', () => {
    goToPage(1);
});

// 일반 회원 목록을 서버에서 가져오고 화면에 표시
const fetchAndShowMembers = async (page) => {
    const keyword = memberKeywordInput.value;
    const sortType = selectedSort;

    try {
        // 데이터를 서버에서 가져오는 요청
        const response = await fetch(`/admin/position/members/${page}?keyword=${keyword}&types=${sortType}`);
        const data = await response.json();

        // 페이지 데이터와 멤버 데이터를 표시하는 함수 호출
        data.pagination.currentPage = page;
        showMemberList(data);
    } catch (error) {
        console.error(`페이지 ${page} 로딩 중 오류 발생:`, error);
    }
};

// 멤버 목록과 페이지네이션을 표시하는 함수
const showMemberList = ( { members, pagination } ) => {
    let text = `
        <div class="UserTable_row UserTable_header">
            <div class="UserTable_cell"><input type="checkbox" class="selectAllCheckbox"/></div>
            <div class="UserTable_cell">이름</div>
            <div class="UserTable_cell">가입일</div>
            <div class="UserTable_cell">이메일</div>
            <div class="UserTable_cell">주소</div>
            <div class="UserTable_cell">전화번호</div>
            <div class="UserTable_cell">상태</div>
            <div class="UserTable_cell">Action</div>
        </div>
    `;

    members.forEach((member) => {
        text += `
            <div class="UserTable_row">
                <div class="UserTable_cell"><input type="checkbox" class="userCheckbox"/></div>
                <div class="UserTable_cell">${member.memberName || ''}</div>
                <div class="UserTable_cell">${member.createdDate || ''}</div>
                <div class="UserTable_cell">${member.memberEmail || ''}</div>
                <div class="UserTable_cell">${member.memberAddress || ''}</div>
                <div class="UserTable_cell">${member.memberPhone || ''}</div>
                <div class="UserTable_cell">${member.memberStatus || ''}</div>
                <div class="UserTable_cell">
                    <button class="editBtn">수정</button>
                </div>
            </div>    
        `;
    });

    MemberListLayout.innerHTML = text;

    // 동적으로 totalPages 계산
    const memberTotalPages = Math.ceil(pagination.total / pagination.rowCount);
    pagination.totalPages = memberTotalPages;

    // 페이지 버튼 생성
    let pagingText = '';

    // 처음 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-first ${pagination.currentPage === 1 ? 'disabled' : ''}">
            <a href="#" class="pagination-first-link" onclick="goToPage(1)" rel="nofollow">
                <span class="pagination-first-icon" aria-hidden="true">«</span>
            </a>
        </li>
    `;

    // 이전 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-prev ${pagination.currentPage === 1 ? 'disabled' : ''}">
            <a href="#" class="pagination-prev-link" 
               onclick="${pagination.currentPage === 1 ? 'return false;' : `goToPage(${pagination.currentPage - 1})`}" 
               rel="prev nofollow">
                <span class="pagination-prev-icon" aria-hidden="true">‹</span>
            </a>
        </li>
    `;

    // 페이지 번호 버튼
    for (let i = pagination.startPage; i <= pagination.endPage; i++) {
        pagingText += `
            <li class="pagination-page ${i === pagination.currentPage ? 'active' : ''}">
                <a href="#" class="pagination-page-link" onclick="goToPage(${i})">${i}</a>
            </li>
        `;
        }

    // 다음 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-next ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}">
            <a href="#" class="pagination-next-link" 
               onclick="${pagination.currentPage === pagination.totalPages ? 'return false;' : `goToPage(${pagination.currentPage + 1})`}" 
               rel="next nofollow">
                <span class="pagination-next-icon" aria-hidden="true">›</span>
            </a>
        </li>
    `;

    // 마지막 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-last ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}">
            <a href="#" class="pagination-last-link" 
               onclick="${pagination.currentPage === pagination.totalPages ? 'return false;' : `goToPage(${pagination.realEnd})`}" 
               rel="nofollow">
                <span class="pagination-last-icon" aria-hidden="true">»</span>
            </a>
        </li>
    `;

    // 페이지네이션을 동적으로 추가
    MemberListPaging.innerHTML = pagingText;

};

corporationKeywordInput.value = new URLSearchParams(window.location.search).get("keyword") || "";

// 검색어 입력 시 검색 실행
corporationKeywordInput.addEventListener("input", () => {
    fetchAndShowCorporations(1);
});

// 페이지 이동 - fetchAndShowMembers 호출
function goToCorPage(page) {
    fetchAndShowCorporations(page);
}

document.addEventListener('DOMContentLoaded', () => {
    goToCorPage(1);
});

// 기업 회원 목록을 서버에서 가져오고 화면에 표시
const fetchAndShowCorporations = async (page) => {
    const keyword = corporationKeywordInput.value;
    try {
        // 데이터를 서버에서 가져오는 요청
        const response = await fetch(`/admin/position/corporation-members/${page}?keyword=${keyword}`);
        const data = await response.json();

        // 페이지 데이터와 멤버 데이터를 표시하는 함수 호출
        data.pagination.currentPage = page;
        showCorporationList(data);
    } catch (error) {
        console.error(`페이지 ${page} 로딩 중 오류 발생:`, error);
    }
};

// 기업 회원 목록과 페이지 처리를 표시
const showCorporationList = ( { corporations, pagination } ) => {
    let text = `
        <div class="CorporationTable_row CorporationTable_header">
            <div class="CorporationTable_cell"><input type="checkbox" class="selectAllCheckbox"/></div>
            <div class="CorporationTable_cell">기업명</div>
            <div class="CorporationTable_cell">가입일</div>
            <div class="CorporationTable_cell">이메일</div>
            <div class="CorporationTable_cell">주소</div>
            <div class="CorporationTable_cell">대표번호</div>
            <div class="CorporationTable_cell">사업자번호</div>
            <div class="CorporationTable_cell">Action</div>
        </div>
    `;

    corporations.forEach((corporation) => {
        text += `
            <div class="CorporationTable_row">
                <div class="CorporationTable_cell"><input type="checkbox" class="CorporationCheckbox"/></div>
                <div class="CorporationTable_cell">${corporation.corporationName || ''}</div>
                <div class="CorporationTable_cell">${corporation.createdDate || ''}</div>
                <div class="CorporationTable_cell">${corporation.corporationEmail || ''}</div>
                <div class="CorporationTable_cell">${corporation.corporationAddress || ''}</div>
                <div class="CorporationTable_cell">${corporation.corporationGen || ''}</div>
                <div class="CorporationTable_cell">${corporation.corporationCode || ''}</div>
                <div class="CorporationTable_cell"><button class="editBtn">수정</button></div>
            </div>    
        `;
    });

    CorporationListLayout.innerHTML = text;

    // 동적으로 totalPages 계산
    const CorporationTotalPages = Math.ceil(pagination.total / pagination.rowCount);
    pagination.totalPages = CorporationTotalPages;

    // 페이지 버튼 생성
    let pagingText = '';

    // 처음 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-first ${pagination.currentPage === 1 ? 'disabled' : ''}">
            <a href="#" class="pagination-first-link" onclick="goToCorPage(1)" rel="nofollow">
                <span class="pagination-first-icon" aria-hidden="true">«</span>
            </a>
        </li>
    `;

    // 이전 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-prev ${pagination.currentPage === 1 ? 'disabled' : ''}">
            <a href="#" class="pagination-prev-link" 
               onclick="${pagination.currentPage === 1 ? 'return false;' : `goToCorPage(${pagination.currentPage - 1})`}" 
               rel="prev nofollow">
                <span class="pagination-prev-icon" aria-hidden="true">‹</span>
            </a>
        </li>
    `;

    // 페이지 번호 버튼
    for (let i = pagination.startPage; i <= pagination.endPage; i++) {
        pagingText += `
            <li class="pagination-page ${i === pagination.currentPage ? 'active' : ''}">
                <a href="#" class="pagination-page-link" onclick="goToCorPage(${i})">${i}</a>
            </li>
        `;
    }

    // 다음 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-next ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}">
            <a href="#" class="pagination-next-link"
               onclick="${pagination.currentPage === pagination.totalPages ? 'return false;' : `goToCorPage(${pagination.currentPage + 1})`}"
               rel="next nofollow">
                <span class="pagination-next-icon" aria-hidden="true">›</span>   
            </a>
        </li>
    `;

    // 마지막 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-last ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}">
            <a href="#" class="pagination-last-link" 
               onclick="${pagination.currentPage === pagination.totalPages ? 'return false;' : `goToCorPage(${pagination.realEnd})`}" 
               rel="nofollow">
                <span class="pagination-last-icon" aria-hidden="true">»</span>
            </a>
        </li>
    `;

    // 페이징을 동적으로 추가
    CorporationPaging.innerHTML = pagingText;
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 지원현황 관리
const ApplyListLayout = document.querySelector(".ApplyTable_container");
const InterviewListLayout = document.querySelector(".InterviewTable_container");
const PositionListLayout = document.querySelector(".PositionTable_container");
const ApplyListPaging = document.querySelector(".pagination-list.applyStatus");
const InterviewListPaging = document.querySelector(".pagination-list.interviewStatus");
const PositionListPaging = document.querySelector(".pagination-list.positionStatus");
const ApplyKeywordInput = document.getElementById("applySearchInput");
const InterviewKeywordInput = document.getElementById("interviewSearchInput");
const PositionKeywordInput = document.getElementById("positionSearchInput");
const ApplyStatusSortOptions = document.querySelectorAll(".sort-filter-option.applySort");
const InterviewSortOptions = document.querySelectorAll(".sort-filter-option.interviewSort");
const PositionStatusSortOptions = document.querySelectorAll(".sort-filter-option.positionSort");
let applySelectedSort = "신청일순" // 기본 정렬 설정

// 검색어 초기화
ApplyKeywordInput.value = new URLSearchParams(window.location.search).get("keyword") || "";

// 정렬 옵션 이벤트 설정
ApplyStatusSortOptions.forEach((option) => {
    option.addEventListener("click", () => {
        // 선택한 옵션의 data-type 속성을 가져와서 applySelectedSort에 저장
        applySelectedSort = option.getAttribute("data-type");

        // 기전 선택 해제하고 새로운 선택 항목에 selected 클래스 추가
        ApplyStatusSortOptions.forEach((opt) => opt.classList.remove("selected"));
        option.classList.add("selected");

        // 검색어와 정렬 기준을 사용하여 지원 목록 새로고침
        fetchAndShowApply(1);
    });
});

// 검색어 입력 시 검색 실행
ApplyKeywordInput.addEventListener("input", () => {
    fetchAndShowApply(1);
})

// 페이지 이동 - fetchAndShowApply 호출
function goToApplyPage(page) {
    fetchAndShowApply(page);
}

document.addEventListener('DOMContentLoaded', () => {
    goToApplyPage(1);
});

// 지원 목록을 서버에서 가져오고 화면에 표시
const fetchAndShowApply = async (page) => {
    const keyword = ApplyKeywordInput.value;
    const sortType = applySelectedSort;

    try {
        // 데이터를 서버에서 가져오는 요청
        const response = await fetch(`/admin/position/apply/${page}?keyword=${keyword}&types=${sortType}`);
        const data = await response.json();

        // 페이지 데이터와 지원 목록 데이터를 표시하는 함수 호출
        data.pagination.currentPage = page;
        showApplyList(data);
    } catch (error) {
        console.error(`페이지 ${page} 로딩 중 오류 발생:`, error);
    }
};

// 지원 목록과 페이지네이션을 표시하는 함수
const showApplyList = ({ applies, pagination }) => {
    let text = `
        <div class="ApplyTable_row ApplyTable_header">
            <div class="ApplyTable_cell"><input type="checkbox" id="selectAll"></div>
            <div class="ApplyTable_cell">기업명</div>
            <div class="ApplyTable_cell">신청일</div>
            <div class="ApplyTable_cell">공고 제목</div>
            <div class="ApplyTable_cell">신청자</div>
            <div class="ApplyTable_cell">전화번호</div>
            <div class="ApplyTable_cell">지원 분야</div>
            <div class="ApplyTable_cell">상태</div>
            <div class="ApplyTable_cell">Action</div>
        </div>
    `;

    applies.forEach((apply) => {
        text += `
        <div class="ApplyTable_row">
            <div class="ApplyTable_cell"><input type="checkbox" id="selectAll"></div>
            <div class="ApplyTable_cell">${apply.corporationName}</div>
            <div class="ApplyTable_cell">${apply.createdDate}</div>
            <div class="ApplyTable_cell">${apply.noticeTitle}</div>
            <div class="ApplyTable_cell">${apply.memberName}</div>
            <div class="ApplyTable_cell">${apply.memberPhone}</div>
            <div class="ApplyTable_cell">${apply.applyType}</div>
            <div class="ApplyTable_cell">${apply.applyStatus}</div>
            <div class="ApplyTable_cell"><button class="editBtn">환불하기</button></div>
        </div>
        `;
    });

    ApplyListLayout.innerHTML = text;

    let pagingText = '';

    // 동적으로 totalPages 계산
    const applyTotalPages = Math.ceil(pagination.total / pagination.rowCount);
    pagination.totalPages = applyTotalPages;

    // 처음 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-first ${pagination.currentPage === 1 ? 'disabled' : ''}">
            <a href="#" class="pagination-first-link" onclick="goToApplyPage(1)" rel="nofollow">
                <span class="pagination-first-icon" aria-hidden="true">«</span>
            </a>
        </li>
    `;

    // 이전 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-prev ${pagination.currentPage === 1 ? 'disabled' : ''}">
            <a href="#" class="pagination-prev-link" 
               onclick="${pagination.currentPage === 1 ? 'return false;' : `goToApplyPage(${pagination.currentPage - 1})`}" 
               rel="prev nofollow">
                <span class="pagination-prev-icon" aria-hidden="true">‹</span>
            </a>
        </li>
    `;

    // 페이지 번호 버튼
    for (let i = pagination.startPage; i <= pagination.endPage; i++) {
        pagingText += `
            <li class="pagination-page ${i === pagination.currentPage ? 'active' : ''}">
                <a href="#" class="pagination-page-link" onclick="goToApplyPage(${i})">${i}</a>
            </li>
        `;
    }

    // 다음 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-next ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}">
            <a href="#" class="pagination-next-link" 
               onclick="${pagination.currentPage === pagination.totalPages ? 'return false;' : `goToApplyPage(${pagination.currentPage + 1})`}" 
               rel="next nofollow">
                <span class="pagination-next-icon" aria-hidden="true">›</span>
            </a>
        </li>
    `;

    // 마지막 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-last ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}">
            <a href="#" class="pagination-last-link" 
               onclick="${pagination.currentPage === pagination.totalPages ? 'return false;' : `goToApplyPage(${pagination.realEnd})`}" 
               rel="nofollow">
                <span class="pagination-last-icon" aria-hidden="true">»</span>
            </a>
        </li>
    `;

    // 페이지네이션을 동적으로 추가
    ApplyListPaging.innerHTML = pagingText;
};

// 면접 현황 기본 정렬 설정
let interviewSelectedSort = "지원 합격일 순";

// 정렬 옵션 이벤트 설정
InterviewSortOptions.forEach((option) => {
    option.addEventListener("click", () => {
        // 선택한 옵션의 data-type 속성을 가져와서 interviewSelectedSort에 저장
        interviewSelectedSort = option.getAttribute("data-type");

        // 기존 선택 해제하고 새로운 선택 항목에 selected 클래스 추가
        InterviewSortOptions.forEach((opt) => opt.classList.remove("selected"));
        option.classList.add("selected");

        // 검색어와 정렬 기준을 사용하여 면접 현황 목록 새로고침
        fetchAndShowInterview(1);
    })
})

// 검색어 초기화
InterviewKeywordInput.value = new URLSearchParams(window.location.search).get("keyword") || "";

// 검색어 입력시 검색 실행
InterviewKeywordInput.addEventListener("input", () => {
    fetchAndShowInterview(1);
});

// 페이지 이동 - feychAndShowInterview 호출
function goToInterviewPage(page) {
    fetchAndShowInterview(page);
}

document.addEventListener('DOMContentLoaded', () => {
    goToInterviewPage(1);
})

// 면접 현황 목록을 서버에서 가져오고 화면에 표시
const fetchAndShowInterview = async (page) => {
    const keyword = InterviewKeywordInput.value;
    const sortType = interviewSelectedSort;

    try {
        // 데이터를 서버에서 가져오는 요청
        const response = await fetch(`/admin/position/interview/${page}?keyword=${keyword}&types=${sortType}`);
        const data = await response.json();

        // 페이지 데이터와 면접 현황 목록 데이터를 표시하는 함수 호출
        data.pagination.currentPage = page;
        showInterviewList(data);
    } catch (error) {
        console.error(`페이지 ${page} 로딩 중 오류 발생:`, error);
    }
};

// 면접 현황 목록과 페이지 처리를 표시
const showInterviewList = ({interviews, pagination}) => {
    let text = `
        <div class="InterviewTable_row InterviewTable_header">
            <div class="InterviewTable_cell"><input type="checkbox" id="selectAll"></div>
            <div class="InterviewTable_cell">기업명</div>
            <div class="InterviewTable_cell">지원 합격일</div>
            <div class="InterviewTable_cell">공고 제목</div>
            <div class="InterviewTable_cell">면접자</div>
            <div class="InterviewTable_cell">전화번호</div>
            <div class="InterviewTable_cell">지원 분야</div>
            <div class="InterviewTable_cell">상태</div>
            <div class="InterviewTable_cell">Action</div>
        </div>
    `;

    interviews.forEach((interview) => {
        text += `
            <div class="InterviewTable_row">
                <div class="InterviewTable_cell"><input type="checkbox" id="selectAll"></div>
                <div class="InterviewTable_cell">${interview.corporationName}</div>
                <div class="InterviewTable_cell">${interview.interviewDate}</div>
                <div class="InterviewTable_cell">${interview.noticeTitle}</div>
                <div class="InterviewTable_cell">${interview.memberName}</div>
                <div class="InterviewTable_cell">${interview.memberPhone}</div>
                <div class="InterviewTable_cell">${interview.noticeJobCategoryName}</div>
                <div class="InterviewTable_cell">${interview.interviewStatus}</div>
                <div class="InterviewTable_cell"><button class="editBtn">수정</button></div>
            </div>
        `;
    });

    InterviewListLayout.innerHTML = text;

    // 동적으로 totalPages 계산
    const interviewTotalPages = Math.ceil(pagination.total / pagination.rowCount);
    pagination.totalPages = interviewTotalPages;

    let pagingText = '';

    // 처음 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-first ${pagination.currentPage === 1 ? 'disabled' : ''}">
            <a href="#" class="pagination-first-link" onclick="goToInterviewPage(1)" rel="nofollow">
                <span class="pagination-first-icon" aria-hidden="true">«</span>
            </a>
        </li>
    `;

    // 이전 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-prev ${pagination.currentPage === 1 ? 'disabled' : ''}">
            <a href="#" class="pagination-prev-link" 
               onclick="${pagination.currentPage === 1 ? 'return false;' : `goToInterviewPage(${pagination.currentPage - 1})`}" 
               rel="prev nofollow">
                <span class="pagination-prev-icon" aria-hidden="true">‹</span>
            </a>
        </li>
    `;

    // 페이지 번호 버튼
    for (let i = pagination.startPage; i <= pagination.endPage; i++) {
        pagingText += `
            <li class="pagination-page ${i === pagination.currentPage ? 'active' : ''}">
                <a href="#" class="pagination-page-link" onclick="goToInterviewPage(${i})">${i}</a>
            </li>
        `;
    }

    // 다음 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-next ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}">
            <a href="#" class="pagination-next-link" 
               onclick="${pagination.currentPage === pagination.totalPages ? 'return false;' : `goToInterviewPage(${pagination.currentPage + 1})`}" 
               rel="next nofollow">
                <span class="pagination-next-icon" aria-hidden="true">›</span>
            </a>
        </li>
    `;

    // 마지막 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-last ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}">
            <a href="#" class="pagination-last-link" 
               onclick="${pagination.currentPage === pagination.totalPages ? 'return false;' : `goToInterviewPage(${pagination.realEnd})`}" 
               rel="nofollow">
                <span class="pagination-last-icon" aria-hidden="true">»</span>
            </a>
        </li>
    `;

    // 페이지네이션을 동적으로 추가
    InterviewListPaging.innerHTML = pagingText;

};

// 포지션 현황 기본 정렬 설정
let positionSelectedSort = "포지션 근무일순";

// 포지션 현황 정렬 옵션 이벤트 설정
PositionStatusSortOptions.forEach((option) => {
    option.addEventListener("click", () => {
        // 선택한 옵션의 data-type 속성을 가져와서 positionSelectedSort에 저장
        positionSelectedSort = option.getAttribute("data-type");

        // 기존 선택 해제하고 새로운 선택 항목에 selected 클래스 추가
        PositionStatusSortOptions.forEach((opt) => opt.classList.remove("selected"));
        option.classList.add("selected");

        // 검색어와 정렬 기준을 사용하여 포지션 현황 목록 새로고침
        fetchAndShowPosition(1);
    });
});

// 검색어 초기화
PositionKeywordInput.value = new URLSearchParams(window.location.search).get("keyword") || "";

// 검색어 입력시 검색 실행
PositionKeywordInput.addEventListener("input", () => {
    fetchAndShowPosition(1);
});

// 페이지 이동 - fetchAndShowPosition 호출
function goToPositionPage(page) {
    fetchAndShowPosition(page);
}

document.addEventListener('DOMContentLoaded', () => {
    goToPositionPage(1);
});

// 포지션 현황 목록을 서버에서 가져오고 화면에 표시
const fetchAndShowPosition = async (page) => {
    const keyword = PositionKeywordInput.value;
    const sortType = positionSelectedSort;

    try {
        // 데이터를 서버에서 가져오는 요청
        const response = await fetch(`/admin/position/position/${page}?keyword=${keyword}&types=${sortType}`);
        const data = await response.json();

        // 페이지 데이터와 일반 회원 데이터를 표시하는 함수 호출
        data.pagination.currentPage = page;
        showPositionList(data);
    } catch (error) {
        console.error(`페이지 ${page} 로딩 중 오류 발생:`, error);
    }
};

// 포지션 현황 목록과 페이지네이션을 표시
const showPositionList = ({positions, pagination}) => {
    let text = `
        <div class="PositionTable_row PositionTable_header">
            <div class="PositionTable_cell"><input type="checkbox" id="selectAll"></div>
            <div class="PositionTable_cell">기업명</div>
            <div class="PositionTable_cell">포지션 근무일</div>
            <div class="PositionTable_cell">공고 제목</div>
            <div class="PositionTable_cell">면접자</div>
            <div class="PositionTable_cell">전화번호</div>
            <div class="PositionTable_cell">지원 분야</div>
            <div class="PositionTable_cell">상태</div>
            <div class="PositionTable_cell">Action</div>
        </div>
    `;

    positions.forEach((position) => {
        text += `
            <div class="PositionTable_row">
                <div class="PositionTable_cell"><input type="checkbox" id="selectAll"></div>
                <div class="PositionTable_cell">${position.corporationName}</div>
                <div class="PositionTable_cell">${position.noticeWorkStartDate}</div>
                <div class="PositionTable_cell">${position.noticeTitle}</div>
                <div class="PositionTable_cell">${position.memberName}</div>
                <div class="PositionTable_cell">${position.memberPhone}</div>
                <div class="PositionTable_cell">${position.noticeJobCategoryName}</div>
                <div class="PositionTable_cell">${position.positionStatus}</div>
                <div class="PositionTable_cell"><button class="editBtn">수정</button></div>
            </div>
        `;
    });

    PositionListLayout.innerHTML = text;

    // 동적으로 totalPages 계산
    const positionTotalPages = Math.ceil(pagination.total / pagination.rowCount);
    pagination.totalPages = positionTotalPages;

    // 페이지 버튼 생성
    let pagingText = '';

    // 처음 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-first ${pagination.currentPage === 1 ? 'disabled' : ''}">
            <a href="#" class="pagination-first-link" onclick="goToPositionPage(1)" rel="nofollow">
                <span class="pagination-first-icon" aria-hidden="true">«</span>
            </a>
        </li>
    `;

    // 이전 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-prev ${pagination.currentPage === 1 ? 'disabled' : ''}">
            <a href="#" class="pagination-prev-link" 
               onclick="${pagination.currentPage === 1 ? 'return false;' : `goToPositionPage(${pagination.currentPage - 1})`}" 
               rel="prev nofollow">
                <span class="pagination-prev-icon" aria-hidden="true">‹</span>
            </a>
        </li>
    `;

    // 페이지 번호 버튼
    for (let i = pagination.startPage; i <= pagination.endPage; i++) {
        pagingText += `
            <li class="pagination-page ${i === pagination.currentPage ? 'active' : ''}">
                <a href="#" class="pagination-page-link" onclick="goToPositionPage(${i})">${i}</a>
            </li>
        `;
    }

    // 다음 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-next ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}">
            <a href="#" class="pagination-next-link" 
               onclick="${pagination.currentPage === pagination.totalPages ? 'return false;' : `goToPositionPage(${pagination.currentPage + 1})`}" 
               rel="next nofollow">
                <span class="pagination-next-icon" aria-hidden="true">›</span>
            </a>
        </li>
    `;

    // 마지막 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-last ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}">
            <a href="#" class="pagination-last-link" 
               onclick="${pagination.currentPage === pagination.totalPages ? 'return false;' : `goToPositionPage(${pagination.realEnd})`}" 
               rel="nofollow">
                <span class="pagination-last-icon" aria-hidden="true">»</span>
            </a>
        </li>
    `;

    // 페이지네이션을 동적으로 추가
    PositionListPaging.innerHTML = pagingText;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 결제 관리
const PaymentListLayout = document.querySelector(".paymentTable_container"); // 결제 목록 표시
const PaymentListPaging = document.querySelector(".pagination-list.payment"); // 페이지네이션 요소
const PaymentKeywordInput = document.getElementById("paymentSearchInput"); // 검색어 입력 필드
const PaymentSortOptions = document.querySelectorAll(".sort-filter-option.paymentSort"); // 정렬 옵션
let paymentSelectedSort = "최신순"; // 기본 정렬 설정

// 정렬 옵션 이벤트 설정
PaymentSortOptions.forEach((option) => {
    option.addEventListener("click", () => {
        // 선택한 옵션의 data-type 속성을 가져와서 selectedSort에 저장
        paymentSelectedSort = option.getAttribute("data-type");

        // 기존 선택 해제하고 새로운 선택 항목에 selected 클래스 추가
        PaymentSortOptions.forEach((opt) => opt.classList.remove("selected"));
        option.classList.add("selected");

        // 검색어와 정렬 기준을 사용하여 결제 목록 새로고침
        fetchAndShowPayment(1);
    });
});

// 검색어 초기화
PaymentKeywordInput.value = new URLSearchParams(window.location.search).get("keyword") || "";

// 검색어 입력 시 검색 실행
PaymentKeywordInput.addEventListener("input", () => {
    fetchAndShowPayment(1);
});

// 페이지 이동 - fetchAndShowPayment 호출
function goToPaymentPage(page) {
    fetchAndShowPayment(page);
}

document.addEventListener('DOMContentLoaded', () => {
    goToPaymentPage(1);
});

// 결제 목록을 서버에서 가져오고 화면에 표시
const fetchAndShowPayment = async (page) => {
    const keyword = PaymentKeywordInput.value;
    const sortType = paymentSelectedSort;

    try {
        // 데이터를 서버에서 가져오는 요청
        const response = await fetch(`/admin/position/payment/${page}?keyword=$types=${sortType}`);
        const data = await response.json();

        // 페이지 데이터와 결제 데이터를 표시하는 함수 호출
        data.pagination.currentPage = page;
        showPaymentList(data);
    } catch (error) {
        console.error(`페이지 ${page} 로딩 중 오류 발생:`, error);
    }
};

// 결제 목록과 페이지네이션을 표시하는 함수
const showPaymentList = ( { payments, pagination }) => {
    let text = `
        <div class="paymentTable_row paymentTable_header">
            <div class="paymentTable_cell"><input type="checkbox" id="selectAll"></div>
            <div class="paymentTable_cell">이름</div>
            <div class="paymentTable_cell">결제일</div>
            <div class="paymentTable_cell">결제한 공고 제목</div>
            <div class="paymentTable_cell">결제 금액</div>
            <div class="paymentTable_cell">전화번호</div>
            <div class="paymentTable_cell">결제 수단</div>
            <div class="paymentTable_cell">상태</div>
            <div class="paymentTable_cell">Action</div>
        </div>
    `;

    payments.forEach((payment) => {
        text += `
            <div class="paymentTable_cell"><input type="checkbox" id="selectAll"></div>
            <div class="paymentTable_cell">${payment.memberName || ''}</div>
            <div class="paymentTable_cell">${payment.createdDate || ''}</div>
            <div class="paymentTable_cell">${payment.noticeTitle || ''}</div>
            <div class="paymentTable_cell"></div>
            <div class="paymentTable_cell"></div>
            <div class="paymentTable_cell"></div>
            <div class="paymentTable_cell"></div>
            <div class="paymentTable_cell"></div>
        `
    })
}






















