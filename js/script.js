const firstNameInput = document.getElementById('fname');
const lastNameInput = document.getElementById('lname');
const genderInput = document.getElementById('gender');
const studentMarkInput = document.getElementById('studentMark');
const studentTable = document.getElementById('student-list');
const saveBtn = document.getElementById('save')
 
let chartInstance = null;


document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById('updateProductButton').click();
});

let students = JSON.parse(localStorage.getItem('students')) || [];

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

function addStudent(firstName, lastName,gender, studentMark) {
    const newStudent = {
        id: Date.now(),
        firstName:firstName,
        lastName:lastName,
        gender:gender,
        studentMark:studentMark

    };
    students.push(newStudent);
    saveStudents();
    displayStudents();
}

saveBtn.addEventListener('click', function(){
    addStudent(firstNameInput.value, lastNameInput.value,genderInput.value, studentMarkInput.value);
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
            <td class="px-4 py-3">${student.gender}</td>
            <td class="px-4 py-3">${student.studentMark}</td>
            <td class="px-4 py-3 flex items-center justify-end">
                <button onclick="editStudent(${student.id})" data-modal-target="updateProductModal" data-modal-toggle="updateProductModal" class="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2">Edit</button>
                <button onclick="confirmDelete(${student.id})" data-modal-target="deleteModal" data-modal-toggle="deleteModal" class="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
            </td>
        `;
        studentList.appendChild(row);
    });
}


// function editStudent(id) {
//     const student = students.find(s => s.id === id);
//     if (student) {
//         firstNameInput.value = student.firstName;
//         lastNameInput.value = student.lastName;
//         genderInput.value = student.gender;
//         studentMarkInput.value = student.studentMark;
//         document.getElementById('updateProductModal').setAttribute('data-student-id', id);
//         document.getElementById('updateProductModal').classList.remove('hidden');
//     }
// }



function confirmDelete(id) {
    document.getElementById('deleteModal').setAttribute('data-student-id', id);
    document.getElementById('deleteModal').classList.remove('hidden');
}

function deleteStudent() {
    const id = parseInt(document.getElementById('deleteModal').getAttribute('data-student-id'));
    students = students.filter(s => s.id !== id);
    document.getElementById('deleteModal').classList.add('hidden');
    saveStudents();
    displayStudents();
}


// document.addEventListener('DOMContentLoaded', function() {
//     const addStudentForm = document.getElementById('addStudentForm');
//     const updateProductModalForm = document.getElementById('updateProductModal').querySelector('form');
//     const deleteModalSubmitButton = document.querySelector('#deleteModal button[type="submit"]');
    
//     if (addStudentForm) {
//         addStudentForm.addEventListener('submit', function(e) {
//             e.preventDefault();
//             const firstName = document.getElementById('fname').value;
//             const lastName = document.getElementById('lname').value;
//             const gender = document.getElementById('gender').value;
//             const studentMark = document.getElementById('studentMark').value;
//             addStudent(firstName, lastName,gender, studentMark);
//             this.reset();
//         });
//     }
    
//     if (updateProductModalForm) {
//         updateProductModalForm.addEventListener('submit', function(e) {
//             e.preventDefault();
//             const id = parseInt(this.closest('#updateProductModal').getAttribute('data-student-id'));
//             const firstName = document.getElementById('fname').value;
//             const lastName = document.getElementById('lname').value;
//             const gender = document.getElementById('gender').value;
//             const studentMark = document.getElementById('studentMark').value;
            
//             const studentIndex = students.findIndex(s => s.id === id);
//             if (studentIndex !== -1) {
//                 students[studentIndex] = { id, firstName, lastName,gender, studentMark };
//                 saveStudents();
//                 displayStudents();
//                 document.getElementById('updateProductModal').classList.add('hidden');
//             }
//         });
//     }
    
//     if (deleteModalSubmitButton) {
//         deleteModalSubmitButton.addEventListener('click', deleteStudent);
//     }

//     loadStudents();
// });

// Graph Code 
function renderChart() {
  const ctx = document.getElementById('myChart').getContext('2d') 

  if (chartInstance) {
    chartInstance.destroy();
}


  const ranges = [0,10,20,30,40,50,60,70,80,90,100];
  const dataCounts = new Array(ranges.length-1).fill(0)


  students.forEach(student => {
    const mark = student.studentMark;
    for (let i = 0; i < ranges.length - 1; 
    i++){
      if ( mark >= ranges[i] && mark < ranges[i + 1]){
        dataCounts[i]++;
        break
      }
    }
  })

  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['0-49', '50-59', '60-69', '70-79', '80-89', '90-100'],
      datasets: [{
        label: 'Number of Students',
        data: dataCounts,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
    }]
    },
    options: {
      scales: {
        x: {
            title: {
                display: true,
                text: 'Grade Ranges'
            }
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Students'
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks:{
            label: function(context){
              const rangeIndex = context.dataIndex;
              return `${
              labels[rangeIndex]}:${dataCounts[rangeIndex]} students`
            }
          }
        }
      }
    }
  });
}
renderChart()
console.log(renderChart())

//   calculator

const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
let currentValue = '';
let operator = '';
let firstOperand = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.classList.contains('number')) {
            currentValue += value;
            display.value = currentValue;
        } else if (button.classList.contains('operator')) {
            if (firstOperand !== '') {
                calculate();
            }
            firstOperand = currentValue;
            operator = value;
            currentValue = '';
        } else if (value === '=') {
            calculate();
        } else if (value === 'Clear') {
            clear();
        }
    });
});



function calculate() {
    if (firstOperand !== '' && currentValue !== '') {
        let result;
        switch (operator) {
            case '+':
                result = parseFloat(firstOperand) + parseFloat(currentValue);
                break;
            case '-':
                result = parseFloat(firstOperand) - parseFloat(currentValue);
                break;
            case '*':
                result = parseFloat(firstOperand) * parseFloat(currentValue);
                break;
            case '/':
                result = parseFloat(firstOperand) / parseFloat(currentValue);
                break;
            default:
                return;
        }

        currentValue = result.toString();
        display.value = currentValue;
        firstOperand = '';
        operator = '';
    }
}

function clear() {
    currentValue = '';
    firstOperand = '';
    operator = '';
    display.value = '';
}
// calculator
// search

// function searchContent() {
//     const searchInput = document.getElementById("simple-search");
//     const contentToSearch = document.querySelectorAll(".content-item");
  

//     const debounce = (func, delay) => {
//       let timeout;
//       return function () {
//         const context = this;
//         const args = arguments;
//         clearTimeout(timeout);
//         timeout = setTimeout(() => func.apply(context, args), delay);
//       };
//     };
  
   
//     const debouncedSearch = debounce((searchTerm) => {
//       contentToSearch.forEach((item) => {
//         const itemText = item.textContent.toLowerCase();
//         const isMatch = itemText.includes(searchTerm);
//         item.style.display = isMatch ? "block" : "none";
//       });
//     }, 300);
  
//     searchInput.addEventListener("input", (event) => {
//       const searchTerm = event.target.value.toLowerCase();
//       debouncedSearch(searchTerm);
//     });
//   }
  
//   searchContent();



function loadStudents() {
  const storedStudents = localStorage.getItem('students');
  if (storedStudents) {
    students = JSON.parse(storedStudents);
  }
  displayStudents();
}

// Function to display students
// function displayStudents() {
//   const studentList = document.getElementById('student-list');
//   studentList.innerHTML = '';

//   students.forEach((student) => {
//     const studentHTML = `
//     <td class="px-4 py-3">${student.firstName}</td>
//              <td class="px-4 py-3">${student.lastName}</td>
//            <td class="px-4 py-3">${student.gender}</td>
//              <td class="px-4 py-3">${student.studentMark}</td>
//             <td class="px-4 py-3 flex items-center justify-end">
//             <button onclick="editStudent(${student.id})" data-modal-target="updateProductModal" data-modal-toggle="updateProductModal" class="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2">Edit</button>
//           <button onclick="confirmDelete(${student.id})" data-modal-target="deleteModal" data-modal-toggle="deleteModal" class="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
//             </td>
  
//     `;
//     studentList.innerHTML += studentHTML;
//   });
// }

// Function to edit a student
function editStudent(id) {
  const student = students.find((s) => s.id === id);
  if (student) {
    const firstNameInput = document.getElementById('fname');
    const lastNameInput = document.getElementById('lname');
    const genderInput = document.getElementById('gender');
    const studentMarkInput = document.getElementById('studentMark');

    firstNameInput.value = student.firstName;
    lastNameInput.value = student.lastName;
    genderInput.value = student.gender;
    studentMarkInput.value = student.studentMark;

    const updateProductModal = document.getElementById('updateProductModal');
    updateProductModal.setAttribute('data-student-id', id);
    updateProductModal.classList.remove('hidden');
  }
}

// Function to update a student
function updateStudent(id, firstName, lastName, gender, studentMark) {
  const studentToUpdate = students.find((student) => student.id === id);
  if (studentToUpdate) {
    studentToUpdate.firstName = firstName;
    studentToUpdate.lastName = lastName;
    studentToUpdate.gender = gender;
    studentToUpdate.studentMark = studentMark;

    localStorage.setItem('students', JSON.stringify(students));
    console.log(`Student ${id} updated successfully!`);
  } else {
    console.error(`Student ${id} not found!`);
  }
  loadStudents();
}

// Function to delete a student
function deleteStudent(id) {
  const studentIndex = students.findIndex((student) => student.id === id);
  if (studentIndex !== -1) {
    students.splice(studentIndex, 1);
    localStorage.setItem('students', JSON.stringify(students));
    console.log(`Student ${id} deleted successfully!`);
  } else {
    console.error(`Student ${id} not found!`);
  }
}

// Event listeners
document.addEventListener('DOMContentLoaded', loadStudents);

const studentList = document.getElementById('student-list');
studentList.addEventListener('click', (e) => {
  if (e.target.classList.contains('edit-btn')) {
    const id = parseInt(e.target.getAttribute('data-student-id'));
    editStudent(id);
  } else if (e.target.classList.contains('delete-btn')) {
    const id = parseInt(e.target.getAttribute('data-student-id'));
    deleteStudent(id);
  }
});

const updateProductModalForm = document.getElementById('updateProductModal').querySelector('form');
updateProductModalForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const id = parseInt(updateProductModalForm.closest('#updateProductModal').getAttribute('data-student-id'));
  const firstName = document.getElementById('fname').value;
  const lastName = document.getElementById('lname').value;
  const gender = document.getElementById('gender').value;
  const studentMark = document.getElementById('studentMark').value;

  updateStudent(id, firstName, lastName, gender, studentMark);
});    document.getElementById('updateProductModal').classList.add('hidden');


const modalButton = document.querySelector('[data-modal-target="portal-modal"]');
const modal = document.querySelector('[data-modal-target="portal-modal"]');
const closeButton = document.querySelector('[data-modal-toggle="portal-modal"]');

modalButton.addEventListener('click', () => {
  modal.classList.remove('hidden');
});

closeButton.addEventListener('click', () => {
  modal.classList.add('hidden');
});


//   Modal 
// document.getElementById('student-btn').addEventListener('click', function() {
//     document.getElementById('student-dashboard').classList.remove('hidden');
// // Function to load students from local storage
// });

// document.getElementById('teacher-btn').addEventListener('click', function() {
//     document.getElementById('teacher-dashboard').classList.remove('hidden');
//     document.getElementById('student-dashboard').classList.add('hidden');
// });