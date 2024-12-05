//Candidate login Handler
document.getElementById('candidateLoginButton').addEventListener('click', async function (event) {
  event.preventDefault();

  const email = document.getElementById('candidateEmail').value;
  const password = document.getElementById('candidatePassword').value;

  const loginData = { email, password };


  const response = await fetch('http://localhost:3000/auth/candidate/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginData),
  });


  if (response.ok) {
    const data = await response.json();


    localStorage.setItem('token', data.access_token);
    localStorage.setItem('candidateFirstName', data.firstName);
    localStorage.setItem('candidateLastName', data.lastName);
    localStorage.setItem('candidateEmail', data.email);

    const candidateEmail = data.email;
    window.location.href = `/candidate/candidate.html?email=${candidateEmail}`;
  }
  else {
    alert('Invalid credentials, please try again.');
  }
});

//panelist login handler
document.getElementById('panelistLoginButton').addEventListener('click', async function (event) {
  event.preventDefault();
  
  
    event.preventDefault();   

    const email = document.getElementById('panelistEmail').value;
    const password = document.getElementById('panelistPassword').value;

    const loginData = { email, password };

      
      const response = await fetch('http://localhost:3000/auth/panelist/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)   
      });

       
      if (response.ok) {
        const panelist = await response.json();
        alert('Login successful!');
       
        
        localStorage.setItem('token',panelist.access_token);
        localStorage.setItem('panelistEmail', panelist.email);
  
        window.location.href = '/panelist/panelist.html?email=${panelistEmail}'; 
      }
      else {
        alert('Invalid credentials, please try again.');
      }
  });


       
