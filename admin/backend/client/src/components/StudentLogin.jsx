import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import StudentContext from "../context/StudentContext";

const StudentLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setUser } = useContext(StudentContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic Validation
    if (!email || !password) {
      setErrorMessage("Both fields are required.");
      return;
    }

    // Simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email format.");
      return;
    }

    let uId = null;

    try {
      // Send a POST request with Fetch API
      console.log(`${import.meta.env.VITE_HOST_URL}/user/login`);
      
      const response = await fetch(
        `${import.meta.env.VITE_HOST_URL}/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Login failed: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json(); // Assuming server responds with JSON
      uId = data.user._id;

      console.log("Response from server:", data);

      // Display success message or redirect
      alert("Login Successful!");
    } catch (error) {
      setErrorMessage(`Error: ${error.message}`);
    }

    try {
      const apiUrl = `/api/student/${uId}`;
      const res = await fetch(apiUrl);

      if (!res.ok) {
        throw new Error(
          `Login failed: ${res.status} ${res.statusText}`
        );
      }
      const data = await res.json();

      setUser(data);
      navigate("/dashboard");
    } catch (error) {
      console.log("unable to maintain context: ", error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 bg-cover bg-center">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg p-6 bg-white rounded-lg shadow-md opacity-90">
        <h2 className="text-2xl font-bold text-center text-black mb-6">
          Student Login
        </h2>
        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 font-medium text-gray-700"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 font-medium text-gray-700"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            id="loginButton"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Register
            </Link>
          </p>
        </div>

        {errorMessage && (
          <p id="errorMessage" className="mt-4 text-center text-red-500">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default StudentLogin;
