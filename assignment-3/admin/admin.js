
// Fetch panelists and populate the panelists table
async function loadPanelists() {
    const response = await fetch('http://localhost:3000/panelists');
    const panelists = await response.json();
    const panelistTableBody = document.getElementById('panelists-table');
  
    panelists.forEach(panelist => {
      const row = `
        <tr>
          <td>${panelist.name}</td>
          <td>${panelist.expertise}</td>
          <td>${panelist.availability ? 'Available' : 'Unavailable'}</td>
          <td><button class="btn btn-primary" onclick="openAssignModal('${panelist.name}')">Assign</button></td>
        </tr>
      `;
      panelistTableBody.innerHTML += row;
    });
  }

  //Assign Candidates
  // Open the assign modal and populate candidate select options
async function openAssignModal(panelistName) {
  try {
      // Store selected panelist name
      document.getElementById('selectedPanelist').value = panelistName;

      // Fetch candidates for the dropdown
      const response = await fetch('http://localhost:3000/candidates');
      
      if (!response.ok) {
          throw new Error('Failed to fetch candidates');
      }

      const candidates = await response.json();
      const candidateSelect = document.getElementById('candidateSelect');
      candidateSelect.innerHTML = ''; // Clear previous options

      // Populate candidate dropdown
      candidates.forEach(candidate => {
          const option = document.createElement('option');
          option.value = candidate._id;  // Use candidate ID to make assignments
          option.text = `${candidate.firstName} ${candidate.lastName} - ${candidate.positionApplied}`;
          candidateSelect.appendChild(option);
      });

      // Show the modal
      const modal = new bootstrap.Modal(document.getElementById('assignModal'));
      modal.show();
  } catch (error) {
      console.error('Error loading candidates for modal:', error);
      alert('Failed to load candidates for assignment. Please try again later.');
  }
}

// Handle the form submission for assigning panelist
document.getElementById('assignForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const panelistName = document.getElementById('selectedPanelist').value;
  const candidateId = document.getElementById('candidateSelect').value;

  try {
      const response = await fetch('http://localhost:3000/assign', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ candidateId, panelistName })
      });

      const result = await response.json();
      if (!response.ok) {
          throw new Error(result.message || 'Failed to assign panelist');
      }

      alert(result.message);
       
      // loadPanelists();
      // loadCandidates();

      // Close the modal after submission
      const modal = bootstrap.Modal.getInstance(document.getElementById('assignModal'));
      modal.hide();
  } catch (error) {
      console.error('Error assigning panelist:', error);
      alert('Failed to assign panelist. Please try again later.');
  }
});

  
  // Fetch candidates and populate the candidates table
  async function loadCandidates() {
    const response = await fetch('http://localhost:3000/candidates');
    const candidates = await response.json();
    const candidateTableBody = document.getElementById('candidates-table');
  
    candidates.forEach(candidate => {
      const row = `
        <tr>
          <td>${candidate.firstName} ${candidate.lastName}</td>
          <td>${candidate.positionApplied}</td>
          <td>${candidate.status}</td>
          <td>${candidate.result}</td>
        </tr>
      `;
      candidateTableBody.innerHTML += row;
    });
  }
  
  // Assign panelist to candidate (implement your own logic here)
  function assignPanelist(panelistId) {
    // Open the modal or trigger assignment logic
    console.log(`Assigning panelist with ID: ${panelistId}`);
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    loadPanelists();
    loadCandidates();
  });
   
if (localStorage.getItem("isLoggedIn") !== "true") {
    
    window.location.href = "adminLogin.html";
}


document.getElementById("logoutButton").addEventListener("click", function () {
   
    localStorage.removeItem("isLoggedIn");
    
    window.location.href = "adminLogin.html";
});

function logout() {
    
    alert("Logged out successfully!");
    window.location.href = "login.html"; 
}


