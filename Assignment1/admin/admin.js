
const panelists = [
    { id: 1, name: 'John Doe', expertise: 'Software Engineering', availability: true },
    { id: 2, name: 'Jane Smith', expertise: 'Data Science', availability: false },
    { id: 3, name: 'Michael Johnson', expertise: 'System Analysis', availability: true },
];

const candidates = [
    { id: 1, name: 'Alice Brown', position: 'Software Engineer', status: 'Interview Pending' },
    { id: 2, name: 'Bob Martin', position: 'Data Analyst', status: 'Interview Scheduled' },
];

const panelistsTable = document.getElementById('panelists-table');
panelists.forEach(panelist => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${panelist.name}</td>
        <td>${panelist.expertise}</td>
        <td>${panelist.availability ? 'Available' : 'Unavailable'}</td>
        <td><button class="btn btn-primary assign-btn" data-panelist-id="${panelist.id}" data-bs-toggle="modal" data-bs-target="#assignModal">Assign</button></td>
    `;
    panelistsTable.appendChild(row);
});


const candidatesTable = document.getElementById('candidates-table');
candidates.forEach(candidate => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${candidate.name}</td>
        <td>${candidate.position}</td>
        <td>${candidate.status}</td>
    `;
    candidatesTable.appendChild(row);
});


const candidateSelect = document.getElementById('candidateSelect');
candidates.forEach(candidate => {
    const option = document.createElement('option');
    option.value = candidate.id;
    option.textContent = candidate.name;
    candidateSelect.appendChild(option);
});


const assignForm = document.getElementById('assignForm');
assignForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const selectedPanelistId = document.querySelector('.assign-btn[data-bs-target="#assignModal"]').dataset.panelistId;
    const selectedCandidateId = candidateSelect.value;
    const panelist = panelists.find(p => p.id == selectedPanelistId);
    const candidate = candidates.find(c => c.id == selectedCandidateId);

    if (panelist && candidate) {
        alert(`Assigned ${panelist.name} to ${candidate.name}`);
    } else {
        alert('Error: Panelist or Candidate not found');
    }
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


