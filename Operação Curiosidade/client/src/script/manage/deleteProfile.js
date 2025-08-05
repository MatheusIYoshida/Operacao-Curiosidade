async function removeProfile() {
    const currentProfile = JSON.parse(localStorage.getItem("currentProfile")) || [];
    const token = localStorage.getItem("Token");
    const emailToRemove = localStorage.getItem("removeProfile");

    try {
        const response = await fetch(`https://localhost:7160/api/Profile/by-email/${emailToRemove}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Failed to delete profile');
        }
        
        const removalAlert = document.getElementById("removal-alert");
        removalAlert.classList.remove("hide");
        setTimeout(() => {
            removalAlert.classList.add("hide");
        }, 5000);

        localStorage.removeItem("removeProfile");

        if (emailToRemove == currentProfile.email) {
            var log = {
                name: currentProfile.name,
                email: currentProfile.email,
                action: "Removed their own profile"
            };
            createLogs(log);
            localStorage.removeItem("Token");
            checkAuth();
        } else {
            var log = {
                name: currentProfile.name,
                email: currentProfile.email,
                action: `Removed the profile ${emailToRemove}`
            };
            createLogs(log);
        }

        toggleModalRemove();
        var profilePag = JSON.parse(localStorage.getItem("ProfilePagination"));
        requestUserList(profilePag.currentPage, 15);
    }
    catch (error) {
        console.error('Remove profile error', error);
    }
}