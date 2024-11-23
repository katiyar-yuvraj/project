import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; 

const StudentReg = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    section: '',
    course: '',
    rollNo: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, section, course, rollNo, password, confirmPassword } = formData;

    // Reset error message
    setErrorMessage('');

    // Validate passwords
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match!');
      alert('Passwords do not match!');
      return;
    }

    try {
      // Register the user
      const userResponse = await fetch(`/api/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, role: 'student' }),
      });

      if (!userResponse.ok) {
        throw new Error(`User registration failed: ${userResponse.status} ${userResponse.statusText}`);
      }
      console.log(userResponse, "t1");
      
      const userData = await userResponse.json();

      // Register the student
      const studentResponse = await fetch(`/api/student/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      console.log(studentResponse ,"t2");
      
      alert('Registration Successful!');
      navigate("/");
    } catch (error) {
      setErrorMessage(`Error: ${error.message}`);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 h-screen  m-auto">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg sm:max-w-md md:max-w-xl lg:max-w-2xl">
        <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">Student Registration</h1>
        <form id="registrationForm" onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label htmlFor="name" className="block font-medium text-gray-700">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 p-2 text-xl block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="email" className="block font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 p-2 text-xl block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="section" className="block font-medium text-gray-700">
              Course <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="section"
              name="section"
              value={formData.section}
              onChange={handleChange}
              required
              className="mt-1 p-2 text-xl block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="course" className="block font-medium text-gray-700">
              Department <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
              className="mt-1 p-2 text-xl block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="rollNo" className="block font-medium text-gray-700">
              Roll No <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="rollNo"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
              required
              className="mt-1 p-2 text-xl block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="password" className="block font-medium text-gray-700">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 p-2 text-xl block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="confirmPassword" className="block font-medium text-gray-700">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="mt-1 p-2 text-xl block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <p className="text-sm text-gray-600 mb-4">
            <span className="text-red-500">*</span> marked fields are compulsory
          </p>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
        
        {/* Login Link */}
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-indigo-600 hover:text-indigo-700 font-semibold">
            Login here
          </Link>
        </p>
  
        {errorMessage && <p className="text-center text-red-500 mt-4">{errorMessage}</p>}
      </div>
    </div>
  );
  
};

export default StudentReg;
