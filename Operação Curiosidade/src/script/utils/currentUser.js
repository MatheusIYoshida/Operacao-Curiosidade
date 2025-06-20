document.addEventListener("DOMContentLoaded", function() {
    currentUser();
});

function currentUser(){
    const headerUser = document.querySelector(".header-username");
    const headerUserImg = document.querySelector(".header-user-img");    
    const user = JSON.parse(localStorage.getItem("currentUser"));
    headerUser.textContent = user[0].name;
    headerUserImg.textContent = user[0].name.charAt(0).toUpperCase();
}