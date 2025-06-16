function emailValid(email){
    
    const validateEmail = (email) => {
        const regex = /^[^\s]+@[^\s]+\.[^\s]+$/;
        return regex.test(email);
    }

    return validateEmail(email);
}

function nameValid(name){
    const validateName = () => {
        const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[ '\-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
        return regex.test(name);
    }
    return validateName(name);
}