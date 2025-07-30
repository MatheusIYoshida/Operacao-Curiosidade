const url = "https://localhost:7160/api/";

async function getProfiles(token){
    const response = await fetch(`${url}Profile`, {
        method: 'Get',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json',
        },
    });

    if(!response.ok){
        throw{
            status: response.status,
            message: 'Get Profiles error'
        }
    }

    return await response.json();
}

async function getProfile(emailValue, token){
    const response = await fetch(`${url}Profile/by-email/${emailValue}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw {
            status: response.status,
            message: 'Get profile error'
        };
    }

    return await response.json();
}

async function createLogs(log){
    const response = await fetch(`${url}Log`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(log) 
    });

    if(!response.ok){
        throw {
            status: response.status,
            message: 'Create logs error'
        }
    }

    return await response.json();
}