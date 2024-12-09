document.addEventListener("DOMContentLoaded", function () {
    const navBtn = document.querySelector(".mo_nav_btn");
    const mobileNav = document.querySelector(".mo_nav");
    const body = document.body;

    navBtn.addEventListener("click", function () {
        // 버튼에 on 클래스 토글
        navBtn.classList.toggle("on");

        // 네비게이션에 hide 클래스 토글
        mobileNav.classList.toggle("hide");

        // body에 scroll-lock 클래스 토글
        body.classList.toggle("scroll-lock");
    });
});
