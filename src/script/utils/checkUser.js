function checkUser(){
    const currentUser = localStorage.getItem("currentUser");
    if(!currentUser){
        localStorage.removeItem("authToken");
        window.location.href = "index.html";
    }
}

window.onload = function(){
    checkUser();
}
