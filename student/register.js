document.getElementById('registrationForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Retrieve input values
    const email = document.getElementById('email').value.trim();
    const name = document.getElementById('name').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const section = document.getElementById('section').value.trim();
    const course = document.getElementById('course').value.trim();
    const rollNo = document.getElementById('rollNo').value.trim();
    const errorMessage = document.getElementById('error-message');

    // Reset error message
    errorMessage.textContent = '';

    // Validate passwords
    if (password !== confirmPassword) {
        errorMessage.textContent = 'Passwords do not match!';
        alert('Passwords do not match!');
        return;
    }

    try {
        // Register the user
        const userResponse = await fetch("http://localhost:3000/user/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, name, role: "student" }),
        });

        if (!userResponse.ok) {
            throw new Error(`User registration failed: ${userResponse.status} ${userResponse.statusText}`);
        }

        const userData = await userResponse.json(); // Get user data (e.g., user ID)

        // Register the student (linking with user ID)
        const studentResponse = await fetch("http://localhost:3000/student/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: userData.user._id,
                rollNumber: rollNo,
                class: section,
                course,
            }),
        });

        if (!studentResponse.ok) {
            throw new Error(`Student registration failed: ${studentResponse.status} ${studentResponse.statusText}`);
        }

        // Success message and redirect
        alert("Registration Successful!");
        window.location.href = "/student/login.html";
    } catch (error) {
        // Handle errors
        errorMessage.textContent = `Error: ${error.message}`;
        alert(`Error: ${error.message}`);
    }
});
