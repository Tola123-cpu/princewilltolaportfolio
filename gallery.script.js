// Array of video sources corresponding to your reels
const reelVideos = [
    "reel1.mp4",
    "reel2.mp4",
    "reel1.mp4",
    "reel2.mp4",
    "reel1.mp4",
    "reel2.mp4"
];

let currentIndex = 0;

const modal = document.getElementById("reelModal");
const modalVideo = document.getElementById("modalVideo");
const modalSource = document.getElementById("modalSource");

function openModal(index) {
    currentIndex = index;
    updateModalVideo();
    modal.classList.add("active");
}

function closeModal() {
    modal.classList.remove("active");
    modalVideo.pause();
    modalVideo.currentTime = 0;
}

function nextReel() {
    currentIndex = (currentIndex + 1) % reelVideos.length;
    updateModalVideo();
}

function prevReel() {
    currentIndex = (currentIndex - 1 + reelVideos.length) % reelVideos.length;
    updateModalVideo();
}

function updateModalVideo() {
    modalSource.src = reelVideos[currentIndex];
    modalVideo.load();
    modalVideo.play();
}

// Close modal when clicking outside the video frame
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Keyboard navigation (Escape to close, Left/Right arrows to cycle)
document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;
    
    if (e.key === "Escape") {
        closeModal();
    } else if (e.key === "ArrowRight") {
        nextReel();
    } else if (e.key === "ArrowLeft") {
        prevReel();
    }
});