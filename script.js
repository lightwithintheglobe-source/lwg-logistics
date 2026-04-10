// ==========================
// 📦 BOOKING FORM
// ==========================
const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get values
        const inputs = bookingForm.querySelectorAll("input, select, textarea");
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.border = "1px solid red";
            } else {
                input.style.border = "1px solid #ddd";
            }
        });

        if (!isValid) {
            alert("⚠️ Please fill all required fields.");
            return;
        }

        // Success message
        alert("✅ Booking Submitted Successfully!");

        // Reset form
        bookingForm.reset();
    });
}

// ==========================
// 📞 CONTACT FORM
// ==========================
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        alert("✅ Message sent successfully!");
        contactForm.reset();
    });
}

// ==========================
// 📍 TRACKING SYSTEM
// ==========================
function trackPackage() {
    const input = document.getElementById("trackingInput");
    const result = document.getElementById("trackingResult");
    const error = document.getElementById("errorBox");

    if (!input) return;

    const id = input.value.trim();

    if (result) result.style.display = "none";
    if (error) error.style.display = "none";

    if (id === "LWG123") {
        document.getElementById("status").innerText = "In Transit 🚚";
        document.getElementById("location").innerText = "Freetown";
        document.getElementById("date").innerText = "Tomorrow";

        if (result) result.style.display = "block";
    } else {
        if (error) error.style.display = "block";
    }
}

// ==========================
// 🎬 SCROLL ANIMATIONS
// ==========================
const fadeElements = document.querySelectorAll(".fade-in");

window.addEventListener("scroll", () => {
    fadeElements.forEach(el => {
        const position = el.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (position < screenHeight - 100) {
            el.classList.add("show");
        }
    });
});

// ==========================
// 📱 MOBILE NAV TOGGLE
// ==========================
function toggleMenu() {
    const nav = document.getElementById("navMenu");
    if (nav) {
        nav.classList.toggle("active");
    }
}