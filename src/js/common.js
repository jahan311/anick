$(document).ready(function () {
    AOS.init();

    $(window).on("scroll", function () {
        const scrollPos = $(window).scrollTop();
        const windowHeight = $(window).height();
        const documentHeight = $(document).height();

        $("header").toggleClass("scroll", scrollPos > 250);

        const sc02 = $(".sc02");
        if (sc02.length) {
            const sc02Top = sc02.offset().top;
            const sc02Height = sc02.outerHeight();
            const triggerPoint = sc02Top + sc02Height * 0.5;

            const isTriggerActive =
                scrollPos + windowHeight > triggerPoint &&
                scrollPos + windowHeight < documentHeight;
            $(".scroll_down").toggleClass("show", isTriggerActive);
        }
    });

    const ul = document.querySelector(".sc03 .card_box ul");
    const liItems = document.querySelectorAll(".sc03 .card_box ul li");
    const itemHeight = liItems[0].offsetHeight;
    const sc03 = document.querySelector(".sc03");

    const cloneCount = Math.ceil(window.innerHeight / itemHeight) + 2;
    for (let i = 0; i < cloneCount; i++) {
        liItems.forEach(item => {
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

    const blurElement = $('.sc03 .blur');
    const sc03Element = $('.sc03');

    sc03Element.on('mousemove', function(event) {
        const sc03Offset = sc03Element.offset();
        const mouseX = event.pageX - sc03Offset.left;
        const mouseY = event.pageY - sc03Offset.top;

        blurElement.css({
            left: mouseX - blurElement.width() / 2 + 'px',
            top: mouseY - blurElement.height() / 2 + 'px'
        });
    });
});
