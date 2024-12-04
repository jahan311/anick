$(document).ready(function () {
    // AOS 초기화
    AOS.init();

    // 스크롤 이벤트: 헤더 클래스 추가/제거
    $(window).on("scroll", function () {
        const scrollPos = $(window).scrollTop();
        $("header").toggleClass("scroll", scrollPos > 250);
    });
    
    // About: 스크롤 다운 버튼 표시 제어
    $(window).on("scroll", function () {
        const scrollPos = $(window).scrollTop();
        const windowHeight = $(window).height();
        const documentHeight = $(document).height();

        const sc02 = $(".about .sc02");
        if (sc02.length) {
            const sc02Top = sc02.offset().top;
            const sc02Height = sc02.outerHeight();
            const triggerPoint = sc02Top + sc02Height * 0.5;

            const isTriggerActive =
                scrollPos + windowHeight > triggerPoint &&
                scrollPos + windowHeight < documentHeight;
            $(".about .scroll_down").toggleClass("show", isTriggerActive);
        }
    });

    // About: 카드 스크롤 애니메이션 설정
    const ul = document.querySelector(".about .sc03 .card_box ul");
    const liItems = document.querySelectorAll(".about .sc03 .card_box ul li");
    const itemHeight = liItems[0].offsetHeight;
    const sc03 = document.querySelector(".about .sc03");

    const cloneCount = Math.ceil(window.innerHeight / itemHeight) + 2;
    for (let i = 0; i < cloneCount; i++) {
        liItems.forEach((item) => {
            const clone = item.cloneNode(true);
            ul.appendChild(clone);
        });
    }

    const totalHeight = itemHeight * ul.children.length;
    const animationDuration = (totalHeight / itemHeight) * 2.7;
    ul.style.animation = `scrolling ${animationDuration}s linear infinite`;
    ul.style.animationDelay = "2s";
    ul.style.animationPlayState = "paused";

    ul.addEventListener("mouseover", () => {
        ul.style.animationPlayState = "paused";
    });

    ul.addEventListener("mouseout", () => {
        ul.style.animationPlayState = "running";
    });

    const handleScroll = () => {
        const sc03Rect = sc03.getBoundingClientRect();
        const sc03Middle = sc03Rect.top + sc03Rect.height * 0.7;
        const windowHeight = window.innerHeight;
        const isSc03Visible = sc03Middle < windowHeight && sc03Rect.bottom > 500;
        ul.style.animationPlayState = isSc03Visible ? "running" : "paused";
    };

    $(window).on("scroll", handleScroll);
    handleScroll();

    // About: 블러 효과 제어
    const blurElement = $(".about .sc03 .blur");
    const sc03Element = $(".about .sc03");

    sc03Element.on("mousemove", function (event) {
        const sc03Offset = sc03Element.offset();
        const mouseX = event.pageX - sc03Offset.left;
        const mouseY = event.pageY - sc03Offset.top;

        blurElement.css({
            left: mouseX - blurElement.width() / 2 + "px",
            top: mouseY - blurElement.height() / 2 + "px",
        });
    });
});
