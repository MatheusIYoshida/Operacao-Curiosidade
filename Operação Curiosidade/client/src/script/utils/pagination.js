function hasPageValidation(pag){
    var pagination = JSON.parse(localStorage.getItem(`${pag}`));
    const next = [document.getElementById("next-pag"), document.getElementById("nextAll-pag")];
    const previous = [document.getElementById("back-pag"), document.getElementById("backAll-pag")];
    if(pagination.hasNext == false){
        next.forEach(e => {
            e.style.opacity = ".3";
            e.style.cursor = "default";
            e.style.pointerEvents = "none";
        });
    }else{
        next.forEach(e => {
            e.style.opacity = "1";
            e.style.cursor = "pointer";
            e.style.pointerEvents = "auto";
        });
    }

    if(pagination.hasPrevious == false){
        previous.forEach(e => {
            e.style.opacity = ".3";
            e.style.cursor = "default";
            e.style.pointerEvents = "none";
        });
    }else{
        previous.forEach(e => {
            e.style.opacity = "1";
            e.style.cursor = "pointer";
            e.style.pointerEvents = "auto";
        });
    }
}

function verifyCurrrentPage(pag){
    const pagination = JSON.parse(localStorage.getItem(`${pag}`))
    document.querySelector(".pagination-number").innerHTML = pagination.currentPage;
}