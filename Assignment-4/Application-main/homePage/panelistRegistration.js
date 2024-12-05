document.addEventListener('DOMContentLoaded', function() {
    const interviewDropdown = document.getElementById('interviewDropdown');

    // Interviews Dropdown
    async function fetchInterviews() {
        try {
            const response = await fetch('http://localhost:3000/interviews');  // Adjust API URL as necessary
            if (response.ok) {
                const interviews = await response.json();
                
                // Populate the dropdown with interview names
                interviews.forEach(interview => {
                    const option = document.createElement('option');
                    option.value = interview.position;  // Use interview ID as the value
                    option.textContent = `${interview.position} at ${interview.company}`;  // Display position and company
                    interviewDropdown.appendChild(option);
                });
            } else {
                console.error('Failed to fetch interviews');
            }
        } catch (error) {
            console.error('Error fetching interviews:', error);
        }
    }

      
    fetchInterviews();

     
    document.getElementById('panelistSignupForm').addEventListener('submit', async function(e) {
        e.preventDefault();

        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const expertise = document.getElementById('expertise').value;
        const interviewName = document.getElementById('interviewDropdown').value;

        
        const panelistData = {
            name,
            email,
            password,
            expertise,
            interviewName  
        };

        try {
            const response = await fetch('http://localhost:3000/panelists/signup', {  // Adjust API URL as necessary
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(panelistData)
            });

            if (response.ok) {
                alert('Panelist signed up successfully!');
                window.location.href = '/homePage/home.html'; 
            } else {
                alert('Failed to sign up. Please try again.');
            }
        } catch (error) {
            console.error('Error during signup:', error);
        }
    });
});
