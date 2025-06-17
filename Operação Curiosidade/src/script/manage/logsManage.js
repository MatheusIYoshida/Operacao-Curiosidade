if(localStorage.hasOwnProperty("logs")){
    logs = JSON.parse(localStorage.getItem("logs"));
}

function addLog(name, email, action, timestamp){
    logs.push({name, email, action, timestamp});
    localStorage.setItem("logs", JSON.stringify(logs));
}