document.addEventListener('DOMContentLoaded', async function() {
  const panelistName = localStorage.getItem('panelistName');
  document.getElementById('panelistName').textContent = panelistName;

  const response = await fetch('http://localhost:3000/interviews/panelist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ panelistName })
  });

  const interviews = await response.json();
  const interviewsTableBody = document.querySelector('#interviewsTable tbody');

  interviews.forEach(interview => {
    const row = `
      <tr>
        <td>${interview.position}</td>
        <td>${interview.company}</td>
        <td>${new Date(interview.scheduledDate).toLocaleDateString()}</td>
        <td>
          <button class="btn btn-primary viewCandidatesButton" data-position="${interview.position}" data-panelist="${panelistName}">View Candidates</button>
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
});

async function showCandidates(positionApplied, panelist) {
  const response = await fetch('http://localhost:3000/candidates/interview-candidates', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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
          <td>${candidate.skills.join(', ')}</td>
          <td>${candidate.education}</td>
          <td><a href="/panelist/interviewFeedbackForm.html?candidateName=${candidate.firstName}%20${candidate.lastName}">Give Feedback</a></td>
        </tr>
      `;
      candidatesTableBody.innerHTML += row;
    });
  } else {
    candidatesTableBody.innerHTML = '<tr><td colspan="4">No candidates available</td></tr>';
  }
}
