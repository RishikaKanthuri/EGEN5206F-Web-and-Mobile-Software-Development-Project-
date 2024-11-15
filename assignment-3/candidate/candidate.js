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
    
function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    email: params.get('email')
  };
}

 
async function fetchCandidateProfile() {
  const { email } = getQueryParams();   
  const token = localStorage.getItem('token');   

  if (!email) {
    alert('No candidate email provided.');
    return;
  }

  const response = await fetch(`http://localhost:3000/candidates/${email}/profile`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,   
    },
  });

  if (response.ok) {
    const candidateData = await response.json();
    
    document.getElementById('navbarUserName').innerText = `UserName: ${candidateData.firstName} ${candidateData.lastName}`;
    document.getElementById('navbarEmail').innerText = `Email: ${candidateData.email}`;
    document.getElementById('firstName').innerText = candidateData.firstName;
    document.getElementById('lastName').innerText = candidateData.lastName;
    document.getElementById('email').innerText = candidateData.email;
    const appliedInterviewsList = document.getElementById('appliedInterviewsList');
     const interviewItem = `
       <li>
         <div>Interview Name: ${candidateData.positionApplied}</div>
         <div>Status: ${candidateData.status}</div>
         <div>Result: ${candidateData.result}</div>
       </li>
     `;
     appliedInterviewsList.innerHTML = interviewItem; 
  } else {
    alert('Failed to load candidate profile.');
    window.location.href = '/login';  
  }
}

fetchCandidateProfile();

 