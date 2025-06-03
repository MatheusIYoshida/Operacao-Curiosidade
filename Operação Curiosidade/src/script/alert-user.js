document.getElementById("createProfile-submit").onclick = function(){
    var nameValue = document.getElementById("profile-name").value;
    var emailValue = document.getElementById("profile-email").value;
    var passwordValue = document.getElementById("profile-password").value;
    
    if(nameValue == 0){
        var name = document.getElementById("profile-name");
        name.style.border = "2px solid red";
        name.nextElementSibling.style.display = "block";
    }
    if(emailValue == 0){
        var email = document.getElementById("profile-email");
        email.style.border = "2px solid red";
        email.nextElementSibling.style.display = "block";
    }
    if(passwordValue == 0){
        var password = document.getElementById("profile-password");
        password.style.border = "2px solid red";
        password.nextElementSibling.style.display = "block";
    }
}

function removeRedBorder(input){
    input.style.borderColor = "Transparent";
    input.nextElementSibling.style.display = "none";
}