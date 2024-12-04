//pc interaction
document.addEventListener("DOMContentLoaded", function () {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    function initBlurEffect(selector, cursorSelector) {
        const item = document.querySelector(selector);
        const blurCursor = document.querySelector(cursorSelector);
    
        function addEventListeners() {
            item.addEventListener("mouseenter", handleMouseEnter);
            item.addEventListener("mouseleave", handleMouseLeave);
            item.addEventListener("mousemove", handleMouseMove);
        }
    
        function removeEventListeners() {
            item.removeEventListener("mouseenter", handleMouseEnter);
            item.removeEventListener("mouseleave", handleMouseLeave);
            item.removeEventListener("mousemove", handleMouseMove);
        }
    
        function handleMouseEnter() {
            blurCursor.style.display = "block";
        }
    
        function handleMouseLeave() {
            blurCursor.style.display = "none";
        }
    
        function handleMouseMove(e) {
            const itemRect = item.getBoundingClientRect();
            const cursorX = e.clientX - itemRect.left;
            const cursorY = e.clientY - itemRect.top;
    
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

        function handleMediaQueryChange(e) {
            if (e.matches) {
                // min-width 1024px: 마우스 오버로 제어
                techVideo.pause(); // 초기화
                addEventListeners();
            } else {
                // max-width 1023px: 자동 재생
                removeEventListeners();
                techVideo.play();
            }
        }

        if (mediaQuery.matches) {
            addEventListeners();
        } else {
            techVideo.play();
        }
        mediaQuery.addEventListener("change", handleMediaQueryChange);
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

    initBlurEffect(".grid_item.biz", ".blur_cursor");
    initBlurEffect(".grid_item.ai", ".blur_cursor_ai");
    initTechVideoControl();
    initGridItemClick();
});

//footer scroll
document.addEventListener("DOMContentLoaded", function () {
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


//mob animation
document.addEventListener("DOMContentLoaded", () => {
    const targetElements = document.querySelectorAll(
        ".grid_item.contact, .grid_item.portfolio, .grid_item.ai, .grid_item.ad, .grid_item.gamification, .grid_item.weare"
    );

    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    let observer = null;

    const createObserver = () => {
        if (observer) {
            observer.disconnect();
        }

        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in-view");
                    } else {
                        entry.target.classList.remove("in-view");
                    }
                });
            },
            {
                rootMargin: "0px 0px -200px 0px",
            }
        );

        targetElements.forEach((element) => observer.observe(element)); 
    };

    const checkMediaQuery = (e) => {
        if (e.matches) {
            createObserver();
        } else {
            if (observer) {
                observer.disconnect();
                targetElements.forEach((element) =>
                    element.classList.remove("in-view")
                );
            }
        }
    };
    checkMediaQuery(mediaQuery);
    mediaQuery.addEventListener("change", checkMediaQuery);
});

