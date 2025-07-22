document.addEventListener("DOMContentLoaded", function() {
    userIcon();
});

function userIcon(){
    const headerUser = document.querySelector(".header-username");
    const headerUserImg = document.querySelector(".header-user-img");    
    const user = JSON.parse(localStorage.getItem("currentProfile"));
    headerUser.textContent = user.name;
    headerUserImg.textContent = user.name.charAt(0).toUpperCase();
}