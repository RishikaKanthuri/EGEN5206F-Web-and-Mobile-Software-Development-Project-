
function uploadFile(inputId) {
    const fileInput = document.getElementById(inputId);
    if (fileInput.files.length > 0) {
        alert(`File uploaded: ${fileInput.files[0].name}`);
    } else {
        alert('No file selected');
    }
}
