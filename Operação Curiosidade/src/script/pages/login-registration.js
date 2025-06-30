function swapReturnButton(){
    const returnIcon = document.querySelector(".return-login img");
    if(!localStorage.getItem("theme")){
        returnIcon.src = "src/assets/icons/left-arrow-DM.png";
    }else{
        returnIcon.src = "src/assets/icons/left-arrow.png";
    }
}

window.onload = function(){
    const returnIcon = document.querySelector(".return-login img");
    if(localStorage.getItem("theme")){
        returnIcon.src = "src/assets/icons/left-arrow-DM.png";
    }else{
        returnIcon.src = "src/assets/icons/left-arrow.png";
    }
}