if (checkAuth() == false) {
    window.location.href = "login-page.html";
}

document.addEventListener("DOMContentLoaded", function() {
    logsList();
});

async function logsList(){
    const table = document.getElementById("table-area");
    
    try{
        const token = localStorage.getItem("Token");
        const response = await fetch("https://localhost:7160/api/Log",{
            method: 'Get',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            },
        });

        if(!response.ok){
            throw{
                status: response.status,
                message: 'Get Logs error'
            }
        }

        const logs = await response.json();
        const rows = table.querySelectorAll(".table-row-itens");
        rows.forEach(row => row.remove());

        if(logs != null){
            logs.forEach(log => {
                const tableRow = document.createElement("tr");
                tableRow.className = "table-row-itens";
                table.appendChild(tableRow);

                const tableName = document.createElement("td");
                tableName.textContent = log.name;
                tableRow.appendChild(tableName);

                const tableEmail = document.createElement("td");
                tableEmail.textContent = log.email;
                tableRow.appendChild(tableEmail);

                const tableAction = document.createElement("td");
                tableAction.textContent = log.action;
                tableRow.appendChild(tableAction);

                const tableTimestamp = document.createElement("td");
                tableTimestamp.textContent = log.createdAt;
                tableRow.appendChild(tableTimestamp);
            })
        }
    }
    catch(error){
        console.error("Error loading logs", error);
    }
}