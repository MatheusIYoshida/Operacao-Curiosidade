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