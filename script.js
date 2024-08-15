const firstNameInput = document.getElementById('fname');
const lastNameInput = document.getElementById('lname');
const studentMarkInput = document.getElementById('studentMark');
const studentTable = document.getElementById('student-list');
const saveBtn = document.getElementById('save');

let students = [];

function loadStudents() {
    const storedStudents = localStorage.getItem('students');
    if (storedStudents) {
        students = JSON.parse(storedStudents);
    }
    displayStudents();

}

function saveStudents() {
    localStorage.setItem('students', JSON.stringify(students));
}

function addStudent(firstName, lastName, studentMark) {
    const newStudent = {
        id: Date.now(),
        firstName:firstName,
        lastName:lastName,
        studentMark:studentMark
    };
    students.push(newStudent);
    saveStudents();
    displayStudents();
}

saveBtn.addEventListener('click', function(){
    addStudent(firstNameInput.value, lastNameInput.value, studentMarkInput.value);
})

function displayStudents() {
    const studentList = document.getElementById('list-display');
    // console.log('studentList:', studentList); // Debugging statement
    if (!studentList) {
        console.error('Element with ID studentList not found.');
        return;
    }
    studentList.innerHTML = '';
    console.log(students);
    

    students.forEach((student) => {
        
        const row = document.createElement('tr');
        row.classList.add('border-b', 'dark:border-gray-700');
        row.innerHTML = `
            <td class="px-4 py-3">${student.firstName}</td>
            <td class="px-4 py-3">${student.lastName}</td>
            <td class="px-4 py-3">${student.studentMark}</td>
            <td class="px-4 py-3 flex items-center justify-end">
                <button onclick="editStudent(${student.id})" data-modal-target="updateProductModal" data-modal-toggle="updateProductModal" class="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2">Edit</button>
                <button onclick="viewStudent(${student.id})" data-modal-target="readProductModal" data-modal-toggle="readProductModal" class="font-medium text-green-600 dark:text-green-500 hover:underline mr-2">View</button>
                <button onclick="confirmDelete(${student.id})" data-modal-target="deleteModal" data-modal-toggle="deleteModal" class="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
            </td>
        `;
        studentList.appendChild(row);
    });
}


function editStudent(id) {
    const student = students.find(s => s.id === id);
    if (student) {
        firstNameInput.value = student.firstName;
        lastNameInput.value = student.lastName;
        studentMarkInput.value = student.studentMark;
        document.getElementById('updateProductModal').setAttribute('data-student-id', id);
        document.getElementById('updateProductModal').classList.remove('hidden');
    }
}

// function viewStudent(id) {
//     const student = students.find(s => s.id === id);
//     if (student) {
//         const modal = document.getElementById('readProductModal');
//         modal.querySelector('h3').textContent = `${student.firstName} ${student.lastName}`;
//         modal.querySelector('p').textContent = `Mark: ${student.studentMark}`;
//         modal.querySelector('dd').textContent = `First Name: ${student.firstName}, Last Name: ${student.lastName}, Mark: ${student.studentMark}`;
//         modal.classList.remove('hidden');
//     }
// }

function confirmDelete(id) {
    document.getElementById('deleteModal').setAttribute('data-student-id', id);
    document.getElementById('deleteModal').classList.remove('hidden');
}

function deleteStudent() {
    const id = parseInt(document.getElementById('deleteModal').getAttribute('data-student-id'));
    students = students.filter(s => s.id !== id);
    saveStudents();
    displayStudents();
    document.getElementById('deleteModal').classList.add('hidden');
}

// document.getElementById('addStudentForm').addEventListener('click', function(e) {
//     e.preventDefault();
//     const firstName = document.getElementById('fname').value;
//     const lastName = document.getElementById('lname').value;
//     const studentMark = document.getElementById('studentMark').value;
//     addStudent(firstName, lastName, studentMark);
//     this.reset();
// });

document.addEventListener('DOMContentLoaded', function() {
    const addStudentForm = document.getElementById('addStudentForm');
    const updateProductModalForm = document.getElementById('updateProductModal').querySelector('form');
    const deleteModalSubmitButton = document.querySelector('#deleteModal button[type="submit"]');
    
    if (addStudentForm) {
        addStudentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const firstName = document.getElementById('fname').value;
            const lastName = document.getElementById('lname').value;
            const studentMark = document.getElementById('studentMark').value;
            addStudent(firstName, lastName, studentMark);
            this.reset();
        });
    }
    
    if (updateProductModalForm) {
        updateProductModalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const id = parseInt(this.closest('#updateProductModal').getAttribute('data-student-id'));
            const firstName = document.getElementById('fname').value;
            const lastName = document.getElementById('lname').value;
            const studentMark = document.getElementById('studentMark').value;
            
            const studentIndex = students.findIndex(s => s.id === id);
            if (studentIndex !== -1) {
                students[studentIndex] = { id, firstName, lastName, studentMark };
                saveStudents();
                displayStudents();
                document.getElementById('updateProductModal').classList.add('hidden');
            }
        });
    }
    
    if (deleteModalSubmitButton) {
        deleteModalSubmitButton.addEventListener('click', deleteStudent);
    }

    loadStudents();
});
