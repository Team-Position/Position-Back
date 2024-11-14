const matchingService = (() => {
    const getList = async (page, formData,  callback) =>{
        page = page || 1;
        const response = await fetch(`/corporation/notices/all-list/${page}`, {
            method: "post",
            body: formData
        });
        const notices = await response.json();

        // total 값 추출
        const total = notices.pagination.total;

        // total 값을 화면에 출력
        document.getElementById("sp-preview-total-cnt").innerText = total;

        if(callback) {
            callback(notices);
        }
    }

    return {getList:getList};
})()