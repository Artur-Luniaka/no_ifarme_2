// Components JavaScript file for Tennis Dash website

// Load header component
function loadHeader() {
  const headerPlaceholder = document.getElementById("header-placeholder");
  if (!headerPlaceholder) return;

  const headerHTML = `
        <header class="header">
            <div class="header-container">
                <button class="mobile-menu-btn" aria-label="Toggle mobile menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <a href="./" class="logo">
                    <div class="logo-icon">🎾</div>
                    <span>PlayGlidePath.com</span>
                </a>
                <nav class="nav">
                    <ul class="nav-list">
                        <li><a href="./" class="nav-link">Main Court</a></li>
                        <li><a href="./#how-to-dash" class="nav-link">How to Dash</a></li>
                        <li><a href="match-log.html" class="nav-link">Match Log</a></li>
                        <li><a href="court-contacts.html" class="nav-link">Court Contacts</a></li>
                        <li><a href="tennis-disclaimer.html" class="nav-link">Disclaimer</a></li>
                    </ul>
                </nav>
            </div>
        </header>
        <div class="mobile-menu">
            <ul class="mobile-menu-list">
                <li class="mobile-menu-item">
                    <a href="./" class="mobile-menu-link">Main Court</a>
                </li>
                <li class="mobile-menu-item">
                    <a href="./#how-to-dash" class="mobile-menu-link">How to Dash</a>
                </li>
                <li class="mobile-menu-item">
                    <a href="match-log.html" class="mobile-menu-link">Match Log</a>
                </li>
                <li class="mobile-menu-item">
                    <a href="court-contacts.html" class="mobile-menu-link">Court Contacts</a>
                </li>
                <li class="mobile-menu-item">
                    <a href="tennis-disclaimer.html" class="mobile-menu-link">Disclaimer</a>
                </li>
            </ul>
        </div>
    `;

  headerPlaceholder.innerHTML = headerHTML;
  setupMobileMenu();
}

// Load footer component
function loadFooter() {
  const footerPlaceholder = document.getElementById("footer-placeholder");
  if (!footerPlaceholder) return;

  const currentYear = new Date().getFullYear();

  const footerHTML = `
        <footer class="footer">
            <div class="footer-container">
                <div class="footer-content">
                    <div class="footer-section">
                        <h3 class="footer-title">Legal</h3>
                        <ul class="footer-links">
                            <li class="footer-link-item">
                                <a href="tennis-disclaimer.html" class="footer-link">Disclaimer</a>
                            </li>
                            <li class="footer-link-item">
                                <a href="tennis-cookies.html" class="footer-link">Cookie Notice</a>
                            </li>
                            <li class="footer-link-item">
                                <a href="tennis-privacy.html" class="footer-link">Privacy Notice</a>
                            </li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h3 class="footer-title">Contact Info</h3>
                        <div class="footer-contact">
                            <div class="contact-item">
                                <div class="contact-icon">📧</div>
                                <span>info@PlayGlidePath.com</span>
                            </div>
                            <div class="contact-item">
                                <div class="contact-icon">📞</div>
                                <span>+61 2 8831 4871</span>
                            </div>
                            <div class="contact-item">
                                <div class="contact-icon">📍</div>
                                <span>120 Collins Street, Melbourne VIC 3000, Australia</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p class="copyright" style="color: var(--text-light);">
                        © ${currentYear} PlayGlidePath.com | All rights reserved
                    </p>
                </div>
            </div>
        </footer>
    `;

  footerPlaceholder.innerHTML = footerHTML;
}

// Get current page for navigation highlighting
function getCurrentPage() {
  const path = window.location.pathname;
  const filename = path.split("/").pop() || "index.html";

  switch (filename) {
    case "index.html":
    case "":
      return "home";
    case "match-log.html":
      return "news";
    case "court-contacts.html":
      return "contacts";
    case "tennis-disclaimer.html":
      return "disclaimer";
    case "tennis-cookies.html":
      return "cookies";
    case "tennis-privacy.html":
      return "privacy";
    default:
      return "home";
  }
}

// Setup mobile menu functionality
function setupMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileMenuLinks = document.querySelectorAll(".mobile-menu-link");

  // Добавляем backdrop, если его нет
  let backdrop = document.querySelector(".mobile-menu-backdrop");
  if (!backdrop) {
    backdrop = document.createElement("div");
    backdrop.className = "mobile-menu-backdrop";
    document.body.appendChild(backdrop);
  }

  if (!mobileMenuBtn || !mobileMenu) return;

  // Toggle mobile menu
  mobileMenuBtn.addEventListener("click", function () {
    const isActive = mobileMenu.classList.contains("active");
    if (isActive) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  // Закрытие по клику на ссылку
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });

  // Закрытие по клику на backdrop
  backdrop.addEventListener("click", closeMobileMenu);

  // Закрытие по esc
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeMobileMenu();
    }
  });

  // Закрытие при ресайзе
  window.addEventListener(
    "resize",
    debounce(() => {
      if (window.innerWidth > 767) {
        closeMobileMenu();
      }
    }, 250)
  );
}

function openMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  const backdrop = document.querySelector(".mobile-menu-backdrop");
  if (!mobileMenuBtn || !mobileMenu || !backdrop) return;
  mobileMenuBtn.classList.add("active");
  mobileMenu.classList.add("active");
  backdrop.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  const backdrop = document.querySelector(".mobile-menu-backdrop");
  if (!mobileMenuBtn || !mobileMenu || !backdrop) return;
  mobileMenuBtn.classList.remove("active");
  mobileMenu.classList.remove("active");
  backdrop.classList.remove("active");
  document.body.style.overflow = "";
}

// Debounce function for performance
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

// Add smooth scrolling for navigation links
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight =
          document.querySelector(".header")?.offsetHeight || 80;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Add active state to navigation based on scroll position
function setupScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  if (sections.length === 0 || navLinks.length === 0) return;

  const observerOptions = {
    threshold: 0.3,
    rootMargin: "-80px 0px -50% 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const targetId = entry.target.getAttribute("id");

        // Remove active class from all nav links
        navLinks.forEach((link) => {
          link.classList.remove("active");
        });

        // Add active class to corresponding nav link
        const activeLink = document.querySelector(
          `.nav-link[href="#${targetId}"]`
        );
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });
}

// Initialize component functionality
document.addEventListener("DOMContentLoaded", function () {
  // Setup smooth scrolling after components are loaded
  setTimeout(() => {
    setupSmoothScrolling();
    setupScrollSpy();
  }, 100);
});

// Export functions for use in other modules
window.TennisDashComponents = {
  loadHeader,
  loadFooter,
  setupMobileMenu,
  openMobileMenu,
  closeMobileMenu,
};
