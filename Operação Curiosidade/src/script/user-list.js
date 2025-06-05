window.onload = function(){
    userList();
};

function userList(){

    let profiles = JSON.parse(localStorage.getItem("profiles"));
    if(profiles != null){
        console.log(profiles.length);
        for (let x = 0; x < profiles.length; x++){
            const ulName = document.getElementById("name-list");
            const liName = document.createElement("li");
            liName.textContent = profiles[x].name;
            ulName.appendChild(liName);

            const ulEmail = document.getElementById("email-list");
            const liEmail = document.createElement("li");
            liEmail.textContent = profiles[x].email;
            ulEmail.appendChild(liEmail)

            const ulActive = document.getElementById("active-list");
            const liActive = document.createElement("li");
            liActive.textContent = profiles[x].active;
            ulActive.appendChild(liActive);
        }
    }
}