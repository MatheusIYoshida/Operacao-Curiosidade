if (checkAuth() == false) {
    window.location.href = "login-page.html";
}

document.addEventListener("DOMContentLoaded", function() {
    userList();
});

async function userList(){
    const token = localStorage.getItem("Token");
    const currentUser = JSON.parse(localStorage.getItem("currentProfile"));
    const table = document.getElementById("table-area");

    try{
        const profiles = await getProfiles(token);
        const rows = table.querySelectorAll(".table-row-itens");
        rows.forEach(row => row.remove());

        if(profiles != null){
            profiles.forEach(profile => {
                const tableRow = document.createElement("tr");
                tableRow.className = "table-row-itens";
                table.appendChild(tableRow);

                const tableName = document.createElement("td");
                tableName.textContent = profile.name;
                tableRow.appendChild(tableName);
                
                const tableEmail = document.createElement("td");
                tableEmail.className = "tableEmail";
                tableEmail.textContent = profile.email;
                tableRow.appendChild(tableEmail);
                
                const tableActive = document.createElement("td");
                if(profile.status == "Incomplete"){
                    tableActive.className = "pending-row-itens";
                    tableActive.textContent = "Pending Review";
                    tableActive.style.color = "#B22222";
                }else{
                    tableActive.textContent = profile.active;
                    if(profile.active == true){
                        tableActive.textContent = "Active";
                    }
                    else{
                        tableActive.textContent = "Inactive";
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

                
                if(currentUser.admin == false && currentUser.email != profile.email){
                    tableRemoveImg.style.opacity = ".3";
                    tableRemoveImg.style.cursor = "default";
                }else{
                    tableRemoveImg.onclick = function(){
                        const trToRemove = this.closest("tr");
                        const emailToRemove = trToRemove.querySelector(".tableEmail").textContent;
                        localStorage.setItem("removeProfile", emailToRemove); 
                        toggleModalRemove();
                    };
                }

                tableEditRemove.appendChild(tableRemoveImg);
            })    
        }

    }
    catch(error){
        console.error("Error loading users", error);
    }
}

document.getElementById("confirm-removeProfile").addEventListener("click", removeProfile);