const token = localStorage.getItem('Token');

if (checkAuth() == false) {
    window.location.href = "login-page.html";
}

document.addEventListener("DOMContentLoaded", function() {
    shortUserList();
    totalUsers();
    pendingUsers();
    recentUsers();
});

async function shortUserList(){
    const table = document.getElementById("table-area");

    const rows = table.querySelectorAll(".table-row-itens");
    rows.forEach(row => row.remove());
    
    try{
        const token = localStorage.getItem('Token');
        const response = await fetch('https://localhost:7160/api/Dashboard/recent-profiles', {
            method: 'GET',
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            }
        })
        if(!response.ok){
            throw{
                status: response.status,
                message: responseData?.message || 'Error loading user list'
            }
        }
        const profiles = await response.json();
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
        })
    }   
    catch(error){
        console.error("Error loading recent users", error);
    }
}

async function totalUsers(){
    try{
        const response = await fetch('https://localhost:7160/api/Dashboard/total-profiles', {
            method: 'GET',
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            }
        })
        if(!response.ok){
            throw{
                status: response.status,
                message: responseData?.message || 'Error loading total users'
            }
        }
        const responseData = await response.json();
        document.getElementById("total-reg").innerHTML = responseData;  
    }   
    catch(error){
        console.error("Error loading total users", error);
    }
}

async function recentUsers(){
    try{
        const response = await fetch('https://localhost:7160/api/Dashboard/last-profiles', {
            method: 'GET',
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            }
        })
        if(!response.ok){
            throw{
                status: response.status,
                message: responseData?.message || 'Error loading last users'
            }
        }
        const responseData = await response.json();
        document.getElementById("lastMonth-reg").innerHTML = responseData;  
    }   
    catch(error){
        console.error("Error loading last users", error);
    }
}

async function pendingUsers(){
    try{
        const response = await fetch('https://localhost:7160/api/Dashboard/pending-profiles', {
            method: 'GET',
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            }
        })
        if(!response.ok){
            throw{
                status: response.status,
                message: responseData?.message || 'Error loading pending users'
            }
        }
        const responseData = await response.json();
        document.getElementById("pending-reg").innerHTML = responseData;  
    }   
    catch(error){
        console.error("Error loading pending users", error);
    }
}
