window.onload = function(){
    userList();
};

function userList(){

    let profiles = JSON.parse(localStorage.getItem("profiles"));
    if(profiles != null){
        for (let x = 0; x < profiles.length; x++){
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
            if(tableActive.textContent == "Inactive"){
                tableActive.style.color = "#A9A9A9"
            }else{
                tableActive.style.paddingLeft = "5px"
            }
            tableRow.appendChild(tableActive);
        }
    }
}