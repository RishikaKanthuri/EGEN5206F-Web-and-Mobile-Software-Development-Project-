
async function fetchInterviews() {
    try {
        const response = await fetch('http://localhost:3000/interviews');
        if (!response.ok) throw new Error('Failed to fetch interviews');
        const interviews = await response.json();
        
         
        const interviewCardsContainer = document.getElementById('interviewCards');
         
        
        interviews.forEach(interview => {
            
            const cardCol = document.createElement('div');
            cardCol.className = 'col-md-4';
            cardCol.innerHTML = `
                <div class="card mb-4">
                    <div class="card-body">
                        <h5 class="card-title">${interview.position}</h5>
                        <p class="card-text">${interview.company}</p>
                        <p class="card-text">${interview.description}</p>
                        <a href="applynow.html?interviewId=${interview._id}&position=${encodeURIComponent(interview.position)}" class="btn btn-success">Apply Now</a>
                        
                    </div>
                </div>
            `;
            interviewCardsContainer.appendChild(cardCol);
            
            
        });
    } catch (error) {
        console.error('Error fetching interviews:', error);
    }
}

window.onload = fetchInterviews;