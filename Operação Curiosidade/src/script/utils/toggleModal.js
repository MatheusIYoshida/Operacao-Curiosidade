const fade = document.querySelector(".fade");
const openModalEdit = document.querySelector(".header-user-box");
const closeModalEdit = document.getElementById("close-modal-editProfile");
const modalEdit = document.getElementById("modal-editProfile");
const openModalCreate = document.getElementById("button-createProfile");
const closeModalCreate = document.getElementById("close-modal-createProfile");
const modalCreate = document.getElementById("modal-createProfile");

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
    }
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