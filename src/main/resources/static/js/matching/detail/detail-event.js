// 카카오 맵
document.querySelector('.btn-mapview.relay-map').addEventListener('click', ()=> {
    // 주소 가져오기
    const addressElement = document.querySelector('.spr-jview.txt-adr span:last-child'); // 두 번째 span 요소 선택
    const address = addressElement.innerText; // 주소 텍스트 가져오기

    // 주소로 위도와 경도를 얻기 위한 API 호출
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(address, function(results, status) {
        if (status === kakao.maps.services.Status.OK) {
            const url = `https://map.kakao.com/link/search/${address}`;

            // 새 창 열기
            window.open(url, "_blank"); // 새 탭에서 열기
        } else {
            alert('주소를 찾을 수 없습니다. 상태: ' + status);
        }
    });
});


// 공유버튼 누르면 url 복사
document.querySelector(".btn-share").addEventListener('click', ()=> {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
        alert('URL이 클립보드에 복사되었습니다.');
    })
});

const changeResumeBtn = document.getElementById("change-resume");

changeResumeBtn.addEventListener("click", () => {
    location.href="/my-page/resume-management";
});

// 결제 버튼 클릭 이벤트
document.querySelector(".meta-pixel-event").addEventListener("click", () => {
    const workId = document.querySelector(".layout").getAttribute("data-work-id");
    const memberProfileId = document.querySelector(".layout").getAttribute("data-member-id");
    const profileName = document.querySelector(".layout").getAttribute("data-profile-name");
    const profilePhone = document.querySelector(".layout").getAttribute("data-profile-phone");
    const profileEmail = document.querySelector(".layout").getAttribute("data-profile-email");
    const workTitle = document.querySelector(".layout").getAttribute("data-work-title");
    const resumeId = document.querySelector(".layout").getAttribute("data-resume-id");
    // const workPrice = document.querySelector(".work-price .price-detail").textContent.replace("원", "").trim();
    // const workTitle = document.querySelector(".title").textContent;

    // console.log("workPrice:", workPrice);
    console.log("workTitle:", workTitle);
    console.log("memberProfileId:", memberProfileId);
    console.log("profileName:", profileName);
    console.log("profilePhone:", profilePhone);
    console.log("profileEmail:", profileEmail);

    // 이력서가 없는 경우 경고창을 띄우고 결제 요청 중지
    if (!resumeId) {
        alert("이력서를 작성해야 지원할 수 있습니다.");
        return;
    }

    Bootpay.requestPayment({
        application_id: "66c6a758cc5274a3ac3fc099",
        price: 10000,
        order_name: workTitle,
        order_id: workId,
        pg: "카카오페이",
        method: "간편",
        tax_free: 0,
        user: {
            id: memberProfileId,
            username: profileName,
            phone: profilePhone,
            email: profileEmail
        },
        items: [
            {
                id: workId,
                name: workTitle,
                qty: 1,
                price: 10000
            }
        ],
        extra: {
            open_type: "iframe",
            card_quota: "0,2,3",
            escrow: false
        }
    })
        .then(async (response) => {
            console.log("결제 응답:", response); // 결제 성공 응답 로그 출력
            const paymentData = {
                paymentStatus: response.data.status_locale,
                paymentMethod: response.data.pg,
                paymentAmount: response.data.price,
                noticeId: workId,
                memberId: memberProfileId
            };
            // 첫 번째 요청: 결제 정보 저장
            await fetch("/payment/complete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(paymentData)
            });

            // 두 번째 요청: 지원 정보 저장
            const applyData = {
                noticeId: workId,
                resumeId: resumeId,  // resumeId 값 설정
            };

            await fetch("/apply/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(applyData)
            });

            alert("결제가 성공적으로 완료되었습니다.");
            window.location.href = `/`;
        })
        .catch((error) => {
            console.error("결제 요청 중 오류 발생:", error.message);
            alert("결제 중 오류가 발생했습니다. 다시 시도해주세요.");
        });
});
