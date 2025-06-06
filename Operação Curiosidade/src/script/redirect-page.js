function profileValidation(){
    var profiles = JSON.parse(localStorage.getItem("profiles"));
    var email = document.getElementById("email-input").value;
    var password = document.getElementById("password-input").value;
    var alertError = false;

    for(var x = 0; x < profiles.length; x++){
        if(email == profiles[x].email && password == profiles[x].password){
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
        profileValidation();
    }
}

function createProfilePage(){
    window.location.href = "newProfile-page.html";
}

function createProfileLogin(){
    window.location.href = "login-newProfile.html"
}
