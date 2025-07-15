const fade = document.querySelector(".fade");
const openModalEdit = document.querySelector(".header-user-box");
const closeModalEdit = document.getElementById("close-modal-editProfile");
const modalEdit = document.getElementById("modal-editProfile");
const openModalCreate = document.getElementById("button-createProfile");
const closeModalCreate = document.getElementById("close-modal-createProfile");
const modalCreate = document.getElementById("modal-createProfile");
const closeModalRemove = document.getElementById("cancel-removeProfile");
const modalRemove = document.getElementById("modal-removeProfile");

let currentEditEmail = null;
const toggleModalEdit = () => {
    modalEdit.classList.toggle("hide");
    fade.classList.toggle("hide");

    if(!modalEdit.classList.contains("hide")){

        document.querySelectorAll(".alert-user").forEach(alert => {
            alert.style.display = "none";
        });
        document.querySelectorAll("input").forEach(input => {
            input.style.border = "";
        });

    }
}

const toggleModalCreate = () => {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    modalCreate.classList.toggle("hide");
    fade.classList.toggle("hide");

    if(!modalCreate.classList.contains("hide")){

        document.querySelectorAll(".alert-user").forEach(alert => {
            alert.style.display = "none";
        });
        document.querySelectorAll(".profile-input input").forEach(input => {
            input.style.border = "";
            input.value = "";
        });
        document.getElementById("create-modal-admin-checkbox").checked = false;

        if(currentUser[0].admin == ""){
            document.getElementById("create-modal-admin-checkbox").style.opacity = ".4";
            document.getElementById("create-modal-admin-checkbox").disabled = true;
            document.getElementById("create-modal-admin-title").style.opacity = ".4";
        }
    }
}

const toggleModalRemove = () => {
    modalRemove.classList.toggle("hide");
    fade.classList.toggle("hide");
}

fade.addEventListener("click", () => {
    if(!modalEdit.classList.contains("hide")){
        toggleModalEdit();
    }
    if(modalCreate){
        if(!modalCreate.classList.contains("hide")){
            toggleModalCreate();
        }
    }
});

if (closeModalEdit) {
    closeModalEdit.addEventListener("click", toggleModalEdit);
}

if (openModalEdit) {
    openModalEdit.addEventListener("click", toggleModalEdit);
}

if (closeModalCreate) {
    closeModalCreate.addEventListener("click", toggleModalCreate);
}

if (openModalCreate) {
    openModalCreate.addEventListener("click", toggleModalCreate);
}

if (closeModalRemove){
    closeModalRemove.addEventListener("click", toggleModalRemove);
    localStorage.removeItem("removeProfile");
}