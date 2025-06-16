var email = document.getElementById("email-input");
var alertEmail = document.getElementById("alert-email");
var password = document.getElementById("password-input");
var passwordRequirement = document.querySelector(".password-requirements");
var alertPassword = document.getElementById("alert-password");   
if(localStorage.hasOwnProperty("profiles")){
    profiles = JSON.parse(localStorage.getItem("profiles"));
}

function profileValidation(emailValue, passwordValue){
    var alertError = false;
    
    for(var x = 0; x < profiles.length; x++){
        if(emailValue == profiles[x].email && passwordValue == profiles[x].password){
            giveAuth();
            window.location.href = "dashboard-page.html";
            alertError = true;
        }
    }

    if(alertError == false){
        alert("Incorrect email or password");
    }   
}

function loginChangePage(){
    var emailValue = document.getElementById("email-input").value;
    var passwordValue = document.getElementById("password-input").value;
     if(emailValue == 0){
        email.style.border = "2px solid red";
        email.nextElementSibling.style.display = "block";
        alertEmail.style.display = "none";
    }else if(emailValid(emailValue) == false){
        email.style.border = "2px solid red";
        email.nextElementSibling.style.display = "none";
        alertEmail.style.display = "block";
    }else{
        email.nextElementSibling.style.display = "none";
        alertEmail.style.display = "none";
    }

    if(passwordValue == 0){
        password.style.border = "2px solid red";
        password.nextElementSibling.style.display = "block";
        passwordRequirement.style.display = "none"
        alertPassword.style.display = "none"
    }else if(passwordValue.length < 6){
        password.style.border = "2px solid red";
        password.nextElementSibling.style.display = "none";
        passwordRequirement.style.display = "none"
        alertPassword.style.display = "block";
    }else{
        password.nextElementSibling.style.display = "none";
        passwordRequirement.style.display = "none"
        alertPassword.style.display = "none";
    }

    if(emailValue != 0 && passwordValue.length >= 6 && emailValid(emailValue) == true){
        profileValidation(emailValue, passwordValue);
    }
}

function createProfileLogin(){
    window.location.href = "login-registration.html"
}
