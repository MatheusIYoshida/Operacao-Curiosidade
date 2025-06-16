function registrationDate(){
    const registration = new Date();
    const day = String(registration.getDate()).padStart(2, '0'); 
    const month = String(registration.getMonth() + 1).padStart(2, '0'); 
    const year = registration.getFullYear();
    
    return `${day}-${month}-${year}`; 
}

function registrationTime(){
    const time = new Date();
    const hours = String(time.getHours()).padStart(2, '0');
    const minutes = String(time.getMinutes()).padStart(2, '0');
    const seconds = String(time.getSeconds()).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`
}

function registrationFullDate(day, hour){
    return `${day} - ${hour}`
}

function parseDMY(dateStr){
    const [day, month, year] = dateStr.split('-').map(Number);
    return new Date(year, month-1, day);
}

function lastThirtyDays(profiles){
    var count = 0;
    const thirtyDays = new Date();
    thirtyDays.setDate(thirtyDays.getDate() - 30);

    for(const profile of profiles){
        const registerDate = parseDMY(profile.createdAt);
        if(registerDate >= thirtyDays){
            count++;
        }
    }
    return count;
}