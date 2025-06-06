function createProfile(refPage){
    var nameValue = document.getElementById("profile-name").value;
    var emailValue = document.getElementById("profile-email").value;
    var passwordValue = document.getElementById("profile-password").value;
    var email = document.getElementById("profile-email");
    var alertEmailRequirement = document.querySelector(".alert-email-requirements");
    var alertEmailExist = document.querySelector(".alert-email-exist")
    var emailExist = false;
    var password = document.getElementById("profile-password");
    var passwordRequirement = document.querySelector(".password-requirements");
    var alertPasswordRequirement = document.querySelector(".alert-password-requirements");
    let profiles = new Array();    
    if(localStorage.hasOwnProperty("profiles")){
        profiles = JSON.parse(localStorage.getItem("profiles"));
    }
    
    if(nameValue == 0){
        var name = document.getElementById("profile-name");
        name.style.border = "2px solid red";
        name.nextElementSibling.style.display = "block";
    }

    if(emailValue == 0){
        email.style.border = "2px solid red";
        email.nextElementSibling.style.display = "block";
        alertEmailRequirement.style.display = "none";
        alertEmailExist.style.display = "none"; 
    }else if(emailValid(emailValue) == false){
        email.style.border = "2px solid red";
        email.nextElementSibling.style.display = "none";
        alertEmailRequirement.style.display = "block";
        alertEmailExist.style.display = "none";
    }else{
        for(var x = 0; x < profiles.length; x++){
            if(emailValue == profiles[x].email){
                email.style.border = "2px solid red";
                email.nextElementSibling.style.display = "none";
                alertEmailRequirement.style.display = "none";
                alertEmailExist.style.display = "block";    
                emailExist = true;
            }
            if(emailExist == false){
                email.nextElementSibling.style.display = "none"
                alertEmailRequirement.style.display = "none"; 
                alertEmailExist.style.display = "none";
            }
        }
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

    if(nameValue != 0 && emailValid(emailValue) == true && emailExist == false && passwordValue.length >= 6){
        var name = document.getElementById("profile-name").value;

        if(document.getElementById("profile-birthday") == null){
            var birthday = "";
        }else{
            var birthday = document.getElementById("profile-birthday").value;
        }

        var email = document.getElementById("profile-email").value;
        var password = document.getElementById("profile-password").value;
        
        if(document.getElementById("profile-address") == null){
            var address = "";
        }else{
            var address = document.getElementById("profile-address").value;
        }

        if(document.getElementById("profile-moreInformations") == null){
            var moreInformations = "";
        }else{
            var moreInformations = document.getElementById("profile-moreInformations").value;
        }

        if(document.getElementById("profile-interests") == null){
            var interests = "";
        }else{
            var interests = document.getElementById("profile-interests").value;
        }

        if(document.getElementById("profile-feelings") == null){
            var feelings = "";
        }else{
            var feelings = document.getElementById("profile-feelings").value;
        }

        if(document.getElementById("profile-coreValues") == null){
            var coreValues = "";
        }else{
            var coreValues = document.getElementById("profile-coreValues").value;
        }

        if(document.getElementById("profile-active") == null){
            var active = "active";
        }else{
            if(document.getElementById("profile-active").checked == true){
                var active = "Active";
            }else{
                var active = "Inactive"
            }
        }

        profiles.push({name, birthday, email, password, address, moreInformations, interests, feelings, coreValues, active});
        localStorage.setItem("profiles", JSON.stringify(profiles));

        if(refPage.split("/").pop() == "newProfile-page.html"){
            console.log("Entrou")
            window.location.href = "profiles-page.html"
        }else if(refPage.split("/").pop() == "login-newProfile.html"){
            window.location.href = "login-page.html"
        }
    }
}

function removeRedBorder(input){
    input.style.borderColor = "#000";
    input.nextElementSibling.style.display = "none";
}
