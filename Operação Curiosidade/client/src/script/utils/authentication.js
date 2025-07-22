function checkAuth() {
    if(!localStorage.getItem("Token")){
        localStorage.removeItem("currentProfile");
        return false;
    }
}

function checkLogout(){
    if (localStorage.getItem("Token")) {
        return false;
    }
}