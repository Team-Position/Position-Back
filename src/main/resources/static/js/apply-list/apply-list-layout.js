const applyPaging = document.querySelector(".PageBox");
const listBody = document.querySelector('.list-recruiting');
const ongoingBtn = document.getElementById("ongoing-btn");
const closedBtn = document.getElementById("closed-btn");
const positionBtn = document.getElementById("position-btn");
const reviewBtn = document.getElementById("review-btn");
const statusInput = document.getElementById("apply-status");
const loadingScreen = document.getElementById("ingRecruitLoading"); // 로딩 화면 요소
const sortingSelect = document.querySelector(".InpBox.sorting-select");
const uploadBtn = document.getElementById("uploadBtn");

const showApplyList = ({applies, pagination,ongoingCount, closedCount}) =>{
    listBody.innerHTML='';
    let pagingText = "";

    let text='';

    applies.forEach(apply => {

        if (statusInput.value === 'ongoing') {
            text += `
             <div class="list-status">
                <div class="row -apply-list" id="apply-list-${apply.applyId}">
                    <div class="col-summary">
                        <strong class="corp">
                            <a href="#" target="-blank">
                                ${apply.memberName}
                            </a>
                        </strong>
                        <div class="recruit">
                            <a href="#" target="-blank">
                                <span class="division">${apply.noticeTitle}</span>
                                <div class="TipBox resume-btn">
                                    <span>${apply.noticeJobCategoryName}</span>
                                    <button type="button" class="data -file-down-resume">이력서</button>
                                </div>
                            </a>
                        </div>
                       
                        <div class="status">
                            <em class="txt-status">${apply.applyStatus}</em>
                            <span class="txt-sub">지원일: ${formatDate(apply.createdDate)}</span>
                        </div>
                    </div>
                    <div class="col-btns col-btn">
                        <div class="action">
                            <span class="date-end"></span>
                        </div>
                        <button type="button" class="BtnType SizeM -apply-cancel" data-id="${apply.applyId}">지원합격</button>
                    </div>
    
                </div>
            </div>
            `;
        } else if (statusInput.value === 'closed') {
            text += `
             <div class="list-status">
                <div class="row -apply-list" id="apply-list-${apply.applyId}">
                    <div class="col-summary">
                        <strong class="corp">
                            <a href="#" target="-blank">
                                ${apply.memberName}
                            </a>
                        </strong>
                        <div class="recruit">
                            <a href="#" target="-blank">
                                <span class="division">${apply.noticeTitle}</span>
                                <div class="TipBox resume-btn">
                                    <span>${apply.noticeJobCategoryName}</span>
                                    <button type="button" class="data -file-down-resume">이력서</button>
                                </div>
                            </a>
                        </div>
                       
                        <div class="status">
                            <em class="txt-status">${apply.applyStatus}</em>
                            <span class="txt-sub">지원일: ${formatDate(apply.createdDate)}</span>
                        </div>
                    </div>
                    <div class="col-btns col-btn">
                        <div class="action">
                            <span class="date-end"></span>
                        </div>
                        <button type="button" class="BtnType SizeM -apply-cancel" data-id="${apply.applyId}">면접합격</button>
                    </div>
                </div>
            </div>
            `;
        } else if (statusInput.value === 'position') {
            text += `
            <div class="list-status">
                <div class="row -apply-list" id="apply-list-${apply.applyId}">
        
                    <div class="col-summary">
                            <strong class="corp">
                                <a href="#" target="-blank">
                                    ${apply.memberName}
                                </a>
                            </strong>
                            <div class="recruit">
                                <a href="#" target="-blank">
                                    <span class="division">${apply.noticeTitle}</span>
                                    <div class="TipBox">
                                        <span>${apply.noticeJobCategoryName}</span>
                                    </div>
                                </a>
                            </div> 
                            
                            ${apply.file ? `
                            <div class="attached upload">
                                <button type="button" class="data -file-down-resume" id="uploadBtn-${apply.applyId}" disabled>등록 완료</button>
                                <input type="file" name="file" id="fileInput-${apply.applyId}" style="display: none;">
                                <input type="hidden" name="uuid" id="uuid-${apply.applyId}">
                                <input type="hidden" name="path" id="path-${apply.applyId}">
                                <input type="hidden" name="applyId" value="${apply.applyId}">
                            </div>
                            ` : `
                            <div class="attached">
                                <button type="button" class="data -file-down-resume" id="uploadBtn-${apply.applyId}" onclick="document.getElementById('fileInput-${apply.applyId}').click();">이수증 업로드</button>
                                <input type="file" name="file" id="fileInput-${apply.applyId}" style="display: none;">
                                <input type="hidden" name="uuid" id="uuid-${apply.applyId}">
                                <input type="hidden" name="path" id="path-${apply.applyId}">
                                <input type="hidden" name="applyId" value="${apply.applyId}">
                            </div>
                            `}
                            <div class="status">
                                <em class="txt-status">${apply.applyStatus}</em>
                                <span class="txt-sub">지원일: ${formatDate(apply.createdDate)}</span>
                            </div>
                    </div>
                    <div class="col-btns col-btn">
                        <div class="action" >
                            <span class="date-end"></span>
                        </div>
                        ${apply.corporationReview ?`
                        <button type="button" class="BtnType SizeM -apply-cancel write-review upload" data-id="${apply.applyId}" disabled>후기작성 완료</button>
                        ` : `
                          <button type="button" class="BtnType SizeM -apply-cancel write-review" data-id="${apply.applyId}" > 후기작성(인턴십)</button>
                        `}
                    </div>
                </div>
            </div>
            `;
        }  else if (statusInput.value === 'review') {
            text +=`
                <div class="list-status">
                    <div class="row -apply-list" id="apply-list-${apply.applyId}">
            
                        <div class="col-summary">
                            <strong class="corp">
                                <a href="#" target="-blank">
                                    ${apply.memberName}
                                </a>
                            </strong>
                            <div class="recruit">
                                <a href="#" target="-blank">
                                    <span class="division">${apply.noticeTitle}</span>
                                    <div class="TipBox">
                                        <span>${apply.noticeJobCategoryName}</span>
                                    </div>
                                </a>
                            </div>
                            ${apply.file ? `
                            <div class="attached upload">
                                <button type="button" class="data -file-down-resume" id="uploadBtn-${apply.applyId}" disabled>등록 완료</button>
                                <input type="file" name="file" id="fileInput-${apply.applyId}" style="display: none;">
                                <input type="hidden" name="uuid" id="uuid-${apply.applyId}">
                                <input type="hidden" name="path" id="path-${apply.applyId}">
                                <input type="hidden" name="applyId" value="${apply.applyId}">
                            </div>
                            ` : `
                            <div class="attached">
                                <button type="button" class="data -file-down-resume" id="uploadBtn-${apply.applyId}" onclick="document.getElementById('fileInput-${apply.applyId}').click();">이수증 업로드</button>
                                <input type="file" name="file" id="fileInput-${apply.applyId}" style="display: none;">
                                <input type="hidden" name="uuid" id="uuid-${apply.applyId}">
                                <input type="hidden" name="path" id="path-${apply.applyId}">
                                <input type="hidden" name="applyId" value="${apply.applyId}">
                            </div>
                            `}
                            <div class="status">
                                <em class="txt-status">${apply.applyStatus}</em>
                                <span class="txt-sub">지원일: ${formatDate(apply.createdDate)}</span>
                                <button type="button" class="btn-report -ai-report complain-btn" data-id="${apply.applyId}">
                                    <svg aria-hidden="true" focusable="false" class="ic">
                                        <use xlink:href="#icon_report"></use>
                                    </svg>
                                    신고하기
                                </button>
                            </div>
                        </div>
                        <div class="col-btns">
                            <div class="action">
                                <span class="date-end"></span>
                            </div>
                            ${apply.corporationReview ?`
                                <button type="button" class="BtnType SizeM -apply-cancel write-review upload" data-id="${apply.applyId}" disabled>후기작성 완료</button>
                                ` : `
                                  <button type="button" class="BtnType SizeM -apply-cancel write-review" data-id="${apply.applyId}" > 후기작성(인턴십)</button>
                                `}
                            <button type="button" id="reviewBtn" class="btn-history -applicant-history" data-review-id="${apply.positionerReviewId}">후기내역</button>
                        </div>

                        <div class="col-history" style="display: none">
                            <div class="view-cont" style="display: block;">
                                <!-- 이모티콘있는곳 -->
                                <div class="info-emoticon">
                                    <dl class="review">
                                        <dt>전반적 평가</dt>
                                        <dd class="spr-review smile">${apply.evaluationOverall}</dd>
                                    </dl>
                                    <dl class="review difficulty">
                                        <dt>난이도</dt>
                                        <dd class="spr-review">${apply.evaluationDifficulty}</dd>
                                    </dl>
                                    <dl class="review result">
                                        <dt>결과</dt>
                                        <dd class="spr-review smile">${apply.evaluationResult}</dd>
                                    </dl>
                                </div>
                                <!-- 인턴십 유형 -->
                                <div class="info-view">
                                    <strong class="tit-view">인턴십 유형</strong>
                                    <ul class="list-item">
                                        <li>${apply.noticeJobCategoryName}</li>
                                    </ul>
                                </div>
                                <!-- 인턴십 팀원 수 -->
                                <div class="info-view">
                                    <strong class="tit-view">팀원 수</strong>
                                    <ul class="list-item">
                                        <li>팀원 5명</li>
                                    </ul>
                                </div>
                                <!-- 진행 및 업무 내용 -->
                                <div class="info-view">
                                    <strong class="tit-view">업무 내용 및 진행 방식</strong>
                                    <p class="txt-desc">
                                        프로젝트 회의 참여 및 코드 리뷰 수행.<br />
                                        팀원들과의 원활한 소통이 필요하며, 적극적인 피드백을 통해 발전 가능.<br />
                                        주 1회 팀 회의 진행, 개별 업무는 자유롭게 진행 가능.
                                    </p>
                                </div>
                                <!-- 인턴십 질문 -->

                                <div class="info-view" id="review-questions-${apply.applyId}">
                                    <strong class="tit-view">인턴십 질문</strong>
                                    
                                </div>
                                <!-- 특이사항 -->
                                <div class="info-view">
                                    <strong class="tit-view">TIP 및 특이사항</strong>
                                    <p class="txt-desc">
                                        ${apply.positionerReviewTips}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
                `;
        }
    });
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
    applyPaging.innerHTML = pagingText;

    const updateButtons = document.querySelectorAll('.-apply-cancel');
    updateButtons.forEach(button => {
        if (statusInput.value !== 'position' && statusInput.value !== 'review') {
            button.addEventListener('click', async () => {
                const applyId = button.getAttribute('data-id'); // 지원 ID 가져오기
                let newStatus = '';


                // statusInput 값에 따라 newStatus 설정
                if (statusInput.value === 'ongoing') {
                    newStatus = '면접 예정';
                } else if (statusInput.value === 'closed') {
                    newStatus = '면접 합격';
                }
                // else if (statusInput.value === 'position') {
                //     newStatus = '인턴십 완료';
                // }
                console.log(`지원 ID: ${applyId}, 새 상태: ${newStatus}`);
                const confirmed = confirm(`정말로 '${newStatus}' 상태로 변경하시겠습니까?`); // 상태 변경 확인
                if (confirmed) {
                    await applyService.update({applyId: applyId, applyStatus: newStatus});
                    loadApplies(); // 업데이트된 상태를 표시하기 위해 리스트를 새로 로드
                }
            });
        }
    });

    // 버튼 클릭 이벤트 리스너 추가
    document.querySelectorAll('.btn-history').forEach(button => {
        button.addEventListener('click', async (event) => {
            const positionerReviewId = event.currentTarget.dataset.reviewId;
            // 버튼이 속한 applyId를 가져옵니다.
            const applyId = event.currentTarget.closest('.row.-apply-list').id.split('-')[2];

            // 질문과 답변을 가져옵니다.
            await applyService.getReviewQuestions(positionerReviewId, (questions) => {
                // review-questions-${applyId}에 대한 부모 요소 선택
                const reviewContainer = document.querySelector(`#review-questions-${applyId}`);

                // 기존의 내용을 비웁니다.
                reviewContainer.innerHTML = '';

                // 첫 번째 요소인지 확인하기 위한 변수
                let isFirst = true;

                // 질문과 답변 추가
                questions.forEach(question => {

                    // 첫 번째 요소일 때만 "인턴십 질문"을 strong 태그에 추가
                    const strongContent = isFirst ? '인턴십 질문' : '';

                    // HTML 문자열을 만들어 추가
                    reviewContainer.innerHTML += `
                    <div class="info-view">
                        <strong class="tit-view">${strongContent}</strong>
                        <ul class="list-question">
                            <li>${question.questionContent}</li>
                        </ul>
                        <ul class="list-item-1">
                            <li>${question.answerContent}</li>
                        </ul>
                    </div>
                `;

                    // 첫 번째 요소 처리 후 isFirst를 false로 설정
                    isFirst = false;
                });
            });
        });
    });

    // 모든 파일 input 요소에 이벤트 리스너 추가
    document.querySelectorAll("input[type='file'][id^='fileInput-']").forEach(fileInput => {
        fileInput.addEventListener("change", async (e) => {
            const applyId = e.target.id.split('-')[1]; // applyId 추출
            const file = e.target.files[0];

            if (file.type.startsWith("image")) {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("applyId", applyId);

                // 파일 업로드 요청
                await applyService.upload(formData);

                // 버튼 텍스트를 "등록 완료"로 변경
                const uploadBtn = document.getElementById(`uploadBtn-${applyId}`);
                uploadBtn.textContent = "등록 완료";
                uploadBtn.disabled = true;  // 버튼 비활성화 (선택 사항)

                // 'attached' 클래스를 가진 부모 요소에 'upload' 클래스 추가
                const attachedDiv = document.querySelector(`#apply-list-${applyId} .attached`);
                attachedDiv.classList.add('upload');  // 'upload' 클래스 추가
            } else {
                alert("이미지 파일이 아닙니다.");
                e.target.value = "";
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
const loadApplies = (page = 1, order = 'recent', status = statusInput.value) => {
    console.log(statusInput.value);
    showLoading(); // 로딩 화면 표시
    applyService.getApplyList(page, order, status, (data) => {
        showApplyList(data, status);
    });
};

// 버튼 클릭 시 상태 변경 및 공고 목록 로드
ongoingBtn.addEventListener("click", () => {
    statusInput.value = 'ongoing'; // 상태를 진행 중으로 설정
    loadApplies();
});

closedBtn.addEventListener("click", () => {
    statusInput.value = 'closed'; // 상태를 마감으로 설정
    loadApplies();
});

positionBtn.addEventListener("click", () => {
    statusInput.value = 'position'; // 상태를 마감으로 설정
    loadApplies();
});

reviewBtn.addEventListener("click", () => {
    statusInput.value = 'review'; // 상태를 마감으로 설정
    loadApplies();
});

// 페이지 전환 함수
function goToPage(page) {
    // const order = sortingSelect.value; // 드롭다운에서 선택된 정렬 기준을 가져옵니다. 추가할떄 아래에도 order 추가
    const status = statusInput.value; // 현재 상태 값을 가져옵니다.
    loadApplies(page, status); // 상태를 유지하면서 공고 목록 로드
}

// 드롭다운 변경 시 공고 목록 로드
// sortingSelect.addEventListener("change", () => {
//     loadApplies(1, sortingSelect.value); // 기본 정렬 기준으로 목록 로드
// });

// 페이지 로드 시 공고 목록 가져오기
document.addEventListener('DOMContentLoaded', () => {
    loadApplies(); // 기본 정렬 기준과 상태로 목록 로드
});

// 날짜 형식을 'YYYY-MM-DD'로 변환하는 함수
const formatDate = (dateString) => {
    if (!dateString) return '날짜 정보 없음'; // 날짜 정보가 없을 때의 기본값 설정
    const date = new Date(dateString);
    return isNaN(date) ? '유효하지 않은 날짜' : date.toISOString().split('T')[0]; // 유효한 날짜가 아니면 기본 메시지 반환
};