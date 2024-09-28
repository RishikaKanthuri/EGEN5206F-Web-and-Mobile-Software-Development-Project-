
function scrollToJob(jobId) {
    const jobElement = document.getElementById(jobId);
    jobElement.scrollIntoView({ behavior: 'smooth' });
}

function showJobs(jobCategory) {
    
    document.getElementById('softwareJobs').classList.add('d-none');
    document.getElementById('civilJobs').classList.add('d-none');
    document.getElementById('lawJobs').classList.add('d-none');

    document.getElementById(jobCategory).classList.remove('d-none');
}

function applyNow() {
    alert('You have applied for this position!');
}
