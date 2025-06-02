function loginChangePage(){
    var emailInput = document.getElementById("email-input").value;
    var passwordInput = document.getElementById("password-input").value;

    if(emailInput != 0 && passwordInput != 0){
        window.location.href = "dashboard-page.html";
    }
}

function createProfilePage(){
    window.location.href = "newProfile-page.html";
}
