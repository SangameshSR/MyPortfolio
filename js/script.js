const themeBtn = document.getElementById("theme-toggle");
const body = document.body;


// =====================================================
// THEME TOGGLE
// =====================================================

const updateTheme = (theme) => {
  body.setAttribute("data-theme", theme);
  localStorage.setItem("portfolio-theme", theme);

  const icon = themeBtn.querySelector("i");
  icon.className =
    theme === "dark" ? "fas fa-sun" : "fas fa-moon";
};

const currentTheme =
  localStorage.getItem("portfolio-theme") || "dark";

updateTheme(currentTheme);

themeBtn.addEventListener("click", () => {
  const isDark =
    body.getAttribute("data-theme") === "dark";

  updateTheme(isDark ? "light" : "dark");
});


// =====================================================
// CONTACT FORM - FORMSPREE
// =====================================================

const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector(".submit-btn");
    const originalText = btn.textContent;

    // Prevent multiple submissions
    btn.disabled = true;
    btn.textContent = "Sending...";
    btn.style.background = "#6366f1";

    try {
      // Get all form data
      const formData = new FormData(contactForm);

      // Send data to Formspree
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        // Success
        btn.textContent = "Message Sent! ✨";
        btn.style.background = "#10b981";

        // Clear the form
        contactForm.reset();

        // Return button to normal after 3 seconds
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = "";
          btn.disabled = false;
        }, 3000);

      } else {
        // Formspree returned an error
        btn.textContent = "Something went wrong";
        btn.style.background = "#ef4444";

        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = "";
          btn.disabled = false;
        }, 3000);
      }

    } catch (error) {
      // Network error
      console.error("Form submission error:", error);

      btn.textContent = "Failed to Send";
      btn.style.background = "#ef4444";

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = "";
        btn.disabled = false;
      }, 3000);
    }
  });
}
