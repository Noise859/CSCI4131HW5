var darkMode = "false";
var stylesheet = document.getElementById("mainStylesheet");
var darkToggle = document.getElementById("darkToggle");

if(localStorage.getItem("darkMode") != null) {
    darkMode = localStorage.getItem("darkMode");
}

setDarkMode(darkMode);

function toggleDarkMode() {
    if(darkMode == "false") {
        darkMode = "true";
    }
    else {
        darkMode = "false";
    }
    localStorage.setItem("darkMode", darkMode); 
    setDarkMode(darkMode);
}

function setDarkMode(dark) {
    if(dark=="true") {
        stylesheet.setAttribute('href', '/main.dark.css');
        darkToggle.innerHTML = `<i class="fa-solid fa-moon"></i>`;
    }
    else {
        stylesheet.setAttribute('href', '/main.css');
        darkToggle.innerHTML = `<i class="fa-solid fa-sun"></i>`;
    }
}