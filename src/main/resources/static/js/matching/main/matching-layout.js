const noticeLayout = document.getElementById("notice-list");
const noticeTop4Layout = document.getElementById("notice-top-4")

noticeLayout.innerHTML=``;
noticeTop4Layout.innerHTML=``;

const showListScroll = ({notices, pagination}) =>{
    let text=``;

    // console.log("pagination.rowCount:", pagination.rowCount);
    // console.log("notices.length:", notices.length);
    // 다음 페이지 없을 때,
    if(pagination.rowCount >= notices.length){
        globalThis.loadingFlag = true;
    }else{
        notices.pop();
    }
    notices.forEach((notice) => {
        const fileDTO = notice.fileDTO;
        const logoUrl =`/file/display?fileName=${fileDTO.filePath}/${fileDTO.fileName}`;

        text += `
        <li class="item">
            <a href="" target="-blank" title="${notice.noticeTitle}">
                <span class="logo">
                    <img src="${logoUrl}" alt="${notice.corporationName}">
                </span>
                <strong class="tit">${notice.noticeTitle}</strong>
                <span class="corp">${notice.corporationName}</span>
                <ul class="desc">
                    <li class="company-local ellipsis">${notice.corporationAddress}</li>
                    <li>${notice.noticeCareer}</li>
                    <li>${notice.noticeEducation}
                        <span class="above">이상</span>
                    </li>
                </ul>
                <span class="date">D-2</span>
            </a>
            <button type="button" class="btn-scrap scrap-${notice.id}" title="스크랩">
                <img src="//www.saraminimage.co.kr/common/bul_sri_star.png" alt="스크랩">
            </button>
        </li>
        `;
    });
    noticeLayout.innerHTML += text;
}

let text=``;
top4Notices.notices.forEach((notice) =>{

    const fileDTO = notice.fileDTO;
    const logoUrl =`/file/display?fileName=${fileDTO.filePath}/${fileDTO.fileName}`;

    text+=`
    <li class="item">
            <a href="" target="-blank" title="${notice.noticeTitle}">
                <span class="logo">
                    <img src="${logoUrl}" alt="${notice.corporationName}">
                </span>
                <strong class="tit">${notice.noticeTitle}</strong>
                <span class="corp">${notice.corporationName}</span>
                <ul class="desc">
                    <li class="company-local ellipsis">${notice.corporationAddress}</li>
                    <li>${notice.noticeCareer}</li>
                    <li>${notice.noticeEducation}
                        <span class="above">이상</span>
                    </li>
                </ul>
                <span class="date">D-2</span>
            </a>
            <button type="button" class="btn-scrap scrap-${notice.id}" title="스크랩">
                <img src="//www.saraminimage.co.kr/common/bul_sri_star.png" alt="스크랩">
            </button>
        </li>
    `
})
noticeTop4Layout.innerHTML = text;


let formData = null;  // 전역 formData 변수
globalThis.page = 1;

// 첫 로딩 시 데이터 요청
matchingService.getList(globalThis.page, formData, showListScroll);

// 검색 버튼 클릭 시
const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", () => {
    updateTotalAndFetchData(); // 검색 버튼을 눌렀을 때 total과 데이터를 업데이트
});
// 부모 요소에 이벤트 위임 적용
const jobContainer = document.querySelector(".box-detail-jobs");  // jobButtons의 부모 요소 (예시)
jobContainer.addEventListener("click", (event) => {
    // 클릭된 요소가 .btn-three-depth일 경우
    if (event.target && event.target.matches(".btn-three-depth")) {
        updateTotalAndFetchData(); // 직업 선택 시 total과 데이터를 업데이트
    }
});

// 부모 요소에 이벤트 위임 적용
const locationContainer = document.querySelector(".wrap-depth-category");  // locationCheckboxes의 부모 요소 (예시)
locationContainer.addEventListener("change", (event) => {
    // 클릭된 요소가 input[name='locations']일 경우
    if (event.target && event.target.matches("input[name='locations']")) {
        updateTotalAndFetchData(); // 위치 선택 시 total과 데이터를 업데이트
    }
});
// // 직업 선택 시
// const jobButtons = document.querySelectorAll(".btn-three-depth");
// jobButtons.forEach(button => {
//     button.addEventListener("click", () => {
//         updateTotalAndFetchData(); // 직업 선택 시 total과 데이터를 업데이트
//     });
// });
//
// // 위치 선택 시
// const locationCheckboxes = document.querySelectorAll("input[name='locations']");
// locationCheckboxes.forEach(checkbox => {
//     checkbox.addEventListener("change", () => {
//         updateTotalAndFetchData(); // 위치 선택 시 total과 데이터를 업데이트
//     });
// });

// `total` 값을 갱신하고 데이터를 가져오는 함수
function updateTotalAndFetchData() {
    const keyword = document.getElementById("total-ipt-keyword").value;
    const buttons = document.querySelectorAll(".btn-three-depth.on");
    const locations = document.querySelectorAll("input[name='locations']:checked");

    // 새로 formData 생성
    formData = new FormData();
    formData.append("keyword", keyword); // 검색 정보 추가

    // 선택된 직업 정보
    buttons.forEach(button =>
        formData.append("jobs", button.getAttribute("data-categoryc"))
    );

    // 선택된 위치 정보
    locations.forEach((checkbox) => {
        formData.append("locations", checkbox.value); // 여러 값 추가
    });

    // 페이지 1로 초기화
    globalThis.page = 1;

    // 기존 목록 초기화
    noticeLayout.innerHTML = ``;

    // 데이터를 가져오고 total 값을 업데이트
    matchingService.getList(globalThis.page, formData, showListScroll);
}


// const searchBtn = document.getElementById("search-btn");
// // 버튼 클릭시마다 formData 새로 생성
// searchBtn.addEventListener("click", () => {
//     const keyword = document.getElementById("total-ipt-keyword").value;
//     const buttons = document.querySelectorAll(".btn-three-depth.on");
//     const locations = document.querySelectorAll("input[name='locations']:checked");
//
//     // 새로 formData 생성
//     formData = new FormData();
//     formData.append("keyword", keyword); // 검색 정보 추가
//
//     if (buttons.length > 0) {
//         buttons.forEach(button =>
//             formData.append("jobs", button.getAttribute("data-categoryc")));
//     }
//
//     // 선택된 locations만 다시 추가
//     locations.forEach((checkbox) => {
//         formData.append("locations", checkbox.value); // 여러 값 추가
//     });
//
//     // 페이지 1로 초기화
//     globalThis.page = 1;
//
//     // 기존 목록 초기화
//     noticeLayout.innerHTML = ``;
//
//     // 검색 요청
//     matchingService.getList(globalThis.page, formData, showListScroll);
// });
