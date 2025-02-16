document.addEventListener("DOMContentLoaded", () => {
  // Check localStorage for theme preference
  const themeToggle = document.getElementById("theme-toggle");
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
    if (themeToggle) themeToggle.checked = true;
  }

  // Theme toggle event
  themeToggle.addEventListener("change", function() {
    if (this.checked) {
      document.body.classList.add("light-mode");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.remove("light-mode");
      localStorage.setItem("theme", "dark");
    }
  });

  // Intersection Observer for section animations
  const sections = document.querySelectorAll(".section");
  const observerOptions = { threshold: 0.2 };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // Read More functionality for About section
  const readMoreBtn = document.getElementById("readMoreBtn");
  const aboutContainer = document.querySelector(".about-container");
  readMoreBtn.addEventListener("click", () => {
    if (aboutContainer.classList.contains("expanded")) {
      aboutContainer.classList.remove("expanded");
      readMoreBtn.textContent = "Read More";
    } else {
      aboutContainer.classList.add("expanded");
      readMoreBtn.textContent = "Read Less";
    }
  });

  // Copy email functionality using Clipboard API with SVG icon update
  const copyIconContainer = document.querySelector(".copy-icon");
  const copySvg = document.getElementById("copyIcon");
  const emailAddress = document.querySelector(".email-address").textContent.trim().split(" ")[0];
  
  copyIconContainer.addEventListener("click", () => {
    navigator.clipboard.writeText(emailAddress)
      .then(() => {
        // Update icon to checkmark temporarily
        copySvg.innerHTML = `<polyline points="20 6 9 17 4 12"></polyline>`;
        setTimeout(() => {
          copySvg.innerHTML = `<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>`;
        }, 1000);
      })
      .catch(err => console.error("Error copying text: ", err));
  });

  // Form submission using Formspree with fetch
  const contactForm = document.getElementById("contactForm");
  const successMessage = document.getElementById("success-message");

  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      fetch(contactForm.action, {
        method: contactForm.method,
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      }).then(response => {
        if (response.ok) {
          contactForm.style.display = "none";
          successMessage.style.display = "block";
        } else {
          alert("There was a problem submitting the form. Please try again.");
        }
      }).catch(error => {
        console.error("Error:", error);
        alert("There was a problem submitting the form. Please try again.");
      });
    });
  }
});
