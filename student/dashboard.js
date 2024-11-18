// Optional JavaScript to add dynamic behavior (e.g., for notifications or sidebar toggling)
document.addEventListener('DOMContentLoaded', () => {
    const notificationIcon = document.querySelector('.notification-icon');
    notificationIcon.addEventListener('click', () => {
        alert('You have no new notifications!');
    });
});
function displayAttendancePercentage() {
    const attendancePercentage = localStorage.getItem('attendancePercentage');

    if (attendancePercentage) {
        document.getElementById('attendanceDisplay').innerText = attendancePercentage + '%';
    } else {
        document.getElementById('attendanceDisplay').innerText = 'No attendance data available';
    }
}

// Call the function on page load
window.onload = displayAttendancePercentage;