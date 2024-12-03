document.addEventListener("DOMContentLoaded", function () {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    function initBizBlurEffect() {
        const biz = document.querySelector(".grid_item.biz");
        const blurCursor = document.querySelector(".blur_cursor");

        function addEventListeners() {
            biz.addEventListener("mouseenter", handleMouseEnter);
            biz.addEventListener("mouseleave", handleMouseLeave);
            biz.addEventListener("mousemove", handleMouseMove);
        }

        function removeEventListeners() {
            biz.removeEventListener("mouseenter", handleMouseEnter);
            biz.removeEventListener("mouseleave", handleMouseLeave);
            biz.removeEventListener("mousemove", handleMouseMove);
        }

        function handleMouseEnter() {
            blurCursor.style.display = "block";
        }

        function handleMouseLeave() {
            blurCursor.style.display = "none";
        }

        function handleMouseMove(e) {
            const bizRect = biz.getBoundingClientRect();
            const cursorX = e.clientX - bizRect.left;
            const cursorY = e.clientY - bizRect.top;

            blurCursor.style.left = `${cursorX}px`;
            blurCursor.style.top = `${cursorY}px`;
        }

        if (mediaQuery.matches) {
            addEventListeners();
        }

        mediaQuery.addEventListener("change", (e) => {
            if (e.matches) {
                addEventListeners();
            } else {
                removeEventListeners();
            }
        });
    }

    function initTechVideoControl() {
        const techItem = document.querySelector(".grid_item.tech");
        const techVideo = techItem.querySelector(".video_tech");

        function addEventListeners() {
            techItem.addEventListener("mouseover", handleMouseOver);
            techItem.addEventListener("mouseout", handleMouseOut);
        }

        function removeEventListeners() {
            techItem.removeEventListener("mouseover", handleMouseOver);
            techItem.removeEventListener("mouseout", handleMouseOut);
        }

        function handleMouseOver() {
            techVideo.play();
        }

        function handleMouseOut() {
            techVideo.pause();
        }

        if (mediaQuery.matches) {
            addEventListeners();
        }

        mediaQuery.addEventListener("change", (e) => {
            if (e.matches) {
                addEventListeners();
            } else {
                removeEventListeners();
            }
        });
    }

    function initGridItemClick() {
        const gridItems = document.querySelectorAll(".grid_item");

        // URL 매핑
        const itemLinks = {
            about: "./src/html/about.html",
            biz: "./src/html/biz.html",
            contact: "./#footer",
            portfolio: "./src/biz.html#gamification",
            tech: "./src/tech&data.html",
            ai: "./src/adtech.html#ai",
            ad: "./src/adtech.html",
            gamification: "./src/biz.html#gamification",
            weare: "./src/html/about.html#weare",
        };

        gridItems.forEach((item) => {
            const className = Array.from(item.classList).find((cls) =>
                itemLinks.hasOwnProperty(cls)
            );

            if (className) {
                item.addEventListener("click", (event) => {
                    if (className === "contact") {
                        event.preventDefault();
                        $('html, body').animate({
                            scrollTop: $("#footer").offset().top
                        }, 1500); 
                    } else {
                        window.location.href = itemLinks[className];
                    }
                });
            }
        });
    }

    initBizBlurEffect();
    initTechVideoControl();
    initGridItemClick();
});

$(document).ready(function () {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    let isFooterVisible = false;
    let footerHeight = $('.footer').outerHeight();

    const scrollToFooter = () => $('html, body').animate({ scrollTop: footerHeight }, 500);
    const scrollToMain = () => $('html, body').animate({ scrollTop: 0 }, 500);

    function handleScroll(event) {
        const direction = event.originalEvent.deltaY > 0 ? 'down' : 'up';

        if (direction === 'down' && !isFooterVisible) {
            scrollToFooter();
            isFooterVisible = true;
        } else if (direction === 'up' && isFooterVisible) {
            scrollToMain();
            isFooterVisible = false;
        }
    }

    function addScrollEvent() {
        $(document).on('wheel', handleScroll);
    }

    function removeScrollEvent() {
        $(document).off('wheel', handleScroll);
    }

    if (mediaQuery.matches) {
        addScrollEvent();
    }

    mediaQuery.addEventListener("change", (e) => {
        if (e.matches) {
            addScrollEvent();
        } else {
            removeScrollEvent();
        }
    });

    $(window).on('resize', function () {
        footerHeight = $('.footer').outerHeight();
    });
});
