document.getElementById('adminLoginForm').addEventListener('submit', function(event) {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Clear any previous error messages
    errorMessage.textContent = '';

    // Basic Validation
    if (!email || !password) {
        event.preventDefault();  // Stop form submission
        errorMessage.textContent = 'Both fields are required.';
        return;
    }

    // Simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        event.preventDefault();  // Stop form submission
        errorMessage.textContent = 'Invalid email format.';
        return;
    }

    // If all validations pass, allow form submission
    try {
        alert('Login Successful!');
        const res = fetch("http://localhost:3000/user/login",{
            method: "POST",
            body: JSON.stringify({email, password}),
        })
        if (!res.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
    } catch (error) {
        window.alert(error.message);
    }
});
