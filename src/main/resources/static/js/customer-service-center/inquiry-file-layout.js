// HTML 요소 가져오기
const fileInput = document.getElementById("help-upload");
const uploadsContainer = document.querySelector(".uploads");

// 파일 업로드 이벤트 처리
fileInput.addEventListener("change", async (e) => {
    const file = e.target.files[0];

    // 파일이 선택되지 않은 경우 처리 중단
    if (!file) return;

    // 파일 유효성 검사
    const validTypes = [
        "application/pdf",
        "application/zip",
        "application/msword",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/bmp"
    ];

    if (!validTypes.includes(file.type)) {
        alert("유효하지 않은 파일 형식입니다.");
        e.target.value = ""; // 입력 초기화
        return;
    }

    if (file.size > 10 * 1024 * 1024) {
        alert("파일 크기는 10MB를 초과할 수 없습니다.");
        e.target.value = ""; // 입력 초기화
        return;
    }

    // 업로드 요청
    const formData = new FormData();
    formData.append("uploaded-file", file);

    try {
        const fileInfo = await inquiryFileService.upload(formData);

        if (fileInfo) {
            // 업로드 성공 시 UI 업데이트
            uploadsContainer.innerHTML = `
                <span class="info-upload">
                    <span class="txt-upload">${fileInfo.originalName}</span>
                    <button type="button" class="btn-delete" aria-label="파일 삭제"></button>
                </span>
            `;
            alert("파일 업로드가 완료되었습니다.");
        } else {
            alert("파일 업로드에 실패했습니다.");
        }
    } catch (error) {
        console.error("업로드 오류:", error);
        alert("파일 업로드 중 문제가 발생했습니다.");
    }
});
