checkAuth();
document.querySelector(".reports-lists-text").addEventListener("click", function() {
    userListReports();
});

async function userListReports(){
    const table = document.getElementById("table-area");
    const token = localStorage.getItem("Token");
    
    try{
        const profiles = await getProfiles(token);
        if(profiles != null){
            profiles.forEach(profile => {
                const tableRow = document.createElement("tr");
                tableRow.className = "table-row-itens";
                table.appendChild(tableRow);

                const tableName = document.createElement("td");
                tableName.textContent = profile.name;
                tableRow.appendChild(tableName);
                
                const tableEmail = document.createElement("td");
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


                const tableCreatedAt = document.createElement("td");
                tableCreatedAt.className = "tableCreatedAt";
                tableCreatedAt.textContent = formatDate(profile.createdAt);
                tableRow.appendChild(tableCreatedAt);
            })
        }
        window.print();
    }
    catch(error){
        console.error("Error loading users", error);
    }
}