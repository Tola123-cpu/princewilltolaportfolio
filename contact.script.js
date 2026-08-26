// Handle simple contact form interaction
function handleFormSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById("name").value.trim();
    const statusMsg = document.getElementById("formStatus");
    const submitBtn = event.target.querySelector(".submit-btn");

    if (!name) return;

    // Simulate sending transmission
    submitBtn.disabled = true;
    submitBtn.textContent = "TRANSMITTING...";
    statusMsg.style.color = "var(--text-muted)";
    statusMsg.textContent = "Encrypting and dispatching message...";

    setTimeout(() => {
        statusMsg.style.color = "var(--accent-green)";
        statusMsg.textContent = `Transmission received, ${name}! I'll reply shortly.`;
        submitBtn.textContent = "TRANSMISSION SENT";
        
        // Reset form after a brief delay
        document.getElementById("contactForm").reset();
        
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = "SEND TRANSMISSION";
        }, 4000);
    }, 1500);
}