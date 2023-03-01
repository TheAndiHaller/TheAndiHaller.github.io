const switchModeBtn = document.getElementById("cb1");
const switchLanguageBtn = document.getElementById("switchLang");
const body = document.body;
const btnIcon = document.getElementById("nav-button-icon");
let root = document.documentElement;
let theme = localStorage.getItem("theme");
let language = localStorage.getItem("language");

if (language) {
  updateText(language);
  switchLanguageBtn.innerHTML = language === "es" ? "ES" : "EN";
} else {
  language = getLanguage();
  updateText(language);
  switchLanguageBtn.innerHTML = language === "es" ? "ES" : "EN";
}

if (theme) {
  switchTheme();
} else {
  if (window.matchMedia) {
    // Check if the dark-mode Media-Query matches
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      theme = "dark";
      switchTheme();
    } else {
      theme = "light";
      switchTheme();
    }
  } else {
    theme = "light"; // default to light
  }
}

function switchTheme() {
  if (theme === "dark") {
    root.style.setProperty("--background-color", "#11161e");
    root.style.setProperty("--text-color", "#eaebeb");
    root.style.setProperty(
      "--navbar-resume-btn-bg",
      "rgba(255, 255, 255, 0.2)"
    );
    root.style.setProperty("--navbar-bg-contrast", "rgba(33, 37, 41, 0.95)");

    btnIcon.classList.remove("bx-moon");
    btnIcon.classList.add("bx-sun");

    localStorage.setItem("theme", "dark");
  } else if (theme === "light") {
    root.style.setProperty("--background-color", "#eaebeb");
    root.style.setProperty("--text-color", "#11161e");
    root.style.setProperty("--navbar-resume-btn-bg", "rgba(20, 0, 0, 0.1)");
    root.style.setProperty("--navbar-bg-contrast", "rgba(255, 255, 255, 0.95)");

    btnIcon.classList.remove("bx-sun");
    btnIcon.classList.add("bx-moon");

    localStorage.setItem("theme", "light");
  }
}

switchLanguageBtn.addEventListener("click", function () {
  if (language === "es") {
    language = "en";
    updateText(language);
    localStorage.setItem("language", language);
    switchLanguageBtn.innerHTML = "EN";
  } else {
    language = "es";
    updateText(language);
    localStorage.setItem("language", language);
    switchLanguageBtn.innerHTML = "ES";
  }
});

switchModeBtn.addEventListener("click", function () {
  if (theme === "dark") {
    theme = "light";
  } else if (theme === "light") {
    theme = "dark";
  }
  switchTheme();
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

function getLanguage() {
  const userLang = navigator.language;
  const langCode = userLang.split("-")[0]; // extract the language code from the user's preference
  return langCode;
}

function updateText(language) {
  if (language === "en" || language === "es") {
    const elements = document.querySelectorAll("[lang]"); // find all elements with a "data-lang" attribute
    elements.forEach((el) => {
      const id = el.id; // get the ID of the current element
      if (id !== "html") {
        try {
          const text = lang[id][language]; // get the appropriate translation for the current language
          el.innerHTML = text; // update the text content of the current element
        } catch (e) {
          console.log("Error: No key found for: " + id);
        }
      }
      if (id === "nav-btn-resume") {
        const text = lang["resume-url"][language]; // get the appropriate translation for the current language
        el.setAttribute("href", text); // update the text content of the current element
      }
    });
  }
}
