
globalThis.loadingFlag = false;
window.addEventListener("scroll", (e) => {
    // console.log(window.innerHeight + window.scrollY)
    // console.log(document.body.offsetHeight)
    // console.log(loadingFlag);
    if(loadingFlag){
        globalThis.loadingFlag = false;
        return;
    }

    if((window.innerHeight + window.scrollY+ 10) >= document.body.offsetHeight) {
        globalThis.loadingFlag = true;
        matchingService.getList(++globalThis.page,formData, showListScroll);
    }
});




// 창 높이 조절
// MutationObserver 설정
const targetNode = document.querySelector('.box-detail-depth .viewport');
const config = { childList: true, subtree: true };

const callback = (mutationsList) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            // 자식 노드가 변경되면 높이 업데이트
            const parent = targetNode.closest('.box-detail-depth');
            updateParentHeight(parent);
        }
    }
};

const observer = new MutationObserver(callback);
observer.observe(targetNode, config);
// 창 높이 조절
document.querySelector('.box-detail-jobs').addEventListener('click', (event) => {
    console.log('클릭된 요소:', event.target); // 클릭된 요소 로그 출력
    // 클릭한 요소가 .btn-expand 버튼인지 확인
    if (event.target.classList.contains('btn-expand')) {
        const button = event.target;
        const rowItem = button.closest('.row-item');
        rowItem.classList.toggle('expand');

        // 부모 요소의 높이 재조정
        const parent = rowItem.closest('.box-detail-depth');
        updateParentHeight(parent);
    }

});

/**
 * 부모 높이를 모든 row-item의 높이에 맞게 업데이트하고,
 * 관련된 .box-onedepth의 높이도 동일하게 맞춤
 */
function updateParentHeight(parent) {
    const rowList = parent.closest('.box-detail-jobs').querySelector('.row.list'); // .row.list 찾기
    const depthViewport = parent.querySelector('.viewport'); // depth 관련 viewport
    let totalHeight = 0;

    // 모든 row-item의 높이를 합산
    depthViewport.querySelectorAll('.row-item').forEach(item => {
        totalHeight += item.scrollHeight; // 각 row-item의 전체 높이 추가
    });

    // 부모 .viewport의 높이 설정
    depthViewport.style.height = totalHeight + 'px';

    // .row.list의 높이 설정
    if (rowList) {
        rowList.style.height = totalHeight + 'px';
    }

    // 관련된 .box-onedepth의 높이도 동일하게 설정
    const boxOnedepth = parent.closest('.box-detail-jobs').querySelector('.box-onedepth');
    if (boxOnedepth) {
        boxOnedepth.style.height = totalHeight + 'px';
    }
}

// 처음 대카 선택
// 모든 .item-job.depth1-btn-wrapper 요소를 선택
listOverview.addEventListener("click", (event) => {
    const clickedItem = event.target.closest(".item-job.depth1-btn-wrapper");

    if (clickedItem) {
        // 모든 요소에서 'on' 클래스 제거
        listOverview.querySelectorAll(".item-job").forEach(item => item.classList.remove("on"));

        // 클릭된 요소에만 'on' 클래스 추가
        clickedItem.classList.add("on");
    }
});

// // 2단계: box-jobs와 box-detail-jobs 사이 토글
document.querySelector(".box-jobs").addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-job")) {
        const boxJobs = document.querySelector(".box-jobs");
        const boxDetailJobs = document.querySelector(".box-detail-jobs");

        boxJobs.style.display = "none";
        boxDetailJobs.style.display = "block";
    }
});

