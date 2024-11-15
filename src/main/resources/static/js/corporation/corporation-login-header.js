const memberButton = document.querySelector(".btn_member"); // 회원정보 버튼 선택
const memberLayer = document.querySelector(".layer_member"); // 회원정보 레이어 선택

memberButton.addEventListener("click", function () {
    const isExpanded = memberButton.getAttribute("aria-expanded") === "true"; // 레이어가 열려 있는지 확인

    // 회원정보 레이어의 가시성을 토글
    memberLayer.style.display = isExpanded ? "none" : "block";

    // aria-expanded 속성 업데이트
    memberButton.setAttribute("aria-expanded", !isExpanded);
});

// 레이어 외부 클릭 시 레이어 닫기
document.addEventListener("click", function (event) {
    // 버튼이나 레이어 외부를 클릭한 경우
    if (
        !memberButton.contains(event.target) &&
        !memberLayer.contains(event.target)
    ) {
        memberLayer.style.display = "none"; // 레이어 닫기
        memberButton.setAttribute("aria-expanded", "false"); // aria-expanded 속성 업데이트
    }
});
