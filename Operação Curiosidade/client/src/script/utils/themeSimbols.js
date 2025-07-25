document.querySelector(".change-theme-box").addEventListener("click", () =>{
    const body = document.querySelector("body");
    const day = document.getElementById("day-theme");
    const night = document.getElementById("night-theme");

    if(day.classList.contains("hide")){
        day.classList.remove("hide");
        night.classList.add("hide");
        localStorage.removeItem("theme", "dark");
    }else{
        day.classList.add("hide");
        night.classList.remove("hide");
        localStorage.setItem("theme", "dark");
    }

    if(document.querySelector(".pagination-container")){
        swapArrows();
    }
    body.classList.toggle("dark");

})