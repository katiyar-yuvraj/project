function calculateAttendancePercentage() {
    const attendanceRows = document.querySelectorAll('#attendanceData tr');
    let totalClasses = attendanceRows.length;
    let classesAttended = 0;

    attendanceRows.forEach(row => {
        const statusCell = row.querySelector('td:nth-child(3)').innerText.trim();
        if (statusCell === 'Present') {
            classesAttended++;
        }
    });

    let attendancePercentage = (classesAttended / totalClasses) * 100;
    document.getElementById('attendancePercentage').innerText = attendancePercentage.toFixed(2) + '%';

    localStorage.setItem('attendancePercentage', attendancePercentage.toFixed(2));
}

window.onload = calculateAttendancePercentage;