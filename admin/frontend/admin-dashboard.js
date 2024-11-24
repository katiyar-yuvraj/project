// Mock Student Data
const students = [
    { rollNo: "101", name: "John Doe", email: "john@example.com", course: "BSc", department: "Science", password: "password123" },
    { rollNo: "102", name: "Jane Smith", email: "jane@example.com", course: "BA", department: "Arts", password: "pass1234" },
];

// Show specific section
function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => section.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
}

// Show specific action form
function showStudentAction(formId) {
    document.querySelectorAll('.action-form').forEach(form => form.style.display = 'none');
    document.getElementById(formId).style.display = 'block';
}

// Render student data in the table
function renderStudents() {
    const tableBody = document.getElementById('studentsData');
    tableBody.innerHTML = students.map(student => `
        <tr>
            <td>${student.rollNo}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.course}</td>
            <td>${student.department}</td>
        </tr>
    `).join('');
}

// Add a new student
function addStudent() {
    const name = document.getElementById('addStudentName').value.trim();
    const email = document.getElementById('addStudentEmail').value.trim();
    const rollNo = document.getElementById('addStudentRoll').value.trim();
    const course = document.getElementById('addStudentCourse').value.trim();
    const dept = document.getElementById('addStudentDept').value.trim();
    const password = document.getElementById('addStudentPassword').value.trim();

    if (name && email && rollNo && course && dept && password) {
        const existingStudent = students.find(student => student.rollNo === rollNo);
        if (existingStudent) {
            alert("A student with this roll number already exists!");
            return;
        }

        students.push({ rollNo, name, email, course, department: dept, password });
        alert("Student added successfully!");
        renderStudents();
        document.getElementById('addStudent').reset(); // Clear form fields
    } else {
        alert("Please fill out all fields!");
    }
}

// Update student data
function updateStudent() {
    const rollNo = document.getElementById('updateStudentRoll').value.trim();
    const name = document.getElementById('updateStudentName').value.trim();
    const email = document.getElementById('updateStudentEmail').value.trim();
    const course = document.getElementById('updateStudentCourse').value.trim();
    const dept = document.getElementById('updateStudentDept').value.trim();
    const password = document.getElementById('updateStudentPassword').value.trim();

    const student = students.find(s => s.rollNo === rollNo);
    if (student) {
        if (name) student.name = name;
        if (email) student.email = email;
        if (course) student.course = course;
        if (dept) student.department = dept;
        if (password) student.password = password;
        alert("Student updated successfully!");
        renderStudents();
        document.getElementById('updateStudent').reset(); // Clear form fields
    } else {
        alert("Student not found!");
    }
}

// Delete a student
function deleteStudent() {
    const rollNo = document.getElementById('deleteStudentRoll').value.trim();

    const index = students.findIndex(s => s.rollNo === rollNo);
    if (index !== -1) {
        students.splice(index, 1);
        alert("Student deleted successfully!");
        renderStudents();
        document.getElementById('deleteStudent').reset(); // Clear form fields
    } else {
        alert("Student not found!");
    }
}

// Initialize the page
window.onload = function () {
    showSection('studentsSection'); // Default section
    renderStudents();
};
