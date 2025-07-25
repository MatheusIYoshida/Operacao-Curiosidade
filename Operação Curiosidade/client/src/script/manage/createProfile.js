async function createProfile() {
    var name = document.getElementById("create-profile-name").value;
    var email = document.getElementById("create-profile-email").value;
    var password = document.getElementById("create-profile-password").value;
    var nameInput = document.getElementById("create-profile-name");
    var alertNameRequirement = document.querySelector(".alert-name-requirements-create");
    var emailInput = document.getElementById("create-profile-email");
    var alertEmailRequirement = document.querySelector(".alert-email-requirements-create");
    var alertEmailExist = document.querySelector(".alert-email-exist-create");
    var passwordInput = document.getElementById("create-profile-password");
    var passwordRequirement = document.querySelector(".password-requirements-create");
    var alertPasswordRequirement = document.querySelector(".alert-password-requirements-create");
    const currentProfile = JSON.parse(localStorage.getItem("currentProfile"));

    if (name == 0) {
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

    if (email == 0) {
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

    if (password == 0) {
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

    if (name != 0 && nameValid(name) && password.length >= 6) {

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

        try {
            const response = await fetch('https://localhost:7160/api/Profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProfile)
            });

            if (!response.ok) {
                if (response.status === 409) {
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

            if (currentProfile) {
                var log = {
                    name: currentProfile.name,
                    email: currentProfile.email,
                    action: `Created the profile ${newProfile.Email}`
                };
                createLogs(log);
            } else {
                var log = {
                    name: newProfile.Name,
                    email: newProfile.Email,
                    action: `Created their own profile`
                };
                createLogs(log);
            }

            if (window.location.href.split("/").pop() == "login-registration.html") {
                window.location.href = "login-page.html";
            } else if (window.location.href.split("/").pop() == "profiles-page.html") {
                toggleModalCreate();
                userList(1, 15);
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