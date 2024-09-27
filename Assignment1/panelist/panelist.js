
document.addEventListener('DOMContentLoaded', function() {
    const toggleButtons = document.querySelectorAll('.toggleButton');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetTable = document.getElementById(targetId);
            
            if (targetTable.style.display === 'none' || targetTable.style.display === '') {
                targetTable.style.display = 'table'; // Show the table
                this.textContent = 'Hide Candidates';  
            } else {
                targetTable.style.display = 'none'; // Hide the table
                this.textContent = 'View All Candidates';  
            }
        });
    });
});
 