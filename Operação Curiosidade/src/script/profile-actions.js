let profiles = new Array();    
if(localStorage.hasOwnProperty("profiles")){
    profiles = JSON.parse(localStorage.getItem("profiles"));
}

function createProfile(){
    var name = document.getElementById("create-profile-name").value;
    var email = document.getElementById("create-profile-email").value;
    var password = document.getElementById("create-profile-password").value;
    var nameInput = document.getElementById("create-profile-name");
    var alertNameRequirement = document.querySelector(".alert-name-requirements-create");
    var emailInput = document.getElementById("create-profile-email");
    var alertEmailRequirement = document.querySelector(".alert-email-requirements-create");
    var alertEmailExist = document.querySelector(".alert-email-exist-create")
    var emailExist = false;
    var passwordInput = document.getElementById("create-profile-password");
    var passwordRequirement = document.querySelector(".password-requirements-create");
    var alertPasswordRequirement = document.querySelector(".alert-password-requirements-create");
    
    if(name == 0){
        nameInput.style.border = "2px solid red";
        nameInput.nextElementSibling.style.display = "block";
        alertNameRequirement.style.display = "none";
    }else if(nameValid(name) == false){
        nameInput.style.border = "2px solid red"
        nameInput.nextElementSibling.style.display = "none";
        alertNameRequirement.style.display = "block";
    }else{
        nameInput.nextElementSibling.style.display = "none";
        alertNameRequirement.style.display = "none";
    }

    if(email == 0){
        emailInput.style.border = "2px solid red";
        emailInput.nextElementSibling.style.display = "block";
        alertEmailRequirement.style.display = "none";
        alertEmailExist.style.display = "none"; 
    }else if(emailValid(email) == false){
        emailInput.style.border = "2px solid red";
        emailInput.nextElementSibling.style.display = "none";
        alertEmailRequirement.style.display = "block";
        alertEmailExist.style.display = "none";
    }else{
        for(var x = 0; x < profiles.length; x++){
            if(email == profiles[x].email){
                emailInput.style.border = "2px solid red";
                emailInput.nextElementSibling.style.display = "none";
                alertEmailRequirement.style.display = "none";
                alertEmailExist.style.display = "block";    
                emailExist = true;
            }
            if(emailExist == false){
                emailInput.nextElementSibling.style.display = "none"
                alertEmailRequirement.style.display = "none"; 
                alertEmailExist.style.display = "none";
            }
        }
    }

    if(password == 0){
        passwordInput.style.border = "2px solid red";
        passwordInput.nextElementSibling.style.display = "block";
        passwordRequirement.style.display = "none"
        alertPasswordRequirement.style.display = "none"
    }else if(password.length < 6){
        passwordInput.style.border = "2px solid red";
        passwordInput.nextElementSibling.style.display = "none";
        passwordRequirement.style.display = "none"
        alertPasswordRequirement.style.display = "block";
    }else{
        passwordInput.nextElementSibling.style.display = "none";
        passwordRequirement.style.display = "none"
        alertPasswordRequirement.style.display = "none";
    }

    if(name != 0 && nameValid(name) && emailValid(email) && emailExist == false && password.length >= 6){

        if(document.getElementById("create-profile-birthday") == null){
            var birthday = "";
        }else{
            var birthday = document.getElementById("create-profile-birthday").value;
        }
        
        if(document.getElementById("create-profile-address") == null){
            var address = "";
        }else{
            var address = document.getElementById("create-profile-address").value;
        }

        if(document.getElementById("create-profile-moreInformations") == null){
            var moreInformations = "";
        }else{
            var moreInformations = document.getElementById("create-profile-moreInformations").value;
        }

        if(document.getElementById("create-profile-interests") == null){
            var interests = "";
        }else{
            var interests = document.getElementById("create-profile-interests").value;
        }

        if(document.getElementById("create-profile-feelings") == null){
            var feelings = "";
        }else{
            var feelings = document.getElementById("create-profile-feelings").value;
        }

        if(document.getElementById("create-profile-coreValues") == null){
            var coreValues = "";
        }else{
            var coreValues = document.getElementById("create-profile-coreValues").value;
        }

        if(document.getElementById("create-modal-active-checkbox") == null){
            var active = "Active";
        }else{
            if(document.getElementById("create-modal-active-checkbox").checked == true){
                var active = "Active";
            }else{
                var active = "Inactive"
            }
        }

        if(birthday == "" || address == "" || moreInformations == "" || interests == "" || feelings == "" || coreValues == ""){
            var status = "Incomplete"
        }else{
            var status = "Complete"
        }

        createdAt = registrationDate();

        profiles.push({name, birthday, email, password, address, moreInformations, interests, feelings, coreValues, active, status, createdAt});
        localStorage.setItem("profiles", JSON.stringify(profiles));

        addLog(name, email, "Create Profile", registrationFullDate(createdAt, registrationTime()));

        if(window.location.href.split("/").pop() == "login-newProfile.html"){
            window.location.href = "login-page.html"
        }else if(window.location.href.split("/").pop() == "profiles-page.html"){
            toggleModalCreate();
            location.reload();
        }
    }
}

function removeRedBorder(input){
    input.style.borderColor = "#000";
    input.nextElementSibling.style.display = "none";
}

function removeProfile(buttonRemove){
    const trToRemove = buttonRemove.closest("tr");
    const emailToRemove = trToRemove.querySelector(".tableEmail").textContent;
    let newProfiles = new Array;
    for(var x = 0; x < profiles.length; x++){
        if(emailToRemove != profiles[x].email){
            newProfiles.push(profiles[x]);
        }else{
            addLog(profiles[x].name, profiles[x].email, "Remove Profile", registrationFullDate(registrationDate(), registrationTime()));
        }
    }
    localStorage.removeItem("profiles");
    localStorage.setItem("profiles", JSON.stringify(newProfiles));
    location.reload();
}

var x = 0;
function modalEditProfile(buttonEdit){
    const trToEdit = buttonEdit.closest("tr");
    const emailToEdit = trToEdit.querySelector(".tableEmail").textContent;
    for(x = 0; x < profiles.length; x++){
        if(emailToEdit == profiles[x].email){
            const inputName = document.getElementById("profile-name");
            const inputBirthday = document.getElementById("profile-birthday");
            const inputEmail = document.getElementById("profile-email");
            const inputPassword = document.getElementById("profile-password");
            const inputAddress = document.getElementById("profile-address");
            const inputMoreInformations = document.getElementById("profile-moreInformations");
            const inputInterests = document.getElementById("profile-interests");
            const inputFeelings = document.getElementById("profile-feelings"); 
            const inputCoreValues = document.getElementById("profile-coreValues"); 
            const inputActive = document.getElementById("modal-active-checkbox"); 

            inputName.value = profiles[x].name;
            inputBirthday.value = profiles[x].birthday;
            inputEmail.value = profiles[x].email;
            inputPassword.value = profiles[x].password;
            inputAddress.value = profiles[x].address;
            inputMoreInformations.value = profiles[x].moreInformations;
            inputInterests.value = profiles[x].interests;
            inputFeelings.value = profiles[x].feelings;
            inputCoreValues.value = profiles[x].coreValues;
            if(profiles[x].active == "Active"){
                inputActive.checked = true;
            }else{
                inputActive.checked = false;
            }
            break;
        }
    }
}

function editProfiles(){
    const index = x;
    profiles = JSON.parse(localStorage.getItem("profiles"));

    const nameInput = document.getElementById("profile-name");
    const emailInput = document.getElementById("profile-email");
    const passwordInput = document.getElementById("profile-password");
    const alertNameRequirement = document.querySelector(".alert-name-requirements");
    const email = emailInput.value;
    const alertEmailRequirement = document.querySelector(".alert-email-requirements");
    const alertEmailExist = document.querySelector(".alert-email-exist");
    const passwordRequirement = document.querySelector(".password-requirements");
    const alertPasswordRequirement = document.querySelector(".alert-password-requirements");
    var emailExist = false;

    profiles[index] = {
        name: document.getElementById("profile-name").value,
        birthday: document.getElementById("profile-birthday").value,
        email: document.getElementById("profile-email").value,
        password: document.getElementById("profile-password").value,
        address: document.getElementById("profile-address").value,
        moreInformations: document.getElementById("profile-moreInformations").value,
        interests: document.getElementById("profile-interests").value,
        feelings: document.getElementById("profile-feelings").value,
        coreValues: document.getElementById("profile-coreValues").value,
        active: document.getElementById("modal-active-checkbox").checked ? "Active" : "Inactive",
        status: profiles[index].status,
        createdAt: profiles[index].createdAt
    }

    if(profiles[index].name == 0){
        nameInput.style.border = "2px solid red";
        nameInput.nextElementSibling.style.display = "block";
    }else if(nameValid(profiles[index].name) == false){
        nameInput.style.border = "2px solid red"
        nameInput.nextElementSibling.style.display = "none";
        alertNameRequirement.style.display = "block";
    }else{
        nameInput.nextElementSibling.style.display = "none";
        alertNameRequirement.style.display = "none";
    }

    if(profiles[index].email == 0){
        emailInput.style.border = "2px solid red";
        emailInput.nextElementSibling.style.display = "block";
        alertEmailRequirement.style.display = "none";
        alertEmailExist.style.display = "none"; 
    }else if(emailValid(profiles[index].email) == false){
        emailInput.style.border = "2px solid red";
        emailInput.nextElementSibling.style.display = "none";
        alertEmailRequirement.style.display = "block";
        alertEmailExist.style.display = "none";
    }else{
        for (let i = 0; i < profiles.length; i++) {
            if (i != index && email == profiles[i].email) {
                emailExist = true;
                emailInput.style.border = "2px solid red";
                alertEmailRequirement.style.display = "none"
                alertEmailExist.style.display = "block";
                break;
            }
        }
    }

    if(profiles[index].password == ""){
        passwordInput.style.border = "2px solid red";
        passwordInput.nextElementSibling.style.display = "block";
        passwordRequirement.style.display = "none"
        alertPasswordRequirement.style.display = "none"
    }else if(profiles[index].password.length < 6){
        passwordInput.style.border = "2px solid red";
        passwordInput.nextElementSibling.style.display = "none";
        passwordRequirement.style.display = "none"
        alertPasswordRequirement.style.display = "block";
    }else{
        passwordInput.nextElementSibling.style.display = "none";
        passwordRequirement.style.display = "block"
        alertPasswordRequirement.style.display = "none";
    }

    if(profiles[index].birthday == "" || profiles[index].address == "" || profiles[index].moreInformations == "" || profiles[index].interests == "" || profiles[index].feelings == "" || profiles[index].coreValues == ""){
        profiles[index].status = "Incomplete"
    }else{
        profiles[index].status = "Complete"
    }

    if(profiles[index].name != 0 && nameValid(profiles[index].name) && emailValid(profiles[index].email) && emailExist == false && profiles[index].password.length >= 6){
        localStorage.setItem("profiles", JSON.stringify(profiles));
        addLog(profiles[index].name, profiles[index].email, "Edit Profile", registrationFullDate(registrationDate(), registrationTime()));
        toggleModalEdit();
        location.reload();
    }
}