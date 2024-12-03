// Simulating grades set by admin
const grades = {
    Mathematics: "A",
    Science: "B+",
    English: "A-",
    History: "A-",
    Geography: "A"
};

// Function to display the grades in the table
function displayGrades() {
    const gradesTable = document.getElementById('gradesData');
    for (const [subject, grade] of Object.entries(grades)) {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${subject}</td><td>${grade}</td>`;
        gradesTable.appendChild(row);
    }
}

// Display grades on page load
window.onload = displayGrades;
