checkAuth();
document.addEventListener("DOMContentLoaded", function() {
    requestLogsList(1, 15);
    swapArrows();
});

async function requestLogsList(currentPage, pageSize){
    const token = localStorage.getItem("Token");
    try{
        const logs = await getLogsPagination(null, currentPage, pageSize, token);
        pagination = {
            currentPage: logs.currentPage,
            totalPages: logs.totalPages,
            hasNext: logs.hasNext,
            hasPrevious: logs.hasPrevious
        }
        localStorage.setItem("LogsPagination", JSON.stringify(pagination));
        hasPageValidation("LogsPagination");
        verifyCurrrentPage("LogsPagination");
        logsList(logs)
    }
    catch(error){
        console.error("Error loading logs", error);
    }
}

document.querySelector("#logs-header-input-box").addEventListener("keyup", async function(){

    const search = this.value;
    const token = localStorage.getItem("Token");
    try{
        const logs = await getLogsPagination(search, 1, 15, token);
        pagination = {
            currentPage: logs.currentPage,
            totalPages: logs.totalPages,
            hasNext: logs.hasNext,
            hasPrevious: logs.hasPrevious
        }
        localStorage.setItem("LogsPagination", JSON.stringify(pagination));
        hasPageValidation("LogsPagination");
        verifyCurrrentPage("LogsPagination");
        logsList(logs)
    }
    catch(error){
        console.error("Error loading users", error);
    }
})

async function logsList(logs){
    const table = document.getElementById("table-area");
    
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

document.getElementById("backAll-pag").addEventListener("click", () => {
    requestLogsList(1, 15);
});

document.getElementById("back-pag").addEventListener("click", () => {
    const logsPag = JSON.parse(localStorage.getItem("LogsPagination"));
    requestLogsList(logsPag.currentPage - 1, 15);
});

document.getElementById("next-pag").addEventListener("click", () => {
    const logsPag = JSON.parse(localStorage.getItem("LogsPagination"));
    requestLogsList(logsPag.currentPage + 1, 15);
});

document.getElementById("nextAll-pag").addEventListener("click", () => {
    const logsPag = JSON.parse(localStorage.getItem("LogsPagination"));
    requestLogsList(logsPag.totalPages, 15);
});