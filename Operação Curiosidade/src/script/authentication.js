function checkAuth() {
    if (!localStorage.getItem("authToken")) {
        window.location.href = "login-page.html";
        return false;
    }
    return true;
}