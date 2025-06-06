var email = document.getElementById("email-input");
var alertEmailRequirement = document.querySelector(".alert-email-requirements");
var password = document.getElementById("password-input");
var passwordRequirement = document.querySelector(".password-requirements");
var alertPasswordRequirement = document.querySelector(".alert-password-requirements");
let profiles = new Array();    
if(localStorage.hasOwnProperty("profiles")){
    profiles = JSON.parse(localStorage.getItem("profiles"));
}

function profileValidation(){
    var alertError = false;
    var emailValue = document.getElementById("email-input").value;
    var passwordValue = document.getElementById("password-input").value;
    
    for(var x = 0; x < profiles.length; x++){
        if(emailValue == profiles[x].email && passwordValue == profiles[x].password){
            window.location.href = "dashboard-page.html";
            alertError = true;
        }
    }

    if(alertError == false){
        console.log("teste")
        alert("Incorrect email or password");
    }   
}

function loginChangePage(){
    var emailValue = document.getElementById("email-input").value;
    var passwordValue = document.getElementById("password-input").value;
     if(emailValue == 0){
        email.style.border = "2px solid red";
        email.nextElementSibling.style.display = "block";
        alertEmailRequirement.style.display = "none";
    }else if(emailValid(emailValue) == false){
        email.style.border = "2px solid red";
        email.nextElementSibling.style.display = "none";
        alertEmailRequirement.style.display = "block";
    }    

    if(passwordValue == 0){
        password.style.border = "2px solid red";
        password.nextElementSibling.style.display = "block";
        passwordRequirement.style.display = "none"
        alertPasswordRequirement.style.display = "none"
    }else if(passwordValue.length < 6){
        password.style.border = "2px solid red";
        password.nextElementSibling.style.display = "none";
        passwordRequirement.style.display = "none"
        alertPasswordRequirement.style.display = "block";
    }else{
        password.nextElementSibling.style.display = "none";
        passwordRequirement.style.display = "none"
        alertPasswordRequirement.style.display = "none";
    }

    if(emailValue != 0 && passwordValue.length >= 6 && emailValid(emailValue) == true){
        profileValidation();
    }
}

function createProfilePage(){
    window.location.href = "newProfile-page.html";
}

function createProfileLogin(){
    window.location.href = "login-newProfile.html"
}
