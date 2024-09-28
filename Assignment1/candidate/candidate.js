document.addEventListener('DOMContentLoaded', () => {
    const editButton = document.getElementById('editPersonalInfo');
    if (editButton) {
        editButton.addEventListener('click', function() {
            const fields = ['firstName', 'lastName', 'email', 'contactNumber'];
            fields.forEach(field => {
                const input = document.getElementById(field);
                if (input) {
                    input.disabled = false;
                    input.classList.add('editable'); 
                }
            });
        });
    }

    
});


function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    if (dropdown) {
        dropdown.classList.toggle('d-none');
    }
}
