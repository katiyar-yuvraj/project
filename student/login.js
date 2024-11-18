document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the values of Roll No and Password
    const rollNo = document.getElementById('rollNo').value;
    const password = document.getElementById('password').value;

    // Simple validation (you can add more complex logic based on your requirements)
    if (rollNo === '' || password === '') {
        document.getElementById('errorMessage').textContent = "Both fields are required.";
        return;
    }

    // Replace this condition with actual authentication logic
    if (rollNo === "12345" && password === "password") {
        alert("Login successful!");
        // Redirect to the dashboard or another page
    } else {
        document.getElementById('errorMessage').textContent = "Invalid Roll No or Password.";
    }
});
