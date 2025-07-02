document.addEventListener("DOMContentLoaded", function() {
    currentPage();
});

function currentPage(){
    const home = document.getElementById("home-menu");
    const profiles = document.getElementById("profiles-menu");
    const reports = document.getElementById("reports-menu");
    const logs = document.getElementById("logs-menu");

    if(window.location.href.split("/").pop() == "dashboard-page.html"){
        home.style.opacity = "1";
    }else if(window.location.href.split("/").pop() == "profiles-page.html"){
        profiles.style.opacity = "1";
    }else if(window.location.href.split("/").pop() == "logs.html"){
        logs.style.opacity = "1";
    }else{
        reports.style.opacity = "1";
    }
}