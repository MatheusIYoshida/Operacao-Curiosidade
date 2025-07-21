function checkUser(){
    const currentProfile = localStorage.getItem("currentProfile");
    if(!currentProfile){
        localStorage.removeItem("Token");
        window.location.href = "login-page.html";
    }
}

window.onload = function(){
    checkUser();
}