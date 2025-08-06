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
        birthday: document.getElementById("profile-birthday").value || null,
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
            
            if (currentEmail == currentProfile.email) {
                var log = {
                    name: currentProfile.name,
                    email: currentProfile.email,
                    action: "Edited your own profile"
                };
                await createLogs(log);

                localStorage.removeItem("currentProfile");
                localStorage.setItem("currentProfile", JSON.stringify(profile));

                if(profile.email != currentProfile.email || profile.admin != currentProfile.admin){
                    localStorage.removeItem("Token");
                    const redirectionAlert = document.getElementById("redirect-alert");
                    redirectionAlert.classList.remove("hide");
                    setTimeout(() => {
                        redirectionAlert.classList.add("hide");
                        checkAuth();
                    }, 5000);
                }else{
                    userIcon();
                }
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
                    requestUserList(1, 15);
                    break;
                case "logs.html":
                    await requestLogsList(1, 15);
                    break;
                case "reports.html":
                    userListReports();
                    break;
                default:
            }
        }
        catch (error) {
            if (error.isConflict) {
                emailInput.style.border = "2px solid red";
                emailInput.nextElementSibling.style.display = "none";
                alertEmailRequirement.style.display = "none";
                alertEmailExist.style.display = "block";
                emailInput.scrollIntoView({ block: "center" });
            } else {
                console.error('Edit profile error', error);
            }
        }
    }
}