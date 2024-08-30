// Get form and table elements
const studentForm = document.getElementById('studentForm');
const studentTableBody = document.getElementById('studentTableBody');

// Event listener for form submission
studentForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get values from form
    const studentName = document.getElementById('studentName').value.trim();
    const studentID = document.getElementById('studentID').value.trim();
    const emailID = document.getElementById('emailID').value.trim();
    const contactNumber = document.getElementById('contactNumber').value.trim();

    // Validate form data
    if (studentName === "" || studentID === "" || emailID === "" || contactNumber === "") {
        alert("Please fill all the fields");
        return;
    }

    // Check if student ID is already taken
    let existingData = JSON.parse(localStorage.getItem("students")) || [];
    if (existingData.some(student => student.studentID === studentID)) {
        alert("Student ID is already taken.");
        return;
    }

    // Create a new student object
    const newStudent = {
        studentName,
        studentID,
        emailID,
        contactNumber
    };

    // Add the new student to localStorage
    existingData.push(newStudent);
    localStorage.setItem('students', JSON.stringify(existingData));

    // Reset form
    studentForm.reset();

    // Reload students
    loadStudents();
});

// Function to load students from localStorage
function loadStudents() {
    let students = JSON.parse(localStorage.getItem('students')) || [];

    // Clear the table body
    studentTableBody.innerHTML = '';

    students.forEach((student, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${student.studentName}</td>
            <td>${student.studentID}</td>
            <td>${student.emailID}</td>
            <td>${student.contactNumber}</td>
            <td class="actions">
                <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;

        studentTableBody.appendChild(row);
    });
}

// Function to edit student
function editStudent(index) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    let student = students[index];

    // Populate form with existing data
    document.getElementById('studentName').value = student.studentName;
    document.getElementById('studentID').value = student.studentID;
    document.getElementById('emailID').value = student.emailID;
    document.getElementById('contactNumber').value = student.contactNumber;

    // Remove the existing student record
    deleteStudent(index);
}

// Function to delete student
function deleteStudent(index) {
    let students = JSON.parse(localStorage.getItem('students')) || [];

    // Remove the student from the array
    students.splice(index, 1);

    // Update localStorage
    localStorage.setItem('students', JSON.stringify(students));

    // Reload students
    loadStudents();
}

// Load students when the page loads
window.onload = function () {
    loadStudents();
};
