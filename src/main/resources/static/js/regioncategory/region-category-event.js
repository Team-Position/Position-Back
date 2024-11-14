// 필요한 요소들을 선택합니다.
const btnKeyword = document.querySelector(".btn-keyword");
const keywordInput = document.querySelector("#total-ipt-keyword");
const keywordSection = document.querySelector(".keyword-section");
const optionContentKeywordSection = document.querySelector(".option-content.keyword-section");
const layerSearchKeyword = document.querySelector(".layer-search-keyword");
const btnReset = document.querySelector(".btn-reset");

// btn-keyword 버튼 클릭 이벤트 리스너 추가
btnKeyword.addEventListener("click", () => {
    // keyword-section에 "on" 클래스 추가
    keywordSection.classList.add("on");

    // option-content keyword-section에 "on" 클래스 추가
    optionContentKeywordSection.classList.add("on");

    // layer-search-keyword에서 "no-suggest" 클래스 제거
    layerSearchKeyword.classList.remove("no-suggest");
});

// 입력 필드에 focus 이벤트 리스너 추가
keywordInput.addEventListener("focus", () => {
    // focus될 때 스타일을 변경합니다.
    keywordSection.classList.add("on");
    optionContentKeywordSection.classList.add("on");
    layerSearchKeyword.classList.remove("no-suggest");
});

// 입력 필드에 blur 이벤트 리스너 추가
keywordInput.addEventListener("blur", () => {
    const keyword = document.getElementById("total-ipt-keyword").value;

    // blur될 때 스타일을 원래대로 복구합니다.
    keywordSection.classList.remove("on");
    // optionContentKeywordSection.classList.remove("on");
    layerSearchKeyword.classList.add("no-suggest");
    formData = new FormData();
    formData.append("keyword", keyword); // 검색 정보 추가
    matchingService.getList(1, formData, showListScroll);
});

btnReset.addEventListener("click", () => {
    previewSelected.innerHTML = ``;
    resetText.style.display = "block";
    optionContents.forEach(optionContent => {
        optionContent.classList.remove("on");
    });
    const formData=null;
    matchingService.getList(1, formData, showListScroll);
})