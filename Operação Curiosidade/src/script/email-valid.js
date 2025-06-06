function emailValid(email){
    
    const validateEmail = (email) => {
        const regex = /^[^\s]+@[^\s]+\.[^\s]+$/;
        return regex.test(email);
    }

    return validateEmail(email);
}