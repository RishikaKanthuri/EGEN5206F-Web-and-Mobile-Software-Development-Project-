// 
function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    email: params.get('email')
  };
}


 async function fetchPanelistProfile(){
   
  const panelistFirstName = localStorage.getItem('panelistFirstName');
  const panelistLastName = localStorage.getItem('panelistLastName');
  const panelistEmail = localStorage.getItem('panelistEmail');
  const {email} = getQueryParams();
  const token = localStorage.getItem('token');
   
  const response = await fetch('http://localhost:3000/interviews/panelist', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem(token)}`  // Send JWT token for authentication
    },
    body: JSON.stringify({
      "panelistEmail":  panelistEmail  
   } )   
  });
  
  const interviews = await response.json();
  const interviewsTableBody = document.querySelector('#interviewsTable tbody');
  document.getElementById('panelistName').textContent = `${interviews[0].panelist}`;
  document.getElementById('navbarUserName').innerText = `UserName: ${interviews[0].panelist}`;
    document.getElementById('navbarEmail').innerText = `Email: ${panelistEmail}`;
  interviews.forEach(interview => {
    const row = `
      <tr>
        <td>${interview.position}</td>
        <td>${interview.company}</td>
        <td>${new Date(interview.scheduledDate).toLocaleDateString()}</td>
        <td>
          <button class="btn btn-primary viewCandidatesButton" data-position="${interview.position}" data-panelist="${panelistEmail}">View Candidates</button>
        </td>
      </tr>
    `;
    interviewsTableBody.innerHTML += row;
  });

  document.querySelectorAll('.viewCandidatesButton').forEach(button => {
    button.addEventListener('click', async function() {
      const positionApplied = this.getAttribute('data-position');
      const panelist = this.getAttribute('data-panelist');
      await showCandidates(positionApplied, panelist);
    });
  });
};

 
async function showCandidates(positionApplied, panelist) {
  const response = await fetch('http://localhost:3000/candidates/interview-candidates', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`   
    },
    body: JSON.stringify({ positionApplied, panelist })
  });

  const candidates = await response.json();
  const candidatesTableBody = document.querySelector('#candidatesTable tbody');
  candidatesTableBody.innerHTML = '';  

  if (candidates.length > 0) {
    document.getElementById('candidatesHeader').style.display = 'block';
    document.getElementById('candidatesTable').style.display = 'table';

    candidates.forEach(candidate => {
      const row = `
        <tr>
          <td>${candidate.firstName} ${candidate.lastName}</td>
          <td>${candidate.email}</td>
          <td>${candidate.skills.join(', ')}</td>
      
          <td>${candidate.education}</td>
          <td><a href="/panelist/interviewFeedbackForm.html?candidateName=${candidate.firstName}%20${candidate.lastName}&candidateEmail=${candidate.email}">Give Feedback</a></td>
        </tr>
      `;
      candidatesTableBody.innerHTML += row;
    });
  } else {
    candidatesTableBody.innerHTML = '<tr><td colspan="4">No candidates available</td></tr>';
  }
}
fetchPanelistProfile();
