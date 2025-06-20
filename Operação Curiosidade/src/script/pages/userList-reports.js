if (checkAuth() == false) {
    throw new Error("Redirecting to login...");
}

document.addEventListener("DOMContentLoaded", function() {
    userListReports();
});

function userListReports(){

    let profiles = JSON.parse(localStorage.getItem("profiles"));
    if(profiles != null){
        for (let x = 0; x < profiles.length; x++){
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
                tableActive.textContent = "Pending Review"
                tableActive.style.textAlign = "center"
                tableActive.style.color = "#B22222"
            }else{
                tableActive.textContent = profiles[x].active;
                tableActive.style.textAlign = "center"
                if(tableActive.textContent == "Inactive"){
                    tableActive.style.color = "#898989"
                }
            }
            tableRow.appendChild(tableActive);


            const tableCreatedAt = document.createElement("td");
            tableCreatedAt.className = "tableCreatedAt";
            tableCreatedAt.textContent = profiles[x].createdAt;
            tableRow.appendChild(tableCreatedAt);
        }
    }
}