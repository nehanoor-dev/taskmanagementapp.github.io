// document.addEventListener('DOMContentLoaded', function () {
//     const taskForm = document.getElementById('task-form');
//     const taskNameInput = document.getElementById('task-name');
//     const startDateInput = document.getElementById('start-date');
//     const completionDateInput = document.getElementById('completion-date');
//     const taskTableBody = document.getElementById('task-table-body');
  
//     // Load tasks from local storage
//     loadTasks();
  
//     // Add task event listener
//     taskForm.addEventListener('submit', function (e) {
//       e.preventDefault();
//       const taskName = taskNameInput.value.trim();
//       const startDate = startDateInput.value;
//       const completionDate = completionDateInput.value;
//       if (taskName !== '' && startDate !== '' && completionDate !== '') {
//         addTask(taskName, startDate, completionDate);
//         taskNameInput.value = '';
//         startDateInput.value = '';
//         completionDateInput.value = '';
//       }
//     });
  
//     // Add task function
//     function addTask(taskName, startDate, completionDate) {
//       const tr = document.createElement('tr');
//       tr.innerHTML = `
//         <td>${taskName}</td>
//         <td>${startDate}</td>
//         <td>${completionDate}</td>
//         <td><button class="delete-button">Delete</button></td>        
//         <td><button class="modify-button">Modify</button></td>

//       `;
  
//       // Add delete task functionality
//       const deleteButton = tr.querySelector('.delete-button');
//       deleteButton.addEventListener('click', function () {
//         tr.remove();
//         updateLocalStorage();
//       });
  
//       taskTableBody.appendChild(tr);
//       updateLocalStorage();
//     }
  
//     // Update local storage
//     function updateLocalStorage() {
//       const tasks = [];
//       document.querySelectorAll('#task-table-body tr').forEach(function (task) {
//         const taskName = task.querySelector('td').textContent;
//         const startDate = task.querySelector('td:nth-child(2)').textContent;
//         const completionDate = task.querySelector('td:nth-child(3)').textContent;
//         tasks.push({
//           name: taskName,
//           startDate: startDate,
//           completionDate: completionDate
//         });
//       });
//       localStorage.setItem('tasks', JSON.stringify(tasks));
//     }
  
//     // Load tasks from local storage
//     function loadTasks() {
//       const tasks = JSON.parse(localStorage.getItem('tasks'));
//       if (tasks) {
//         tasks.forEach(function (task) {
//           addTask(task.name, task.startDate, task.completionDate);
//         });
//       }
//     }
//   });
  

document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('task-form');
    const taskNameInput = document.getElementById('task-name');
    const startDateInput = document.getElementById('start-date');
    const completionDateInput = document.getElementById('completion-date');
    const taskTableBody = document.getElementById('task-table-body');
    let isEditMode = false;
    let editedTaskId = null;

    // Load tasks from local storage
    loadTasks();

    // Add task event listener
    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const taskName = taskNameInput.value.trim();
        const startDate = startDateInput.value;
        const completionDate = completionDateInput.value;
        if (taskName !== '' && startDate !== '' && completionDate !== '') {
            if (isEditMode) {
                editTask(editedTaskId, taskName, startDate, completionDate);
                isEditMode = false;
                editedTaskId = null;
            } else {
                addTask(taskName, startDate, completionDate);
            }
            taskNameInput.value = '';
            startDateInput.value = '';
            completionDateInput.value = '';
        }
    });

   // Add task function
// Add task function
function addTask(taskName, startDate, completionDate) {
    // If in edit mode, update the existing task
    if (isEditMode && editedTaskId) {
        editTask(editedTaskId, taskName, startDate, completionDate);
        isEditMode = false;
        editedTaskId = null;
    } else {
        // Otherwise, add a new task
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${taskName}</td>
            <td>${startDate}</td>
            <td>${completionDate}</td>
            <td><button class="delete-button">Delete</button></td>        
            <td><button class="modify-button">Modify</button></td>
        `;

        // Add delete task functionality
        const deleteButton = tr.querySelector('.delete-button');
        deleteButton.addEventListener('click', function () {
            tr.remove();
            updateLocalStorage();
        });

        // Add modify task functionality
        const modifyButton = tr.querySelector('.modify-button');
        modifyButton.addEventListener('click', function () {
            isEditMode = true;
            editedTaskId = tr.dataset.taskId;
            taskNameInput.value = taskName;
            startDateInput.value = startDate;
            completionDateInput.value = completionDate;
        });

        taskTableBody.appendChild(tr);
        updateLocalStorage();
    }
}

    // Edit task function
    function editTask(taskId, taskName, startDate, completionDate) {
        const tr = document.querySelector(`[data-task-id="${taskId}"]`);
        tr.innerHTML = `
            <td>${taskName}</td>
            <td>${startDate}</td>
            <td>${completionDate}</td>
            <td><button class="delete-button">Delete</button></td>        
            <td><button class="modify-button">Modify</button></td>
        `;

        // Add delete task functionality
        const deleteButton = tr.querySelector('.delete-button');
        deleteButton.addEventListener('click', function () {
            tr.remove();
            updateLocalStorage();
        });

        // Add modify task functionality
        const modifyButton = tr.querySelector('.modify-button');
        modifyButton.addEventListener('click', function () {
            isEditMode = true;
            editedTaskId = taskId;
            taskNameInput.value = taskName;
            startDateInput.value = startDate;
            completionDateInput.value = completionDate;
        });

        updateLocalStorage();
    }

    // Update local storage
    function updateLocalStorage() {
        const tasks = [];
        document.querySelectorAll('#task-table-body tr').forEach(function (task, index) {
            const taskName = task.querySelector('td').textContent;
            const startDate = task.querySelector('td:nth-child(2)').textContent;
            const completionDate = task.querySelector('td:nth-child(3)').textContent;
            tasks.push({
                id: task.dataset.taskId,
                name: taskName,
                startDate: startDate,
                completionDate: completionDate
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks from local storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks) {
            tasks.forEach(function (task) {
                addTask(task.name, task.startDate, task.completionDate);
            });
        }
    }
});
