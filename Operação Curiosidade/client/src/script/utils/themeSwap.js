document.addEventListener("DOMContentLoaded", function(){
    const body = document.querySelector("body");
    const day = document.getElementById("day-theme");
    const night = document.getElementById("night-theme");
    const currentTheme = localStorage.getItem("theme");

    if(currentTheme == "dark"){
        day.classList.add("hide");
        night.classList.remove("hide");
        body.classList.toggle("dark");
    }
})