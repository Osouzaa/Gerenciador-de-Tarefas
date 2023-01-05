const html = document.querySelector("html");
const darkMode = document.getElementById("buttonDark");



const darkTheme = () => {
  html.classList.toggle("dark-mode");
};

function carregaTema() {
  const dark = localStorage.getItem("dark-mode");

  if (dark) {
    darkTheme();
  }
}

carregaTema();

darkMode.addEventListener("click", () => {
  darkTheme();

  localStorage.removeItem("dark-mode");

  if (html.classList.contains("dark-mode")) {
    localStorage.setItem("dark-mode", 1);
  }
});


