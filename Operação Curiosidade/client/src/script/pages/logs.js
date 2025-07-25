checkAuth();
document.addEventListener("DOMContentLoaded", function() {
    logsList(1, 15);
});

async function logsList(currentPage, pageSize){
    const table = document.getElementById("table-area");
    
    try{
        const token = localStorage.getItem("Token");
        const response = await fetch(`https://localhost:7160/api/Log?currentPage=${currentPage}&pageSize=${pageSize}`,{
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
        pagination = {
            currentPage: logs.currentPage,
            totalPages: logs.totalPages,
            hasNext: logs.hasNext,
            hasPrevious: logs.hasPrevious
        }
        localStorage.setItem("LogsPagination", JSON.stringify(pagination));
        hasPageValidation("LogsPagination");
        verifyCurrrentPage("LogsPagination");

        const rows = table.querySelectorAll(".table-row-itens");
        rows.forEach(row => row.remove());

        if(logs != null){
            logs.items.forEach(log => {
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
                var timeStamp = formatDateTime(log.createdAt);
                tableTimestamp.textContent = timeStamp;
                tableRow.appendChild(tableTimestamp);
            })
        }
    }
    catch(error){
        console.error("Error loading logs", error);
    }
}

document.getElementById("backAll-pag").addEventListener("click", () => {
    logsList(1, 15);
});

document.getElementById("back-pag").addEventListener("click", () => {
    const logsPag = JSON.parse(localStorage.getItem("LogsPagination"));
    logsList(logsPag.currentPage - 1, 15);
});

document.getElementById("next-pag").addEventListener("click", () => {
    const logsPag = JSON.parse(localStorage.getItem("LogsPagination"));
    logsList(logsPag.currentPage + 1, 15);
});

document.getElementById("nextAll-pag").addEventListener("click", () => {
    const logsPag = JSON.parse(localStorage.getItem("LogsPagination"));
    logsList(logsPag.totalPages, 15);
});