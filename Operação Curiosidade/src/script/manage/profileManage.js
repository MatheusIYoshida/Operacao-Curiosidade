function createProfile(){
    let profiles = JSON.parse(localStorage.getItem("profiles")) || [];

    var name = document.getElementById("create-profile-name").value;
    var email = document.getElementById("create-profile-email").value;
    var password = document.getElementById("create-profile-password").value;
    var nameInput = document.getElementById("create-profile-name");
    var alertNameRequirement = document.querySelector(".alert-name-requirements-create");
    var emailInput = document.getElementById("create-profile-email");
    var alertEmailRequirement = document.querySelector(".alert-email-requirements-create");
    var alertEmailExist = document.querySelector(".alert-email-exist-create");
    var emailExist = false;
    var passwordInput = document.getElementById("create-profile-password");
    var passwordRequirement = document.querySelector(".password-requirements-create");
    var alertPasswordRequirement = document.querySelector(".alert-password-requirements-create");
    
    if(name == 0){
        nameInput.style.border = "2px solid red";
        nameInput.nextElementSibling.style.display = "block";
        alertNameRequirement.style.display = "none";
        nameInput.scrollIntoView({block: "center"});
    }else if(nameValid(name) == false){
        nameInput.style.border = "2px solid red"
        nameInput.nextElementSibling.style.display = "none";
        alertNameRequirement.style.display = "block";
        nameInput.scrollIntoView({block: "center"});
    }else{
        nameInput.nextElementSibling.style.display = "none";
        alertNameRequirement.style.display = "none";
    }

    if(email == 0){
        emailInput.style.border = "2px solid red";
        emailInput.nextElementSibling.style.display = "block";
        alertEmailRequirement.style.display = "none";
        alertEmailExist.style.display = "none"; 
        emailInput.scrollIntoView({block: "center"});
    }else if(emailValid(email) == false){
        emailInput.style.border = "2px solid red";
        emailInput.nextElementSibling.style.display = "none";
        alertEmailRequirement.style.display = "block";
        alertEmailExist.style.display = "none";
        emailInput.scrollIntoView({block: "center"});
    }else{
        let countProfiles = 0;
        if(profiles.length){
            countProfiles = profiles.length;
        }
        for(var x = 0; x < countProfiles; x++){
            if(email == profiles[x].email){
                emailInput.style.border = "2px solid red";
                emailInput.nextElementSibling.style.display = "none";
                alertEmailRequirement.style.display = "none";
                alertEmailExist.style.display = "block";    
                emailExist = true;
                emailInput.scrollIntoView({block: "center"});
            }
            if(emailExist == false){
                emailInput.nextElementSibling.style.display = "none";
                alertEmailRequirement.style.display = "none"; 
                alertEmailExist.style.display = "none";
            }
        }
    }

    if(password == 0){
        passwordInput.style.border = "2px solid red";
        passwordInput.nextElementSibling.style.display = "block";
        passwordRequirement.style.display = "none";
        alertPasswordRequirement.style.display = "none";
        passwordInput.scrollIntoView({block: "center"});
    }else if(password.length < 6){
        passwordInput.style.border = "2px solid red";
        passwordInput.nextElementSibling.style.display = "none";
        passwordRequirement.style.display = "none";
        alertPasswordRequirement.style.display = "block";
        passwordInput.scrollIntoView({block: "center"});
    }else{
        passwordInput.nextElementSibling.style.display = "none";
        passwordRequirement.style.display = "block";
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
                var active = "Inactive";
            }
        }

        if(birthday == "" || address == "" || moreInformations == "" || interests == "" || feelings == "" || coreValues == ""){
            var status = "Incomplete";
        }else{
            var status = "Complete";
        }

        createdAt = registrationDate();

        profiles.push({name, birthday, email, password, address, moreInformations, interests, feelings, coreValues, active, status, createdAt});
        localStorage.setItem("profiles", JSON.stringify(profiles));

        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if(currentUser){
            addLog(currentUser[0].name, currentUser[0].email, `Created the profile ${email}`, registrationFullDate(createdAt, registrationTime()));
        }else{
            addLog(name, email, "Created their own profile", registrationFullDate(createdAt, registrationTime()));
        }
        
        if(window.location.href.split("/").pop() == "login-registration.html"){
            window.location.href = "login-page.html";
        }else if(window.location.href.split("/").pop() == "profiles-page.html"){
            toggleModalCreate();
            userList();
        }
    }
}

function removeRedBorder(input) {
    input.style.borderColor = "";
    input.style.border = "";
    
    if (input.nextElementSibling) {
        input.nextElementSibling.style.display = 'none';
        
        if (input.nextElementSibling.nextElementSibling) {
            input.nextElementSibling.nextElementSibling.style.display = 'none';
            
            if (input.nextElementSibling.nextElementSibling.nextElementSibling) {
                input.nextElementSibling.nextElementSibling.nextElementSibling.style.display = 'none';
            }
        }
    }
}

if(document.getElementById("create-profile-password")){
    document.getElementById("create-profile-password").addEventListener("input", () => {
        document.querySelector(".password-requirements-create").style.display = "block";
    });
}

if(document.getElementById("profile-password")){
    document.getElementById("profile-password").addEventListener("input", () => {
        document.querySelector(".password-requirements").style.display = "block";
    });
}

function removeProfile(buttonRemove){
    let profiles = JSON.parse(localStorage.getItem("profiles")) || [];
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || [];
    const trToRemove = buttonRemove.closest("tr");
    const emailToRemove = trToRemove.querySelector(".tableEmail").textContent;

    const removedProfile = profiles.find(profile => profile.email == emailToRemove);
    const newProfiles = profiles.filter(profile => profile.email != emailToRemove);

    localStorage.setItem("profiles", JSON.stringify(newProfiles));

    if(removedProfile){
        if(currentUser[0] == emailToRemove){
            addLog(currentUser[0].name, currentUser[0].email, "Removed their own profile", registrationFullDate(registrationDate(), registrationTime()));
            localStorage.removeItem("currentUser");
            checkUser(); 
        }else{
            addLog(currentUser[0].name, currentUser[0].email, `Removed the profile ${emailToRemove}`, registrationFullDate(registrationDate(), registrationTime()));
        }
    }

    trToRemove.remove();
}

let currentEditIndex = null;
function fillProfileForm(emailToEdit) {
    const checkProfiles = JSON.parse(localStorage.getItem("profiles"));
    for(x = 0; x < checkProfiles.length; x++){
        if(emailToEdit == checkProfiles[x].email){
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

            inputName.value = checkProfiles[x].name;
            inputBirthday.value = checkProfiles[x].birthday;
            inputEmail.value = checkProfiles[x].email;
            inputPassword.value = checkProfiles[x].password;
            inputAddress.value = checkProfiles[x].address;
            inputMoreInformations.value = checkProfiles[x].moreInformations;
            inputInterests.value = checkProfiles[x].interests;
            inputFeelings.value = checkProfiles[x].feelings;
            inputCoreValues.value = checkProfiles[x].coreValues;
            if(checkProfiles[x].active == "Active"){
                inputActive.checked = true;
            }else{
                inputActive.checked = false;
            }
            currentEditIndex = x;
            break;
        }
    }
}

function modalEditProfile(buttonEdit){
    swapCloseButton();
    const trToEdit = buttonEdit.closest("tr");
    const currentEditEmail = trToEdit.querySelector(".tableEmail").textContent;
    fillProfileForm(currentEditEmail);
}

function headerModalEditProfile(){
    swapCloseButton();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const currentEditEmail = currentUser[0].email;
    fillProfileForm(currentEditEmail);
}

function editProfiles(){
    const index = currentEditIndex;
    const currentEmail = JSON.parse(localStorage.getItem("profiles"));
    const oldEmail = currentEmail[index].email;

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
    currentEmail[index] = {
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
        status: currentEmail[index].status,
        createdAt: currentEmail[index].createdAt
    }

    if(currentEmail[index].name == 0){
        nameInput.style.border = "2px solid red";
        nameInput.nextElementSibling.style.display = "block";
        nameInput.scrollIntoView({block: "center"});
    }else if(nameValid(currentEmail[index].name) == false){
        nameInput.style.border = "2px solid red"
        nameInput.nextElementSibling.style.display = "none";
        alertNameRequirement.style.display = "block";
        nameInput.scrollIntoView({block: "center"});
    }else{
        nameInput.nextElementSibling.style.display = "none";
        alertNameRequirement.style.display = "none";
    }

    if(currentEmail[index].email == ""){
        emailInput.style.border = "2px solid red";
        emailInput.nextElementSibling.style.display = "block";
        alertEmailRequirement.style.display = "none";
        alertEmailExist.style.display = "none"; 
        emailInput.scrollIntoView({block: "center"});
    }else if(emailValid(currentEmail[index].email) == false){
        emailInput.style.border = "2px solid red";
        emailInput.nextElementSibling.style.display = "none";
        alertEmailRequirement.style.display = "block";
        alertEmailExist.style.display = "none";
        emailInput.scrollIntoView({block: "center"});
    }else{
        for (let i = 0; i < currentEmail.length; i++) {
            if (i != index && email == currentEmail[i].email) {
                emailExist = true;
                emailInput.style.border = "2px solid red";
                alertEmailRequirement.style.display = "none";
                alertEmailExist.style.display = "block";
                emailInput.scrollIntoView({block: "center"});
                break;
            }
        }
    }

    if(currentEmail[index].password == ""){
        passwordInput.style.border = "2px solid red";
        passwordInput.nextElementSibling.style.display = "block";
        passwordRequirement.style.display = "none";
        alertPasswordRequirement.style.display = "none";
        passwordInput.scrollIntoView({block: "center"});
    }else if(currentEmail[index].password.length < 6){
        passwordInput.style.border = "2px solid red";
        passwordInput.nextElementSibling.style.display = "none";
        passwordRequirement.style.display = "none";
        alertPasswordRequirement.style.display = "block";
        passwordInput.scrollIntoView({block: "center"});
    }else{
        passwordInput.nextElementSibling.style.display = "none";
        passwordRequirement.style.display = "block";
        alertPasswordRequirement.style.display = "none";
    }

    if(currentEmail[index].birthday == "" || currentEmail[index].address == "" || currentEmail[index].moreInformations == "" || currentEmail[index].interests == "" || currentEmail[index].feelings == "" || currentEmail[index].coreValues == ""){
        currentEmail[index].status = "Incomplete";
    }else{
        currentEmail[index].status = "Complete";
    }

    if(currentEmail[index].name != 0 && nameValid(currentEmail[index].name) && emailValid(currentEmail[index].email) && emailExist == false && currentEmail[index].password.length >= 6){
        localStorage.setItem("profiles", JSON.stringify(currentEmail));
        
        
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (oldEmail == currentUser[0].email) {
            addLog(currentUser[0].name, currentUser[0].email, "Edited their own profile", registrationFullDate(registrationDate(), registrationTime()));
            currentUser[0].email = currentEmail[index].email;
            currentUser[0].name = currentEmail[index].name;
            localStorage.removeItem("currentUser"); 
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
        }else{
            addLog(currentUser[0].name, currentUser[0].email, `Edited the profile ${currentEmail[index].email}`, registrationFullDate(registrationDate(), registrationTime()));
        }

        toggleModalEdit();
        const currentPage = window.location.href.split("/").pop();

        switch(currentPage){
            case "dashboard-page.html":
                shortUserList();
                pendingUsers();
                break;
            case "profiles-page.html":
                userList();
                break;
            case "logs.html":
                logsList();
                break;
            default:
        }
    }
}