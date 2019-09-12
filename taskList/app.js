const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//load all the event listeners
loadEventListener();

function loadEventListener() {
  //get tasks from LS
  document.addEventListener("DOMContentLoaded", getTasks);

  //add task event
  form.addEventListener("submit", addTask);

  //remove task event
  taskList.addEventListener("click", removeTask);

  //clear tasks event
  clearBtn.addEventListener("click", clearTasks);

  //filter task event
  filter.addEventListener("keyup", filterTasks);
}

// get tasks from local storage
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function(task) {
    //create li element
    const li = document.createElement("li");
    //add class
    li.className = "collection-item";
    //add text node and append to li
    li.appendChild(document.createTextNode(task));

    //create link element
    const link = document.createElement("a");
    //add class
    link.className = "delete-item secondary-content";
    //add icon html
    link.innerHTML = "<i class= 'fa fa-remove'></i>";

    //append link tp li
    li.appendChild(link);

    // append li to ul
    taskList.appendChild(li);
  });
}

//Add Task
function addTask(e) {
  e.preventDefault();
  if (taskInput.value === "") {
    alert("Add a task");
  } else {
    //create li element
    const li = document.createElement("li");
    //add class
    li.className = "collection-item";
    //add text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    //create link element
    const link = document.createElement("a");
    //add class
    link.className = "delete-item secondary-content";
    //add icon html
    link.innerHTML = "<i class= 'fa fa-remove'></i>";

    //append link tp li
    li.appendChild(link);

    // append li to ul
    taskList.appendChild(li);

    //store in LS
    storeInLocalStorage(taskInput.value);

    //clear input field
    taskInput.value = "";
  }
}

//add to local storage function
function storeInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    e.target.parentElement.parentElement.remove();

    //remove from LS
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
}
// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//clear task
function clearTasks() {
  if (confirm("Are you sure you want to clear all your tasks!"))
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  //clear tasks from storage
  clearTasksFromLocalStorage();
}
//clear tasks from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

//filter task
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  const tasks = document.querySelectorAll(".collection-item");
  tasks.forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) !== -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
