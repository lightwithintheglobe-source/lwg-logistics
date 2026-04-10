// ==========================
// 📦 BOOKING FORM (REAL API)
// ==========================
const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
    bookingForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const inputs = bookingForm.querySelectorAll("input, select, textarea");
        let data = {};
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.border = "1px solid red";
            } else {
                input.style.border = "1px solid #ddd";
                data[input.placeholder || input.name] = input.value;
            }
        });

        if (!isValid) {
            alert("⚠️ Please fill all required fields.");
            return;
        }

        try {
            const res = await fetch("https://lwg-backend.onrender.com/api/book", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await res.json();

            alert("✅ Booking successful!\nTracking ID: " + result.trackingId);

            bookingForm.reset();

        } catch (err) {
            alert("❌ Failed to connect to server");
        }
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
// 📍 TRACKING SYSTEM (REAL API + DYNAMIC STATUS)
// ==========================
async function trackPackage() {
    const input = document.getElementById("trackingInput");
    const result = document.getElementById("trackingResult");
    const error = document.getElementById("errorBox");

    if (!input) return;

    const id = input.value.trim();

    if (!id) {
        alert("⚠️ Please enter a tracking ID");
        return;
    }

    result.style.display = "none";
    error.style.display = "none";

    try {
        const res = await fetch(`https://lwg-backend.onrender.com/api/track/${id}`);
        const data = await res.json();

        if (data.error) {
            error.style.display = "block";
        } else {
            const order = data.data;
            const status = order.status;

            // Update details
            document.getElementById("status").innerText = status;
            document.getElementById("location").innerText = order.location;
            document.getElementById("date").innerText = "Processing";

            // ==========================
            // 🔥 DYNAMIC TIMELINE
            // ==========================
            const steps = document.querySelectorAll(".timeline .step");

            steps.forEach(step => step.classList.remove("active"));

            if (status === "Pending") {
                steps[0]?.classList.add("active");
            }
            else if (status === "In Transit") {
                steps[0]?.classList.add("active");
                steps[1]?.classList.add("active");
            }
            else if (status === "Out for Delivery") {
                steps[0]?.classList.add("active");
                steps[1]?.classList.add("active");
                steps[2]?.classList.add("active");
            }
            else if (status === "Delivered") {
                steps.forEach(step => step.classList.add("active"));
            }

            result.style.display = "block";
        }

    } catch (err) {
        alert("❌ Server error");
    }
}

// ==========================
// ⌨️ ENTER KEY SUPPORT
// ==========================
const trackingInput = document.getElementById("trackingInput");
if (trackingInput) {
    trackingInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            trackPackage();
        }
    });
}

// ==========================
// 🎬 SCROLL ANIMATIONS
// ==========================
const fadeElements = document.querySelectorAll(".fade-in");

function handleScrollAnimation() {
    fadeElements.forEach(el => {
        const position = el.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (position < screenHeight - 100) {
            el.classList.add("show");
        }
    });
}

window.addEventListener("scroll", handleScrollAnimation);
window.addEventListener("load", handleScrollAnimation);

// ==========================
// 📱 MOBILE NAV TOGGLE
// ==========================
function toggleMenu() {
    const nav = document.getElementById("navMenu");
    if (nav) {
        nav.classList.toggle("active");
    }
}
