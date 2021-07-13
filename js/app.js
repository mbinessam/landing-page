// General Constants
const sections = document.querySelectorAll("section");
const navMenu = document.querySelector("ul#navbar__list");

// Check if section is in viewport or not
findInView = (section) => {
  // Resource inspired solution: https://www.javascripttutorial.net/dom/css/check-if-an-element-is-visible-in-the-viewport/
  let sectionCords = section.getBoundingClientRect();
  if (
    sectionCords.top >= 0 &&
    sectionCords.bottom <=
      (window.innerHeight || document.documentElement.clientHeight)
  )
    return true;
};

// Building navigation bar and smooth scroll functionality
buildNav = () => {
  sections.forEach((section) => {
    let navLinkItem = document.createElement("li");
    let navLink = document.createElement("a");
    navLink.classList.add("menu__link");
    navLink.innerHTML = section.dataset.nav;
    navLink.setAttribute("href", `#${section.id}`);
    navLinkItem.appendChild(navLink);
    navMenu.appendChild(navLinkItem);

    // Smooth scroll
    navLink.addEventListener("click", function (e) {
      e.preventDefault();
      section.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    });
  });
};

// Adding active class to section in viewport
addActiveClass = () => {
  document.addEventListener("scroll", () => {
    sections.forEach((section) => {
      if (findInView(section)) {
        section.classList.add("your-active-class");
      } else if (section.classList.contains("your-active-class")) {
        section.classList.remove("your-active-class");
      }
    });
  });
};

// Extra: Adding jump to top button
scrollToTop = () => {
  let toTop = document.querySelector(".top");
  document.addEventListener("scroll", () => {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      toTop.style.display = "block";
    } else {
      toTop.style.display = "none";
    }
  });

  toTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
};

// Calling functions
buildNav();
addActiveClass();
scrollToTop();
