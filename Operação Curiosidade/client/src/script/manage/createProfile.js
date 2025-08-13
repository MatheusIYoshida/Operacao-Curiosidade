async function createProfile() {
    const name = document.getElementById("create-profile-name").value;
    const email = document.getElementById("create-profile-email").value;
    const password = document.getElementById("create-profile-password").value;
    const nameInput = document.getElementById("create-profile-name");
    const alertNameRequirement = document.querySelector(".alert-name-requirements-create");
    const birthdayInput = document.getElementById("create-profile-birthday");
    const alertBirthdayRequirement = document.querySelector(".alert-birthday-create");
    const emailInput = document.getElementById("create-profile-email");
    const alertEmailRequirement = document.querySelector(".alert-email-requirements-create");
    const alertEmailExist = document.querySelector(".alert-email-exist-create");
    const passwordInput = document.getElementById("create-profile-password");
    const passwordRequirement = document.querySelector(".password-requirements-create");
    const alertPasswordRequirement = document.querySelector(".alert-password-requirements-create");
    const currentDate = new Date();
    const limitDate = new Date(currentDate.getFullYear() - 120, currentDate.getMonth(), currentDate.getDate());
    const currentProfile = JSON.parse(localStorage.getItem("currentProfile"));
    var birthVerification = 0;

    if (name == "") {
        nameInput.style.border = "2px solid red";
        nameInput.nextElementSibling.style.display = "block";
        alertNameRequirement.style.display = "none";
        nameInput.scrollIntoView({ block: "center" });
    } else if (nameValid(name) == false) {
        nameInput.style.border = "2px solid red"
        nameInput.nextElementSibling.style.display = "none";
        alertNameRequirement.style.display = "block";
        nameInput.scrollIntoView({ block: "center" });
    } else {
        nameInput.nextElementSibling.style.display = "none";
        alertNameRequirement.style.display = "none";
    }

    if (email == "") {
        emailInput.style.border = "2px solid red";
        emailInput.nextElementSibling.style.display = "block";
        alertEmailRequirement.style.display = "none";
        alertEmailExist.style.display = "none";
        emailInput.scrollIntoView({ block: "center" });
    } else if (emailValid(email) == false) {
        emailInput.style.border = "2px solid red";
        emailInput.nextElementSibling.style.display = "none";
        alertEmailRequirement.style.display = "block";
        alertEmailExist.style.display = "none";
        emailInput.scrollIntoView({ block: "center" });
    } else {
        emailInput.nextElementSibling.style.display = "none";
        alertEmailRequirement.style.display = "none";
        alertEmailExist.style.display = "none";
    }

    if (password == "") {
        passwordInput.style.border = "2px solid red";
        passwordInput.nextElementSibling.style.display = "block";
        passwordRequirement.style.display = "none";
        alertPasswordRequirement.style.display = "none";
        passwordInput.scrollIntoView({ block: "center" });
    } else if (password.length < 6) {
        passwordInput.style.border = "2px solid red";
        passwordInput.nextElementSibling.style.display = "none";
        passwordRequirement.style.display = "none";
        alertPasswordRequirement.style.display = "block";
        passwordInput.scrollIntoView({ block: "center" });
    } else {
        passwordInput.nextElementSibling.style.display = "none";
        passwordRequirement.style.display = "block";
        alertPasswordRequirement.style.display = "none";
    }

    if(document.getElementById("create-profile-birthday") != null){
        const userDate = new Date(`${document.getElementById("create-profile-birthday").value}T00:00:00`);
        const day = String(limitDate.getDate()).padStart(2, '0');
        const month = String(limitDate.getMonth() + 1).padStart(2, '0');
        const year = limitDate.getFullYear(-120);   
        if(userDate > currentDate){
            alertBirthdayRequirement.style.display = "block";
            birthdayInput.style.border = "2px solid red";
            alertBirthdayRequirement.innerHTML = "Birthday date cannot be in the future";
            birthdayInput.scrollIntoView({ block: "center" });
            birthVerification = 1;
        }else if(userDate < limitDate){
            alertBirthdayRequirement.style.display = "block";
            birthdayInput.style.border = "2px solid red";
            alertBirthdayRequirement.innerHTML = `Birthday date cannot be earlier than 
                ${day}/${month}/${year}`;
            birthdayInput.scrollIntoView({ block: "center" });
            birthVerification = 1;
        }else{
            alertBirthdayRequirement.style.display = "none";
            birthVerification = 0;
        }
    }

    if (name != 0 && nameValid(name) && email != 0 && emailValid(email) && password.length >= 6 && birthVerification == 0) {
        if (document.getElementById("create-profile-birthday") == null) {
            var birthday = "";
        } else {
            var birthday = document.getElementById("create-profile-birthday").value;            
        }

        if (document.getElementById("create-profile-address") == null) {
            var address = "";
        } else {
            var address = document.getElementById("create-profile-address").value;
        }

        if (document.getElementById("create-profile-moreInformations") == null) {
            var moreInformations = "";
        } else {
            var moreInformations = document.getElementById("create-profile-moreInformations").value;
        }

        if (document.getElementById("create-profile-interests") == null) {
            var interests = "";
        } else {
            var interests = document.getElementById("create-profile-interests").value;
        }

        if (document.getElementById("create-profile-feelings") == null) {
            var feelings = "";
        } else {
            var feelings = document.getElementById("create-profile-feelings").value;
        }

        if (document.getElementById("create-profile-coreValues") == null) {
            var coreValues = "";
        } else {
            var coreValues = document.getElementById("create-profile-coreValues").value;
        }

        if (document.getElementById("create-modal-active-checkbox") == null || document.getElementById("create-modal-active-checkbox").checked == true) {
            var active = true;
        } else {
            var active = false;
        }

        if (document.getElementById("create-modal-admin-checkbox") && document.getElementById("create-modal-admin-checkbox").checked == true) {
            var admin = true;
        } else {
            var admin = false;
        }

        const newProfile = {
            Name: name,
            Birthday: birthday || null,
            Email: email,
            Password: password,
            Address: address,
            MoreInformations: moreInformations,
            Interests: interests,
            Feelings: feelings,
            CoreValues: coreValues,
            Active: active,
            Admin: admin
        };

        let newLog;
        if(currentProfile){
            newLog = {
                Name: currentProfile.name,
                Email: currentProfile.email
            }
        }else{
            newLog = {
                Name: name,
                Email: email
            }
        }

        try {
            const response = await fetch(`https://localhost:7160/api/Profile?nameCreate=${newLog.Name}&emailCreate=${newLog.Email}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProfile)
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.errors.find(error => error.includes("Email already exists"))) {
                    throw {
                        status: response.status,
                        message: 'This Email already exists',
                        isConflict: true
                    };
                } else {
                    throw {
                        status: response.status,
                        message: responseData?.message || 'Create profile error'
                    };
                }
            }

            const responseData = await response.json();

            if (document.getElementById("creation-alert")) {
                const creationAlert = document.getElementById("creation-alert");
                creationAlert.classList.remove("hide");
                setTimeout(() => {
                    creationAlert.classList.add("hide");
                }, 5000);
            }

            if (window.location.href.split("/").pop() == "login-registration.html") {
                window.location.href = "login-page.html";
            } else if (window.location.href.split("/").pop() == "profiles-page.html") {
                toggleModalCreate();
                requestUserList(1, 15);
            }
        } catch (error) {
            if (error.isConflict) {
                emailInput.style.border = "2px solid red";
                emailInput.nextElementSibling.style.display = "none";
                alertEmailRequirement.style.display = "none";
                alertEmailExist.style.display = "block";
                emailInput.scrollIntoView({ block: "center" });
            } else {
                console.error('Create profile error', error);
            }
        }
    }
}