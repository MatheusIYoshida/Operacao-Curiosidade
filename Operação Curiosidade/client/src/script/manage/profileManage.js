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
                userList();
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

if (document.getElementById("create-profile-password")) {
    document.getElementById("create-profile-password").addEventListener("input", () => {
        document.querySelector(".password-requirements-create").style.display = "block";
    });
}

if (document.getElementById("profile-password")) {
    document.getElementById("profile-password").addEventListener("input", () => {
        document.querySelector(".password-requirements").style.display = "block";
    });
}

async function removeProfile() {
    const currentProfile = JSON.parse(localStorage.getItem("currentProfile")) || [];
    const token = localStorage.getItem("Token");
    const emailToRemove = localStorage.getItem("removeProfile");

    try {
        const response = await fetch(`https://localhost:7160/api/Profile/by-email/${emailToRemove}`, {
            method: 'Delete',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        const removalAlert = document.getElementById("removal-alert");
        removalAlert.classList.remove("hide");
        setTimeout(() => {
            removalAlert.classList.add("hide");
        }, 5000);

        localStorage.removeItem("removeProfile");

        if (emailToRemove == currentProfile.email) {
            var log = {
                name: currentProfile.name,
                email: currentProfile.email,
                action: "Removed their own profile"
            };
            createLogs(log);
            localStorage.removeItem("currentProfile");
            checkAuth();
        } else {
            var log = {
                name: currentProfile.name,
                email: currentProfile.email,
                action: `Removed the profile ${emailToRemove}`
            };
            createLogs(log);
        }

        toggleModalRemove();
        userList();
    }
    catch (error) {
        console.error('Remove profile error', error);
    }
}

var currentEmail = "";
async function fillProfileForm(emailToEdit) {
    const currentProfile = JSON.parse(localStorage.getItem("currentProfile"));
    const token = localStorage.getItem("Token");
    try {
        const profile = await getProfile(emailToEdit, token)

        document.getElementById("profile-name").value = profile.name;
        document.getElementById("profile-birthday").value = (profile.birthday != null) ? formatDateInput(formatDate(profile.birthday)) : "";
        document.getElementById("profile-email").value = profile.email;
        document.getElementById("profile-password").value = profile.password;
        document.getElementById("profile-address").value = profile.address;
        document.getElementById("profile-moreInformations").value = profile.moreInformations;
        document.getElementById("profile-interests").value = profile.interests;
        document.getElementById("profile-feelings").value = profile.feelings;
        document.getElementById("profile-coreValues").value = profile.coreValues;
        document.getElementById("modal-active-checkbox").checked = profile.active;
        document.getElementById("modal-admin-checkbox").checked = profile.admin;

        if (emailToEdit != currentProfile.email && currentProfile.admin == false) {
            document.getElementById("modal-admin-checkbox").style.opacity = ".4";
            document.getElementById("modal-admin-checkbox").disabled = true;
            document.getElementById("modal-admin-title").style.opacity = ".4";
            document.getElementById("profile-password").disabled = true;
            document.getElementById("profile-password").style.opacity = ".4";
            document.getElementById("profile-password").previousElementSibling.style.opacity = ".4";
            document.querySelector(".password-requirements").style.opacity = ".4";
        } else if (emailToEdit == currentProfile.email && currentProfile.admin == false) {
            document.getElementById("modal-admin-checkbox").style.opacity = ".4";
            document.getElementById("modal-admin-checkbox").disabled = true;
            document.getElementById("modal-admin-title").style.opacity = ".4";
            document.getElementById("profile-password").disabled = false;
            document.getElementById("profile-password").style.opacity = "1";
            document.getElementById("profile-password").previousElementSibling.style.opacity = "1";
            document.querySelector(".password-requirements").style.opacity = "1";
        } else {
            document.getElementById("modal-admin-checkbox").style.opacity = "1";
            document.getElementById("modal-admin-checkbox").disabled = false;
            document.getElementById("modal-admin-title").style.opacity = "1";
            document.getElementById("profile-password").disabled = false;
            document.getElementById("profile-password").style.opacity = "1";
            document.getElementById("profile-password").previousElementSibling.style.opacity = "1";
            document.querySelector(".password-requirements").style.opacity = "1";
        }

        currentEmail = emailToEdit;
    }
    catch (error) {
        console.error("Edit profile error", error);
    }
}

function modalEditProfile(buttonEdit) {
    swapCloseButton();
    const trToEdit = buttonEdit.closest("tr");
    fillProfileForm(trToEdit.querySelector(".tableEmail").textContent);
}

function headerModalEditProfile() {
    swapCloseButton();
    const currentProfile = JSON.parse(localStorage.getItem("currentProfile"));
    fillProfileForm(currentProfile.email);
}

async function editProfiles() {
    const currentProfile = JSON.parse(localStorage.getItem("currentProfile"));
    const token = localStorage.getItem("Token");
    const nameInput = document.getElementById("profile-name");
    const emailInput = document.getElementById("profile-email");
    const passwordInput = document.getElementById("profile-password");
    const alertNameRequirement = document.querySelector(".alert-name-requirements");
    const alertEmailRequirement = document.querySelector(".alert-email-requirements");
    const alertEmailExist = document.querySelector(".alert-email-exist");
    const passwordRequirement = document.querySelector(".password-requirements");
    const alertPasswordRequirement = document.querySelector(".alert-password-requirements");

    var profile = {
        name: document.getElementById("profile-name").value,
        birthday: document.getElementById("profile-birthday").value,
        email: document.getElementById("profile-email").value,
        password: document.getElementById("profile-password").value,
        address: document.getElementById("profile-address").value,
        moreInformations: document.getElementById("profile-moreInformations").value,
        interests: document.getElementById("profile-interests").value,
        feelings: document.getElementById("profile-feelings").value,
        coreValues: document.getElementById("profile-coreValues").value,
        active: document.getElementById("modal-active-checkbox").checked,
        admin: document.getElementById("modal-admin-checkbox").checked,
    }

    if (profile.name == 0) {
        nameInput.style.border = "2px solid red";
        nameInput.nextElementSibling.style.display = "block";
        nameInput.scrollIntoView({ block: "center" });
    } else if (nameValid(profile.name) == false) {
        nameInput.style.border = "2px solid red"
        nameInput.nextElementSibling.style.display = "none";
        alertNameRequirement.style.display = "block";
        nameInput.scrollIntoView({ block: "center" });
    } else {
        nameInput.nextElementSibling.style.display = "none";
        alertNameRequirement.style.display = "none";
    }

    if (profile.email == "") {
        emailInput.style.border = "2px solid red";
        emailInput.nextElementSibling.style.display = "block";
        alertEmailRequirement.style.display = "none";
        alertEmailExist.style.display = "none";
        emailInput.scrollIntoView({ block: "center" });
    } else if (emailValid(profile.email) == false) {
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

    if (profile.password == "") {
        passwordInput.style.border = "2px solid red";
        passwordInput.nextElementSibling.style.display = "block";
        passwordRequirement.style.display = "none";
        alertPasswordRequirement.style.display = "none";
        passwordInput.scrollIntoView({ block: "center" });
    } else if (profile.password.length < 6) {
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

    if (profile.name != 0 && nameValid(profile.name) && emailValid(profile.email) && profile.password.length >= 6) {
        try {
            const response = await fetch(`https://localhost:7160/api/Profile/by-email/${currentEmail}`, {
                method: 'Put',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profile)
            });

            if (currentEmail == currentProfile.email) {
                var log = {
                    name: currentProfile.name,
                    email: currentProfile.email,
                    action: "Edited your own profile"
                };
                createLogs(log);

                localStorage.removeItem("currentProfile");
                localStorage.setItem("currentProfile", JSON.stringify(profile));
            } else {
                var log = {
                    name: currentProfile.name,
                    email: currentProfile.email,
                    action: `Edited the profile ${profile.email}`
                };
                createLogs(log);
            }

            const editionAlert = document.getElementById("edition-alert");
            editionAlert.classList.remove("hide");
            setTimeout(() => {
                editionAlert.classList.add("hide");
            }, 5000);

            toggleModalEdit();
            const currentPage = window.location.href.split("/").pop();

            switch (currentPage) {
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
        catch (error) {
            console.error('Edit Profile error', error);
        }
    }
}