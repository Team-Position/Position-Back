
document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById("help-upload");
    const fileNameDisplay = document.querySelector(".txt-upload");
    const deleteButton = document.querySelector(".btn-delete");
    const form = document.getElementById("write-form");

    let uploadedFileName = null; // 업로드된 파일명을 저장

// 숨겨진 input 요소 추가
    const hiddenFileNameInput = document.getElementById("hidden-file-name");


    hiddenFileNameInput.type = "hidden";
    hiddenFileNameInput.name = "fileName"; // InquiryDTO와 매핑
    form.appendChild(hiddenFileNameInput);

    // 파일 업로드 이벤트
    fileInput.addEventListener("change", function () {
        const file = fileInput.files[0];
        if (!file) {
            console.error("파일이 선택되지 않았습니다.");
            return;
        }

        // 서버로 파일 업로드
        const formData = new FormData();
        formData.append('file', file);

        fetch('/customer-service-center/upload', {
            method: 'POST',
            body: formData
        })
            .then(response => response.text())
            .then(fileName => {
                if (fileName !== "error") {
                    console.log('파일이 성공적으로 업로드되었습니다:', fileName);
                    uploadedFileName = fileName; // 파일명 저장

                    // 파일명을 숨겨진 입력 필드에 저장
                    hiddenFileNameInput.value = fileName;

                    // 파일명 표시
                    fileNameDisplay.textContent = file.name;
                    fileNameDisplay.style.display = "inline-block";
                    deleteButton.style.display = "inline-block";
                } else {
                    console.error('파일 업로드 실패.');
                }
            })
            .catch(error => {
                console.error('에러 발생:', error);
            });
    });
    // 파일 삭제 이벤트
    deleteButton.addEventListener("click", function () {
        if (uploadedFileName) {
            // 서버에서 파일 삭제 로직이 필요하면 추가 구현

            // 숨겨진 입력 필드 값 제거
            hiddenFileNameInput.value = "";

            // 파일 입력 필드 및 표시 초기화
            fileInput.value = "";
            fileNameDisplay.textContent = "";
            fileNameDisplay.style.display = "none";
            deleteButton.style.display = "none";
            uploadedFileName = null;
        }
    });

    // 체크박스 이벤트
    const checkboxes = document.querySelectorAll(
        '.position-input3 > input[type="checkbox"]'
    );

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("click", () => {
            const label = checkbox.nextElementSibling;
            if (checkbox.checked) {
                // 체크되었을 때 label에 스타일 추가
                label.style.backgroundPosition = "0 -48px";
            } else {
                // 체크 해제되었을 때 원래대로 되돌림
                label.style.backgroundPosition = "";
            }
        });
    });

    // 드롭다운 선택 이벤트
    const dropdownOptions = document.querySelectorAll("#help-category option");
    dropdownOptions.forEach((option) => {
        option.addEventListener("click", (e) => {
            const selectedValue = option.value; // 선택된 값 가져오기
            document.getElementById("selected-category").textContent = `선택된 카테고리: ${selectedValue}`;
        });
    });

    // 폼 제출 이벤트
    form.addEventListener("submit", function (event) {
        // 파일이 업로드되지 않았을 경우 폼 제출 방지
        if (!uploadedFileName) {
            event.preventDefault();
            alert("파일을 업로드하세요.");
            return;
        }

        // 문의 유형 확인
        const inquiryType = document.querySelector('input[name="inquiryType"]:checked');
        if (!inquiryType) {
            e.preventDefault(); // 폼 제출 중단
            alert("문의 유형을 선택하세요.");
            return;
        }

        console.log("폼 제출 준비 완료");
    });
});


