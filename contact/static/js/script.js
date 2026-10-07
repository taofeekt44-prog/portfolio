document.addEventListener("DOMContentLoaded", function () {

    /* ================= MOBILE MENU ================= */

    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");

    if (menuBtn) {

        menuBtn.addEventListener("click", function () {

            navMenu.classList.toggle("open");

            if (navMenu.classList.contains("open")) {
                menuBtn.textContent = "✕";
            } else {
                menuBtn.textContent = "☰";
            }

        });

    }


    /* CLOSE MOBILE MENU WHEN LINK IS CLICKED */

    const navLinks = document.querySelectorAll("#navMenu a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("open");

            menuBtn.textContent = "☰";

        });

    });


    /* ================= TYPING EFFECT ================= */

    const typingText = document.getElementById("typingText");

    const words = [
        "Full Stack Developer",
        "Django Developer",
        "Problem Solver"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;


    function typeEffect() {

        const currentWord = words[wordIndex];

        if (!deleting) {

            typingText.textContent =
                currentWord.substring(0, charIndex + 1);

            charIndex++;

            if (charIndex === currentWord.length) {

                deleting = true;

                setTimeout(typeEffect, 1500);

                return;
            }

        } else {

            typingText.textContent =
                currentWord.substring(0, charIndex - 1);

            charIndex--;

            if (charIndex === 0) {

                deleting = false;

                wordIndex++;

                if (wordIndex === words.length) {
                    wordIndex = 0;
                }

            }

        }

        setTimeout(
            typeEffect,
            deleting ? 50 : 90
        );

    }


    if (typingText) {
        typeEffect();
    }


    /* ================= SCROLL REVEAL ================= */

    const revealElements =
        document.querySelectorAll(".reveal");


    function revealOnScroll() {

        const windowHeight =
            window.innerHeight;

        revealElements.forEach(function (element) {

            const elementTop =
                element.getBoundingClientRect().top;

            if (elementTop < windowHeight - 80) {

                element.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        revealOnScroll
    );

    revealOnScroll();


    /* ================= CONTACT FORM ================= */

    const contactForm =
        document.getElementById("contactForm");

    const submitButton =
        document.getElementById("submitButton");

    const buttonText =
        document.getElementById("buttonText");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function () {

                submitButton.classList.add("loading");

                buttonText.textContent =
                    "Sending...";

                submitButton.disabled = true;

            }
        );

    }


    /* ================= SUCCESS MESSAGE ================= */

    const successMessage =
        document.getElementById("successMessage");

    const closeSuccess =
        document.getElementById("closeSuccess");


    if (closeSuccess) {

        closeSuccess.addEventListener(
            "click",
            function () {

                successMessage.style.display =
                    "none";

            }
        );

    }


    /* Automatically hide success message */

    if (successMessage) {

        setTimeout(function () {

            successMessage.style.opacity = "0";

            successMessage.style.transform =
                "translateX(50px)";

            setTimeout(function () {

                successMessage.style.display =
                    "none";

            }, 400);

        }, 6000);

    }


    /* ================= SCROLL TO TOP ================= */

    const scrollTop =
        document.getElementById("scrollTop");


    window.addEventListener(
        "scroll",
        function () {

            if (window.scrollY > 500) {

                scrollTop.classList.add("show");

            } else {

                scrollTop.classList.remove("show");

            }

        }
    );


    scrollTop.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

});