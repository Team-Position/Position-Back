const items = document.querySelector(".items.swiper-wrapper");
const slides = document.querySelectorAll(".items .item");
const prevButton = document.querySelector(".btn-prev");
const nextButton = document.querySelector(".btn-next");

let count = 1; // 현재 슬라이드 인덱스
const totalSlides = slides.length - 1; // 총 슬라이드 개수
const firstSlideWidth = 216; // 첫 슬라이드 이동 거리
const subsequentSlideWidth = 208; // 나머지 슬라이드 이동 거리
const lastSlideWidth = 50; // 마지막 슬라이드 이동 거리

const updateSlidePosition = () => {
    let translateX;

    if (count === 1) {
        translateX = 0; // 첫 슬라이드일 때는 이동하지 않음
    } else if (count === 2) {
        translateX = -firstSlideWidth; // 두 번째 슬라이드로 이동
    } else if (count < totalSlides) {
        translateX = -(firstSlideWidth + subsequentSlideWidth * (count - 2)); // 나머지 슬라이드 이동
    } else {
        translateX = -(
            firstSlideWidth +
            subsequentSlideWidth * (totalSlides - 3) +
            lastSlideWidth
        ); // 마지막 슬라이드 이동
    }

    items.style.transition = "transform 0.5s";
    items.style.transform = `translateX(${translateX}px)`;

    // 버튼 활성화/비활성화 상태 업데이트
    if (count === 1) {
        prevButton.classList.add("swiper-button-disabled");
        prevButton.setAttribute("aria-disabled", "true");
    } else {
        prevButton.classList.remove("swiper-button-disabled");
        prevButton.setAttribute("aria-disabled", "false");
    }

    if (count === totalSlides) {
        nextButton.classList.add("swiper-button-disabled");
        nextButton.setAttribute("aria-disabled", "true");
    } else {
        nextButton.classList.remove("swiper-button-disabled");
        nextButton.setAttribute("aria-disabled", "false");
    }
};

// 이전 버튼 클릭 이벤트
prevButton.addEventListener("click", () => {
    if (count > 1) {
        count--; // 인덱스 감소
        updateSlidePosition(); // 슬라이드 위치 업데이트
    }
});

// 다음 버튼 클릭 이벤트
nextButton.addEventListener("click", () => {
    if (count < totalSlides) {
        count++; // 인덱스 증가
        updateSlidePosition(); // 슬라이드 위치 업데이트
    }
});

// 초기 슬라이드 위치 설정
updateSlidePosition();

// 배너 위 탭 요소 선택시
const buttons = document.querySelectorAll(
    "button.tab-recruit, button.tab-jobs-major, button.tab-jobs-public"
);

// 각 버튼에 클릭 이벤트 추가
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        // 모든 버튼에서 'active' 클래스 제거
        buttons.forEach((btn) => btn.classList.remove("active"));

        // 클릭된 버튼에만 'active' 클래스 추가
        button.classList.add("active");
    });
});

const btnTrackList = document.querySelectorAll(".btn-scrap.track-event");

btnTrackList.forEach((btnTrack) => {
    btnTrack.addEventListener("click", (e) => {
        // 클릭된 버튼에 대해 "on" 클래스를 토글
        btnTrack.classList.toggle("on");

        // 클릭된 버튼의 aria-pressed 속성을 토글
        const isPressed = btnTrack.getAttribute("aria-pressed") === "true";
        btnTrack.setAttribute("aria-pressed", !isPressed);
    });
});

// const btnQuickList = document.querySelectorAll(".-ga-quick");
// btnQuickList.forEach((btnQuick) => {
//     btnQuick.addEventListener("click", (e) => {
//         // 모든 버튼에서 'on' 클래스 제거
//         btnQuickList.forEach((btn) => btn.classList.remove("on"));

//         // 클릭한 버튼에만 'on' 클래스 추가
//         btnQuick.classList.add("on");
//     });
// });

const btnQuickList = document.querySelectorAll(".-ga-quick");
const btnTop = document.querySelector(".btn-top");

// 각 버튼에 클릭 이벤트 추가
btnQuickList.forEach((btnQuick) => {
    btnQuick.addEventListener("click", () => {
        // 모든 버튼에서 'on' 클래스 제거
        btnQuickList.forEach((btn) => btn.classList.remove("on"));

        // 클릭된 버튼에 'on' 클래스 추가
        btnQuick.classList.add("on");

        // 클릭된 버튼의 value 속성값으로 대상 섹션 찾기
        const targetId = `section-${btnQuick.value}`; // 'section-' 접두어 추가
        const targetElement = document.getElementById(targetId);

        // 해당 위치로 즉시 이동
        if (targetElement) {
            targetElement.scrollIntoView(); // 부드러운 스크롤 없이 이동
        }
    });
});

// 'TOP' 버튼 클릭 시 이벤트 처리
btnTop.addEventListener("click", () => {
    // 맨 위로 즉시 스크롤
    window.scrollTo(0, 0);

    // 모든 버튼에서 'on' 클래스 제거
    btnQuickList.forEach((btn) => btn.classList.remove("on"));

    // 첫 번째 버튼에 'on' 클래스 추가
    if (btnQuickList.length > 0) {
        btnQuickList[0].classList.add("on");
    }
});
