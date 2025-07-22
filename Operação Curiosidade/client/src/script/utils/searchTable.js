document.querySelector(".header-input-box").addEventListener("keyup", function() {
    const search = this.value.toLowerCase();
    const tableRows = document.querySelectorAll("table tr"); 

    tableRows.forEach((row, index) => {

        if (index == 0){
            return;
        }

        let found = false;
        const cells = row.querySelectorAll("td");

        cells.forEach(cell => {
            const text = cell.textContent.toLowerCase();
            if (text.includes(search)) {
                found = true;
            }
        });

        row.style.display = found ? "" : "none";
    });
});