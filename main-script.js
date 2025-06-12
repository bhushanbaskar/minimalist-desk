let yourTasks =
  JSON.parse(localStorage.getItem('yourTasks')) || []; //default operator
let deletedTasks =
  JSON.parse(localStorage.getItem('deletedTasks')) || [];

// creating a function to save data in local storage
function saveTasks() {
  localStorage.setItem('yourTasks', JSON.stringify(yourTasks));
  localStorage.setItem('deletedTasks', JSON.stringify(deletedTasks));
}
// calling saveTasks() after every change
//inside addTask(). see at the end!= L35

document.getElementById('task-form').addEventListener('submit', addTask);
// Function to handle form submission and add a new task
function addTask(event) {
  event.preventDefault(); // Prevents form submission and page refresh
  // Handle form submission logic here
  const taskInput = document.querySelector('.js-task-input').value.trim();
  const dueDateInput = document.querySelector('.js-due-date-input').value;

  if (taskInput === '' || dueDateInput === '') {
    alert('Please enter both task name and due date.');
    return;
  }

  const task = {
    name: taskInput,
    dueDate: dueDateInput
  }

  yourTasks.push(task);
  document.querySelector('.js-task-input').value = '';
  document.querySelector('.js-due-date-input').value = '';
  saveTasks();// called here to save local storage!
  renderTasks();
}

function renderTasks() {

  const list = document.getElementById('task-list');
  list.innerHTML = ''; // Clear previous content

  if (yourTasks.length === 0) {
    const emptyMsg = document.createElement('li');
    emptyMsg.className = 'empty-message';
    emptyMsg.textContent = 'No tasks yet. Add your first task to get started!';
    list.appendChild(emptyMsg);
    return;
  }

  yourTasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'task-item';

    li.innerHTML = `<div class="task-info">
                    <p class="task-name">${task.name}</p>
                    <p class="task-due-date">${task.dueDate}</p>
                  </div>
                  <div class="task-actions">
                  <button class="edit-task" title="Edit Task" data-index="${index}">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                  </button>
                  <button class="delete-task " title="mark Task as completed" data-index="${index}">
                    <!--  SVG icon -->
                    <svg xmlns="http://www.w3.org/2000/svg"
                      height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                      <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480
                          q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0
                          156 31.5T763-763q54 54 85.5 127T880-480q0
                          83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80
                          q134 0 227-93t93-227q0-134-93-227t-227-93q-134
                          0-227 93t-93 227q0 134 93 227t227 93Z"/>
                    </svg>
                  </button>
                  </div>`;

    list.appendChild(li);
  });

  // Add event listeners to delete buttons

  document.querySelectorAll('.delete-task').forEach(button => {
    button.addEventListener('click', function () {
      const index = this.getAttribute('data-index');

      const deletedTask = yourTasks.splice(index, 1)[0];//remove from main list
      deletedTasks.push(deletedTask); //add to deleted tasks list
      saveTasks();
      renderTasks(); // Re-render the task list
      renderDeletedTasks(); // Re-render the deleted tasks list
    })
  })
  document.querySelectorAll('.edit-task').forEach(button => {
    button.addEventListener('click', function () {
      const index = this.getAttribute('data-index');
      const task = yourTasks[index];
      const newTaskName = prompt('Edit Task Name:', task.name);
      const newDueDate = prompt('Edit Due Date:', task.dueDate);

      if (newTaskName !== null && newDueDate !== null) {
        yourTasks[index].name = newTaskName.trim();
        yourTasks[index].dueDate = newDueDate.trim();
        saveTasks(); // Save changes to local storage
        renderTasks(); // Re-render the task list
      }
    });
  });
}

function renderDeletedTasks() {

  const deletedList = document.getElementById('deleted-task-list');
  deletedList.innerHTML = ''; // Clear previous content

  if (deletedTasks.length === 0) {
    const emptyMsg = document.createElement('li');
    emptyMsg.className = 'empty-message';
    emptyMsg.textContent = 'Your completed tasks will appear here once you delete something.';
    deletedList.appendChild(emptyMsg);
    return;
  }
  deletedTasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'deleted-task-item';

    li.innerHTML = `
      <div class="task-info">
        <p class="task-name"><del>${task.name}</del></p>
        <p class="task-due-date"><del>${task.dueDate}</del></p>
      </div>
      <div class="task-actions">
      <button class="restore-task" title="Restore Task" data-index="${index}">
      <!-- SVG icon for restore -->
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m368-592 89-147-59-98q-12-20-34.5-20T329-837l-98 163 137 82Zm387 272-89-148 139-80 64 107q11 17 12 38t-9 39q-10 20-29.5 32T800-320h-45ZM640-40 480-200l160-160v80h190l-58 116q-11 20-30 32t-42 12h-60v80Zm-387-80q-20 0-36.5-10.5T192-158q-8-16-7.5-33.5T194-224l34-56h172v160H253Zm-99-114L89-364q-9-18-8.5-38.5T92-441l16-27-68-41 219-55 55 220-69-42-91 152Zm540-342-219-55 69-41-125-208h141q21 0 39.5 10.5T629-841l52 87 68-42-55 220Z"/></svg>
      </button>
      <button class=" permanent-delete" title="Permanently Delete" data-index="${index}">
        
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
      </button>
      </div>
    `;

    deletedList.appendChild(li);
  });
  // Add event listeners to permanent delete buttons
  document.querySelectorAll('.permanent-delete').forEach(button => {
    button.addEventListener('click', function () {
      const index = this.getAttribute('data-index');
      deletedTasks.splice(index, 1); // Permanently remove the task from deleted tasks
      renderDeletedTasks(); // Re-render the deleted tasks list
    })
  })

  //experimenting with restore task functionality
  document.querySelectorAll('.restore-task').forEach(button => {
    button.addEventListener('click', function () {
      const index = this.getAttribute('data-index');
      const restoredTask = deletedTasks.splice(index, 1)[0]; // Remove from deleted tasks
      yourTasks.push(restoredTask); // Add back to main tasks
      saveTasks(); // Save changes to local storage
      renderTasks(); // Re-render the task list
      renderDeletedTasks(); // Re-render the deleted tasks list
    })
  })
  // experiment with edit task functionality
  
};

// functionality for delete all button 

document.getElementById('delete-all').addEventListener('click', function () {
  const confirmDelete = confirm('are you sure you want to permanently delete all tasks in history?')
  if (confirmDelete) {
    deletedTasks.length = 0;
    // now history container is empty
    saveTasks();
  }

  renderDeletedTasks();
});
document.querySelector('.js-due-date-input').addEventListener('focus', function () {
  this.showPicker && this.showPicker(); // Only if supported
});
document.querySelector('.js-due-date-input').addEventListener('click', function () {
  if (this.showPicker) this.showPicker(); // Only if supported
});
renderTasks();
renderDeletedTasks();
