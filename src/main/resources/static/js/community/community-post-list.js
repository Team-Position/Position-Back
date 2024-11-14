document.addEventListener("DOMContentLoaded", function() {
    // 페이지 로딩 시 기본적으로 최신순으로 게시글을 불러옴
    fetchPosts(1, '', '최신순');  // 기본적으로 "최신순" 필터를 사용하여 페이지 로드

    // 체크박스에 이벤트 리스너 추가 (한 번에 하나만 선택)
    const checkboxes = document.querySelectorAll(".btn-sort");
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", function() {
            // 다른 체크박스를 모두 해제
            checkboxes.forEach((cb) => {
                if (cb !== checkbox) {
                    cb.checked = false;
                }
            });
            // 선택된 필터를 기준으로 게시글을 새로 고침
            let selectedFilter = getSelectedFilters();
            fetchPosts(1, '', selectedFilter); // 페이지 1로 요청, 검색어와 필터를 함께 전달
        });
    });

    // 검색 버튼 클릭 이벤트 처리
    document.getElementById('search-button').addEventListener('click', function() {
        const searchQuery = document.getElementById('input-keyword').value.trim();
        if (searchQuery === "") {
            alert("검색어를 입력해주세요.");
            return;
        }
        let selectedFilter = getSelectedFilters(); // 선택된 필터값을 가져옴
        fetchPosts(1, searchQuery, selectedFilter);  // 페이지 1로 요청, 검색어와 필터 전달
    });
});

// 체크박스에서 선택된 필터 값을 하나만 반환하는 함수
function getSelectedFilters() {
    let selectedFilter = '최신순';  // 기본적으로 최신순으로 설정
    const checkboxes = document.querySelectorAll(".btn-sort");

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            selectedFilter = checkbox.value; // 체크된 값 하나만 반환
        }
    });

    return selectedFilter;  // 필터가 없으면 기본값 '최신순'이 반환됨
}

// 게시글을 렌더링하는 함수
function renderPosts(data) {
    const posts = data.posts;
    const pagination = data.pagination;
    // totalCount가 null일 경우 pagination.total을 사용
    const totalCount = data.total !== null && data.total !== undefined ? data.total : (pagination && pagination.total ? pagination.total : 0);
    const postList = document.getElementById("qst-and-ans-list");
    postList.innerHTML = ""; // 기존 항목 초기화하여 중복 추가 방지

    // totalCount가 존재하는 경우에만 표시
    if (totalCount !== null && totalCount !== undefined) {
        const listNumTitle = document.querySelector(".list-num-tit strong");
        listNumTitle.textContent = totalCount.toLocaleString();
    }

    if (!posts || posts.length === 0) {
        const noPostsMessage = document.createElement('li');
        noPostsMessage.innerText = "게시글이 없습니다.";
        postList.appendChild(noPostsMessage);
    } else {
        posts.forEach((post) => {
            const listItem = document.createElement("li");

            // createdDate가 null인 경우 처리
            let formattedDate = "날짜 정보 없음";
            if (post.createdDate) {
                const date = new Date(post.createdDate);
                if (!isNaN(date)) {
                    formattedDate = date.toLocaleDateString();
                }
            }

            listItem.innerHTML = `
                <div class="qna-subject-wrap">
                    <span class="qna-subject">${post.postTitle}</span>
                </div>
                <span class="qna-desc">${post.postContent}</span>
                <div class="qna-data-infos">
                    <span class="qna-info qna-reply">댓글 <strong>${post.postReplyCount || 0}</strong></span>
                    <span class="qna-info qna-view">조회 <strong>${post.postReadCount || 0}</strong></span>
                    <div class="qna-member-info">
                        <span class="qna-from">${post.memberNickname || '알 수 없음'} ${formattedDate}</span>
                    </div>
                </div>
            `;

            listItem.addEventListener("click", () => {
                window.location.href = `/community/community-details/${post.id}`;
            });

            postList.appendChild(listItem);
        });
    }

    if (pagination) {
        renderPagination(pagination, totalCount); // 페이지네이션 생성
    }
}

// 페이지네이션 렌더링 함수
function renderPagination(pagination, total) {
    const paginationElement = document.getElementById("page-box");
    paginationElement.innerHTML = ""; // 기존 페이지네이션 초기화

    // `realEnd` 값 계산 (페이지네이션 끝값 계산)
    const realEnd = Math.ceil((total || 1) / pagination.rowCount);

    // 이전 버튼
    if (pagination.prev) {
        const prevButton = document.createElement("a");
        prevButton.textContent = "이전";
        prevButton.href = `#`;
        prevButton.classList.add("btn-type", "size-s");
        prevButton.onclick = (event) => {
            event.preventDefault();
            fetchPosts(pagination.page - 1);
        };
        paginationElement.appendChild(prevButton);
    }

    // 필요한 페이지 버튼만 렌더링 (페이지 수가 많으면 페이지 버튼을 제한)
    for (let i = pagination.startPage; i <= realEnd && i <= pagination.endPage; i++) {
        const pageButton = document.createElement("a");
        pageButton.classList.add("btn-type", "size-s");
        pageButton.textContent = i;
        if (i === pagination.page) {
            pageButton.classList.add("active");
        }
        pageButton.onclick = (event) => {
            event.preventDefault();
            fetchPosts(i);
        };
        paginationElement.appendChild(pageButton);
    }

    // 다음 버튼
    if (pagination.next) {
        const nextButton = document.createElement("a");
        nextButton.classList.add("btn-type", "size-s", "btn-next");
        nextButton.textContent = "다음";
        nextButton.href = `#`;
        nextButton.onclick = (event) => {
            event.preventDefault();
            fetchPosts(pagination.page + 1);
        };
        paginationElement.appendChild(nextButton);
    }
}

// 서버에서 게시글과 페이징 정보 불러오기
function fetchPosts(page = 1, searchQuery = '', selectedFilter = '최신순') {
    const url = `/community/community-post-list-check?page=${page}&query=${encodeURIComponent(searchQuery)}&filterType=${encodeURIComponent(selectedFilter)}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`서버 응답 오류: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Fetched data:", data); // 디버깅을 위한 로그 추가
            renderPosts(data);
        })
        .catch(error => {
            console.error("Error fetching posts:", error);
            alert("게시글을 불러오는 데 문제가 발생했습니다.");
        });
}
