function checkAuth() {
    if(!localStorage.getItem("Token")){
        localStorage.removeItem("currentProfile");
        window.location.href = "login-page.html";
    }
}

function checkLogout(){
    if (localStorage.getItem("Token")) {
        window.location.href = "dashboard-page.html";
    }
}