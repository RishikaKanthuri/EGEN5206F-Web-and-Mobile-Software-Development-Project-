document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    
    if (username === "admin" && password === "admin123") {
        
        localStorage.setItem("isLoggedIn", "true");
        
        window.location.href = "admin.html";
    } else {
        errorMessage.textContent = "Invalid username or password.";
    }
});
