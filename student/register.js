document.getElementById('registrationForm').addEventListener('submit', function(event) {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorMessage = document.getElementById('error-message');
    
    
    errorMessage.textContent = '';
    
    if (password !== confirmPassword) {
        event.preventDefault();  // Prevent form submission
        errorMessage.textContent = 'Passwords do not match!';
    } else {
        alert('Registration Successful!');
    }
});
