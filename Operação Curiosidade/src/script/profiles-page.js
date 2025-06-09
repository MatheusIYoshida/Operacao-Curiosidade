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
            tableEmail.className = "tableEmail"
            tableEmail.textContent = profiles[x].email;
            tableRow.appendChild(tableEmail);

            const tableActive = document.createElement("td");
            tableActive.textContent = profiles[x].active;
            tableActive.style.textAlign = "center"
            if(tableActive.textContent == "Inactive"){
                tableActive.style.color = "#A9A9A9";
            }
            tableRow.appendChild(tableActive);

            const tableEditRemove = document.createElement("td");
            tableEditRemove.className = "tableEditRemove";
            
            const tableEditImg = document.createElement("img");
            tableEditImg.className = "tableEditLink";
            tableEditImg.src = "src/assets/icons/editing.png";
            tableRow.appendChild(tableEditRemove);
            tableEditRemove.appendChild(tableEditImg);
            
            const tableRemoveImg = document.createElement("img");
            tableRemoveImg.className = "tableRemoveLink";
            tableRemoveImg.src = "src/assets/icons/trash.png";
            tableRemoveImg.onclick = function(){ 
                removeProfile(this);
            };

            tableRow.appendChild(tableEditRemove);
            tableEditRemove.appendChild(tableRemoveImg);
        }
    }
}