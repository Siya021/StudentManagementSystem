const firstNameInput = document.getElementById('fname');
const lastNameInput = document.getElementById('lname');
const genderInput = document.getElementById('gender');
const studentMarkInput = document.getElementById('studentMark');
const studentTable = document.getElementById('student-list');
const saveBtn = document.getElementById('save')

document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById('updateProductButton').click();
});

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
        genderInput.value = student.gender;
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
    document.getElementById('deleteModal').classList.add('hidden');
    saveStudents();
    displayStudents();
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
            const gender = document.getElementById('gender').value;
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
            const gender = document.getElementById('gender').value;
            const studentMark = document.getElementById('studentMark').value;
            
            const studentIndex = students.findIndex(s => s.id === id);
            if (studentIndex !== -1) {
                students[studentIndex] = { id, firstName, lastName,gender, studentMark };
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

// Graph Code 
const options = {
    chart: {
      // Adjust size as needed
      height: 240,
      width: 600, // Adjust width for better readability
      type: "area",
      fontFamily: "Inter, sans-serif",
      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: "#1C64F2",
        gradientToColors: ["#1C64F2"],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 6,
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: -26,
      },
    },
    series: [], // We'll dynamically populate this later
    xaxis: {
      categories: [], // We'll dynamically populate this later
      labels: {
        show: true, // Show student names on x-axis
        rotate: -45, // Rotate labels for better readability with long names
        formatter: function (val) {
          return val; // Display the full value without modification
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: true, // Show y-axis labels
      labels: {
        formatter: function (value) {
          return value + "%"; // Add percentage symbol to marks
        },
      },
    },
  };
  
  // Function to update chart data based on students array
  function updateChartData() {
    const maleData = [];
    const femaleData = [];
    const studentNames = [];
  
    // Loop through students array and populate data and labels
    for (const student of students) {
      if (student.gender === "Male") {
        maleData.push(student.studentMark);
      } else {
        femaleData.push(student.studentMark);
      }
      studentNames.push(`${student.lastName}, ${student.firstName[0]}`); // Combine last name and first initial
    }
  
    // Update chart options with new data and labels
    options.series = [
      { name: "Male", data: maleData, color: "#1A56DB" },
      { name: "Female", data: femaleData, color: "#7E3BF2" },
    ];
    options.xaxis.categories = studentNames;
  
    // Render the chart with updated data
    const chart = new ApexCharts(document.getElementById("size-chart"), options);
    chart.render();
  }
  
  // Call updateChartData() after student data is loaded or updated
  if (document.getElementById("size-chart") && typeof ApexCharts !== 'undefined') {
    updateChartData();
  }

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

