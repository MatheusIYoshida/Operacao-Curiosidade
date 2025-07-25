function swapIcons(){
    const editIcons = document.querySelectorAll(".tableEditLink");
    const removeIcons = document.querySelectorAll(".tableRemoveLink");

    if(!localStorage.getItem("theme")){
        editIcons.forEach((icon, index) =>{
            icon.src = "src/assets/icons/editing-DM.png";
            removeIcons[index].src = "src/assets/icons/trash-DM.png";
        });
    }else{
        editIcons.forEach((icon, index) =>{
            icon.src = "src/assets/icons/editing.png";
            removeIcons[index].src = "src/assets/icons/trash.png";
        });
    }
}

function swapCloseButton(){
    const closeIcon = document.querySelectorAll(".close-icon");
    if(localStorage.getItem("theme")){
        closeIcon.forEach(icon => {
            icon.src = "src/assets/icons/close-modal-DM.png";
        });
    }else{
        closeIcon.forEach(icon => {
            icon.src = "src/assets/icons/close-modal.png";
        });
    }
}

function swapArrows(){
    if(localStorage.getItem("theme")){
        document.querySelector(".pagination-number").style.color = "#FFF"
        document.getElementById("back-pag").src = "src/assets/icons/back-DM.png";
        document.getElementById("backAll-pag").src = "src/assets/icons/left-arrows-DM.png";
        document.getElementById("next-pag").src = "src/assets/icons/next-DM.png";
        document.getElementById("nextAll-pag").src = "src/assets/icons/right-arrows-DM.png";
    }else{
        document.querySelector(".pagination-number").style.color = "#000"
        document.getElementById("back-pag").src = "src/assets/icons/back.png";
        document.getElementById("backAll-pag").src = "src/assets/icons/left-arrows.png";
        document.getElementById("next-pag").src = "src/assets/icons/next.png";
        document.getElementById("nextAll-pag").src = "src/assets/icons/right-arrows.png";
    }
}

window.onload = function(){
    swapCloseButton();
}