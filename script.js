const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const navButton = document.getElementById("navButton");
const links = document.querySelectorAll(".nav-links-box ul li a");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
  navButton.classList.toggle("active");
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
    navButton.classList.remove("active");
  });
});
// navbar -ends

// hero//////////////
window.addEventListener("load", () => {
  const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

  // 👇 slows down the entire timeline (0.5 = half speed)
  tl.timeScale(0.5);

  // Title animation - slide and reveal
  tl.fromTo(
    ".hero-title .line",
    {
      x: -100,
      opacity: 0,
      clipPath: "inset(0 100% 0 0)",
    },
    {
      x: 0,
      opacity: 1,
      clipPath: "inset(0 0% 0 0)",
      duration: 1.2,
      ease: "power4.out",
    }
  )
    // Subtitle animation
    .fromTo(
      ".hero-subtitle .line",
      {
        x: -100,
        opacity: 0,
        clipPath: "inset(0 100% 0 0)",
      },
      {
        x: 0,
        opacity: 1,
        clipPath: "inset(0 0% 0 0)",
        duration: 1.2,
        ease: "power4.out",
      },
      "-=0.8"
    )
    // Text animation
    .fromTo(
      ".hero-text",
      {
        x: -50,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.6"
    )
    // Button animation
    .fromTo(
      ".hero-button",
      {
        scale: 0.8,
        opacity: 0,
        y: 20,
      },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
      },
      "-=0.4"
    );
});
// hero/////////
// about////////
// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Animate title on load with GSAP
  const title = document.querySelector(".about-title");
  const titleText = title.textContent;
  title.innerHTML = "";

  // Split title into letters
  titleText.split("").forEach((char, i) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    span.style.display = "inline-block";
    title.appendChild(span);

    gsap.to(span, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: i * 0.05,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".about",
        start: "top 80%",
        once: true,
      },
    });
  });

  // Scroll-triggered paragraph color fill
  const words = document.querySelectorAll(".about-paragraph .word");

  words.forEach((word, index) => {
    gsap.to(word, {
      scrollTrigger: {
        trigger: ".about-paragraph",
        start: "top 60%",
        end: "bottom 40%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const wordProgress = index / words.length;

          // Calculate if this word should be active based on scroll progress
          if (progress >= wordProgress) {
            word.classList.add("active");

            // Highlight special words
            const specialWords = [
              "passionate",
              "immersive",
              "creativity",
              "inspire",
              "future",
            ];
            if (
              specialWords.some((special) =>
                word.textContent.toLowerCase().includes(special)
              )
            ) {
              word.classList.add("highlight");
            }
          } else {
            word.classList.remove("active");
            word.classList.remove("highlight");
          }
        },
      },
    });
  });

  // Animate decorative circles
  gsap.to(".circle-1", {
    x: -100,
    y: 100,
    scale: 1.2,
    scrollTrigger: {
      trigger: ".about",
      start: "top bottom",
      end: "bottom top",
      scrub: 2,
    },
  });

  gsap.to(".circle-2", {
    x: 100,
    y: -100,
    scale: 1.3,
    scrollTrigger: {
      trigger: ".about",
      start: "top bottom",
      end: "bottom top",
      scrub: 2,
    },
  });

  gsap.to(".circle-3", {
    scale: 1.5,
    rotation: 180,
    scrollTrigger: {
      trigger: ".about",
      start: "top bottom",
      end: "bottom top",
      scrub: 2,
    },
  });

  // Animate stats on scroll
  const statItems = document.querySelectorAll(".stat-item");

  statItems.forEach((item, index) => {
    gsap.from(item, {
      y: 100,
      opacity: 0,
      duration: 0.8,
      delay: index * 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".stats-grid",
        start: "top 80%",
        once: true,
      },
    });
  });

  // Counter animation for stats
  const animateCounter = (element, target) => {
    const duration = 2000; // 2 seconds
    const start = 0;
    const increment = target / (duration / 16); // 60 FPS
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }

      // Format number with commas for large numbers
      const formatted = Math.floor(current).toLocaleString();
      element.textContent = formatted + (target >= 1000000 ? "+" : "");
    }, 16);
  };

  // Trigger counter animation on scroll
  const statNumbers = document.querySelectorAll(".stat-number");

  ScrollTrigger.create({
    trigger: ".stats-grid",
    start: "top 70%",
    once: true,
  });

  // Parallax effect for the entire about container
  gsap.to(".about-container", {
    y: -50,
    scrollTrigger: {
      trigger: ".about",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });

  // Add smooth reveal for the decorative line under title
  gsap.from(".about-title::after", {
    width: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".about-title",
      start: "top 70%",
      once: true,
    },
  });

  // Mouse move parallax effect for decorative elements
  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    gsap.to(".circle-1", {
      x: x * 2,
      y: y * 2,
      duration: 1,
      ease: "power2.out",
    });

    gsap.to(".circle-2", {
      x: -x * 1.5,
      y: -y * 1.5,
      duration: 1,
      ease: "power2.out",
    });

    gsap.to(".circle-3", {
      x: x,
      y: y,
      duration: 1,
      ease: "power2.out",
    });
  });

  // Refresh ScrollTrigger after everything is loaded
  ScrollTrigger.refresh();
});

// Refresh on window resize
window.addEventListener("resize", () => {
  ScrollTrigger.refresh();
});
// experience////////////////
gsap.registerPlugin(ScrollTrigger);

// Pause marquee on hover (extra safety)
const marqueeContainer = document.querySelector(".marquee-container");
const marqueeTrack = document.querySelector(".marquee-track");

marqueeContainer.addEventListener("mouseenter", () => {
  marqueeTrack.style.animationPlayState = "paused";
});

marqueeContainer.addEventListener("mouseleave", () => {
  marqueeTrack.style.animationPlayState = "running";
});

// Game click handler
function gameClick(gameName) {
  alert(`Launching ${gameName}...`);
}

// ========== CONTACT SECTION JAVASCRIPT ==========

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // ========== CONTACT SECTION ANIMATIONS ==========

  // Animate contact title
  gsap.from(".contact-title", {
    scrollTrigger: {
      trigger: ".contact-section",
      start: "top 80%",
      end: "top 50%",
      scrub: 1,
    },
    opacity: 0,
    y: 50,
    duration: 1,
  });

  // Animate contact subtitle
  gsap.from(".contact-subtitle", {
    scrollTrigger: {
      trigger: ".contact-section",
      start: "top 75%",
      end: "top 45%",
      scrub: 1,
    },
    opacity: 0,
    y: 30,
    duration: 1,
  });

  // Animate email link
  gsap.from(".contact-email", {
    scrollTrigger: {
      trigger: ".contact-section",
      start: "top 70%",
      end: "top 40%",
      scrub: 1,
    },
    opacity: 0,
    y: 20,
    duration: 1,
  });

  // Animate form groups with stagger
  gsap.from(".form-group", {
    scrollTrigger: {
      trigger: ".contact-form",
      start: "top 70%",
      end: "top 30%",
      scrub: 1,
    },
    opacity: 0,
    y: 50,
    stagger: 0.15,
    duration: 1,
  });

  // Animate submit button
  gsap.from(".submit-btn", {
    scrollTrigger: {
      trigger: ".submit-btn",
      start: "top 85%",
      end: "top 55%",
      scrub: 1,
    },
    opacity: 0,
    scale: 0.9,
    y: 30,
    duration: 1,
  });

  // Animate decorative circles
  gsap.to(".contact-circle-1", {
    x: 100,
    y: 100,
    scale: 1.2,
    scrollTrigger: {
      trigger: ".contact-section",
      start: "top bottom",
      end: "bottom top",
      scrub: 2,
    },
  });

  gsap.to(".contact-circle-2", {
    x: -100,
    y: -100,
    scale: 1.3,
    scrollTrigger: {
      trigger: ".contact-section",
      start: "top bottom",
      end: "bottom top",
      scrub: 2,
    },
  });

  // ========== FORM HANDLING ==========

  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    // Form submission handler
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        topic: document.getElementById("topic").value,
        message: document.getElementById("message").value,
      };

      console.log("Form submitted:", formData);

      // Show success message
      showNotification(
        "Message sent successfully! We'll reply within 24 hours.",
        "success"
      );

      // Reset form
      contactForm.reset();

      // You can add your actual form submission logic here
      // Example: Send to backend API
      // fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
    });

    // Input focus animations
    const formInputs = document.querySelectorAll(
      ".form-group input, .form-group textarea"
    );

    formInputs.forEach((input) => {
      input.addEventListener("focus", function () {
        gsap.to(this.parentElement, {
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      input.addEventListener("blur", function () {
        gsap.to(this.parentElement, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });
  }

  // ========== FOOTER ANIMATIONS ==========

  // Animate footer content
  gsap.from(".footer-content", {
    scrollTrigger: {
      trigger: ".footer",
      start: "top 90%",
      end: "top 60%",
      scrub: 1,
    },
    opacity: 0,
    y: 50,
    duration: 1,
  });

  // Animate footer text
  gsap.from(".footer-text", {
    scrollTrigger: {
      trigger: ".footer",
      start: "top 85%",
      once: true,
    },
    opacity: 0,
    x: -30,
    duration: 0.8,
    ease: "power3.out",
  });

  // Animate footer links
  gsap.from(".footer-link", {
    scrollTrigger: {
      trigger: ".footer",
      start: "top 85%",
      once: true,
    },
    opacity: 0,
    y: 20,
    stagger: 0.1,
    duration: 0.6,
    ease: "power3.out",
  });

  // Animate social icons
  gsap.from(".social-icon", {
    scrollTrigger: {
      trigger: ".footer",
      start: "top 85%",
      once: true,
    },
    opacity: 0,
    scale: 0,
    stagger: 0.1,
    duration: 0.6,
    ease: "back.out(1.7)",
  });

  // ========== MOUSE PARALLAX EFFECT ==========

  document.addEventListener("mousemove", function (e) {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    // Parallax for contact circles
    gsap.to(".contact-circle-1", {
      x: x * 2,
      y: y * 2,
      duration: 1,
      ease: "power2.out",
    });

    gsap.to(".contact-circle-2", {
      x: -x * 1.5,
      y: -y * 1.5,
      duration: 1,
      ease: "power2.out",
    });
  });

  // ========== REFRESH SCROLLTRIGGER ==========

  ScrollTrigger.refresh();
});

// ========== NOTIFICATION SYSTEM ==========

function showNotification(message, type = "success") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 30px;
    right: 30px;
    padding: 20px 30px;
    background: ${
      type === "success"
        ? "linear-gradient(135deg, #00ff88, #00cc6a)"
        : "linear-gradient(135deg, #ff0d55, #ff3d75)"
    };
    color: white;
    border-radius: 12px;
    font-family: var(--font-manrope);
    font-weight: 600;
    font-size: 0.95rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    opacity: 0;
    transform: translateY(-20px);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.opacity = "1";
    notification.style.transform = "translateY(0)";
  }, 10);

  // Animate out and remove
  setTimeout(() => {
    notification.style.opacity = "0";
    notification.style.transform = "translateY(-20px)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 400);
  }, 3000);
}

// ========== REFRESH ON WINDOW RESIZE ==========

window.addEventListener("resize", () => {
  ScrollTrigger.refresh();
});
