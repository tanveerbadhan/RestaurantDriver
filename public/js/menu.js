const logoutBtn = document.querySelector(".logoutBtn");

const handleLogout = async () => {
    try {
        const endpoint = "/logout";
        const fullUrl = window.location.origin + endpoint;
        const response = await fetch(fullUrl);
        window.location.href = window.location.origin;
    } catch (error) {
        console.log(error.message);
    }
};

logoutBtn.addEventListener("click", handleLogout);
