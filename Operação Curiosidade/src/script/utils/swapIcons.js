function swapIcons(){
    const editIcons = document.querySelectorAll(".tableEditLink");
    const removeIcons = document.querySelectorAll(".tableRemoveLink");

    if(!localStorage.getItem("theme")){
        for(x = 0; x < editIcons.length; x++){
            editIcons[x].src = "src/assets/icons/editing-DM.png";
            removeIcons[x].src = "src/assets/icons/trash-DM.png";
        }
    }else{
        for(x = 0; x < editIcons.length; x++){
            editIcons[x].src = "src/assets/icons/editing.png";
            removeIcons[x].src = "src/assets/icons/trash.png";
        }
    }
}