// Dark Light switch
const switchModeBtn = document.getElementById("cb1");
const body = document.body;
const btnIcon = document.getElementById("nav-button-icon");

switchModeBtn.addEventListener("click", function() {
  body.classList.toggle("day-background");
  //btnIcon.classList.toggle("bx bx-moon bx-spin");
  console.log(btnIcon.classList.contains("bx-sun"));
  if (btnIcon.classList.contains("bx-sun")) {
    btnIcon.classList.remove("bx-sun");
    btnIcon.classList.add("bx-moon");
  } else {
    btnIcon.classList.remove("bx-moon");
    btnIcon.classList.add("bx-sun");

  }
});

// Navbar
const navbarToggle = navbar.querySelector("#navbar-toggle");
const navbarMenu = document.querySelector("#navbar-menu");
const navbarLinksContainer = navbarMenu.querySelector(".navbar-links");
let isNavbarExpanded = navbarToggle.getAttribute("aria-expanded") === "true";

const toggleNavbarVisibility = () => {
  isNavbarExpanded = !isNavbarExpanded;
  navbarToggle.setAttribute("aria-expanded", isNavbarExpanded);
};

navbarToggle.addEventListener("click", toggleNavbarVisibility);

navbarLinksContainer.addEventListener("click", (e) => e.stopPropagation());
navbarMenu.addEventListener("click", toggleNavbarVisibility);

