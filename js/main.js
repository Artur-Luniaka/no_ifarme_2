// Main JavaScript file for Tennis Dash website

// Global variables
let currentPage = "";

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
  setupHeroSlider();
  cookieBarLogic();
});

// Main initialization function
function initializeApp() {
  loadComponents();
  setCurrentPage();
  loadPageContent();
  setupEventListeners();
  setupScrollEffects();
}

// Load header and footer components
function loadComponents() {
  loadHeader();
  loadFooter();
}

// Set current page based on URL
function setCurrentPage() {
  const path = window.location.pathname;
  const filename = path.split("/").pop() || "./";

  switch (filename) {
    case "index.html":
    case "":
      currentPage = "home";
      break;
    case "match-log.html":
      currentPage = "news";
      break;
    case "court-contacts.html":
      currentPage = "contacts";
      break;
    case "tennis-disclaimer.html":
      currentPage = "disclaimer";
      break;
    case "tennis-cookies.html":
      currentPage = "cookies";
      break;
    case "tennis-privacy.html":
      currentPage = "privacy";
      break;
    default:
      currentPage = "home";
  }
}

// Load page-specific content from JSON
async function loadPageContent() {
  try {
    switch (currentPage) {
      case "home":
        await loadHomeContent();
        break;
      case "news":
        await loadNewsContent();
        break;
      case "contacts":
        await loadContactContent();
        break;
    }
  } catch (error) {
    console.error("Error loading page content:", error);
    showErrorMessage("Failed to load content. Please refresh the page.");
  }
}

// Load content for home page
async function loadHomeContent() {
  const [
    featuresData,
    instructionsData,
    testimonialsData,
    challengesData,
    gearData,
  ] = await Promise.all([
    fetchJSON("data/features.json"),
    fetchJSON("data/instructions.json"),
    fetchJSON("data/testimonials.json"),
    fetchJSON("data/challenges.json"),
    fetchJSON("data/gear.json"),
  ]);

  renderFeatures(featuresData);
  renderInstructions(instructionsData);
  renderTestimonials(testimonialsData);
  renderChallenges(challengesData);
  renderGear(gearData);
}

// Load content for news page
async function loadNewsContent() {
  const [updatesData, coachData] = await Promise.all([
    fetchJSON("data/updates.json"),
    fetchJSON("data/coach.json"),
  ]);

  renderUpdates(updatesData);
  renderCoachTips(coachData);
}

// Load content for contacts page
async function loadContactContent() {
  const contactData = await fetchJSON("data/contact.json");
  renderContactInfo(contactData);
}

// Fetch JSON data
async function fetchJSON(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    throw error;
  }
}

// Render features section
function renderFeatures(data) {
  const container = document.getElementById("features-content");
  if (!container || !data.features) return;

  container.innerHTML = data.features
    .map(
      (feature) => `
        <div class="feature-card">
            <div class="feature-icon">${feature.icon}</div>
            <h3 class="feature-title">${feature.title}</h3>
            <p class="feature-description">${feature.description}</p>
        </div>
    `
    )
    .join("");
}

// Render instructions section
function renderInstructions(data) {
  const container = document.getElementById("instructions-content");
  if (!container || !data.steps) return;

  container.innerHTML = data.steps
    .map(
      (step, index) => `
        <div class="instruction-step">
            <div class="step-number">${index + 1}</div>
            <div class="step-content">
                <h3>${step.title}</h3>
                <p>${step.description}</p>
            </div>
        </div>
    `
    )
    .join("");
}

// Render testimonials section
function renderTestimonials(data) {
  const container = document.getElementById("testimonials-content");
  if (!container || !data.testimonials) return;

  container.innerHTML = data.testimonials
    .map(
      (testimonial) => `
        <div class="testimonial-card">
            <p class="testimonial-text">${testimonial.comment}</p>
            <div class="testimonial-author">— ${testimonial.name}</div>
        </div>
    `
    )
    .join("");
}

// Render challenges section
function renderChallenges(data) {
  const container = document.getElementById("challenges-content");
  if (!container || !data.challenges) return;

  container.innerHTML = data.challenges
    .map(
      (challenge) => `
        <div class="challenge-card">
            <h3 class="challenge-title">${challenge.title}</h3>
            <p class="challenge-description">${challenge.description}</p>
            <span class="challenge-difficulty difficulty-${challenge.difficulty.toLowerCase()}">${
        challenge.difficulty
      }</span>
        </div>
    `
    )
    .join("");
}

// Render gear section
function renderGear(data) {
  const container = document.getElementById("gear-content");
  if (!container || !data.gear) return;

  container.innerHTML = data.gear
    .map(
      (item) => `
        <div class="gear-card">
            <h3 class="gear-name">${item.name}</h3>
            <span class="gear-type">${item.type}</span>
            <p class="gear-description">${item.description}</p>
            <div class="gear-stats">
                ${item.stats
                  .map((stat) => `<span class="stat-item">${stat}</span>`)
                  .join("")}
            </div>
        </div>
    `
    )
    .join("");
}

// Render updates section
function renderUpdates(data) {
  const container = document.getElementById("updates-content");
  if (!container || !data.updates) return;

  container.innerHTML = data.updates
    .map((update, idx) => {
      // Определяем позицию картинки: left/right (чередование)
      const imageLeft = update.imagePosition === "left";
      return `
        <div class="update-card${imageLeft ? " image-left" : " image-right"}">
          <div class="update-card-inner">
            <div class="update-image">
              <img src="${update.image}" alt="${update.title}" loading="lazy" />
            </div>
            <div class="update-info">
              <div class="update-date">${update.date}</div>
              <h3 class="update-title">${update.title}</h3>
              <p class="update-content">${update.content}</p>
              <div class="update-tags">
                ${update.tags
                  .map((tag) => `<span class="update-tag">${tag}</span>`)
                  .join("")}
              </div>
            </div>
          </div>
        </div>
      `;
    })
    .join("");
}

// Render coach tips section
function renderCoachTips(data) {
  const container = document.getElementById("coach-content");
  if (!container || !data.tips) return;

  container.innerHTML = data.tips
    .map(
      (tip) => `
        <div class="coach-tip">
          <span class="coach-tip-icon">💡</span>
          <h3 class="coach-tip-title">${tip.title}</h3>
          <p class="coach-tip-content">${tip.content}</p>
        </div>
    `
    )
    .join("");
}

// Render contact information
function renderContactInfo(data) {
  const container = document.getElementById("contact-content");
  if (!container || !data.contacts) return;

  container.innerHTML = data.contacts
    .map(
      (contact) => `
        <div class="contact-card">
            <div class="contact-icon-large">${contact.icon}</div>
            <h3 class="contact-title">${contact.title}</h3>
            <p class="contact-info">${contact.info}</p>
        </div>
    `
    )
    .join("");
}

// Setup event listeners
function setupEventListeners() {
  // Contact form submission
  const contactForm = document.getElementById("feedback-form");
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactForm);
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Hero CTA buttons
  const playBtn = document.querySelector(".hero-cta .btn-primary");
  const trailerBtn = document.querySelector(".hero-cta .btn-secondary");

  if (playBtn) {
    playBtn.addEventListener("click", () => {
      showMessage("Game launching soon! Stay tuned for updates.");
    });
  }

  if (trailerBtn) {
    trailerBtn.addEventListener("click", () => {
      showMessage("Trailer coming soon! Follow us for updates.");
    });
  }

  // Subscribe form logic (фикс: обработчик добавляется сразу, а не через DOMContentLoaded)
  const subscribeForm = document.querySelector(".subscribe-form");
  if (subscribeForm) {
    const input = subscribeForm.querySelector(".subscribe-input");
    const btn = subscribeForm.querySelector(".subscribe-btn");
    subscribeForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (
        !input.value ||
        btn.classList.contains("loading") ||
        btn.classList.contains("subscribed")
      )
        return;
      btn.classList.add("loading");
      btn.textContent = "Subscribing...";
      setTimeout(function () {
        btn.classList.remove("loading");
        btn.classList.add("subscribed");
        btn.textContent = "Subscribed!";
        input.value = "";
        input.disabled = true;
        btn.disabled = true;
      }, 1200);
    });
  }
}

// Handle contact form submission
function handleContactForm(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  };

  // Simulate form submission
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  setTimeout(() => {
    showMessage("Thank you for your message! We'll get back to you soon.");
    e.target.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 2000);
}

// Setup scroll effects
function setupScrollEffects() {
  // Header scroll effect
  const header = document.querySelector(".header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document
    .querySelectorAll(
      ".feature-card, .testimonial-card, .challenge-card, .gear-card, .update-card, .coach-tip, .contact-card"
    )
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(el);
    });
}

// Show message to user
function showMessage(message, type = "info") {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message message-${type}`;
  messageDiv.textContent = message;

  // Style the message
  Object.assign(messageDiv.style, {
    position: "fixed",
    top: "100px",
    right: "20px",
    background:
      type === "error" ? "var(--error-color)" : "var(--primary-color)",
    color: "white",
    padding: "var(--spacing-md) var(--spacing-lg)",
    borderRadius: "var(--border-radius-md)",
    boxShadow: "var(--shadow-lg)",
    zIndex: "var(--z-modal)",
    transform: "translateX(100%)",
    transition: "transform 0.3s ease",
  });

  document.body.appendChild(messageDiv);

  // Animate in
  setTimeout(() => {
    messageDiv.style.transform = "translateX(0)";
  }, 100);

  // Remove after 5 seconds
  setTimeout(() => {
    messageDiv.style.transform = "translateX(100%)";
    setTimeout(() => {
      document.body.removeChild(messageDiv);
    }, 300);
  }, 5000);
}

// Show error message
function showErrorMessage(message) {
  showMessage(message, "error");
}

// Utility function to debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Export functions for use in other modules
window.TennisDash = {
  showMessage,
  showErrorMessage,
  loadPageContent,
};

// Hero slider background switcher
function setupHeroSlider() {
  const slider = document.getElementById("hero-slider");
  if (!slider) return;
  let state = 1;
  setInterval(() => {
    state = state === 1 ? 2 : 1;
    slider.classList.toggle("bg1", state === 1);
    slider.classList.toggle("bg2", state === 2);
  }, 4000);
  // Инициализация
  slider.classList.add("bg1");
}

// Cookie bar logic (главная страница)
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var bar = document.getElementById("cookie-bar");
    var btn = document.getElementById("cookie-accept-btn");
    if (!bar || !btn) return;
    if (!localStorage.getItem("cookieAccepted")) {
      bar.style.display = "flex";
    }
    btn.addEventListener("click", function () {
      localStorage.setItem("cookieAccepted", "1");
      bar.style.display = "none";
    });
  });
})();
