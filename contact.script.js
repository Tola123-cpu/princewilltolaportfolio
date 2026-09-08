document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const mobileNav = document.getElementById("mobileNav");

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener("click", () => {
            menuToggle.classList.toggle("active");
            mobileNav.classList.toggle("open");
            document.body.style.overflow = mobileNav.classList.contains("open") ? "hidden" : "";
        });

        document.querySelectorAll(".mobile-link").forEach(link => {
            link.addEventListener("click", () => {
                menuToggle.classList.remove("active");
                mobileNav.classList.remove("open");
                document.body.style.overflow = "";
            });
        });
    }
});