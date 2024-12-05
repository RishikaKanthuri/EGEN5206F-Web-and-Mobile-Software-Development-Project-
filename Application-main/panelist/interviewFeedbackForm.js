document.addEventListener('DOMContentLoaded', function() {
     
    const urlParams = new URLSearchParams(window.location.search);
    const candidateName = urlParams.get('candidateName');
    const candidateEmail = urlParams.get('candidateEmail');
    document.getElementById('candidateName').value = candidateName;
    document.getElementById('candidateEmail').value = candidateEmail;

     
    document.getElementById('feedbackForm').addEventListener('submit', async function(event) {
      event.preventDefault();

      const feedbackData = {
        candidateName: document.getElementById('candidateName').value,
        candidateEmail: document.getElementById('candidateEmail').value,
         
        communicationSkills: document.getElementById('communicationSkills').value,
        technicalSkills: document.getElementById('technicalSkills').value,
        overallPerformance: document.getElementById('overallPerformance').value,
        comments: document.getElementById('comments').value,
        recommendation: document.getElementById('recommendation').value
      };

      try {
        const response = await fetch('http://localhost:3000/candidates/feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(feedbackData)
        });

        if (response.ok) {
          alert('Feedback submitted successfully');
          window.location.href = '/panelist/success.html';
        } else {
          throw new Error('Failed to submit feedback');
        }
      } catch (error) {
        console.error('Error submitting feedback:', error);
        alert('An error occurred while submitting feedback.');
      }
    });
  });
 