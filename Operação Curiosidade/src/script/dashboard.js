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
            const table = document.getElementById("table-area");
            const tableRow = document.createElement("tr");
            table.appendChild(tableRow);

            const tableName = document.createElement("td");
            tableName.textContent = profiles[x].name;
            tableRow.appendChild(tableName);

            const tableEmail = document.createElement("td");
            tableEmail.textContent = profiles[x].email;
            tableRow.appendChild(tableEmail);

            const tableActive = document.createElement("td");
            tableActive.textContent = profiles[x].active;
            tableActive.style.textAlign = "center"
            if(tableActive.textContent == "Inactive"){
                tableActive.style.color = "#A9A9A9"
            }
            tableRow.appendChild(tableActive);
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
