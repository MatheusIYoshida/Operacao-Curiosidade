if (checkAuth() == false) {
    window.location.href = "login-page.html";
}

document.addEventListener("DOMContentLoaded", function() {
    userList();
});

function userList(){

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
            tableEmail.className = "tableEmail";
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


            const tableEditRemove = document.createElement("td");
            tableEditRemove.className = "tableEditRemove";
            
            const tableEditImg = document.createElement("img");
            tableEditImg.className = "tableEditLink";
            if(!localStorage.getItem("theme")){
                tableEditImg.src = "src/assets/icons/editing.png";
            }else{
                tableEditImg.src = "src/assets/icons/editing-DM.png";
            }
            tableEditImg.onclick = function(){
                modalEditProfile(this);
            }
            tableEditImg.addEventListener("click", toggleModalEdit);
            tableRow.appendChild(tableEditRemove);
            tableEditRemove.appendChild(tableEditImg);
            
            const tableRemoveImg = document.createElement("img");
            tableRemoveImg.className = "tableRemoveLink";
            if(!localStorage.getItem("theme")){
                tableRemoveImg.src = "src/assets/icons/trash.png";
            }else{
                tableRemoveImg.src = "src/assets/icons/trash-DM.png";
            }
            tableRemoveImg.onclick = function(){ 
                removeProfile(this);
            };

            tableRow.appendChild(tableEditRemove);
            tableEditRemove.appendChild(tableRemoveImg);
        }
    }
}