function loginChangePage(){
    var emailInput = document.getElementById("email-input").value;
    var passwordInput = document.getElementById("password-input").value;

    if(emailInput != 0 && passwordInput != 0){
        console.log("Entrou");
        console.log(emailInput);
        console.log(passwordInput);
        window.location.href = "dashboard-page.html"
    }
}