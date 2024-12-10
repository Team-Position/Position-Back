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

// 검색어 초기화
// URL 쿼리 문자열에서 "keyword"라는 이름의 매개변수 값을 가져옴
// 만약 URL에 "keyword" 매개변수가 없다면 기본값으로 빈 문자열("")을 할당함
// URLSearchParams() : 객체 인스턴스를 반환
// window.location.search : 현재 페이지의 쿼리 스트링에 접근하여 현재 페이지 URL의 쿼리 스트링 부분을 가져온다.
memberKeywordInput.value = new URLSearchParams(window.location.search).get("keyword") || "";

sortOptions.forEach((option) => {
    option.addEventListener("click", () => {
        // 현재 클릭된 옵션의 data-type 값을 가져와 selectedSort에 저장
        selectedSort = option.getAttribute("data-type") || "recent";

        // 기존 선택 해제: 모든 옵션에서 `selected` 클래스를 제거
        sortOptions.forEach((option) => option.classList.remove("selected"));

        // 새로운 선택 항목에 `selected` 클래스 추가
        option.classList.add("selected");

        console.log(`Selected Sort: ${selectedSort}`); // 디버깅용

        // 정렬에 맞춰 멤버 목록 새로고침
        fetchAndShowMembers(1);
    });
});

// 검색어 입력 시 검색 실행
memberKeywordInput.addEventListener("input", () => {
    fetchAndShowMembers(1);
});

const goToPage = (page) => {
    const keyword = memberKeywordInput.value.trim();
    const sortType = selectedSort;

    // 데이터 fetch 및 UI 업데이트
    memberService.fetchMembers(page, keyword, sortType, (data) => {
        // 멤버 목록 표시
        showMemberList(data);

        // 페이지네이션 동기화
        data.pagination.currentPage = page; // 현재 페이지 동기화
        showPagination(data.pagination);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    // selectedSort = 'recent' // "가입일 순" 초기화
    goToPage(1);
});

// 일반 회원 목록을 서버에서 가져오고 화면에 표시
const fetchAndShowMembers = async (page) => {
    const keyword = memberKeywordInput.value.trim();
    const sortType = selectedSort; // 선택된 정렬 값

    console.log(`Fetching: /admin/position/members/${page}?keyword=${keyword}&types=${sortType}`); // 디버깅용
    try {
        const response = await fetch(`/admin/position/members/${page}?keyword=${keyword}&types=${sortType}`);
        const data = await response.json();

        // 멤버 및 페이지네이션 동기화
        showMemberList(data);
        data.pagination.currentPage = page; // 현재 페이지 설정
        showPagination(data.pagination);
    } catch (error) {
        console.error(`페이지 ${page} 로딩 중 오류 발생:`, error);
    }
};

// 페이지네이션을 렌더링하는 함수
const showPagination = (pagination) => {
    let paginationContent = "";

    // 맨 끝 페이지가 정확히 계산되었는지 확인
    const totalPages = Math.ceil(pagination.total / pagination.rowCount);

    // 처음 페이지 이동 버튼
    paginationContent += `
        <li class="${pagination.currentPage === 1 ? "disabled" : ""}">
            <a href="#" onclick="${pagination.currentPage > 1 ? `goToPage(1)` : "return false;"}">«</a>
        </li>
    `;

    // 이전 페이지 이동 버튼
    paginationContent += `
        <li class="${pagination.currentPage === 1 ? "disabled" : ""}">
            <a href="#" onclick="${pagination.currentPage > 1 ? `goToPage(${pagination.currentPage - 1})` : "return false;"}">‹</a>
        </li>
    `;

    // 번호 버튼 생성
    for (let i = pagination.startPage; i <= pagination.endPage; i++) {
        paginationContent += `
            <li class="${pagination.currentPage === i ? "active" : ""}">
                <a href="#" onclick="goToPage(${i})">${i}</a>
            </li>
        `;
    }

    // 다음 페이지 이동 버튼
    paginationContent += `
        <li class="${pagination.currentPage === totalPages ? "disabled" : ""}">
            <a href="#" onclick="${pagination.currentPage < totalPages ? `goToPage(${pagination.currentPage + 1})` : "return false;"}">›</a>
        </li>
    `;

    // 마지막 페이지 이동 버튼
    paginationContent += `
        <li class="${pagination.currentPage === totalPages ? "disabled" : ""}">
            <a href="#" onclick="${pagination.currentPage < totalPages ? `goToPage(${totalPages})` : "return false;"}">»</a>
        </li>
    `;

    // 페이지네이션 UI 업데이트
    MemberListPaging.innerHTML = paginationContent;
};



// 멤버 목록과 페이지네이션을 표시하는 함수
const showMemberList = ({ members, pagination }) => {
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

    // 멤버 목록 UI 업데이트
    MemberListLayout.innerHTML = text;

    // 페이지네이션 UI 업데이트 호출
    showPagination(pagination);
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

// 정렬 옵션 이벤트 설정
ApplyStatusSortOptions.forEach((option) => {
    option.addEventListener("click", () => {
        // 선택한 옵션의 data-type 속성을 가져와서 applySelectedSort에 저장
        applySelectedSort = option.getAttribute("data-type");

        // 기전 선택 해제하고 새로운 선택 항목에 selected 클래스 추가
        ApplyStatusSortOptions.forEach((option) => option.classList.remove("selected"));
        option.classList.add("selected");

        // 검색어와 정렬 기준을 사용하여 지원 목록 새로고침
        fetchAndShowApply(1);
    });
});

// 검색어 초기화
ApplyKeywordInput.value = new URLSearchParams(window.location.search).get("keyword") || "";

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
        InterviewSortOptions.forEach((option) => option.classList.remove("selected"));
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
                <div class="InterviewTable_cell">${interview.interviewApplyPassDate}</div>
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
        PaymentSortOptions.forEach((option) => option.classList.remove("selected"));
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
        const response = await fetch(`/admin/position/payment/${page}?keyword=${keyword}&types=${sortType}`);
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
            <div class="paymentTable_row">
                <div class="paymentTable_cell"><input type="checkbox" id="selectAll"></div>
                <div class="paymentTable_cell">${payment.memberName || ''}</div>
                <div class="paymentTable_cell">${payment.createdDate || ''}</div>
                <div class="paymentTable_cell">${payment.noticeTitle || ''}</div>
                <div class="paymentTable_cell">${payment.paymentAmount || ''}</div>
                <div class="paymentTable_cell">${payment.memberPhone}</div>
                <div class="paymentTable_cell">${payment.paymentMethod}</div>
                <div class="paymentTable_cell">${payment.paymentStatus}</div>
                <div class="paymentTable_cell">
                    <button class="editBtn">수정</button>
                </div>
            </div>    
        `;
    });

    PaymentListLayout.innerHTML = text;

    // 동적으로 totalPages 계산
    const paymentTotalPages = Math.ceil(pagination.total / pagination.rowCount);
    pagination.totalPages = paymentTotalPages;

    // 페이지 버튼 생성
    let pagingText = '';

    // 처음 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-first ${pagination.currentPage === 1 ? 'disabled' : ''}">
            <a href="#" class="pagination-first-link" onclick="goToPaymentPage(1)" rel="nofollow">
                <span class="pagination-first-icon" aria-hidden="true">«</span>
            </a>
        </li>
    `;

    // 이전 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-prev ${pagination.currentPage === 1 ? 'disabled' : ''}">
            <a href="#" class="pagination-prev-link" 
               onclick="${pagination.currentPage === 1 ? 'return false;' : `goToPaymentPage(${pagination.currentPage - 1})`}" 
               rel="prev nofollow">
                <span class="pagination-prev-icon" aria-hidden="true">‹</span>
            </a>
        </li>
    `;

    // 페이지 번호 버튼
    for (let i = pagination.startPage; i <= pagination.endPage; i++) {
        pagingText += `
            <li class="pagination-page ${i === pagination.currentPage ? 'active' : ''}">
                <a href="#" class="pagination-page-link" onclick="goToPaymentPage(${i})">${i}</a>
            </li>
        `;
    }

    // 다음 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-next ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}">
            <a href="#" class="pagination-next-link" 
               onclick="${pagination.currentPage === pagination.totalPages ? 'return false;' : `goToPaymentPage(${pagination.currentPage + 1})`}" 
               rel="next nofollow">
                <span class="pagination-next-icon" aria-hidden="true">›</span>
            </a>
        </li>
    `;

    // 마지막 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-last ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}">
            <a href="#" class="pagination-last-link" 
               onclick="${pagination.currentPage === pagination.totalPages ? 'return false;' : `goToPaymentPage(${pagination.realEnd})`}" 
               rel="nofollow">
                <span class="pagination-last-icon" aria-hidden="true">»</span>
            </a>
        </li>
    `;

    // 페이지네이션을 동적으로 추가
    PaymentListPaging.innerHTML = pagingText;
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 작성 관리
// 공고 작성 관리
const NoticeListLayout = document.querySelector(".noticeTable_container"); // 공고 작성 목록 표시
const NoticeListPaging = document.querySelector(".pagination-list.notice"); // 페이지네이션 요소
const NoticeKeywordInput = document.getElementById("noticeSearchInput"); // 검색어 입력 필드
const NoticeSortOptions = document.querySelectorAll(".sort-filter-option.noticeSort"); // 정렬 옵션
let noticeSelectSort = "포지션 근무일순" // 기본 정렬 설정

// 정렬 옵션 이벤트 설정
NoticeSortOptions.forEach((option) => {
    option.addEventListener("click", () => {
        // 선택한 옵션의 data-type 속성을 가져와서 noticeSelectSort에 저장
        noticeSelectSort = option.getAttribute("data-type");

        // 기존 선택 해제하고 새로운 선택 항목에 selected 클래스 추가
        NoticeSortOptions.forEach((option) => option.classList.remove("selected"));
        option.classList.add("selected");

        // 검색어와 정렬 기준을 사용하여 공고 목록 새로고침
        fetchAndShowNotice(1);
    });
});

// 검색어 초기화
NoticeKeywordInput.value = new URLSearchParams(window.location.search).get("keyword") || "";

// 검색어 입력 시 검색 실행
NoticeKeywordInput.addEventListener("input", () => {
    fetchAndShowNotice(1);
});

// 페이지 이동 - fetchAndShowNotice 호출
function goToNoticePage(page) {
    fetchAndShowNotice(page);
}

document.addEventListener('DOMContentLoaded', () => {
    goToNoticePage(1);
});

// 공고 목록을 서버에서 가져오고 화면에 표시
const fetchAndShowNotice = async (page) => {
    const keyword = NoticeKeywordInput.value
    const sortType = noticeSelectSort;

    try {
        // 데이터를 서버에서 가져오는 요청
        const response = await fetch(`/admin/position/notice/${page}?keyword=${keyword}&types=${sortType}`);
        const data = await response.json();

        // 페이지 데이터와 공고 목록 데이터를 표시하는 함수 호출
        data.pagination.currentPage = page;
        showNoticeList(data);
    } catch (error) {
        console.log(`페이지 ${page} 로딩 중 오류 발생:`, error);
    }
};

// 공고 목록과 페이지네이션을 표시하는 함수
const showNoticeList = ({ notices, pagination }) => {
    let text = `
        <div class="noticeTable_row noticeTable_header">
            <div class="noticeTable_cell"><input type="checkbox" id="selectAll"></div>
            <div class="noticeTable_cell">기업명</div>
            <div class="noticeTable_cell">포지션 근무일</div>
            <div class="noticeTable_cell">공고 제목</div>
            <div class="noticeTable_cell">이메일</div>
            <div class="noticeTable_cell">전화번호</div>
            <div class="noticeTable_cell">공고 마감</div>
            <div class="noticeTable_cell">상태</div>
            <div class="noticeTable_cell">Action</div>
        </div>
    `;

    notices.forEach((notice) => {
        text += `
            <div class="noticeTable_row">
                <div class="noticeTable_cell"><input type="checkbox" id="selectAll"></div>
                <div class="noticeTable_cell">${notice.corporationName}</div>
                <div class="noticeTable_cell">${notice.noticeWorkStartDate}</div>
                <div class="noticeTable_cell">${notice.noticeTitle}</div>
                <div class="noticeTable_cell">${notice.corporationEmail}</div>
                <div class="noticeTable_cell">${notice.corporationGen0}</div>
                <div class="noticeTable_cell">${notice.noticeEndDate}</div>
                <div class="noticeTable_cell">${notice.noticeStatus}</div>
                <div class="noticeTable_cell">
                    <button class="editBtn">수정</button>
                </div>
            </div>
        `;
    });

    NoticeListLayout.innerHTML = text;

    // 동적으로 totalPages 계산
    const noticeTotalPages = Math.ceil(pagination.total / pagination.rowCount);
    pagination.totalPages = noticeTotalPages;

    let pagingText = '';

    // 처음 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-first ${pagination.currentPage === 1 ? 'disabled' : ''}">
            <a href="#" class="pagination-first-link" onclick="goToNoticePage(1)" rel="nofollow">
                <span class="pagination-first-icon" aria-hidden="true">«</span>
            </a>
        </li>
    `;

    // 이전 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-prev ${pagination.currentPage === 1 ? 'disabled' : ''}">
            <a href="#" class="pagination-prev-link" 
               onclick="${pagination.currentPage === 1 ? 'return false;' : `goToNoticePage(${pagination.currentPage - 1})`}" 
               rel="prev nofollow">
                <span class="pagination-prev-icon" aria-hidden="true">‹</span>
            </a>
        </li>
    `;

    // 페이지 번호 버튼
    for (let i = pagination.startPage; i <= pagination.endPage; i++) {
        pagingText += `
            <li class="pagination-page ${i === pagination.currentPage ? 'active' : ''}">
                <a href="#" class="pagination-page-link" onclick="goToNoticePage(${i})">${i}</a>
            </li>
        `;
    }

    // 다음 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-next ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}">
            <a href="#" class="pagination-next-link" 
               onclick="${pagination.currentPage === pagination.totalPages ? 'return false;' : `goToNoticePage(${pagination.currentPage + 1})`}" 
               rel="next nofollow">
                <span class="pagination-next-icon" aria-hidden="true">›</span>
            </a>
        </li>
    `;

    // 마지막 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-last ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}">
            <a href="#" class="pagination-last-link" 
               onclick="${pagination.currentPage === pagination.totalPages ? 'return false;' : `goToNoticePage(${pagination.realEnd})`}" 
               rel="nofollow">
                <span class="pagination-last-icon" aria-hidden="true">»</span>
            </a>
        </li>
    `;

    // 페이지네이션을 동적으로 추가
    NoticeListPaging.innerHTML = pagingText;
};

// 게시글 작성 관리
const PostListLayout = document.querySelector(".postTable_container"); // 게시글 작성 목록 표시
const PostListPaging = document.querySelector(".pagination-list.post"); // 페이지네이션 요소
const PostKeywordInput = document.getElementById("postSearchInput"); // 검색어 입력 필드
const PostSortOptions = document.querySelectorAll(".sort-filter-option.postSort"); // 정렬 옵션
let postSelectSort = "최신순"; // 기본 정렬 설정

// 정렬 옵션 이벤트 설정
PostSortOptions.forEach((option) => {
    option.addEventListener("click", () => {
        // 선택한 옵션의 data-type 속성을 가져와서 postSelectSort에 저장
        postSelectSort = option.getAttribute("data-type");

        // 기존 선택 해제하고 새로운 선택 항목에 selected 클래스 추가
        PostSortOptions.forEach((option) => option.classList.remove("selected"));
        option.classList.add("selected");

        // 검색어와 정렬 기준을 사용하여 게시글 작성 목록 새로고침
        fetchAndShowPost(1);
    });
});

// 검색어 초기화
PostKeywordInput.value = new URLSearchParams(window.location.search).get("keyword") || "";

// 검색어 입력 시 검색 실행
PostKeywordInput.addEventListener("input", () => {
    fetchAndShowPost(1);
});

// 페이지 이동 - fetchAndShowPost 호출
function goToPostPage(page) {
    fetchAndShowPost(page);
}

document.addEventListener('DOMContentLoaded', () => {
    goToPostPage(1);
});

const fetchAndShowPost = async (page) => {
    const keyword = PostKeywordInput.value;
    const sortType = postSelectSort;

    try {
        // 데이터를 서버에서 가져오는 요청
        const response = await fetch(`/admin/position/post/${page}?keyword=${keyword}&types=${sortType}`);
        const data = await response.json();

        // 페이지 데이터와 게시글 데이터를 표시하는 함수 호출
        data.pagination.currentPage = page;
        showPostList(data);
    } catch (error) {
        console.error(`페이지 ${page} 로딩 중 오류 발생`, error);
    }
};

// 게시글 작성 목록과 페이지네이션을 표시하는 함수
const showPostList = ({ posts, pagination }) => {
    let text = `
        <div class="postTable_row postTable_header">
            <div class="postTable_cell"><input type="checkbox" id="selectAll"></div>
            <div class="postTable_cell">작성자</div>
            <div class="postTable_cell">작성일</div>
            <div class="postTable_cell">게시글 제목</div>
            <div class="postTable_cell">게시글 내용</div>
            <div class="postTable_cell">조회수</div>
            <div class="postTable_cell">Action</div>
        </div>       
    `;

    posts.forEach((post) => {
        text += `
        <div class="postTable_row">
            <div class="postTable_cell"><input type="checkbox" id="selectAll"></div>
            <div class="postTable_cell">${post.memberName || ''}</div>
            <div class="postTable_cell">${post.createdDate || ''}</div>
            <div class="postTable_cell">${post.postTitle}</div>
            <div class="postTable_cell">${post.postContent}</div>
            <div class="postTable_cell">${post.postReadCount}</div>
            <div class="postTable_cell">
                <button class="editBtn">수정</button>
            </div>
        </div>
        `;
    });

    PostListLayout.innerHTML = text;

    // 동적으로 totalPages 계산
    const postTotalPages = Math.ceil(pagination.total / pagination.rowCount);
    pagination.totalPages = postTotalPages;

    // 페이지 버튼 생성
    let pagingText = '';

    // 처음 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-first ${pagination.currentPage === 1 ? 'disabled' : ''}">
            <a href="#" class="pagination-first-link" onclick="goToPostPage(1)" rel="nofollow">
                <span class="pagination-first-icon" aria-hidden="true">«</span>
            </a>
        </li>
    `;

    // 이전 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-prev ${pagination.currentPage === 1 ? 'disabled' : ''}">
            <a href="#" class="pagination-prev-link" 
               onclick="${pagination.currentPage === 1 ? 'return false;' : `goToPostPage(${pagination.currentPage - 1})`}" 
               rel="prev nofollow">
                <span class="pagination-prev-icon" aria-hidden="true">‹</span>
            </a>
        </li>
    `;

    // 페이지 번호 버튼
    for (let i = pagination.startPage; i <= pagination.endPage; i++) {
        pagingText += `
            <li class="pagination-page ${i === pagination.currentPage ? 'active' : ''}">
                <a href="#" class="pagination-page-link" onclick="goToPostPage(${i})">${i}</a>
            </li>
        `;
    }

    // 다음 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-next ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}">
            <a href="#" class="pagination-next-link" 
               onclick="${pagination.currentPage === pagination.totalPages ? 'return false;' : `goToPostPage(${pagination.currentPage + 1})`}" 
               rel="next nofollow">
                <span class="pagination-next-icon" aria-hidden="true">›</span>
            </a>
        </li>
    `;

    // 마지막 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-last ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}">
            <a href="#" class="pagination-last-link" 
               onclick="${pagination.currentPage === pagination.totalPages ? 'return false;' : `goToPostPage(${pagination.realEnd})`}" 
               rel="nofollow">
                <span class="pagination-last-icon" aria-hidden="true">»</span>
            </a>
        </li>
    `;

    // 페이지네이션을 동적으로 추가
    PostListPaging.innerHTML = pagingText;
};

// 댓글 관리
const ReplyListLayout = document.querySelector(".replyTable_container"); // 댓글 목록 표시
const ReplyListPaging = document.querySelector(".pagination-list.reply"); // 페이지네이션 요소
const ReplyKeywordInput = document.getElementById("replySearchInput"); // 검색어 입력 필드

// 검색어 초기화
ReplyKeywordInput.value = new URLSearchParams(window.location.search).get("keyword") || "";

// 검색어 입력 시 검색 실행
ReplyKeywordInput.addEventListener("input", () => {
    fetchAndShowReply(1);
});

// 페이지 이동 - fetchAndShowReply 호출
function goToReplyPage(page) {
    fetchAndShowReply(page);
};

document.addEventListener('DOMContentLoaded', () => {
    goToReplyPage(1);
});

// 댓글 목록을 서버에서 가져오고 화면에 표시
const fetchAndShowReply = async (page) => {
    const keyword = ReplyKeywordInput.value;

    try {
        // 데이터를 서버에서 가져오는 요청
        const response = await fetch(`/admin/position/reply/${page}?keyword=${keyword}`);
        const data = await response.json();

        // 페이지 데이터와 댓글 데이터를 표시하는 함수 호출
        data.pagination.currentPage = page;
        showReplyList(data);
    } catch (error) {
        console.error(`페이지 ${page} 로딩 중 오류 발생`, error);
    }
};

// 댓글 목록과 페이지 처리를 표시
const showReplyList = ({ replies, pagination }) => {
    let text = `
        <div class="replyTable_row replyTable_header">
            <div class="replyTable_cell"><input type="checkbox" id="selectAll"></div>
            <div class="replyTable_cell">작성자</div>
            <div class="replyTable_cell">작성일</div>
            <div class="replyTable_cell">게시글 제목</div>
            <div class="replyTable_cell">댓글 내용</div>
            <div class="replyTable_cell">Action</div>
        </div>
    `;

    replies.forEach((reply) => {
        text += `
            <div class="replyTable_row">
                <div class="replyTable_cell"><input type="checkbox" id="selectAll"></div>
                <div class="replyTable_cell">${reply.memberName}</div>
                <div class="replyTable_cell">${reply.createdDate}</div>
                <div class="replyTable_cell">${reply.postTitle}</div>
                <div class="replyTable_cell">${reply.replyContent}</div>
                <div class="replyTable_cell">
                    <button class="editBtn">수정</button>
                </div>
            </div>
        `;
    });

    ReplyListLayout.innerHTML = text;

    let pagingText = '';

    // 동적으로 totalPages 계산
    const replyTotalPages = Math.ceil(pagination.total / pagination.rowCount);
    pagination.totalPages = replyTotalPages;

    // 처음 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-first ${pagination.currentPage === 1 ? 'disabled' : ''}">
            <a href="#" class="pagination-first-link" onclick="goToReplyPage(1)" rel="nofollow">
                <span class="pagination-first-icon" aria-hidden="true">«</span>
            </a>
        </li>
    `;

    // 이전 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-prev ${pagination.currentPage === 1 ? 'disabled' : ''}">
            <a href="#" class="pagination-prev-link" 
               onclick="${pagination.currentPage === 1 ? 'return false;' : `goToReplyPage(${pagination.currentPage - 1})`}" 
               rel="prev nofollow">
                <span class="pagination-prev-icon" aria-hidden="true">‹</span>
            </a>
        </li>
    `;

    // 페이지 번호 버튼
    for (let i = pagination.startPage; i <= pagination.endPage; i++) {
        pagingText += `
            <li class="pagination-page ${i === pagination.currentPage ? 'active' : ''}">
                <a href="#" class="pagination-page-link" onclick="goToReplyPage(${i})">${i}</a>
            </li>
        `;
    }

    // 다음 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-next ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}">
            <a href="#" class="pagination-next-link" 
               onclick="${pagination.currentPage === pagination.totalPages ? 'return false;' : `goToReplyPage(${pagination.currentPage + 1})`}" 
               rel="next nofollow">
                <span class="pagination-next-icon" aria-hidden="true">›</span>
            </a>
        </li>
    `;

    // 마지막 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-last ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}">
            <a href="#" class="pagination-last-link" 
               onclick="${pagination.currentPage === pagination.totalPages ? 'return false;' : `goToReplyPage(${pagination.realEnd})`}" 
               rel="nofollow">
                <span class="pagination-last-icon" aria-hidden="true">»</span>
            </a>
        </li>
    `;

    // 페이지네이션을 동적으로 추가
    ReplyListPaging.innerHTML = pagingText;
};

// 후기 관리
// 면접 후기 & 포지션(인턴십) 후기(기업)
const InterviewReviewListLayout = document.querySelector(".interviewReviewTable_container"); // 면접 후기 목록 표시
const InterviewReviewListPaging = document.querySelector(".pagination-list.interviewReview"); // 페이지네이션 요소
const InterviewReviewKeywordInput = document.getElementById("interviewReviewSearchInput"); // 검색어 입력 필드
const InterviewReviewSortOptions = document.querySelectorAll(".sort-filter-option.interviewReviewSort"); // 정렬 옵션
const EvaluationCorporationListLayout = document.querySelector(".evaluationCorporationTable_container"); // 포지션 후기 목록 표시
const EvaluationCorporationListPaging = document.querySelector(".pagination-list.evaluationCorporation"); // 페이지네이션 요소
const EvaluationCorporationKeywordInput = document.getElementById("evaluationCorporationSearchInput"); // 검색어 입력 필드

// 면접 후기
let interviewReviewSelectedSort = "최신순"; // 기본 정렬 설정

// 정렬 옵션 이벤트 설정
InterviewReviewSortOptions.forEach((option) => {
    option.addEventListener("click", () => {
        // 선택한 옵션의 data-type 속성을 가져와서 interviewReviewSelectedSort에 저장
        interviewReviewSelectedSort = option.getAttribute("data-type");

        // 기존 선택 해제하고 새로운 선택 항목에 selected 클래스 추가
        InterviewReviewSortOptions.forEach((option) => option.classList.remove("selected"));
        option.classList.add("selected");

        // 검색어와 정렬 기준을 사용하여 면접 후기 작성 목록 새로고침
        fetchAndShowInterviewReview(1);
    });
});

// 검색어 초기화
InterviewReviewKeywordInput.value = new URLSearchParams(window.location.search).get("keyword") || "";

// 검색어 입력시 검색 실행
InterviewKeywordInput.addEventListener("input", () => {
    fetchAndShowInterviewReview(1);
});

// 페이지 이동 - fetchAndShowInterviewReview 호출
function goToInterviewReviewPage(page) {
    fetchAndShowInterviewReview(page);
}

document.addEventListener('DOMContentLoaded', () => {
    goToInterviewReviewPage(1);
});

// 면접 후기 작성 목록을 서버에서 가져오고 화면에 표시
const fetchAndShowInterviewReview = async (page) => {
    const keyword = InterviewReviewKeywordInput.value;
    const sortType = interviewReviewSelectedSort;

    try {
        // 데이터를 서버에서 가져오는 요청
        const response = await fetch(`/admin/position/interview-review/${page}?keyword=${keyword}&types=${sortType}`);
        const data = await response.json();

        // 페이지 데이터와 면접 후기 데이터를 표시하는 함수 호출
        data.pagination.currentPage = page;
        showInterviewReviewList(data);
    } catch (error) {
        console.error(`페이지 ${page} 로딩 중 오류 발생:`, error);
    }
};

// 면접 후기 목록과 페이지네이션을 표시하는 함수
const showInterviewReviewList = ({ interviewReviews, pagination }) => {
    let text = `
        <div class="interviewReviewTable_row interviewReviewTable_header">
            <div class="interviewReviewTable_cell"><input type="checkbox" id="selectAll"></div>
            <div class="interviewReviewTable_cell">기업명</div>
            <div class="interviewReviewTable_cell">작성일</div>
            <div class="interviewReviewTable_cell">면접 날짜</div>
            <div class="interviewReviewTable_cell">공고 제목</div>
            <div class="interviewReviewTable_cell">작성자</div>
            <div class="interviewReviewTable_cell">전화번호</div>
            <div class="interviewReviewTable_cell">지원 분야</div>
            <div class="interviewReviewTable_cell">상태</div>
            <div class="interviewReviewTable_cell">Action</div>
        </div>
    `;

    interviewReviews.forEach((interviewReview) => {
        text += `
            <div class="interviewReviewTable_row">
                <div class="interviewReviewTable_cell"><input type="checkbox" id="selectAll"></div>
                <div class="interviewReviewTable_cell">${interviewReview.corporationName}</div>
                <div class="interviewReviewTable_cell">${interviewReview.createdDate}</div>
                <div class="interviewReviewTable_cell">${interviewReview.interviewDate}</div>
                <div class="interviewReviewTable_cell">${interviewReview.noticeTitle}</div>
                <div class="interviewReviewTable_cell">${interviewReview.memberName}</div>
                <div class="interviewReviewTable_cell">${interviewReview.memberPhone}</div>
                <div class="interviewReviewTable_cell">${interviewReview.applyType}</div>
                <div class="interviewReviewTable_cell">${interviewReview.interviewPassed}</div>
                <div class="interviewReviewTable_cell">
                    <button class="editBtn">수정</button>
                </div>
            </div>
        `;
    });

    InterviewReviewListLayout.innerHTML = text;

    // 동적으로 totalPages 계산
    const interviewReviewTotalPages = Math.ceil(pagination.total / pagination.rowCount);
    pagination.totalPages = interviewReviewTotalPages;

    // 페이지 버튼 생성
    let pagingText = '';

    // 처음 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-first ${pagination.currentPage === 1 ? 'disabled' : ''}">
            <a href="#" class="pagination-first-link" onclick="goToInterviewReviewPage(1)" rel="nofollow">
                <span class="pagination-first-icon" aria-hidden="true">«</span>
            </a>
        </li>
    `;

    // 이전 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-prev ${pagination.currentPage === 1 ? 'disabled' : ''}">
            <a href="#" class="pagination-prev-link" 
               onclick="${pagination.currentPage === 1 ? 'return false;' : `goToInterviewReviewPage(${pagination.currentPage - 1})`}" 
               rel="prev nofollow">
                <span class="pagination-prev-icon" aria-hidden="true">‹</span>
            </a>
        </li>
    `;

    // 페이지 번호 버튼
    for (let i = pagination.startPage; i <= pagination.endPage; i++) {
        pagingText += `
            <li class="pagination-page ${i === pagination.currentPage ? 'active' : ''}">
                <a href="#" class="pagination-page-link" onclick="goToInterviewReviewPage(${i})">${i}</a>
            </li>
        `;
    }

    // 다음 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-next ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}">
            <a href="#" class="pagination-next-link" 
               onclick="${pagination.currentPage === pagination.totalPages ? 'return false;' : `goToInterviewReviewPage(${pagination.currentPage + 1})`}" 
               rel="next nofollow">
                <span class="pagination-next-icon" aria-hidden="true">›</span>
            </a>
        </li>
    `;

    // 마지막 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-last ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}">
            <a href="#" class="pagination-last-link" 
               onclick="${pagination.currentPage === pagination.totalPages ? 'return false;' : `goToInterviewReviewPage(${pagination.realEnd})`}" 
               rel="nofollow">
                <span class="pagination-last-icon" aria-hidden="true">»</span>
            </a>
        </li>
    `;

    // 페이지네이션을 동적으로 추가
    InterviewReviewListPaging.innerHTML = pagingText;
};

// 포지션(인턴십) 후기(기업)
// 검색어 초기화
EvaluationCorporationKeywordInput.value = new URLSearchParams(window.location.search).get("keyword") || "";

// 검색어 입력 시 검색 실행
EvaluationCorporationKeywordInput.addEventListener("input", () => {
    fetchAndShowEvaluationCorporation(1);
});

// 페이지 이동 - fetchAndShowEvaluationCorporation 호출
function gotoEvaluationCorporationPage(page) {
    fetchAndShowEvaluationCorporation(page);
}

document.addEventListener('DOMContentLoaded', () => {
    gotoEvaluationCorporationPage(1);
});

// 포지션(인턴십) 후기(기업) 작성 목록과 페이지네이션을 표시하는 함수
const fetchAndShowEvaluationCorporation = async (page) => {
    const keyword = EvaluationCorporationKeywordInput.value;

    try {
        // 데이터를 서버에서 가져오는 요청
        const response = await fetch(`/admin/position/evaluation-corporation/${page}?keyword=${keyword}`);
        const data = await response.json();

        // 페이지 데이터와 포지션(인턴십) 후기(기업) 작성 데이터를 표시하는 함수 호출
        data.pagination.currentPage = page;
        showEvaluationCorporationList(data);
    } catch (error) {
        console.error(`페이지 ${page} 로딩 중 오류 발생:`, error);
    }
};

// 포지션(인턴십) 후기(기업) 작성 목록과 페이지네이션을 표시하는 함수
const showEvaluationCorporationList = ({ evaluationCorporations, pagination }) => {
    let text = `
        <div class="evaluationCorporationTable_row evaluationCorporationTable_header">
            <div class="evaluationCorporationTable_cell"><input type="checkbox" id="selectAll"></div>
            <div class="evaluationCorporationTable_cell">기업명</div>
            <div class="evaluationCorporationTable_cell">작성일</div>
            <div class="evaluationCorporationTable_cell">포지션 근무일</div>
            <div class="evaluationCorporationTable_cell">공고 제목</div>
            <div class="evaluationCorporationTable_cell">근무자</div>
            <div class="evaluationCorporationTable_cell">전화번호</div>
            <div class="evaluationCorporationTable_cell">지원 분야</div>
            <div class="evaluationCorporationTable_cell">상태</div>
            <div class="evaluationCorporationTable_cell">Action</div>
        </div>
    `;

    evaluationCorporations.forEach((evaluationCorporation) => {
        text += `
            <div class=evaluationCorporationTable_row>
                <div class="evaluationCorporationTable_cell"><input type="checkbox" id="selectAll"></div>
                <div class="evaluationCorporationTable_cell">${evaluationCorporation.corporationName}</div>
                <div class="evaluationCorporationTable_cell">${evaluationCorporation.createdDate}</div>
                <div class="evaluationCorporationTable_cell">${evaluationCorporation.noticeWorkStartDate}</div>
                <div class="evaluationCorporationTable_cell">${evaluationCorporation.noticeTitle}</div>
                <div class="evaluationCorporationTable_cell">${evaluationCorporation.memberName}</div>
                <div class="evaluationCorporationTable_cell">${evaluationCorporation.memberPhone}</div>
                <div class="evaluationCorporationTable_cell">${evaluationCorporation.applyType}</div>
                <div class="evaluationCorporationTable_cell">${evaluationCorporation.positionStatus}</div>
                <div class="evaluationCorporationTable_cell">
                    <button class="editBtn">수정</button>
                </div>
            </div>
        `;
    });

    EvaluationCorporationListLayout.innerHTML = text;

    // 동적으로 totalPages 계산
    const EvaluationCorporationTotalPages = Math.ceil(pagination.total / pagination.rowCount);
    pagination.totalPages = EvaluationCorporationTotalPages;

    // 페이지 버튼 생성
    let pagingText = '';

    // 처음 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-first ${pagination.currentPage === 1 ? 'disabled' : ''}">
            <a href="#" class="pagination-first-link" onclick="gotoEvaluationCorporationPage(1)" rel="nofollow">
                <span class="pagination-first-icon" aria-hidden="true">«</span>
            </a>
        </li>
    `;

    // 이전 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-prev ${pagination.currentPage === 1 ? 'disabled' : ''}">
            <a href="#" class="pagination-prev-link" 
               onclick="${pagination.currentPage === 1 ? 'return false;' : `gotoEvaluationCorporationPage(${pagination.currentPage - 1})`}" 
               rel="prev nofollow">
                <span class="pagination-prev-icon" aria-hidden="true">‹</span>
            </a>
        </li>
    `;

    // 페이지 번호 버튼
    for (let i = pagination.startPage; i <= pagination.endPage; i++) {
        pagingText += `
            <li class="pagination-page ${i === pagination.currentPage ? 'active' : ''}">
                <a href="#" class="pagination-page-link" onclick="gotoEvaluationCorporationPage(${i})">${i}</a>
            </li>
        `;
    }

    // 다음 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-next ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}">
            <a href="#" class="pagination-next-link" 
               onclick="${pagination.currentPage === pagination.totalPages ? 'return false;' : `gotoEvaluationCorporationPage(${pagination.currentPage + 1})`}" 
               rel="next nofollow">
                <span class="pagination-next-icon" aria-hidden="true">›</span>
            </a>
        </li>
    `;

    // 마지막 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-last ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}">
            <a href="#" class="pagination-last-link" 
               onclick="${pagination.currentPage === pagination.totalPages ? 'return false;' : `gotoEvaluationCorporationPage(${pagination.realEnd})`}" 
               rel="nofollow">
                <span class="pagination-last-icon" aria-hidden="true">»</span>
            </a>
        </li>
    `;

    // 페이지네이션을 동적으로 추가
    EvaluationCorporationListPaging.innerHTML = pagingText;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const MemberInquiryListLayout = document.querySelector(".memberInquiryTable_container"); // 일반 회원 문의 목록 표시
const MemberInquiryListPaging = document.querySelector(".pagination-list.memberInquiry"); // 페이지네이션 요소
const MemberInquiryKeywordInput = document.getElementById("memberInquirySearchInput"); // 검색어 입력 필드
const MemberInquirySortOptions = document.querySelectorAll(".sort-filter-option.memberInquirySort"); // 정렬 옵션
const CorporationInquiryListLayout = document.querySelector(".corporationInquiryTable_container"); // 기업 회원 문의 목록 표시
const CorporationInquiryListPaging = document.querySelector(".pagination-list.corporationInquiry"); // 페이지네이션 요소
const CorporationInquiryKeywordInput = document.getElementById("corporationInquirySearchInput"); // 검색어 입력 필드
const CorporationInquirySortOptions = document.querySelectorAll(".sort-filter-option.corporationInquirySort") // 정렬 옵션

// 일반 회원 문의
let memberInquirySelectSort = "최신순"; // 기본 정렬 설정

MemberInquirySortOptions.forEach((option) => {
    option.addEventListener("click", () => {
        // 선택한 옵션의 data-type 속성을 가져와서 memberInquirySelectSort에 저장
        memberInquirySelectSort = option.getAttribute("data-type");

        // 기존 선택 해제하고 새로운 선택 항목에 selected 클래스 추가
        MemberInquirySortOptions.forEach((option) => option.classList.remove("selected"));
        option.classList.add("selected");

        // 검색어와 정렬 기준을 사용하여 일반 회원 문의 목록 새로고침
        fetchAndShowMemberInquiry(1);
    });
});

// 검색어 초기화
MemberInquiryKeywordInput.value = new URLSearchParams(window.location.search).get("keyword") || "";

// 검색어 입력 시 검색 실행
MemberInquiryKeywordInput.addEventListener("input", () => {
    fetchAndShowMemberInquiry(1);
});

// 페이지 이동 - fetchAndShowMemberInquiry 호출
function goToMemberInquiryPage(page) {
    fetchAndShowMemberInquiry(page);
}

document.addEventListener('DOMContentLoaded', () => {
    goToMemberInquiryPage(1);
});

// 일반 회원 문의 목록을 서버에서 가져오고 화면에 표시
const fetchAndShowMemberInquiry = async (page) => {
    const keyword = MemberInquiryKeywordInput.value;
    const sortType = memberInquirySelectSort;

    try {
        // 데이터를 서버에서 가져오는 요청
        const response = await fetch(`/admin/position/member-inquiry/${page}?keyword=${keyword}&types=${sortType}`);
        const data = await response.json();

        // 페이지 데이터와 일반 회원 문의 데이터를 표시하는 함수 호출
        data.pagination.currentPage = page;
        showMemberInquiryList(data);
    } catch (error) {
        console.error(`페이지 ${page} 로딩 중 오류 발생`, error);
    }
};

// 일반 회원 문의 목록과 페이지네이션을 표시하는 함수
const showMemberInquiryList = ({ inquiries, pagination }) => {
    let text = `
        <div class = "memberInquiryTable_row memberInquiryTable_header">
            <div class="memberInquiryTable_cell"><input type="checkbox" id="selectAll"></div>
            <div class="memberInquiryTable_cell">문의 분류</div>
            <div class="memberInquiryTable_cell">작성일</div>
            <div class="memberInquiryTable_cell">문의 제목</div>
            <div class="memberInquiryTable_cell">문의 내용</div>
            <div class="memberInquiryTable_cell">작성자</div>
            <div class="memberInquiryTable_cell">이메일</div>
            <div class="memberInquiryTable_cell">상태</div>
            <div class="memberInquiryTable_cell">Action</div>
        </div>
    `;

    inquiries.forEach((inquiry) => {
        text += `
            <div class="memberInquiryTable_row">
                <div class="memberInquiryTable_cell"><input type="checkbox" id="selectAll"></div>
                <div class="memberInquiryTable_cell">${inquiry.inquiryCategory || ''}</div>
                <div class="memberInquiryTable_cell">${inquiry.createdDate || ''}</div>
                <div class="memberInquiryTable_cell">${inquiry.inquiryTitle || ''}</div>
                <div class="memberInquiryTable_cell">${inquiry.inquiryContent || ''}</div>
                <div class="memberInquiryTable_cell">${inquiry.memberName || ''}</div>
                <div class="memberInquiryTable_cell">${inquiry.memberEmail || ''}</div>
                <div class="memberInquiryTable_cell">${inquiry.inquiryStatus || ''}</div>
                <div class="memberInquiryTable_cell">
                    <button class="editBtn">수정</button>
                </div>
            </div>
        `;
    });

    MemberInquiryListLayout.innerHTML = text;

    // 동적으로 totalPages 계산
    const memberInquiryTotalPages = Math.ceil(pagination.total / pagination.rowCount);
    pagination.totalPages = memberInquiryTotalPages;

    // 페이지 버튼 생성
    let pagingText = '';

    // 처음 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-first ${pagination.currentPage === 1 ? 'disabled' : ''}">
            <a href="#" class="pagination-first-link" onclick="goToMemberInquiryPage(1)" rel="nofollow">
                <span class="pagination-first-icon" aria-hidden="true">«</span>
            </a>
        </li>
    `;

    // 이전 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-prev ${pagination.currentPage === 1 ? 'disabled' : ''}">
            <a href="#" class="pagination-prev-link" 
               onclick="${pagination.currentPage === 1 ? 'return false;' : `goToMemberInquiryPage(${pagination.currentPage - 1})`}" 
               rel="prev nofollow">
                <span class="pagination-prev-icon" aria-hidden="true">‹</span>
            </a>
        </li>
    `;

    // 페이지 번호 버튼
    for (let i = pagination.startPage; i <= pagination.endPage; i++) {
        pagingText += `
            <li class="pagination-page ${i === pagination.currentPage ? 'active' : ''}">
                <a href="#" class="pagination-page-link" onclick="goToMemberInquiryPage(${i})">${i}</a>
            </li>
        `;
    }

    // 다음 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-next ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}">
            <a href="#" class="pagination-next-link" 
               onclick="${pagination.currentPage === pagination.totalPages ? 'return false;' : `goToMemberInquiryPage(${pagination.currentPage + 1})`}" 
               rel="next nofollow">
                <span class="pagination-next-icon" aria-hidden="true">›</span>
            </a>
        </li>
    `;

    // 마지막 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-last ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}">
            <a href="#" class="pagination-last-link" 
               onclick="${pagination.currentPage === pagination.totalPages ? 'return false;' : `goToMemberInquiryPage(${pagination.realEnd})`}" 
               rel="nofollow">
                <span class="pagination-last-icon" aria-hidden="true">»</span>
            </a>
        </li>
    `;

    // 페이지네이션을 동적으로 추가
    MemberInquiryListPaging.innerHTML = pagingText;
};

// 기업 회원 문의
let corporationInquirySelectSort = '최신순'; // 기본 정렬 설정

CorporationInquirySortOptions.forEach((option) => {
    option.addEventListener("click", () => {
        // 선택한 옵션의 data-type 속성을 가져와서 corporationInquirySelectSort에 저장
        corporationInquirySelectSort = option.getAttribute("data-type");

        // 기존 선택 해제하고 새로운 선택 항목에 selected 클래스 추가
        CorporationInquirySortOptions.forEach((option) => option.classList.remove("selected"));
        option.classList.add("selected");

        // 검색어와 정렬 기준을 사용하여 기업 회원 문의 목록 새로고침
        fetchAndShowCorporationInquiry(1);
    });
});

// 검색어 초기화
CorporationInquiryKeywordInput.value = new URLSearchParams(window.location.search).get("keyword") || "";

// 검색어 입력시 검색 실행
CorporationInquiryKeywordInput.addEventListener("input", () => {
    fetchAndShowCorporationInquiry(1);
});

// 페이지 이동 - fetchAndShowCorporationInquiry 호출
function goToCorporationInquiryPage(page) {
    fetchAndShowCorporationInquiry(page);
}

document.addEventListener('DOMContentLoaded', () => {
    goToCorporationInquiryPage(1);
});

// 기업 회원 문의 목록을 서버에서 가져오고 화면에 표시
const fetchAndShowCorporationInquiry = async (page) => {
    const keyword = CorporationInquiryKeywordInput.value;
    const sortType = corporationInquirySelectSort;

    try {
        // 데이터를 서버에서 가져오는 요청
        const response = await fetch(`/admin/position/corporation-inquiry/${page}?keyword=${keyword}&types=${sortType}`);
        const data = await response.json();

        //  페이지 데이터와 기업 회원 문의 데이터를 표시하는 함수 호출
        data.pagination.currentPage = page;
        showCorporationInquiryList(data);
    } catch (error) {
        console.error(`페이지 ${page} 로딩 중 오류 발생`, error);
    }
};

// 기업 회원 문의 목록과 페이지네이션을 표시하는 함수
const showCorporationInquiryList = ({ inquiries, pagination }) => {
    let text = `
        <div class = "corporationInquiryTable_row corporationInquiryTable_header">
            <div class="corporationInquiryTable_cell"><input type="checkbox" id="selectAll"></div>
            <div class="corporationInquiryTable_cell">문의 분류</div>
            <div class="corporationInquiryTable_cell">작성일</div>
            <div class="corporationInquiryTable_cell">문의 제목</div>
            <div class="corporationInquiryTable_cell">문의 내용</div>
            <div class="corporationInquiryTable_cell">기업명</div>
            <div class="corporationInquiryTable_cell">이메일</div>
            <div class="corporationInquiryTable_cell">상태</div>
            <div class="corporationInquiryTable_cell">Action</div>
        </div>
    `;

    inquiries.forEach((inquiry) => {
        text += `
            <div class="corporationInquiryTable_row">
                <div class="corporationInquiryTable_cell"><input type="checkbox" id="selectAll"></div>
                <div class="corporationInquiryTable_cell">${inquiry.inquiryCategory}</div>
                <div class="corporationInquiryTable_cell">${inquiry.createdDate}</div>
                <div class="corporationInquiryTable_cell">${inquiry.inquiryTitle}</div>
                <div class="corporationInquiryTable_cell">${inquiry.inquiryContent}</div>
                <div class="corporationInquiryTable_cell">${inquiry.corporationName}</div>
                <div class="corporationInquiryTable_cell">${inquiry.corporationEmail}</div>
                <div class="corporationInquiryTable_cell">${inquiry.inquiryStatus}</div>
                <div class="corporationInquiryTable_cell">
                    <button class="editBtn">수정</button>
                </div>
            </div>
        `;
    });

    CorporationInquiryListLayout.innerHTML = text;

    // 동적으로 totalPages 계산
    const corporationInquiryTotalPages = Math.ceil(pagination.total / pagination.rowCount);
    pagination.totalPages = corporationInquiryTotalPages;

    // 페이지 버튼 생성
    let pagingText = '';

    // 처음 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-first ${pagination.currentPage === 1 ? 'disabled' : ''}">
            <a href="#" class="pagination-first-link" onclick="goToCorporationInquiryPage(1)" rel="nofollow">
                <span class="pagination-first-icon" aria-hidden="true">«</span>
            </a>
        </li>
    `;

    // 이전 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-prev ${pagination.currentPage === 1 ? 'disabled' : ''}">
            <a href="#" class="pagination-prev-link" 
               onclick="${pagination.currentPage === 1 ? 'return false;' : `goToCorporationInquiryPage(${pagination.currentPage - 1})`}" 
               rel="prev nofollow">
                <span class="pagination-prev-icon" aria-hidden="true">‹</span>
            </a>
        </li>
    `;

    // 페이지 번호 버튼
    for (let i = pagination.startPage; i <= pagination.endPage; i++) {
        pagingText += `
            <li class="pagination-page ${i === pagination.currentPage ? 'active' : ''}">
                <a href="#" class="pagination-page-link" onclick="goToCorporationInquiryPage(${i})">${i}</a>
            </li>
        `;
    }

    // 다음 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-next ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}">
            <a href="#" class="pagination-next-link" 
               onclick="${pagination.currentPage === pagination.totalPages ? 'return false;' : `goToCorporationInquiryPage(${pagination.currentPage + 1})`}" 
               rel="next nofollow">
                <span class="pagination-next-icon" aria-hidden="true">›</span>
            </a>
        </li>
    `;

    // 마지막 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-last ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}">
            <a href="#" class="pagination-last-link" 
               onclick="${pagination.currentPage === pagination.totalPages ? 'return false;' : `goToCorporationInquiryPage(${pagination.realEnd})`}" 
               rel="nofollow">
                <span class="pagination-last-icon" aria-hidden="true">»</span>
            </a>
        </li>
    `;

    // 페이지네이션을 동적으로 추가
    CorporationInquiryListPaging.innerHTML = pagingText;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 기업 후기 신고 관리
const ComplainListLayout = document.querySelector(".complainTable_container"); // 기업 후기 신고 목록 표시
const ComplainListPaging = document.querySelector(".pagination-list.complain"); // 페이지네이션 요소
const ComplainKeywordInput = document.getElementById("complainSearchInput"); // 검색어 입력 필드
const ComplainSortOptions = document.querySelectorAll(".sort-filter-option.complainSort"); // 정렬 옵션

let complainSelectedSort = "최신순"; // 기본 정렬 설정

// 정렬 옵션 이벤트 설정
ComplainSortOptions.forEach((option) => {
    option.addEventListener("click", () => {
        // 선택한 옵션의 data-type 속성을 가져와서 complainSelectedSort에 저장
        complainSelectedSort = option.getAttribute("data-type");

        // 기존 선택 해제하고 새로운 선택 항목에 selected 클래스 추가
        ComplainSortOptions.forEach((option) => option.classList.remove("selected"));
        option.classList.add("selected");

        // 검색어와 정렬 기준을 사용하여 기업 신고 후기 목록 새로고침
        fetchAndShowComplain(1);
    });
});

// 검색어 초기화
ComplainKeywordInput.value = new URLSearchParams(window.location.search).get("keyword") || "";

// 검색어 입력 시 검색 실행
ComplainKeywordInput.addEventListener("input", () => {
    fetchAndShowComplain(1);
});

// 페이지 이동 - fetchAndShowComplain 호출
function goToComplainPage(page) {
    fetchAndShowComplain(page);
}

// 페이지 로드 시 1페이지 호출
document.addEventListener('DOMContentLoaded', () => {
    goToComplainPage(1);
});

// 기업 후기 신고 목록을 서버에서 가져오고 화면에 표시
const fetchAndShowComplain = async (page) => {
    const keyword = ComplainKeywordInput.value;
    const sortType = complainSelectedSort;

    try {
        // 데이터를 서버에서 가져오는 요청
        const response = await fetch(`/admin/position/complain/${page}?keyword=${keyword}&types=${sortType}`);
        const data = await response.json();

        // 페이지 데이터와 결제 데이터를 표시하는 함수 호출
        data.pagination.currentPage = page;
        showComplainList(data);
    } catch (error) {
        console.error(`페이지 ${page} 로딩 중 오류 발생`, error);
    }
};

// 기업 후기 신고 목록과 페이지네이션을 표시
const showComplainList = ({ complains, pagination }) => {
    let text = `
        <div class="complainTable_row complainTable_header">
            <div class="complainTable_cell"><input type="checkbox" id="selectAll"></div>
            <div class="complainTable_cell">기업명</div>
            <div class="complainTable_cell">신고일</div>
            <div class="complainTable_cell">신고 내용</div>
            <div class="complainTable_cell">피신고인</div>
            <div class="complainTable_cell">신고 누적횟수</div>
            <div class="complainTable_cell">처리 상태</div>
            <div class="complainTable_cell">Action</div>
        </div>
    `;

    complains.forEach((complain) => {
        text += `
            <div class="complainTable_row">
                <div class="complainTable_cell"><input type="checkbox" id="selectAll"></div>
                <div class="complainTable_cell">${complain.corporationName}</div>
                <div class="complainTable_cell">${complain.createdDate}</div>
                <div class="complainTable_cell">${complain.complainContent}</div>
                <div class="complainTable_cell">${complain.memberName}</div>
                <div class="complainTable_cell">${complain.complainCount}</div>
                <div class="complainTable_cell">${complain.complainStatus}</div>
                <div class="complainTable_cell">
                    <button class="editBtn">수정</button>
                </div>
            </div>
        `;
    });

    ComplainListLayout.innerHTML = text;

    // 동적으로 totalPages 계산
    const complainTotalPages = Math.ceil(pagination.total / pagination.rowCount);
    pagination.totalPages = complainTotalPages;

    // 페이지 버튼 생성
    let pagingText = '';

    // 처음 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-first ${pagination.currentPage === 1 ? 'disabled' : ''}">
            <a href="#" class="pagination-first-link" onclick="goToComplainPage(1)" rel="nofollow">
                <span class="pagination-first-icon" aria-hidden="true">«</span>
            </a>
        </li>
    `;

    // 이전 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-prev ${pagination.currentPage === 1 ? 'disabled' : ''}">
            <a href="#" class="pagination-prev-link" 
               onclick="${pagination.currentPage === 1 ? 'return false;' : `goToComplainPage(${pagination.currentPage - 1})`}" 
               rel="prev nofollow">
                <span class="pagination-prev-icon" aria-hidden="true">‹</span>
            </a>
        </li>
    `;

    // 페이지 번호 버튼
    for (let i = pagination.startPage; i <= pagination.endPage; i++) {
        pagingText += `
            <li class="pagination-page ${i === pagination.currentPage ? 'active' : ''}">
                <a href="#" class="pagination-page-link" onclick="goToComplainPage(${i})">${i}</a>
            </li>
        `;
    }

    // 다음 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-next ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}">
            <a href="#" class="pagination-next-link" 
               onclick="${pagination.currentPage === pagination.totalPages ? 'return false;' : `goToComplainPage(${pagination.currentPage + 1})`}" 
               rel="next nofollow">
                <span class="pagination-next-icon" aria-hidden="true">›</span>
            </a>
        </li>
    `;

    // 마지막 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-last ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}">
            <a href="#" class="pagination-last-link" 
               onclick="${pagination.currentPage === pagination.totalPages ? 'return false;' : `goToComplainPage(${pagination.realEnd})`}" 
               rel="nofollow">
                <span class="pagination-last-icon" aria-hidden="true">»</span>
            </a>
        </li>
    `;

    // 페이지네이션을 동적으로 추가
    ComplainListPaging.innerHTML = pagingText;
}













