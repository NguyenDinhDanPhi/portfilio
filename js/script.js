// ====== NAV TOGGLER ======
const toggler = document.querySelector(".toggler");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-item");

if (toggler && navLinks) {
  toggler.addEventListener("click", () => {
    navLinks.classList.toggle("nav-active");
  });
}

navItems.forEach((item) => {
  item.addEventListener("click", function () {
    navItems.forEach((i) => i.classList.remove("nav-item-active"));
    this.classList.add("nav-item-active");
    if (window.innerWidth < 800 && navLinks) {
      navLinks.classList.remove("nav-active");
    }
  });
});

// ====== PROJECTS FILTER ======
const projectsTabBtns = document.querySelectorAll(".projects-tab-btn");
const projectsItems = document.querySelectorAll(".projects-item");

projectsTabBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    projectsTabBtns.forEach((b) =>
      b.classList.remove("projects-tab-btn-active")
    );
    this.classList.add("projects-tab-btn-active");

    const filter = btn.id; // all | available | unavailable

    projectsItems.forEach((item) => {
      if (filter === "all") {
        item.classList.remove("hidden");
      } else if (item.classList.contains(filter)) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
    });
  });
});

// ====== SCROLL ACTIVE NAV ======
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 150;
    const sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelectorAll(".nav-item")
        .forEach((link) => link.classList.remove("nav-item-active"));

      const activeLink = document.querySelector(
        `.nav-item[href="#${sectionId}"]`
      );
      if (activeLink) {
        activeLink.classList.add("nav-item-active");
      }
    }
  });
});

// ====== SCROLL ANIMATION ======
const animatedEls = document.querySelectorAll("[data-animate]");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
    }
  );

  animatedEls.forEach((el) => observer.observe(el));
} else {
  animatedEls.forEach((el) => el.classList.add("in-view"));
}

// ====== TYPEWRITER ROLE ======
const typedEl = document.getElementById("typed-role");

if (typedEl) {
  const roles = ["iOS Developer", "Mobile Developer", "Swift Enthusiast"];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typeSpeed = 80;
  const eraseSpeed = 45;
  const delayBetween = 1100;

  function type() {
    const current = roles[roleIndex];

    if (!isDeleting) {
      typedEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === current.length) {
        setTimeout(() => (isDeleting = true), delayBetween);
      }
    } else {
      typedEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    const nextDelay = isDeleting ? eraseSpeed : typeSpeed;
    setTimeout(type, nextDelay);
  }

  type();
}
