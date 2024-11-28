// document.addEventListener("DOMContentLoaded", () => {
//     const fileInput = document.getElementById("help-upload");
//     const fileNameDisplay = document.querySelector(".txt-upload");
//     const deleteButton = document.querySelector(".btn-delete");
//     let uploadedFileName = null; // 업로드된 파일명을 저장
//
//     // 파일 업로드 이벤트
//     fileInput.addEventListener("change", () => {
//         const file = fileInput.files[0];
//         if (file) {
//             const formData = new FormData();
//             formData.append("file", file);
//
//             // 서버로 파일 업로드 요청
//             fetch("/customer-service-center/upload", {
//                 method: "POST",
//                 body: formData,
//             })
//                 .then((response) => response.text())
//                 .then((fileName) => {
//                     if (fileName !== "error") {
//                         uploadedFileName = fileName;
//                         fileNameDisplay.textContent = file.name;
//                         fileNameDisplay.style.display = "inline-block";
//                         deleteButton.style.display = "inline-block";
//                         console.log("파일 업로드 성공:", fileName);
//                     } else {
//                         alert("파일 업로드에 실패했습니다.");
//                     }
//                 })
//                 .catch((error) => {
//                     console.error("파일 업로드 중 오류 발생:", error);
//                     alert("파일 업로드 중 오류가 발생했습니다.");
//                 });
//         }
//     });
//
//     // 파일 삭제 이벤트
//     deleteButton.addEventListener("click", () => {
//         uploadedFileName = null;
//         fileInput.value = "";
//         fileNameDisplay.textContent = "";
//         fileNameDisplay.style.display = "none";
//         deleteButton.style.display = "none";
//     });
//
//     // 체크박스 이벤트
//     const checkboxes = document.querySelectorAll(
//         '.position-input3 > input[type="checkbox"]'
//     );
//
//     checkboxes.forEach((checkbox) => {
//         checkbox.addEventListener("click", () => {
//             const label = checkbox.nextElementSibling;
//             if (checkbox.checked) {
//                 // 체크되었을 때 label에 스타일 추가
//                 label.style.backgroundPosition = "0 -48px";
//             } else {
//                 // 체크 해제되었을 때 원래대로 되돌림
//                 label.style.backgroundPosition = "";
//             }
//         });
//     });
//
//     // 드롭다운 선택 이벤트
//     const dropdownOptions = document.querySelectorAll("#help-category option");
//     dropdownOptions.forEach((option) => {
//         option.addEventListener("click", (e) => {
//             const selectedValue = option.value; // 선택된 값 가져오기
//             document.getElementById("selected-category").textContent = `선택된 카테고리: ${selectedValue}`;
//         });
//     });
//
//     // 문의하기 버튼 클릭 이벤트
//     const helpSendButton = document.getElementById("help-send");
//     helpSendButton.addEventListener("click", (e) => {
//         e.preventDefault();
//
//         if (!uploadedFileName) {
//             alert("파일을 업로드하세요.");
//             return;
//         }
//
//         // `inquiryType` 값 가져오기
//         const inquiryType = document.querySelector('input[name="inquiryType"]:checked');
//         if (!inquiryType) {
//             alert("문의 유형을 선택하세요.");
//             return;
//         }
//
//         const inquiryTypeValue = inquiryType.value;
//         console.log("선택된 문의 유형:", inquiryTypeValue);
//
//         // 서버로 데이터 전송
//         const data = {
//             fileName: uploadedFileName,
//             inquiryType: inquiryTypeValue, // 선택된 문의 유형 추가
//         };
//
//         fetch("/customer-service-center/inquiry", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data),
//         })
//             .then((response) => {
//                 if (response.ok) {
//                     console.log("문의 등록 성공");
//                     location.href = "/customer-service-center/faq";
//                 } else {
//                     throw new Error("문의 등록 실패");
//                 }
//             })
//             .catch((error) => {
//                 console.error("문의 등록 중 오류 발생:", error);
//                 alert("문의 등록 중 오류가 발생했습니다.");
//             });
//     });
// });
document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById("help-upload");
    const fileNameDisplay = document.querySelector(".txt-upload");
    const deleteButton = document.querySelector(".btn-delete");
    const form = document.getElementById("write-form");

    let uploadedFileName = null; // 업로드된 파일명을 저장

    // 숨겨진 input 요소 추가
    const hiddenFileNameInput = document.getElementById("hidden-file-name");
    const hiddenFilePathInput = document.getElementById("hidden-file-path");
    const hiddenFileSizeInput = document.getElementById("hidden-file-size");

    hiddenFileNameInput.type = "hidden";
    hiddenFileNameInput.name = "fileName"; // InquiryDTO와 매핑
    form.appendChild(hiddenFileNameInput);

    // 파일 업로드 이벤트
    fileInput.addEventListener("change", () => {
        const file = fileInput.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);

            // 서버로 파일 업로드 요청
            fetch("/customer-service-center/upload", {
                method: "POST",
                body: formData,
            })
                .then((response) => response.text())
                .then((fileName) => {
                    if (fileName !== "error") {
                        uploadedFileName = fileName;
                        hiddenFileNameInput.value = uploadedFileName; // 숨겨진 input에 파일명 저장
                        fileNameDisplay.textContent = file.name;
                        fileNameDisplay.style.display = "inline-block";
                        deleteButton.style.display = "inline-block";
                        console.log("파일 업로드 성공:", fileName);
                    } else {
                        alert("파일 업로드에 실패했습니다.");
                    }
                })
                .catch((error) => {
                    console.error("파일 업로드 중 오류 발생:", error);
                    alert("파일 업로드 중 오류가 발생했습니다.");
                });
        }
    });

    // 파일 삭제 이벤트
    deleteButton.addEventListener("click", () => {
        uploadedFileName = null;
        hiddenFileNameInput.value = ""; // 숨겨진 input 값 초기화
        fileInput.value = "";
        fileNameDisplay.textContent = "";
        fileNameDisplay.style.display = "none";
        deleteButton.style.display = "none";
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
    form.addEventListener("submit", (e) => {
        console.log("파일 이름(hiddenFileNameInput):", hiddenFileNameInput.value);
        // 파일 업로드 확인
        if (!uploadedFileName) {
            e.preventDefault(); // 폼 제출 중단
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
