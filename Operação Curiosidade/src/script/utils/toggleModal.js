const fade = document.querySelector(".fade");
const openModalEdit = document.querySelector(".header-user-box");
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
openModalEdit.addEventListener("click", toggleModalEdit);
closeModalCreate.addEventListener("click", toggleModalCreate);
openModalCreate.addEventListener("click", toggleModalCreate);