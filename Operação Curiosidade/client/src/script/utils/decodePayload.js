function parseJwt(token) {
    try{    
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payloadJson = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );

        const payload = JSON.parse(payloadJson);
        currentProfile = {
            name: payload.Name,
            email: payload.Email,
            admin: adminValid(payload.Admin)
        };

        localStorage.setItem("currentProfile", JSON.stringify(currentProfile));
    }catch (error){
        console.error('Decode token error', error);
    }
}