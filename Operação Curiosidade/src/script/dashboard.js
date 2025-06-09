let profiles = new Array();    
if(localStorage.hasOwnProperty("profiles")){
    profiles = JSON.parse(localStorage.getItem("profiles"));
}

window.onload = function(){
    shortUserList();
    totalUsers();
    pendingUsers();
    recentUsers();
    registrationDate();
};

function shortUserList(){
    if(profiles.length >= 10){
        var profilesFor = 10;
    }else{
        var profilesFor = profiles.length;
    }
    if(profiles != null){
        for (let x = 0; x < profilesFor; x++){
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
            if(liActive.textContent == "Inactive"){
                liActive.style.color = "#A9A9A9"
            }
            ulActive.appendChild(liActive);
        }
    }
}

function totalUsers(){
    document.getElementById("total-reg").innerHTML = profiles.length;
}

function recentUsers(){
    document.getElementById("lastMonth-reg").innerHTML = lastThirtyDays(profiles)
}

function pendingUsers(){
    var pending = 0;
    for(var x = 0; x < profiles.length; x++){
        if(profiles[x].status == "Incomplete"){
            pending++;
        }
    }
    document.getElementById("pending-reg").innerHTML = pending;
}
