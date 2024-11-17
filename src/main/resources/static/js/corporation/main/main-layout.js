// 파일
const uuid = document.getElementById("uuid");
const path = document.getElementById("path");
const fileInput = document.getElementById("fileInput");
const logoImg = document.getElementById("corporation-logo");
// const tipBox = document.querySelector(".TipBox");

fileInput.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (file.type.startsWith("image")) {
        const formData = new FormData(document.getElementById("uploadForm"));
        // 여기에 파일을 추가
        formData.append("file", file);

        // 파일 업로드 요청
        const fileInfo = await corporationService.upload(formData);
        console.log("File Info:", fileInfo); // fileInfo 내용을 확인합니다.

        // uuid와 path 값을 업데이트
        uuid.value = fileInfo.fileName.substring(0, fileInfo.fileName.indexOf("_"));
        path.value = fileInfo.filePath;

        logoImg.src = `/file/display?fileName=${fileInfo.filePath}/${fileInfo.fileName}`;
        tipBox.style.display = 'none';

        // 폼 자동 제출
        document.getElementById("uploadForm").submit();
    } else {
        alert("이미지 파일이 아닙니다.");
        e.target.value = "";
    }
});

const ulElement = document.querySelector('.list-curation-item');
ulElement.innerHTML = '';
let text = '';

notices.forEach((notice) => {
    // 날짜 문자열에서 년, 월, 일 부분 추출
    const [year, month, day] = notice.noticeEndDate.split(' ')[0].split('-');
    const formattedEndDate = `${year}년 ${month}월 ${day}일`;
    text += `
            <li>
                <a href="/corporation/notice-preview?id=${notice.id}"  class="newcomer-link-view" target="_blank">
                    <div class="list-curation-slide">
                        <span class="announcement">
                            ${notice.noticeTitle}
                            <span class="cover"></span>
                        </span>
                        <div class="desc-bottom">
                            <div class="info">
                                <span>${notice.noticeCareer}</span>
                                <span>${notice.noticeEducation}</span>
                                <span>${notice.corporationAddress}</span>
                            </div>
                        </div>
                        <span class="day">~ ${formattedEndDate}</span>
                    </div>
                </a>
                
                <button type="button" class="newcomer-book-mark like-btn btn-scrap" title="스크랩">
                    <span class="blind">스크랩</span>
                </button>
            </li>
        `;
});
/*홈페이지 지원 버튼 class="newcomer-book-mark like-btn btn-scrap"위에 들어가 있던 코드
<div className="btn-immediately-wrap">
    <a className="position-btn-sm" href="${notice.corporationHomepage}" title="홈페이지 지원">
        <span className="position-btn-homepage-apply">홈페이지 지원</span>
    </a>
</div>*/

// 생성된 HTML을 ul 요소에 추가
ulElement.innerHTML += text;

// 서버에서 받아온 개업일 값
const openingDateStr = document.getElementById("company-opening-date").textContent.trim();

// 개업일이 "YYYY-MM-DD" 형태일 것이라 가정하고 처리
const date = new Date(openingDateStr);
const year = date.getFullYear();
const month = date.getMonth() + 1; // 0부터 시작하므로 +1
const day = date.getDate();

// 날짜 포맷: "YYYY년 MM월 DD일"
const formattedDate = year + "년 " + month + "월 " + day + "일";

// 개업일 표시
document.getElementById("company-opening-date").textContent = formattedDate + " 설립";

// 현재 날짜와 비교하여 업력 계산
const currentYear = new Date().getFullYear();
const seniority = currentYear - year;

// 업력 표시
document.getElementById("company-seniority").textContent = "업력 " + seniority + "년차";