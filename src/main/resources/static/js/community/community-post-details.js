document.addEventListener("DOMContentLoaded", function () {
    const postId = window.location.pathname.split('/').pop(); // URL에서 postId 추출
    let currentPage = 1; // 현재 페이지 번호

    const moreButton = document.querySelector('.answer-more');
    moreButton.style.display = 'block'; // 초기에는 "더보기" 버튼을 보이게 설정

    // 현재 사용자 정보 가져오기
    getCurrentUser().then(currentUser => {
        if (!currentUser) {
            console.error("로그인되지 않은 사용자입니다.");
            window.location.href = "/login"; // 로그인 페이지로 리디렉션
            return;
        }

        const currentMemberId = currentUser.id;
        console.log("현재 사용자 닉네임:", currentUser.memberNickname);

        const userNicknameElement = document.getElementById('current-user-nickname');
        userNicknameElement.textContent = currentUser.memberNickname;

        // 게시글 상세 정보 불러오기
        fetchPostDetails(postId, currentMemberId);

        // 댓글 등록 버튼 클릭 이벤트 처리
        document.querySelector('.btn-anwr-register').addEventListener('click', function () {
            const replyContent = document.getElementById('contents').value.trim();

            if (replyContent === "") {
                alert("댓글 내용을 입력해주세요.");
                return;
            }

            const replyData = {
                replyContent: replyContent,
                memberId: currentMemberId
            };

            addReply(postId, replyData);
        });

        // 첫 페이지 댓글 불러오기
        fetchReplies(postId, currentMemberId, currentPage);

        // "더보기" 버튼 클릭 시 다음 페이지의 댓글을 불러오기
        moreButton.addEventListener('click', function () {
            currentPage++;
            fetchReplies(postId, currentMemberId, currentPage);
        });
    });
});

// 현재 사용자 정보 가져오기 함수
function getCurrentUser() {
    return fetch('/member/info', {
        method: 'GET',
        credentials: 'include' // 쿠키 포함
    })
        .then(response => {
            console.log(`getCurrentUser - 응답 상태: ${response.status}`);
            const contentType = response.headers.get('Content-Type');
            console.log(`getCurrentUser - Content-Type: ${contentType}`);

            if (response.ok) {
                return response.json();
            } else if (response.status === 401) {
                throw new Error("로그인이 필요합니다.");
            } else {
                throw new Error("현재 사용자 정보를 가져오는 데 실패했습니다.");
            }
        })
        .then(data => {
            console.log("현재 사용자 데이터:", data);
            return data;
        })
        .catch(error => {
            console.error("현재 사용자 정보 가져오기 중 오류 발생:", error);
            alert(error.message);
            return null;
        });
}

// 게시글 상세 정보 가져오기 함수
function fetchPostDetails(postId, currentMemberId) {
    fetch(`/community/community-details-check/${postId}`, {
        method: 'GET',
        credentials: 'include'
    })
        .then(response => {
            console.log(`fetchPostDetails - 응답 상태: ${response.status}`);
            const contentType = response.headers.get('Content-Type');
            console.log(`fetchPostDetails - Content-Type: ${contentType}`);

            if (response.ok && contentType && contentType.includes('application/json')) {
                return response.json();
            } else {
                throw new Error("게시글을 불러오는 데 실패했습니다.");
            }
        })
        .then(post => {
            if (post) {
                renderPostDetails(post);
            } else {
                console.error("게시글을 불러오는 데 실패했습니다.");
            }
        })
        .catch(error => {
            console.error("게시글 가져오기 중 오류 발생:", error);
            alert("게시글을 불러오는 데 문제가 발생했습니다.");
        });
}

// 게시글 상세 정보 렌더링 함수
function renderPostDetails(post) {
    const postTitle = document.getElementById("post-title");
    const postAuthor = document.getElementById("post-author");
    const postDate = document.getElementById("post-date");
    const postContent = document.getElementById("post-content");

    if (post) {
        postTitle.textContent = post.postTitle;
        postAuthor.textContent = `작성자: ${post.memberNickname}`;
        postDate.textContent = `작성일: ${new Date(post.createdDate).toLocaleDateString()}`;
        postContent.textContent = post.postContent;
    } else {
        const errorMessage = document.createElement("div");
        errorMessage.textContent = "게시글을 찾을 수 없습니다.";
        document.body.appendChild(errorMessage);
    }
}

// 댓글 렌더링 함수
function renderReplies(replies, currentMemberId, postId) {
    console.log(`댓글 렌더링 중: 게시글 ID ${postId}`);
    const commentLists = document.querySelector(".comment-lists");

    if (!replies || replies.length === 0) {
        if (commentLists.childElementCount === 0) {
            const noRepliesMessage = document.createElement('li');
            noRepliesMessage.textContent = "댓글이 없습니다.";
            commentLists.appendChild(noRepliesMessage);
        }
        return;
    }

    replies.forEach(reply => {
        console.log(`댓글 ID: ${reply.id}, 작성자 ID: ${reply.memberId}`);
        const listItem = document.createElement("li");
        listItem.setAttribute('data-reply-id', reply.id); // 댓글 ID를 데이터 속성으로 설정
        listItem.setAttribute('data-member-id', reply.memberId); // 댓글 작성자 ID를 데이터 속성으로 설정
        let formattedDate = reply.createdDate ? new Date(reply.createdDate).toLocaleDateString() : "날짜 정보 없음";

        // 댓글 HTML 구성
        let innerHTML = `
            <div class="wrap-comment">
                <div class="comment-view">
                    <span class="nickname mark-expert">${reply.memberNickname}</span>
                    <span class="comment-txt">${reply.replyContent}</span>
                    <div class="comment-info">
                        <span class="comment-from">${formattedDate}</span>
                    </div>
                </div>
        `;

        // 현재 사용자가 작성자인 경우 수정 및 삭제 버튼 추가
        if (reply.memberId === currentMemberId) {
            console.log(`사용자 ${currentMemberId}가 댓글 ${reply.id}를 수정/삭제할 수 있습니다.`);
            innerHTML += `
                <div class="btn-controll">
                    <button type="button" class="btn-comment-etc-modi" data-reply-id="${reply.id}" data-state="modify">
                        <img src="/images/community/modify-icon.png" alt="수정 아이콘">
                    </button>
                    <button type="button" class="btn-comment-etc-del" data-reply-id="${reply.id}">
                        <img src="/images/community/delete-icon.png" alt="삭제 아이콘">
                    </button>
                </div>
            `;
        } else {
            console.log(`사용자 ${currentMemberId}가 댓글 ${reply.id}를 수정/삭제할 수 없습니다.`);
        }

        innerHTML += `</div>`; // wrap-comment 닫기

        listItem.innerHTML = innerHTML;

        commentLists.appendChild(listItem);
    });

    // 각 댓글에 대한 이벤트 리스너 추가
    // 이는 `renderReplies`가 여러 번 호출될 때마다 이벤트 리스너가 중복 추가되지 않도록 주의해야 합니다.
    // 따라서, 이벤트 위임을 사용하는 것이 더 효율적입니다.
    // 하지만 현재 구조를 유지하기 위해 기존 방식을 사용하겠습니다.
    replies.forEach(reply => {
        if (reply.memberId === currentMemberId) {
            const modifyButton = document.querySelector(`[data-reply-id="${reply.id}"] .btn-comment-etc-modi`);
            const deleteButton = document.querySelector(`[data-reply-id="${reply.id}"] .btn-comment-etc-del`);

            modifyButton.addEventListener('click', function () {
                handleModifyButtonClick(postId, reply);
            });

            deleteButton.addEventListener('click', function () {
                handleDeleteButtonClick(postId, reply);
            });

            console.log(`댓글 ID: ${reply.id}에 대한 이벤트 리스너가 추가되었습니다.`);
        }
    });
}

// 댓글 가져오기 함수
function fetchReplies(postId, currentMemberId, page) {
    const url = `/community/posts/${postId}/replies?page=${page}`;

    fetch(url, {
        method: 'GET',
        credentials: 'include'
    })
        .then(response => {
            console.log(`fetchReplies - 응답 상태: ${response.status}`);
            const contentType = response.headers.get('Content-Type');
            console.log(`fetchReplies - Content-Type: ${contentType}`);

            if (response.ok && contentType && contentType.includes('application/json')) {
                return response.json();
            } else {
                throw new Error(`서버 응답 오류: ${response.status}`);
            }
        })
        .then(repliesData => {
            console.log("가져온 댓글 데이터:", repliesData);
            renderReplies(repliesData.replies, currentMemberId, postId);

            // 페이징 처리: 더보기 버튼 표시 여부 결정
            if (page >= repliesData.pagination.realEnd) {
                document.querySelector('.answer-more').style.display = 'none';
            } else {
                document.querySelector('.answer-more').style.display = 'block';
            }
        })
        .catch(error => {
            console.error("댓글 가져오기 중 오류 발생:", error);
            alert("댓글을 불러오는 데 문제가 발생했습니다.");
        });
}

// 댓글 추가하기 함수
function addReply(postId, replyData) {
    const url = `/community/posts/${postId}/replies`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(replyData)
    })
        .then(response => {
            console.log(`addReply - 응답 상태: ${response.status}`);
            const contentType = response.headers.get('Content-Type');
            console.log(`addReply - Content-Type: ${contentType}`);

            if (response.status === 201 && contentType && contentType.includes('application/json')) {
                return response.json();
            } else {
                throw new Error(`서버 응답 오류: ${response.status}`);
            }
        })
        .then(newReply => {
            console.log("새 댓글 추가됨:", newReply);
            const commentLists = document.querySelector(".comment-lists");

            const listItem = document.createElement("li");
            listItem.setAttribute('data-reply-id', newReply.id); // 댓글 ID를 데이터 속성으로 설정
            listItem.setAttribute('data-member-id', newReply.memberId); // 댓글 작성자 ID를 데이터 속성으로 설정
            const formattedDate = new Date(newReply.createdDate).toLocaleDateString();

            // 댓글 HTML 구성
            let innerHTML = `
                <div class="wrap-comment">
                    <div class="comment-view">
                        <span class="nickname mark-expert">${newReply.memberNickname}</span>
                        <span class="comment-txt">${newReply.replyContent}</span>
                        <div class="comment-info">
                            <span class="comment-from">${formattedDate}</span>
                        </div>
                    </div>
                    <div class="btn-controll">
                        <button type="button" class="btn-comment-etc-modi" data-reply-id="${newReply.id}" data-state="modify">
                            <img src="/images/community/modify-icon.png" alt="수정 아이콘">
                        </button>
                        <button type="button" class="btn-comment-etc-del" data-reply-id="${newReply.id}">
                            <img src="/images/community/delete-icon.png" alt="삭제 아이콘">
                        </button>
                    </div>
                </div>
            `;

            listItem.innerHTML = innerHTML;

            // 이벤트 리스너 추가 (수정 및 삭제)
            const modifyButton = listItem.querySelector('.btn-comment-etc-modi');
            const deleteButton = listItem.querySelector('.btn-comment-etc-del');

            modifyButton.addEventListener('click', function () {
                handleModifyButtonClick(postId, newReply);
            });

            deleteButton.addEventListener('click', function () {
                handleDeleteButtonClick(postId, newReply);
            });

            commentLists.prepend(listItem); // 새 댓글을 목록의 맨 위에 추가

            document.getElementById('contents').value = ''; // 입력 필드 비우기
        })
        .catch(error => {
            console.error("댓글 추가 중 오류 발생:", error);
            alert(error.message || "댓글을 추가하는 데 문제가 발생했습니다.");
        });
}

// 댓글 수정 버튼 클릭 시 핸들러 함수
function handleModifyButtonClick(postId, reply) {
    const listItem = document.querySelector(`[data-reply-id="${reply.id}"]`).closest('li');
    const commentTxt = listItem.querySelector('.comment-txt');
    const modifyButton = listItem.querySelector('.btn-comment-etc-modi');
    const modifyButtonImg = modifyButton.querySelector('img');

    // 현재 버튼의 상태 확인
    const currentState = modifyButton.getAttribute('data-state');

    if (currentState === 'modify') {
        // 수정 모드로 전환
        const originalContent = commentTxt.textContent;
        commentTxt.setAttribute('data-original-content', originalContent); // 원래 내용을 데이터 속성으로 저장

        const textarea = document.createElement('textarea');
        textarea.value = originalContent;
        textarea.classList.add('modify-comment');

        commentTxt.innerHTML = '';
        commentTxt.appendChild(textarea);

        // 버튼을 저장 모드로 변경
        modifyButtonImg.src = '/images/community/save-icon.png'; // 저장 아이콘 경로
        modifyButtonImg.alt = '저장 아이콘';
        modifyButton.setAttribute('data-state', 'save');
    } else if (currentState === 'save') {
        // 저장 모드: 수정 내용 저장
        const textarea = commentTxt.querySelector('textarea');
        const updatedContent = textarea.value.trim();
        const originalContent = commentTxt.getAttribute('data-original-content');

        if (updatedContent === "") {
            alert("댓글 내용을 입력해주세요.");
            return;
        }

        if (updatedContent === originalContent) {
            alert("수정된 내용이 없습니다.");
            // 수정 취소: 원래 내용으로 되돌림
            commentTxt.innerHTML = originalContent;
            modifyButtonImg.src = '/images/community/modify-icon.png'; // 수정 아이콘 경로
            modifyButtonImg.alt = '수정 아이콘';
            modifyButton.setAttribute('data-state', 'modify');
            return;
        }

        // 댓글 수정 요청
        updateReply(postId, reply.id, reply.memberId, updatedContent);
    }
}

// 댓글 수정하기 함수
function updateReply(postId, replyId, memberId, newContent) {
    const url = `/community/replies-update/${replyId}`;

    const replyData = {
        replyContent: newContent,
        memberId: memberId
    };

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(replyData)
    })
        .then(response => {
            console.log(`updateReply - 응답 상태: ${response.status}`);
            const contentType = response.headers.get('Content-Type');
            console.log(`updateReply - Content-Type: ${contentType}`);

            if (response.status === 204) {
                // 본문이 없는 경우
                return null;
            } else if (response.ok && contentType && contentType.includes('application/json')) {
                return response.json();
            } else {
                throw new Error(`서버 응답 오류: ${response.status}`);
            }
        })
        .then(updatedReply => {
            const listItem = document.querySelector(`[data-reply-id="${replyId}"]`).closest('li');
            const commentTxt = listItem.querySelector('.comment-txt');
            const modifyButton = listItem.querySelector('.btn-comment-etc-modi');
            const modifyButtonImg = modifyButton.querySelector('img');

            if (updatedReply) {
                console.log("댓글이 수정되었습니다:", updatedReply);
                // DOM에서 댓글 내용 업데이트
                commentTxt.textContent = updatedReply.replyContent;
            } else {
                // 서버가 204 No Content를 반환한 경우, newContent로 DOM 업데이트
                commentTxt.textContent = newContent;
            }

            // 버튼을 다시 수정 모드로 변경
            modifyButtonImg.src = '/images/community/modify-icon.png'; // 수정 아이콘 경로
            modifyButtonImg.alt = '수정 아이콘';
            modifyButton.setAttribute('data-state', 'modify');

            alert("댓글이 성공적으로 수정되었습니다.");
        })
        .catch(error => {
            console.error("댓글 수정 중 오류 발생:", error);
            alert(error.message || "댓글을 수정하는 데 문제가 발생했습니다.");
        });
}

// 댓글 삭제 버튼 클릭 시 핸들러 함수
function handleDeleteButtonClick(postId, reply) {
    const confirmDelete = confirm("정말로 댓글을 삭제하시겠습니까?");
    if (confirmDelete) {
        console.log(`댓글 ID: ${reply.id} 삭제 중`);
        deleteReply(postId, reply.id, reply.memberId);
    }
}

// 댓글 삭제하기 함수
function deleteReply(postId, replyId, memberId) {
    const url = `/community/replies-delete/${replyId}?memberId=${memberId}`;

    fetch(url, {
        method: 'DELETE',
        credentials: 'include'
    })
        .then(response => {
            console.log(`deleteReply - 응답 상태: ${response.status}`);
            if (response.status === 204 || response.status === 200) { // 204 No Content 또는 200 OK
                // DOM에서 삭제된 댓글 제거
                const replyElement = document.querySelector(`[data-reply-id="${replyId}"]`).closest('li');
                if (replyElement) {
                    replyElement.remove();
                    alert("댓글이 삭제되었습니다.");
                } else {
                    console.error(`댓글 요소 ID: ${replyId}를 찾을 수 없습니다.`);
                }
            } else {
                throw new Error(`서버 응답 오류: ${response.status}`);
            }
        })
        .catch(error => {
            console.error("댓글 삭제 중 오류 발생:", error);
            alert(error.message || "댓글을 삭제하는 데 문제가 발생했습니다.");
        });
}
