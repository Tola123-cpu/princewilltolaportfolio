document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Navigation Menu Toggle
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

    // 2. Tab Switcher between Reels and Gallery Sections
    const switchBtns = document.querySelectorAll(".switch-btn");
    const portfolioSections = document.querySelectorAll(".portfolio-section");

    switchBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            switchBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const targetId = btn.getAttribute("data-target");
            portfolioSections.forEach(section => {
                section.classList.remove("active");
                if (section.id === targetId) {
                    section.classList.add("active");
                }
            });

            // Pause all playing videos when switching views
            document.querySelectorAll("video").forEach(video => {
                video.pause();
            });
        });
    });

    // 3. Slideshow Logic for Photography Gallery
    const activeSlideImg = document.getElementById("activeSlideImg");
    const thumbs = document.querySelectorAll(".slideshow-container #thumbsTrack .thumb-item");
    const prevSlideBtn = document.getElementById("prevSlide");
    const nextSlideBtn = document.getElementById("nextSlide");

    let currentIndex = 0;
    const totalSlides = thumbs.length;

    function updateSlide(index) {
        if (index < 0) {
            currentIndex = totalSlides - 1;
        } else if (index >= totalSlides) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }

        const targetThumbImg = thumbs[currentIndex].querySelector("img");
        const newSrc = targetThumbImg.src;
        
        // Fade main slideshow image
        activeSlideImg.style.opacity = "0";
        setTimeout(() => {
            activeSlideImg.src = newSrc;
            activeSlideImg.style.opacity = "1";
        }, 150);

        // Update Lightbox image if modal is open
        if (lightboxModal.classList.contains("active")) {
            lightboxImg.src = newSrc;
            resetZoom();
        }

        // Sync main thumbnail tracks
        syncThumbnails(currentIndex);
    }

    function syncThumbnails(index) {
        // Main view thumbnails
        thumbs.forEach((thumb, idx) => {
            if (idx === index) {
                thumb.classList.add("active");
                thumb.scrollIntoView({ behavior: "smooth", inline: "nearest", block: "nearest" });
            } else {
                thumb.classList.remove("active");
            }
        });

        // Lightbox thumbnails bar
        const lbThumbs = lightboxThumbsBar.querySelectorAll(".thumb-item");
        lbThumbs.forEach((thumb, idx) => {
            if (idx === index) {
                thumb.classList.add("active");
                thumb.scrollIntoView({ behavior: "smooth", inline: "nearest", block: "nearest" });
            } else {
                thumb.classList.remove("active");
            }
        });
    }

    // Bind thumbnail click events
    thumbs.forEach((thumb, index) => {
        thumb.addEventListener("click", () => {
            updateSlide(index);
        });
    });

    // Main arrows
    if (prevSlideBtn && nextSlideBtn) {
        prevSlideBtn.addEventListener("click", () => updateSlide(currentIndex - 1));
        nextSlideBtn.addEventListener("click", () => updateSlide(currentIndex + 1));
    }


    // 4. Lightbox Zoom & Modal Functionality
    const openLightbox = document.getElementById("openLightbox");
    const lightboxModal = document.getElementById("lightboxModal");
    const lbClose = document.getElementById("lbClose");
    const lightboxImg = document.getElementById("lightboxImg");
    const lbPrev = document.getElementById("lbPrev");
    const lbNext = document.getElementById("lbNext");
    const lightboxThumbsBar = document.getElementById("lbThumbsTrack");
    const lbZoomIn = document.getElementById("lbZoomIn");
    const lbZoomOut = document.getElementById("lbZoomOut");
    const lbResetZoom = document.getElementById("lbResetZoom");

    let currentZoom = 1;

    // Populate bottom thumbnail bar inside Lightbox by cloning main track items
    const thumbsTrack = document.getElementById("thumbsTrack");
    if (thumbsTrack && lightboxThumbsBar) {
        lightboxThumbsBar.innerHTML = thumbsTrack.innerHTML;
        
        // Add click behavior to cloned lightbox thumbnails
        const lbThumbItems = lightboxThumbsBar.querySelectorAll(".thumb-item");
        lbThumbItems.forEach((item, index) => {
            item.addEventListener("click", () => {
                updateSlide(index);
            });
        });
    }

    // Open Lightbox when clicking main image
    if (openLightbox && lightboxModal) {
        openLightbox.addEventListener("click", () => {
            lightboxImg.src = activeSlideImg.src;
            lightboxModal.classList.add("active");
            document.body.style.overflow = "hidden";
            resetZoom();
            syncThumbnails(currentIndex);
        });
    }

    // Close Lightbox
    function closeLightboxModal() {
        lightboxModal.classList.remove("active");
        document.body.style.overflow = "";
    }

    if (lbClose) {
        lbClose.addEventListener("click", closeLightboxModal);
    }

    // Close on background click (if clicking outside image)
    lightboxModal.addEventListener("click", (e) => {
        if (e.target === lightboxModal || e.target.id === "lbViewport") {
            closeLightboxModal();
        }
    });

    // Lightbox navigation arrows
    if (lbPrev && lbNext) {
        lbPrev.addEventListener("click", () => updateSlide(currentIndex - 1));
        lbNext.addEventListener("click", () => updateSlide(currentIndex + 1));
    }

    // Zoom Controls
    function resetZoom() {
        currentZoom = 1;
        lightboxImg.style.transform = `scale(${currentZoom})`;
    }

    if (lbZoomIn && lbZoomOut && lbResetZoom) {
        lbZoomIn.addEventListener("click", () => {
            if (currentZoom < 3) {
                currentZoom += 0.5;
                lightboxImg.style.transform = `scale(${currentZoom})`;
            }
        });

        lbZoomOut.addEventListener("click", () => {
            if (currentZoom > 1) {
                currentZoom -= 0.5;
                lightboxImg.style.transform = `scale(${currentZoom})`;
            }
        });

        lbResetZoom.addEventListener("click", resetZoom);
    }

    // Keyboard controls (Escape to close, Left/Right arrows to flip slides)
    document.addEventListener("keydown", (e) => {
        if (!lightboxModal.classList.contains("active")) return;
        
        if (e.key === "Escape") {
            closeLightboxModal();
        } else if (e.key === "ArrowLeft") {
            updateSlide(currentIndex - 1);
        } else if (e.key === "ArrowRight") {
            updateSlide(currentIndex + 1);
        }
    });
});