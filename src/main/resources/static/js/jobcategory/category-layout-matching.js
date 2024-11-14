const boxJobs = document.querySelector('.box-jobs');
const listOverview = document.querySelector(".list.overview"); // <ul> 요소 선택

const renderCategoryButtons = (categories) => {
    boxJobs.innerHTML = ''; // 기존 내용 삭제
    let text = ``;

    categories.forEach((category) => {
       text += `<button type="button" class="btn-job" data-category="${category.id}">${category.jobCategoryAName}</button>`;
    });
    boxJobs.innerHTML += text;

    // 버튼 클릭 이벤트 설정
    setButtonClickEvents();
};

// 버튼 클릭 이벤트 설정 함수
const setButtonClickEvents = () => {
    const buttons = boxJobs.querySelectorAll(".btn-job");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const categoryId = button.getAttribute("data-category");
            highlightJobItem(categoryId); // 해당 카테고리의 <li> 항목에 'on' 클래스 추가
            jobcategoryService.getCategoryB(categoryId, renderCategories);
        });
    });

    // 새로운 버튼이 추가된 후 first-depth 버튼의 이벤트 리스너 설정
    const firstDepthButtons = listOverview.querySelectorAll(".first-depth");
    firstDepthButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const categoryId = button.getAttribute("data-category");
            highlightJobItem(categoryId);
            jobcategoryService.getCategoryB(categoryId, renderCategories);
        });
    });
};

// 선택한 카테고리에 해당하는 항목에 'on' 클래스 추가
const highlightJobItem = (categoryId) => {
    // 모든 <li> 요소에서 'on' 클래스 제거
    listOverview.querySelectorAll(".item-job").forEach(item => item.classList.remove("on"));

    // 해당하는 <li> 요소에만 'on' 클래스 추가
    const targetItem = listOverview.querySelector(`.item-job[data-category="${categoryId}"]`);
    if (targetItem) {
        targetItem.classList.add("on");
    }
};

// <ul> 목록에 항목 추가
const addJobListItems = (categories) => {
    listOverview.innerHTML =''; // 기존 내용 삭제
    let text = ``;

    categories.forEach((category) => {
        text += `<li class="item-job depth1-btn-wrapper" data-category="${category.id}">
                    <button type="button" data-category="${category.id}" class="first-depth">
                        <span class="txt">${category.jobCategoryAName}</span>
                    </button>
                </li>`
    })

    listOverview.innerHTML += text;
    setButtonClickEvents();
};

const categoryContainer = document.getElementById("categoryB");
const selectedJobContainer = document.getElementById("sp-preview-selected"); // 선택한 직무를 표시할 영역

// Category B와 C를 렌더링하는 함수
const renderCategories = (categoriesBWithC) => {
    let content = ""; // HTML 문자열 초기화

    Object.keys(categoriesBWithC).forEach((categoryA) => {
        const categoriesB = categoriesBWithC[categoryA];
        Object.keys(categoriesB).forEach((categoryB) => {
            // 중카(B) 이름을 사용하여 버튼 생성
            content += `
                <dl class="row-item">
                    <dt>
                        <button type="button" class="btn-expand">
                            <span class="txt">${categoryB}</span>
                        </button>
                    </dt>
                    <dd class="area-list">`;

            // 카테고리 C 버튼 추가
            const categoryCArray = categoriesB[categoryB];
            categoryCArray.forEach((categoryC) => {
                content += `
                       <button type="button" class="btn-three-depth" data-categoryA="${categoryA}" data-categoryB="${categoryB}" data-categoryC="${categoryC}">${categoryC}</button>`;
            });

            content += `
                    </dd>
                </dl>`;
        });
    });

    categoryContainer.innerHTML = content; // 생성된 HTML 문자열을 설정

    // 각 btn-three-depth 버튼에 클릭 이벤트 추가
    const depthButtons = document.querySelectorAll(".btn-three-depth");
    depthButtons.forEach((button) => {
        button.addEventListener("click", handleDepthButtonClick);
    });
};

// btn-three-depth 클릭 시 호출되는 함수
const handleDepthButtonClick = (event) => {
    const button = event.target;

    // 현재 버튼에 on 클래스 토글 (추가 또는 제거)
    button.classList.toggle("on");

    const categoryA = button.getAttribute("data-categoryA");
    const categoryB = button.getAttribute("data-categoryB");
    const categoryC = button.getAttribute("data-categoryC");

    // 선택된 직무를 표시할 span 태그 내용
    const spanContent = `
        ${categoryA}
            <button type="button" class="btnDelete deleteToDepth">
                <span class="blind">삭제</span>
            </button> &nbsp;&gt;&nbsp;&nbsp;${categoryC}
            <button type="button" class="btn-delete deleteToKeyword">
                <span class="blind">삭제</span>
            </button>
        `;

    // 이미 선택된 직무인지 확인
    const existingSpans = selectedJobContainer.querySelectorAll(".job-selected");

    // 버튼이 선택된 경우
    if (button.classList.contains("on")) {
        if (existingSpans.length >= 5) {
            alert("최대 5개의 직무만 선택할 수 있습니다."); // Show an alert
            button.classList.remove("on"); // Remove the "on" class if limit is exceeded
            return; // Stop the execution
        }
        // 새로운 span을 추가
        const newSpan = document.createElement("span");
        newSpan.className = "job-selected";
        newSpan.innerHTML = `${categoryA}
            <button type="button" class="btnDelete deleteToDepth">
                <span class="blind">삭제</span>
            </button> &nbsp;&gt;&nbsp;&nbsp;${categoryC}
            <button type="button" class="btn-delete deleteToKeyword">
                <span class="blind">삭제</span>
            </button>`;

        selectedJobContainer.appendChild(newSpan);

        // 삭제 버튼에 클릭 이벤트 추가
        const deleteButton = newSpan.querySelector(".btn-delete");
        deleteButton.addEventListener("click", () => handleDeleteButtonClick(newSpan, button));
    } else {
        // 버튼이 선택 해제된 경우, 해당 직무 삭제
        const selectedJobSpan = Array.from(existingSpans).find(span =>
            span.textContent.includes(categoryC) && span.textContent.includes(categoryA)
        );
        if (selectedJobSpan) {
            selectedJobContainer.removeChild(selectedJobSpan);
        }
    }

    // 선택된 직무가 없을 경우 메시지 추가/제거
    updateNoSelectionMessage();
};

// btn-delete 클릭 시 호출되는 함수
const handleDeleteButtonClick = (selectedJobSpan, relatedButton) => {
    // 삭제할 span 태그 찾기
    if (selectedJobSpan) {
        selectedJobContainer.removeChild(selectedJobSpan);
    }

    // 관련된 btn-three-depth 버튼에서 on 클래스 제거
    relatedButton.classList.remove("on");

    // 선택된 직무가 없을 경우 메시지 추가/제거
    updateNoSelectionMessage();
};

// 선택된 직무가 없을 경우 메시지를 업데이트하는 함수
const updateNoSelectionMessage = () => {
    const existingSpans = selectedJobContainer.querySelectorAll(".job-selected");
    const noSelectionSpan = document.querySelector(".no-selection");

    if (existingSpans.length === 0) {
        // 선택된 직무가 없을 경우 메시지 추가
        if (!noSelectionSpan) {
            const message = document.createElement("span");
            message.className = "no-selection";
            message.textContent = "선택된 직무가 없습니다";
            selectedJobContainer.appendChild(message);
        }
    } else {
        // 선택된 직무가 있을 경우 메시지 제거
        if (noSelectionSpan) {
            selectedJobContainer.removeChild(noSelectionSpan);
        }
    }
};

// btn-job-confirm 클릭 시 호출되는 함수
// const handleJobConfirmClick = () => {
//     // 희망 직무 리스트 요소 선택
//     const hopeJobsList = document.querySelector(".list-task.list-hope-jobs.size-type5.selected-preview-list");
//
//     // 모든 유효성 검사를 통과한 경우, 원래의 기능을 진행
//     hopeJobsList.innerHTML ='';
//
//     const selectedJobs = selectedJobContainer.querySelectorAll(".job-selected");
//     selectedJobs.forEach(job => {
//         // 대카와 소카를 파싱
//         const categoryA = job.childNodes[0].nodeValue.trim(); // 대카값
//         const categoryC = job.childNodes[2].nodeValue.trim(); // 소카값
//         const cleanedCategory = categoryC.replace(/[\s>&nbsp;]/g, ''); // 공백, >, &nbsp; 제거
//
//         // 새로운 li 요소 생성
//         const liElement = document.createElement("li");
//         liElement.innerHTML = `
//             <span class="hope_jobs" style="color:#566feb;">${categoryA}
//                 <button type="button" class="btnDelete deleteToDepth">
//                     <span class="blind">삭제</span>
//                 </button>&nbsp;&nbsp;
//             </span>
//             <span class="hope_jobs">
//                 <input type="hidden" name="noticeJobCategoryName" th:field="*{noticeJobCategoryName}" value="${cleanedCategory}"/>
//                 >&nbsp;&nbsp;${cleanedCategory}
//                 <button type="button" class="btn-delete deleteToKeyword">
//                     <span class="blind">삭제</span>
//                 </button>
//             </span>
//         `; // 대카와 소카값으로 구조 설정
//
//         // 삭제 버튼에 클릭 이벤트 추가
//         const deleteButton = liElement.querySelector(".btn-delete");
//         if (deleteButton) {
//             deleteButton.addEventListener("click", () => {
//                 liElement.remove(); // liElement 삭제
//                 updateNoSelectionMessage(); // 메시지 업데이트
//             });
//         }
//
//         hopeJobsList.appendChild(liElement); // ul에 li 추가
//     });
//     // 선택된 직무 span 태그들 삭제
//     selectedJobs.forEach(job => {
//         selectedJobContainer.removeChild(job);
//     });
//     updateNoSelectionMessage();
// };
//
//
// // btn-job-confirm 버튼에 클릭 이벤트 추가
// const jobConfirmButton = document.querySelector(".btn-job-confirm");
// if (jobConfirmButton) {
//     jobConfirmButton.addEventListener("click", handleJobConfirmClick);
// }

// 유효성 검사 함수
// const validateForm = () => {
//     const hopeJobsList = document.querySelector(".list-task.list-hope-jobs.size-type5.selected-preview-list");
//     const noticeTitle = document.getElementById("NoticeTitle"); // 제목 체크
//     const internshipStartDate = document.getElementById("internshipStartDate"); // 인턴 시작일 체크
//     const internshipEndDate = document.getElementById("internshipEndDate"); // 인턴 종료일 체크
//     const workStartTime = document.getElementById("workStartTime"); // 근무 시작 시간 체크
//     const workEndTime = document.getElementById("workEndTime"); // 근무 종료 시간 체크
//     const selectedCareer = document.getElementById("interview-history"); // 경력 선택 체크
//     const selectedEducation = document.getElementById("noticeEducation"); // 학력 선택 체크
//     const dueDate = document.getElementById("dueDate"); // 마감일 체크
//     const fileInput = document.getElementById("file"); // 파일 입력 체크
//
//     // 유효성 검사 플래그
//     let isValid = true;
//
//     // 1. NoticeTitle이 비어 있는지 체크
//     if (!noticeTitle.value.trim()) {
//         alert("제목을 입력해주세요."); // 알림 메시지
//         noticeTitle.focus();
//         return false; // 유효성 검사 실패 시 즉시 종료
//     }
//
//     // 2. 희망 직무 리스트에 <li> 항목이 없는지 체크
//     if (hopeJobsList.children.length === 0) {
//         alert("희망 직무를 선택해주세요."); // 알림 메시지
//         hopeJobsList.focus();
//         return false; // 유효성 검사 실패 시 즉시 종료
//     }
//
//     // 3. internshipStartDate가 비어 있는지 체크
//     if (!internshipStartDate.value.trim()) {
//         alert("인턴 시작일을 입력해주세요."); // 알림 메시지
//         internshipStartDate.focus();
//         return false; // 유효성 검사 실패 시 즉시 종료
//     }
//
//     // 4. internshipEndDate가 비어 있는지 체크
//     if (!internshipEndDate.value.trim()) {
//         alert("인턴 종료일을 입력해주세요."); // 알림 메시지
//         internshipEndDate.focus();
//         return false; // 유효성 검사 실패 시 즉시 종료
//     }
//
//     // 5. workStartTime이 비어 있는지 체크
//     if (!workStartTime.value.trim()) {
//         alert("근무 시작 시간을 입력해주세요."); // 알림 메시지
//         return false; // 유효성 검사 실패 시 즉시 종료
//     }
//
//     // 6. workEndTime이 비어 있는지 체크
//     if (!workEndTime.value.trim()) {
//         alert("근무 종료 시간을 입력해주세요."); // 알림 메시지
//         workEndTime.focus();
//         return false; // 유효성 검사 실패 시 즉시 종료
//     }
//
//     // 7. 경력 선택이 비어 있는지 체크
//     if (!selectedCareer.value) {
//         alert("경력을 선택해주세요."); // 알림 메시지
//         selectedCareer.focus();
//         return false; // 유효성 검사 실패 시 즉시 종료
//     }
//
//     // 8. 학력 선택이 비어 있는지 체크
//     if (!selectedEducation.value) {
//         alert("학력을 선택해주세요."); // 알림 메시지
//         selectedEducation.focus();
//         return false; // 유효성 검사 실패 시 즉시 종료
//     }
//
//     // 9. dueDate가 비어 있는지 체크
//     if (!dueDate.value.trim()) {
//         alert("마감일을 입력해주세요."); // 알림 메시지
//         dueDate.focus();
//         return false; // 유효성 검사 실패 시 즉시 종료
//     }
//
//     // 10. 파일이 첨부되지 않았는지 체크
//     if (!fileInput.value) {
//         alert("파일을 첨부해주세요."); // 알림 메시지
//         fileInput.focus();
//         return false; // 유효성 검사 실패 시 즉시 종료
//     }
//
//     // 모든 유효성 검사를 통과한 경우
//     return isValid;
// };
//
// // submitBtn 클릭 시 유효성 검사 후 기능 실행
// const submitButton = document.getElementById("submitBtn");
// if (submitButton) {
//     submitButton.addEventListener("click", (event) => {
//         const isFormValid = validateForm();
//         if (!isFormValid) {
//             event.preventDefault(); // 유효성 검사 실패 시 폼 제출 중단
//         }
//     });
// }