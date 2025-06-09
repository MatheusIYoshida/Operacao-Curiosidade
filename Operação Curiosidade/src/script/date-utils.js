function registrationDate(){
    const registration = new Date();
    const day = String(registration.getDate()).padStart(2, '0'); 
    const month = String(registration.getMonth() + 1).padStart(2, '0'); 
    const year = registration.getFullYear();
    
    return `${day}-${month}-${year}`; 
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