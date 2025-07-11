let profiles = new Array();    
if(localStorage.hasOwnProperty("profiles")){
    profiles = JSON.parse(localStorage.getItem("profiles"));
}

if (checkAuth() == false) {
    window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", function() {
    shortUserList();
    totalUsers();
    pendingUsers();
    recentUsers();
});

function shortUserList(){
    if(profiles.length > 15){
        var profilesFor = (profiles.length - 15);
    }else{
        var profilesFor = 0;
    }
    if(profiles != null){
        for (let x = (profiles.length - 1); x >= profilesFor; x--){
            const table = document.getElementById("table-area");
            const tableRow = document.createElement("tr");
            tableRow.className = "table-row-itens";
            table.appendChild(tableRow);

            const tableName = document.createElement("td");
            tableName.textContent = profiles[x].name;
            tableRow.appendChild(tableName);

            const tableEmail = document.createElement("td");
            tableEmail.textContent = profiles[x].email;
            tableRow.appendChild(tableEmail);

            const tableActive = document.createElement("td");
            if(profiles[x].status == "Incomplete"){
                tableActive.className = "pending-row-itens";
                tableActive.textContent = "Pending Review";
                tableActive.style.color = "#B22222";
            }else{
                tableActive.textContent = profiles[x].active;
                if(tableActive.textContent == "Inactive"){
                    tableActive.style.color = "#898989";
                }
            }
            tableRow.appendChild(tableActive);
        }
    }
}

function totalUsers(){
    document.getElementById("total-reg").innerHTML = profiles.length;
}

function recentUsers(){
    document.getElementById("lastMonth-reg").innerHTML = lastThirtyDays(profiles);
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
