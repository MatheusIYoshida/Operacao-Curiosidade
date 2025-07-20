function checkUser(){
    const currentUser = localStorage.getItem("currentUser");
    if(!currentUser){
        localStorage.removeItem("authToken");
        window.location.href = "login-page.html";
    }
}

window.onload = function(){
    //checkUser();
}