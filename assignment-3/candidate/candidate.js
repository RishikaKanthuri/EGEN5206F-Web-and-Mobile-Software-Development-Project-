document.addEventListener('DOMContentLoaded', () => {
    const editButton = document.getElementById('editPersonalInfo');
    if (editButton) {
        editButton.addEventListener('click', function() {
            const fields = ['firstName', 'lastName', 'email', 'contactNumber'];
            fields.forEach(field => {
                const input = document.getElementById(field);
                if (input) {
                    input.disabled = false;
                    input.classList.add('editable'); 
                }
            });
        });
    }

    
});


function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    if (dropdown) {
        dropdown.classList.toggle('d-none');
    }
}

document.addEventListener('DOMContentLoaded', async function() {
     
    const candidateEmail = localStorage.getItem('candidateEmail');

    try {
       
      const response = await fetch('http://localhost:3000/candidates/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: candidateEmail })  // Send email to the backend to get candidate data
      });

      const candidateData = await response.json();

      if (candidateData.error) {
        alert('Candidate not found');
        return;
      }

       
      document.getElementById('firstName').textContent = candidateData.firstName;
      document.getElementById('lastName').textContent = candidateData.lastName;
      document.getElementById('email').textContent = candidateData.email;
      

     const appliedInterviewsList = document.getElementById('appliedInterviewsList');
     const interviewItem = `
       <li>
         <div>Interview Name: ${candidateData.positionApplied}</div>
         <div>Status: ${candidateData.status}</div>
         <div>Result: ${candidateData.result}</div>
       </li>
     `;
     appliedInterviewsList.innerHTML = interviewItem; 
    } catch (error) {
      console.error('Error fetching candidate data:', error);
      alert('An error occurred while fetching candidate data.');
    }
  });
