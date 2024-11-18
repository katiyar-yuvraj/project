document.getElementById('adminRegistrationForm').addEventListener('submit', function(event) {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorMessage = document.getElementById('error-message');

    // Clear any previous error messages
    errorMessage.textContent = '';

    // Validate all fields
    if (!name || !email || !password || !confirmPassword) {
        event.preventDefault();  // Stop form submission
        errorMessage.textContent = 'All fields are required.';
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        event.preventDefault();  // Stop form submission
        errorMessage.textContent = 'Invalid email format.';
        return;
    }

    // Validate password and confirm password match
    if (password !== confirmPassword) {
        event.preventDefault();  // Stop form submission
        errorMessage.textContent = 'Passwords do not match.';
        return;
    }

    // If validation passes, allow form submission
    alert('Registration Successful!');
});
