document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("adminRegistrationForm");
  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      const errorMessage = document.getElementById("error-message");

      // Clear any previous error messages
      errorMessage.textContent = "";

      // Validate all fields
      if (!name || !email || !password || !confirmPassword) {
        event.preventDefault(); // Stop form submission
        errorMessage.textContent = "All fields are required.";
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        event.preventDefault(); // Stop form submission
        errorMessage.textContent = "Invalid email format.";
        return;
      }

      // Validate password and confirm password match
      if (password !== confirmPassword) {
        event.preventDefault(); // Stop form submission
        errorMessage.textContent = "Passwords do not match.";
        return;
      }
      try {
        // Send a POST request with Fetch API
        const response = await fetch("http://localhost:3000/user/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password , name, role:"admin"}),
        });

        if (!response.ok) {
          throw new Error(
            `Login failed: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json(); // Assuming server responds with JSON
        console.log("Response from server:", data);

        // Display success message or redirect
        alert("Login Successful!");
        window.location.href = "/";
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    });
  } else {
    console.error("Form element with ID 'loginForm' not found.");
  }
});
