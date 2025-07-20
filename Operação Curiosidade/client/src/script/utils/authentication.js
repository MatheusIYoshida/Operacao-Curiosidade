function checkAuth() {
    if(!localStorage.getItem("Token")){
        return false;
    }
}

function checkLogout(){
    if (localStorage.getItem("Token")) {
        return false;
    }
}