//Candidates Modal
async function openAssignModal(panelistEmail) {
  try {
       
      document.getElementById('selectedPanelist').value = panelistEmail;

       
      const response = await fetch(`http://localhost:3000/assign/candidates-by-interview/${panelistEmail}`, {
        method: 'GET',
        
    });
       
      if (!response.ok) {
          throw new Error('Failed to fetch candidates');
      }

      const candidates = await response.json();
      const candidateSelect = document.getElementById('candidateSelect');
      candidateSelect.innerHTML = ''; 
      candidates.forEach(candidate => {
          const option = document.createElement('option');
          option.value = candidate._id;  
          option.text = `${candidate.firstName} ${candidate.lastName} - ${candidate.positionApplied}`;
          candidateSelect.appendChild(option);
      });

      
      const modal = new bootstrap.Modal(document.getElementById('assignModal'));
      modal.show();
  } catch (error) {
      console.error('Error loading candidates for modal:', error);
      alert('Failed to load candidates for assignment. Please try again later.');
  }
}

 //Assigning panelists to Candidates
document.getElementById('assignForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const panelistName = document.getElementById('selectedPanelist').value;
  const candidateId = document.getElementById('candidateSelect').value;

  try {
    const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/admin/assign-panelist', {
          method: 'PATCH',
          headers: { 'Authorization': `Bearer ${token}`,'Content-Type': 'application/json' },
          body: JSON.stringify({ candidateId, panelistName })
      });

      const result = await response.json();
      if (!response.ok) {
          throw new Error(result.message || 'Failed to assign panelist');
      }

      alert(result.message);
       
       
      const modal = bootstrap.Modal.getInstance(document.getElementById('assignModal'));
      modal.hide();
  } catch (error) {
      console.error('Error assigning panelist:', error);
      alert('Failed to assign panelist. Please try again later.');
  }
});

  
 
document.addEventListener('DOMContentLoaded', function () {
  const token = localStorage.getItem('token');   

  if (!token) {
       
      window.location.href = '/admin/hiringManager.html';
  }

  
  fetchPanelists(token);
  fetchCandidatesTable(token);
   

  // Logout functionality
  document.getElementById('logoutLink').addEventListener('click', function () {
      localStorage.removeItem('token');  
      window.location.href = '/admin/hiringManager.html';   
  });
});

// Panelist Table
async function fetchPanelists(token) {
  try {
      const response = await fetch('http://localhost:3000/admin/panelists', {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`   
          }
      });

      if (response.ok) {
          const panelists = await response.json();
          const panelistsTable = document.getElementById('panelists-table');
          panelists.forEach(panelist => {
              const row = `
                  <tr>
                      <td>${panelist.name}</td>
                      <td>${panelist.expertise}</td>
                      <td><button class="btn btn-primary" onclick="openAssignModal('${panelist.email}','${token}')">Assign</button></td>
                  </tr>
              `;
              panelistsTable.innerHTML += row;
          });
      } else {
          console.error('Failed to fetch panelists');
      }
  } catch (error) {
      console.error('Error fetching panelists:', error);
  }
}

// Candidate Table
async function fetchCandidatesTable(token) {
  try {
      const response = await fetch('http://localhost:3000/admin/candidates', {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`   
          }
      });

      if (response.ok) {
          const candidates = await response.json();
          const candidatesTable = document.getElementById('candidates-table');
          candidates.forEach(candidate => {
              const row = `
                  <tr>
                      <td>${candidate.firstName} ${candidate.lastName}</td>
                      <td>${candidate.positionApplied}</td>
                      <td>${candidate.status}</td>
                      <td>${candidate.result}</td>
                  </tr>
              `;
              candidatesTable.innerHTML += row;
          });
      } else {
          console.error('Failed to fetch candidates');
      }
  } catch (error) {
      console.error('Error fetching candidates:', error);
  }
}

 

