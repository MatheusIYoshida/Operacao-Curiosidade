window.onload = function(){
    userList();
};

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
            tableEditImg.addEventListener("click", toggleModal);
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

const closeModal = document.getElementById("close-modal");
const modal = document.getElementById("modal");
const fade = document.getElementById("fade");

const toggleModal = () => {
    modal.classList.toggle("hide");
    fade.classList.toggle("hide")
}

closeModal.addEventListener("click", toggleModal);
fade.addEventListener("click", toggleModal);


const openModalCreate = document.getElementById("button-createProfile");
const closeModalCreate = document.getElementById("close-modal-createProfile");
const modalCreate = document.getElementById("modal-createProfile");
const fadeCreate = document.getElementById("fade-createProfile");

const toggleModalCreate = () => {
    modalCreate.classList.toggle("hide");
    fadeCreate.classList.toggle("hide")
}

closeModalCreate.addEventListener("click", toggleModalCreate);
fadeCreate.addEventListener("click", toggleModalCreate);
openModalCreate.addEventListener("click", toggleModalCreate);