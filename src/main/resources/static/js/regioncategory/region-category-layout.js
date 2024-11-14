// 필요한 DOM 요소를 미리 선택합니다.
const btnArea = document.querySelector('.btn-area');
const wrapScrollDepth1 = document.querySelector('.wrap-scroll.depth1');
const overviewList = wrapScrollDepth1.querySelector('.overview ul');
const listCheck = document.querySelector('.list-check');
const previewSelected = document.querySelector('#sp-preview-selected'); // 선택 결과가 들어갈 div
const resetText = document.querySelector('.reset-txt'); // 텍스트 초기화 div

// 대카 리스트를 렌더링하는 함수
const renderCategoryAList = (categoriesA) => {
    overviewList.innerHTML = ''; // 기존 대카 리스트 초기화

    categoriesA.forEach((category, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('depth1-btn-wrapper');

        listItem.innerHTML = `
            <button type="button" class="depth1-btn-${category.id}">
                <span class="txt">${category.regionCategoryAName}</span>
            </button>
        `;

        // 대카 항목 클릭 시 소카 리스트 렌더링
        listItem.querySelector('button').addEventListener('click', () => {
            // 선택된 대카 항목에만 'on' 클래스 추가
            document.querySelectorAll('.depth1-btn-wrapper').forEach(item => {
                item.classList.remove('on');
            });
            listItem.classList.add('on');

            // 선택된 대카 ID로 소카 데이터를 가져와 렌더링
            regionCategoryService.getCategoryB(category.id, renderCategoryBList);

            // 현재 선택된 대카의 이름을 전역 변수로 저장
            selectedCategoryAName = category.regionCategoryAName;
        });

        overviewList.appendChild(listItem); // 대카 항목 추가

        // 첫 번째 항목 자동 선택 및 클릭 이벤트 트리거
        if (index === 0) {
            listItem.classList.add('on'); // 'on' 클래스 추가
            listItem.querySelector('button').click(); // 첫 번째 버튼 클릭
        }
    });
};

// 전역 변수로 선택된 대카 이름을 저장
let selectedCategoryAName = "";

// 소카 리스트를 렌더링하는 함수
const renderCategoryBList = (categoriesB) => {
    listCheck.innerHTML = ''; // 기존 소카 리스트 초기화
    let content = '';

    // 객체의 각 키를 순회합니다.
    Object.keys(categoriesB).forEach((region) => {
        // 각 키에 속하는 배열 값을 순회하여 소카 리스트 생성
        categoriesB[region].forEach((subRegion) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <div class="inpChk">
                    <input type="checkbox" name="locations" value="${subRegion}" id="categoryB-${subRegion}">
                    <label class="lbl" for="categoryB-${subRegion}">
                        <span class="txt">${subRegion}</span>
                    </label>
                </div>
            `;

            // 체크박스 변경 시 이벤트 추가
            listItem.querySelector('input').addEventListener('change', (event) => {
                if (event.target.checked) {
                    // 체크된 경우 선택 항목 추가
                    addSelectedCategory(selectedCategoryAName, subRegion);
                } else {
                    // 체크 해제된 경우 선택 항목 제거
                    removeSelectedCategory(subRegion);
                }
            });

            listCheck.appendChild(listItem);
        });
    });
};

// 선택된 대카 및 소카 정보를 sp-preview-selected에 추가하는 함수
const addSelectedCategory = (categoryAName, categoryBName) => {
    const selectedSpan = document.createElement('span');
    selectedSpan.classList.add('selected-keyword');
    selectedSpan.id = `selected-${categoryBName}`; // 고유 ID 추가

    selectedSpan.innerHTML = `
        ${categoryAName} &gt; ${categoryBName}
        <button type="button" id="sp-preview-job-category" class="btn-del remove-btn">
            삭제
        </button>
    `;

    // 삭제 버튼에 클릭 이벤트 추가하여 선택 항목을 제거
    selectedSpan.querySelector('.remove-btn').addEventListener('click', () => {
        previewSelected.removeChild(selectedSpan);
        // 해당 소카 항목의 체크박스도 해제
        document.querySelector(`#categoryB-${categoryBName}`).checked = false;
    });

    previewSelected.appendChild(selectedSpan);

    updateResetTextVisibility();
};

// 선택된 항목을 제거하는 함수
const removeSelectedCategory = (categoryBName) => {
    const selectedSpan = document.querySelector(`#selected-${categoryBName}`);
    if (selectedSpan) {
        previewSelected.removeChild(selectedSpan);
        // 선택 항목 확인 후 .reset-txt 표시 상태 업데이트
        updateResetTextVisibility();
    }
};

// 선택된 항목이 있는지 확인하고 .reset-txt 요소 표시 상태를 업데이트하는 함수
const updateResetTextVisibility = () => {
    if (previewSelected.children.length === 0) {
        resetText.style.display = 'block'; // 선택 항목이 없으면 표시
    } else {
        resetText.style.display = 'none'; // 선택 항목이 있으면 숨김
    }
};

// 대카 리스트 가져오기 및 렌더링 트리거
btnArea.addEventListener('click', () => {
    regionCategoryService.getCategoryA(renderCategoryAList);
});
