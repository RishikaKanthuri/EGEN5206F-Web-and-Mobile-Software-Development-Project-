 
const urlParams = new URLSearchParams(window.location.search);
const interviewName = decodeURIComponent(urlParams.get('interviewName'));
const position = decodeURIComponent(urlParams.get('position'));

document.getElementById('applicationForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    
    const email = document.getElementById('email').value;
     
    const education = document.getElementById('education').value;
    const skills = document.getElementById('skills').value;

    
    const payload = {
        email,
        education,
        skills,
        positionApplied: position,
    };

    try {
        const response = await fetch(`http://localhost:3000/candidates/apply/${encodeURIComponent(interviewName)}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            document.getElementById('applicationForm').style.display = 'none';
            document.getElementById('confirmationMessage').style.display = 'block';
        } else {
            alert('Failed to submit application. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});