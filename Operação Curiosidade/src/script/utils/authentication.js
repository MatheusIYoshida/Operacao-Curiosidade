function checkAuth() {
    if(!localStorage.getItem("authToken")){
        window.location.href = "login-page.html";
        return false;
    }
}

function checkLogout(){
    if (localStorage.getItem("authToken")) {
        return false;
    }
}