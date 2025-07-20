const exitButton = document.querySelector(".exit");
if (exitButton) { 
    exitButton.addEventListener("click", () => {
        localStorage.removeItem("currentProfile");
        localStorage.removeItem("Token");
        window.location.href = "login-page.html";
    });
}