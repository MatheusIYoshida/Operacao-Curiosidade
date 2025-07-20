const email = document.getElementById("email-input");
const alertEmail = document.getElementById("alert-email");
const password = document.getElementById("password-input");
const passwordRequirement = document.querySelector(".password-requirements");
const alertPassword = document.getElementById("alert-password");   

async function profileValidation(emailValue, passwordValue){
    const login = {
        Email: emailValue,
        Password: passwordValue
    }
    
    try{
        const response = await fetch('https://localhost:7160/api/Auth/Login',{
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(login)
        });

        if(!response.ok){
            if(response.status === 401){
                throw {
                    status: response.status,
                    message: 'Incorret email or password',
                    alertError: true
                }
            }else{
                throw {
                    status: response.status,
                    message: responseData?.message || 'Login error'
                }
            }
        }

        const responseData = await response.json();
        console.log('Received data', responseData);
        localStorage.setItem("Token", responseData.token);
    }
    catch (error){
        if(error.alertError){
            const incorrectInfos = document.getElementById("incorrect-infos");
            incorrectInfos.style.display = "flex";
            password.value = "";
        }else{
            console.error("Login error", error);
        }
    }
    
    try{
        const token = localStorage.getItem("Token");
        const response = await fetch(`https://localhost:7160/api/Profile/by-email/${emailValue}`,{
            method: 'Get',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if(!response.ok){
            throw{
                status: response.status,
                message: 'Get profile error'
            }
        }

        const profile = await response.json();
        console.log(profile);
        localStorage.setItem("currentProfile", JSON.stringify(profile));
        window.location.href = "dashboard-page.html";
    }
    catch (error){
        console.error("Get profile error", error);
    } 
}

document.getElementById("login-submit").addEventListener("click", () =>{

    var emailValue = document.getElementById("email-input").value;
    var passwordValue = document.getElementById("password-input").value;
    
    if(!emailValue){
        email.style.border = "2px solid red";
        document.querySelector("#enter-email").style.display = "block";
        alertEmail.style.display = "none";
    }else if(emailValid(emailValue) == false){
        email.style.border = "2px solid red";
        document.querySelector("#enter-email").style.display = "none";
        alertEmail.style.display = "block";
    }else{
        email.style.borderColor = "#000";
        document.querySelector("#enter-email").style.display = "none";
        alertEmail.style.display = "none";
    }

    if(!passwordValue){
        password.style.border = "2px solid red";
        document.querySelector("#enter-password").style.display = "block";
        passwordRequirement.style.display = "none";
        alertPassword.style.display = "none";
    }else if(passwordValue.length < 6){
        password.style.border = "2px solid red";
        document.querySelector("#enter-password").style.display = "none";
        passwordRequirement.style.display = "none";
        alertPassword.style.display = "block";
    }else{
        password.style.borderColor = "#000";
        document.querySelector("#enter-password").style.display = "none";
        passwordRequirement.style.display = "block";
        alertPassword.style.display = "none";
    }

    if(emailValue && passwordValue.length >= 6 && emailValid(emailValue)){
        profileValidation(emailValue, passwordValue);
    }
});

function createProfileLogin(){
    window.location.href = "login-registration.html";
}

document.getElementById("close-popUp").addEventListener("click", () => {
    const incorrectInfos = document.getElementById("incorrect-infos");
    incorrectInfos.style.display = "none";
})

email.addEventListener("input", function() {
    this.style.borderColor = "#000";
    document.querySelector("#enter-email").style.display = "none";
    document.querySelector("#alert-email").style.display = "none";
});

password.addEventListener("input", function() {
    this.style.borderColor = "#000"; 
    document.querySelector("#enter-password").style.display = "none";
    document.querySelector("#alert-password").style.display = "none";
    document.querySelector(".password-requirements").style.display = "block";
});