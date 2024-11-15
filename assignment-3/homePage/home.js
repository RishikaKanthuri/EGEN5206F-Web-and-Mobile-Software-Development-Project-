// //panelist login form handler
// document.addEventListener('DOMContentLoaded', function() {
    
//     const loginForm = document.getElementById('panelistLoginForm');
    
//     loginForm.addEventListener('submit', async function(event) {
//       event.preventDefault();   

//       const email = document.getElementById('panelistEmail').value;
  
//       try {
//         const response = await fetch('http://localhost:3000/panelists/login', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ email })   
//         });
  
         
//         if (!response.ok) {
//           throw new Error('Login failed. Invalid credentials.');
//         }
  
         
//         const panelist = await response.json();
//         alert('Login successful!');
       
//         console.log('Panelist:', panelist);
//         localStorage.setItem('panelistName', panelist.name);

//         window.location.href = '/panelist/panelist.html'; 
//       } catch (error) {
//         console.error('Error during login:', error);
//         alert('Login failed. Please try again.');
//       }
//     });
//   });

  //Candidate login Handler
  document.getElementById('candidateLoginButton').addEventListener('click', async function(event) {
    event.preventDefault();

    const email = document.getElementById('candidateEmail').value;
    const password = document.getElementById('candidatePassword').value;

  const loginData = { email, password };

     
      const response = await fetch('http://localhost:3000/auth/candidate/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData ),
      });

      
      if (response.ok) {
        const data = await response.json();
       
      localStorage.setItem('candidateEmail', email); 

       
      window.location.href = '/candidate/candidate.html';
      }else {
        alert('Invalid credentials, please try again.');
      }
   });

  //panelist login handler
  document.getElementById('panelistLoginButton').addEventListener('click', async function(event) {
    event.preventDefault();

    const email = document.getElementById('panelistEmail').value;
    const password = document.getElementById('panelistPassword').value;

  const loginData = { email, password };

     
      const response = await fetch('http://localhost:3000/auth/panelist/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData ),
      });

      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.access_token);

        // Redirect the panelist to their specific page after successful login
        const panelistEmail = data.email;  // Assuming your API returns the email
        window.location.href = `/panelist/${panelistEmail}/dashboard`;  // Redirect to panelist-specific dashboard
      }
       else {
        alert('Invalid credentials, please try again.');
      }
   });
  