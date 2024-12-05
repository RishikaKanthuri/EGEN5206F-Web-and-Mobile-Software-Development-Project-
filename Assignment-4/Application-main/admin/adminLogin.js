 document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    try {
         
        const response = await fetch('http://localhost:3000/auth/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),   
        });

        if (response.ok) {
            const data = await response.json();  

            
            localStorage.setItem('token', data.access_token);

            
            window.location.href = 'admin.html';
        } else {
            const errorData = await response.json();
            errorMessage.textContent = errorData.message || 'Invalid login credentials';
        }
    } catch (error) {
        console.error('Error during login:', error);
        errorMessage.textContent = 'Something went wrong. Please try again.';
    }
});

