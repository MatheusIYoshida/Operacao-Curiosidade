let logs = new Array();
if(localStorage.hasOwnProperty("logs")){
    logs = JSON.parse(localStorage.getItem("logs"));
}

if (checkAuth() == false) {
    window.location.href = "login-page.html";
}

document.addEventListener("DOMContentLoaded", function() {
    listLogs();
});

function listLogs(){
    if(logs != null){
        for(var x = (logs.length-1); x >= 0; x--){
            const table = document.getElementById("table-area");
            const tableRow = document.createElement("tr");
            tableRow.className = "table-row-itens";
            table.appendChild(tableRow);

            const tableName = document.createElement("td");
            tableName.textContent = logs[x].name;
            tableRow.appendChild(tableName);

            const tableEmail = document.createElement("td");
            tableEmail.textContent = logs[x].email;
            tableRow.appendChild(tableEmail);

            const tableAction = document.createElement("td");
            tableAction.textContent = logs[x].action;
            tableRow.appendChild(tableAction);

            const tableTimestamp = document.createElement("td");
            tableTimestamp.textContent = logs[x].timestamp;
            tableRow.appendChild(tableTimestamp);
        }
    }
}