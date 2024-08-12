// const addBtn = document.getElementById('add-student');
const firstName = document.getElementById('fname');
const lastName = document.getElementById('lname');
const studentMark = document.getElementById('studentMark');

const studentList = document.getElementById('student-list').getElementsByTagName('tbody')[0];

let students = [];

function addStudent() {
    event.preventDefault();
    if( firstName && lastName && studentMark) {
        const student = { firstName: firstName.value ,
             lastName: lastName.value,
             studentMark: studentMark.value };
        
        students.push(student);
        displayStudents();
        clearStudents();
    } else {
        alert('Please fill all fields')
    }
}

function displayStudents(){
    studentList.innerHTML = '';
    
    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
         <td class="px-4 py-3">${student.firstName}</td>
         <td class="px-4 py-3">${student.lastName}</td>
         <td class="px-4 py-3">${student.studentMark}</td>
         <td class="px-4 py-3 flex items-center justify-end">
         <button id="apple-imac-27-dropdown-button" data-dropdown-toggle="apple-imac-27-dropdown" class="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" type="button">
         <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
         <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
         </svg>
         </button>
         <div id="apple-imac-27-dropdown" class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
         <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="apple-imac-27-dropdown-button">
         <li>
         <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Show</a>
         </li>
         <li>
         <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onclick="editStudent(${index})>Edit</a>
         </li>
         </ul>
         <div class="py-1">
         <a href="#" class="block py-2 px-4 text-sm text-red-700" onclick="deleteStudent(${index})">Delete</a>
         </div>
         </div>
</td>

        `;
        studentList.appendChild(row)
    })

}














// const students = [];

// function addStudent() {
//   const firstName = document.getElementById('firstName').value;
//   const lastName = document.getElementById('lastName').value;
//   const mark = document.getElementById('mark').value;

//   if (firstName && lastName && mark) {
//     const student = { firstName, lastName, mark };
//     students.push(student);
//     displayStudents();
//     clearForm();
//   } else {
//     alert('Please fill in all fields');
//   }
// }

// function displayStudents() {
//   const studentList = document.getElementById('student-list').getElementsByTagName('tbody')[0];
//   studentList.innerHTML = '';

//   students.forEach((student, index) => {
//     const row = document.createElement('tr');
//     row.innerHTML = `
//       <td>${student.firstName}</td>
//       <td>${student.lastName}</td>
//       <td>${student.mark}</td>
//       <td>
//         <button onclick="editStudent(${index})">Edit</button>
//         <button onclick="deleteStudent(${index})">Delete</button>
//       </td>
//     `;
//     studentList.appendChild(row);
//   });
// }

// function clearForm() {
//   document.getElementById('firstName').value = '';
//   document.getElementById('lastName').value = '';
//   document.getElementById('mark').value = '';
// }

// // Implement editStudent and deleteStudent functions here

// displayStudents();
