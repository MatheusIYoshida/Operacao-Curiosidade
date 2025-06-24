function giveAuth(userName, userEmail){
    localStorage.setItem("authToken", "token");
    const currentUser = new Array();
    currentUser.push({
        name: userName, 
        email: userEmail
    });
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
}


const exitButton = document.querySelector(".exit");
if (exitButton) { 
    exitButton.addEventListener("click", () => {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("authToken");
        window.location.href = "login-page.html";
    });
}