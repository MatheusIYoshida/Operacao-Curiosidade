function checkAuth() {
    if(!localStorage.getItem("authToken")){
        return false;
    }
}

function checkLogout(){
    if (localStorage.getItem("authToken")) {
        return false;
    }
}