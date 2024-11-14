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
    // blur될 때 스타일을 원래대로 복구합니다.
    keywordSection.classList.remove("on");
    // optionContentKeywordSection.classList.remove("on");
    layerSearchKeyword.classList.add("no-suggest");
    updateTotalAndFetchData(); // 직업 선택 시 total과 데이터를 업데이트
});

btnReset.addEventListener("click", () => {
    previewSelected.innerHTML = ``;
    resetText.style.display = "block";
    // selectedCategories 초기화
    Object.keys(selectedCategories).forEach((categoryBName) => {
        // 체크된 항목의 체크박스를 해제
        const checkbox = document.querySelector(`#categoryB-${categoryBName}`);
        if (checkbox) {
            checkbox.checked = false;
        }
    });
    selectedCategories = {}; // selectedCategories 객체 초기화

    const depthButtons = document.querySelectorAll(".btn-three-depth.on");
    depthButtons.forEach(button => button.classList.remove("on"));

    optionContents.forEach(optionContent => {
        optionContent.classList.remove("on");
    });
    const formData=null;
    matchingService.getList(1, formData, showListScroll);
});