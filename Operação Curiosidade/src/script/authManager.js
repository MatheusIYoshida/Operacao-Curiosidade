function giveAuth(){
    localStorage.setItem("authToken", "token");
}

function removeAuth(){
    localStorage.removeItem("authToken", "token");
    window.location.href = "login-page.html";
}