const fetchChangeName = async (memberId) => {
    try {
        const changedName = document.querySelector("#change-name").value;
        const response = await fetch('/change/name', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                memberId: memberId,
                changedName: changedName
            })
        });

        if (response.ok) {
            viewName.innerHTML = changedName;
        }

    } catch(error) {
        console.error("수정된 이름을 저장하는 중 오류 발생 : " + error);
    }
}

// const fetchChangeBirthDay = async (memberId) => {
//     try {
//         const changedBirthDay = document.querySelector("#select-year").value;
//         const response = await fetch(`/change/name/${memberId}`);
//         const data = await response.json();
//     } catch {
//         console.error("수정된 이름을 저장하는 중 오류 발생 : " + error);
//     }
// }
//
// const fetchChangeAddress = async (memberId) => {
//     try {
//         const response = await fetch(`/change/name/${memberId}`);
//         const data = await response.json();
//     } catch {
//         console.error("수정된 이름을 저장하는 중 오류 발생 : " + error);
//     }
// }