// 남은 일수를 계산하는 함수
function calculateDaysLeft(endDate) {
    const today = new Date();
    const end = new Date(endDate);

    // 마감일까지의 차이를 밀리초로 계산
    const difference = end - today;

    // 차이를 일수로 계산
    return Math.ceil(difference / (1000 * 60 * 60 * 24));
}

// 남은 일수를 계산
const daysLeft = calculateDaysLeft(noticeEndDate);

// 남은 일수에 따라 D- 형식을 업데이트
document.addEventListener("DOMContentLoaded", function() {
    const ddayDisplay = document.getElementById("dday-display");
    if (daysLeft > 0) {
        ddayDisplay.innerHTML = `D-${daysLeft}`;
    } else if (daysLeft === 0) {
        ddayDisplay.innerHTML = `D-DAY`;
    } else {
        ddayDisplay.innerHTML = `마감`;
    }
});

// 함수: 남은 시간 계산
function calculateRemainingTime() {
    // 시작일과 마감일 가져오기
    const startDate = new Date(document.getElementById('start-date').textContent);
    const endDate = new Date(document.getElementById('end-date').textContent);

    // 현재 날짜와 시간 가져오기
    const now = new Date();

    // 마감일까지 남은 시간 계산
    const remainingTime = endDate - now; // 밀리초 단위

    if (remainingTime < 0) {
        // 마감일이 지났을 경우
        document.getElementById('remaining-days').textContent = "0";
        document.getElementById('remaining-time').textContent = "00:00:00";
        clearInterval(intervalId); // 타이머 정지
        return;
    }

    // 남은 시간을 초 단위로 변환
    const remainingSeconds = Math.floor(remainingTime / 1000);

    // 일, 시간, 분, 초 계산
    const days = Math.floor(remainingSeconds / (24 * 3600));
    const hours = Math.floor((remainingSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;

    // HTML 요소 업데이트
    document.getElementById('remaining-days').textContent = days;
    document.getElementById('remaining-time').textContent =
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// 매초마다 남은 시간을 계산하는 타이머 설정
const intervalId = setInterval(calculateRemainingTime, 1000);

// 초기 호출: 페이지 로드 시 즉시 계산
calculateRemainingTime();