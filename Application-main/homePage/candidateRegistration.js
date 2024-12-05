document.querySelector('form').addEventListener('submit', async function (event) {
    event.preventDefault();  

    const firstName = document.getElementById('inputFirstName').value;
    const lastName = document.getElementById('inputLastname').value;
    const email = document.getElementById('inputEmail').value;
    const password = document.getElementById('inputPassword').value;
    const address = document.getElementById('inputAddress').value;
    const city = document.getElementById('inputCity').value;
    const state = document.getElementById('inputState').value;
    const zip = document.getElementById('inputZip').value;

    
    const candidateData = {
        firstName,
        lastName,
        email,
        password,
        address ,
        state,
        city ,
        zip
    };

    try {
        const response = await fetch('http://localhost:3000/candidates/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(candidateData)
        });

        if (response.ok) {
            const result = await response.json();
            alert('Registration successful!');
            console.log(result);
        } else {
            alert('Registration failed. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
});

