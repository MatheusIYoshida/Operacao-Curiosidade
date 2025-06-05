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
    if(nameValue != 0 && emailValue != 0 & passwordValue != 0){
        var name = document.getElementById("profile-name").value;

        if(document.getElementById("profile-birthday") == null){
            var birthday = "";
        }else{
            var birthday = document.getElementById("profile-birthday").value;
        }

        var email = document.getElementById("profile-email").value;
        var password = document.getElementById("profile-password").value;
        
        if(address = document.getElementById("profile-address") == null){
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

        if(active = document.getElementById("profile-active") == null){
            var active = true;
        }else{
            var active = document.getElementById("profile-active");
        }
        


        var active = document.getElementById("profile-active");
    
        let profiles = new Array();
        if(localStorage.hasOwnProperty("profiles")){
            profiles = JSON.parse(localStorage.getItem("profiles"));
        }

        profiles.push({name, birthday, email, password, address, moreInformations, interests, feelings, coreValues, active});
        localStorage.setItem("profiles", JSON.stringify(profiles));
    }
}

function removeRedBorder(input){
    input.style.borderColor = "#000";
    input.nextElementSibling.style.display = "none";
}
