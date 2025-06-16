if (checkAuth() == false) {
    throw new Error("Redirecting to login...");
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
            tableEmail.className = "tableEmail"
            tableEmail.textContent = profiles[x].email;
            tableRow.appendChild(tableEmail);
            
            const tableActive = document.createElement("td");
            if(profiles[x].status == "Incomplete"){
                tableActive.textContent = "Pending Review"
                tableActive.style.textAlign = "center"
                tableActive.style.color = "#B22222"
            }else{
                tableActive.textContent = profiles[x].active;
                tableActive.style.textAlign = "center"
                if(tableActive.textContent == "Inactive"){
                    tableActive.style.color = "#A9A9A9"
                }
            }
            tableRow.appendChild(tableActive);


            const tableEditRemove = document.createElement("td");
            tableEditRemove.className = "tableEditRemove";
            
            const tableEditImg = document.createElement("img");
            tableEditImg.className = "tableEditLink";
            tableEditImg.src = "src/assets/icons/editing.png";
            tableEditImg.onclick = function(){
                modalEditProfile(this);
            }
            tableEditImg.addEventListener("click", toggleModalEdit);
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

const fade = document.querySelector(".fade");
const closeModalEdit = document.getElementById("close-modal-editProfile");
const modalEdit = document.getElementById("modal-editProfile");
const openModalCreate = document.getElementById("button-createProfile");
const closeModalCreate = document.getElementById("close-modal-createProfile");
const modalCreate = document.getElementById("modal-createProfile");

const toggleModalEdit = () => {
    modalEdit.classList.toggle("hide");
    fade.classList.toggle("hide");
}

const toggleModalCreate = () => {
    modalCreate.classList.toggle("hide");
    fade.classList.toggle("hide");
}

fade.addEventListener("click", () => {
    if(!modalEdit.classList.contains("hide")){
        toggleModalEdit();
    }
    if(!modalCreate.classList.contains("hide")){
        toggleModalCreate();
    }
});

closeModalEdit.addEventListener("click", toggleModalEdit);
closeModalCreate.addEventListener("click", toggleModalCreate);
openModalCreate.addEventListener("click", toggleModalCreate);