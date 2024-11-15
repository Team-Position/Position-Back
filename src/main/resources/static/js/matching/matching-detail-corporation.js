const interestButton = document.querySelector(
    ".btn-jview.spr-jview.btn-interest"
);

interestButton.addEventListener("click", (e) => {
    // console.log(e.target);
    e.target.classList.toggle("on");
});
