function loginChangePage(){
    var emailInput = document.getElementById("email-input").value;
    var passwordInput = document.getElementById("password-input").value;

    if(emailInput == 0){
        var email = document.getElementById("email-input");
        email.style.border = "2px solid red";
        email.nextElementSibling.style.display = "block";
    }
    if(passwordInput == 0){
        var password = document.getElementById("password-input");
        password.style.border = "2px solid red";
        password.nextElementSibling.style.display = "block";
    }

    if(emailInput != 0 && passwordInput != 0){
        window.location.href = "dashboard-page.html";
    }
}

function createProfilePage(){
    window.location.href = "newProfile-page.html";
}

function createProfileLogin(){
    window.location.href = "login-newProfile.html"
}
