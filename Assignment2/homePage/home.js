//panelist login form handler
document.addEventListener('DOMContentLoaded', function() {
    
    const loginForm = document.getElementById('panelistLoginForm');
    
    loginForm.addEventListener('submit', async function(event) {
      event.preventDefault();   

      const email = document.getElementById('panelistEmail').value;
  
      try {
        const response = await fetch('http://localhost:3000/panelists/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })   
        });
  
         
        if (!response.ok) {
          throw new Error('Login failed. Invalid credentials.');
        }
  
         
        const panelist = await response.json();
        alert('Login successful!');
       
        console.log('Panelist:', panelist);
        localStorage.setItem('panelistName', panelist.name);

        window.location.href = '/panelist/panelist.html'; 
      } catch (error) {
        console.error('Error during login:', error);
        alert('Login failed. Please try again.');
      }
    });
  });

  //Candidate login Handler
  document.getElementById('candidateLoginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('candidateEmail').value;

    try {
      const response = await fetch('http://localhost:3000/candidates/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const candidate = await response.json();
      
      if (candidate.error) {
        alert(candidate.error);
        return;
      }

       
      localStorage.setItem('candidateEmail', candidate.email);

       
      window.location.href = '/candidate/candidate.html';
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed. Please try again.');
    }
  });
  