function addLog(name, email, action, timestamp){
    let logs = new Array;
    if(localStorage.hasOwnProperty("logs")){
        logs = JSON.parse(localStorage.getItem("logs"));
    }
    logs.push({name, email, action, timestamp});
    localStorage.setItem("logs", JSON.stringify(logs));
}