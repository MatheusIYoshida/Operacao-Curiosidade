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

window.onload = function(){
    swapCloseButton();
}