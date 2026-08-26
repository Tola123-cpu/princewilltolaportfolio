// Typing effect configuration for professional titles
const words = ["Creative Director", "Videographer", "Photographer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;
const textElement = document.getElementById('typed-text');

function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        textElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50; 
    } else {
        textElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100; 
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at the end of word
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

// Start the typing loop on load
document.addEventListener("DOMContentLoaded", type);