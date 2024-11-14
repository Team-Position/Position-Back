// 이벤트 리스너: 추가 버튼 클릭 시 새로운 항목 추가
const btnAddModify = document.querySelector(".btn-job-category");
btnAddModify.addEventListener('click', () => {
    jobcategoryService.getCategoryA(renderCategoryButtons);
    jobcategoryService.getCategoryA(addJobListItems);
});
