const email = document.getElementById("email-input");
const alertEmail = document.getElementById("alert-email");
const password = document.getElementById("password-input");
const passwordRequirement = document.querySelector(".password-requirements");
const alertPassword = document.getElementById("alert-password");   

function profileValidation(emailValue, passwordValue){
    let profiles = new Array();
    if(localStorage.hasOwnProperty("profiles")){
        profiles = JSON.parse(localStorage.getItem("profiles"));
    }
    let alertError = false;
    
    for(var x = 0; x < profiles.length; x++){
        if(emailValue == profiles[x].email && passwordValue == profiles[x].password){
            giveAuth(profiles[x].name, emailValue);
            window.location.href = "dashboard-page.html";
            alertError = true;
            break;
        }
    }

    if(alertError == false){
        const incorrectInfos = document.getElementById("incorrect-infos");
        incorrectInfos.style.display = "flex";
        password.value = "";
    }   
}

document.getElementById("login-submit").addEventListener("click", () =>{

    var emailValue = document.getElementById("email-input").value;
    var passwordValue = document.getElementById("password-input").value;
    
    if(!emailValue){
        email.style.border = "2px solid red";
        document.querySelector("#enter-email").style.display = "block";
        alertEmail.style.display = "none";
    }else if(emailValid(emailValue) == false){
        email.style.border = "2px solid red";
        document.querySelector("#enter-email").style.display = "none";
        alertEmail.style.display = "block";
    }else{
        email.style.borderColor = "#000";
        document.querySelector("#enter-email").style.display = "none";
        alertEmail.style.display = "none";
    }

    if(!passwordValue){
        password.style.border = "2px solid red";
        document.querySelector("#enter-password").style.display = "block";
        passwordRequirement.style.display = "none";
        alertPassword.style.display = "none";
    }else if(passwordValue.length < 6){
        password.style.border = "2px solid red";
        document.querySelector("#enter-password").style.display = "none";
        passwordRequirement.style.display = "none";
        alertPassword.style.display = "block";
    }else{
        password.style.borderColor = "#000";
        document.querySelector("#enter-password").style.display = "none";
        passwordRequirement.style.display = "block";
        alertPassword.style.display = "none";
    }

    if(emailValue && passwordValue.length >= 6 && emailValid(emailValue)){
        profileValidation(emailValue, passwordValue);
    }
});

function createProfileLogin(){
    window.location.href = "login-registration.html";
}

document.getElementById("close-popUp").addEventListener("click", () => {
    const incorrectInfos = document.getElementById("incorrect-infos");
    incorrectInfos.style.display = "none";
})

email.addEventListener("input", function() {
    this.style.borderColor = "#000";
    document.querySelector("#enter-email").style.display = "none";
    document.querySelector("#alert-email").style.display = "none";
});

password.addEventListener("input", function() {
    this.style.borderColor = "#000"; 
    document.querySelector("#enter-password").style.display = "none";
    document.querySelector("#alert-password").style.display = "none";
    document.querySelector(".password-requirements").style.display = "block";
});