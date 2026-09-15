/* =========================================================
   PORTFOLIO KEVIN — JavaScript vanilla (aucun framework, aucun backend)
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initActiveLinkOnScroll();
  initRevealOnScroll();
});

/**
 * Gère l'ouverture / fermeture du menu de navigation sur mobile
 * et referme le menu quand un lien est cliqué.
 */
function initMobileNav() {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");

  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Ferme le menu mobile après un clic sur un lien de navigation
  menu.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/**
 * Met en surbrillance le lien de navigation correspondant
 * à la section actuellement visible à l'écran.
 */
function initActiveLinkOnScroll() {
  const sections = document.querySelectorAll("main section[id], main#accueil");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!("IntersectionObserver" in window) || sections.length === 0) return;

  const linkFor = (id) =>
    document.querySelector(`.nav-link[href="#${id}"]`);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => link.classList.remove("active"));
          const activeLink = linkFor(id);
          if (activeLink) activeLink.classList.add("active");
        }
      });
    },
    {
      // Se déclenche quand une section occupe la bande centrale de l'écran
      rootMargin: "-40% 0px -50% 0px",
      threshold: 0,
    }
  );

  sections.forEach((section) => observer.observe(section));
}

/**
 * Révèle légèrement les sections au fur et à mesure du défilement
 * (fondu + léger déplacement), une seule fois par élément.
 */
function initRevealOnScroll() {
  const revealTargets = document.querySelectorAll(
    ".section-heading, .skill-card, .project-card, .timeline-item, .watch-card"
  );

  if (!("IntersectionObserver" in window) || revealTargets.length === 0) {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  revealTargets.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealTargets.forEach((el) => observer.observe(el));
}
