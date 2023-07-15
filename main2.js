let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

let arrayOfTasks = [];

// Check if there data in local storage
if (window.localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// Get Data from local storage
getDataFromLocalStorage();

// Add Task To 
submit.onclick = function() {
    if (input.value !== '') {
        addTasksToArray(input.value)
        input.value = '';
    }
    // Add Task to the page
    addTasksToPage(arrayOfTasks);
    // Add Tasks To Locale storage
    addTasksToLocalStorageFrom(arrayOfTasks);
}
tasksDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("del")) {
        e.target.parentElement.remove();
        deleteTasksWith(e.target.parentElement.getAttribute("data-id"))
    }
    if (e.target.classList.contains("task")) {
        e.target.classList.toggle("done")
        toggleTaskCompletedToFrom(e.target.getAttribute("data-id"))
    }
})
function addTasksToArray(taskText) {
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    }
    arrayOfTasks.push(task);
}
 function addTasksToPage(arrayOfTasks) {
    tasksDiv.innerHTML = '';
    arrayOfTasks.forEach((task) => {
        let div = document.createElement("div");
        div.className = "task";
        if (task.completed) {
            div.className = "task done"
        }
        div.appendChild(document.createTextNode(task.title))
        div.setAttribute("data-id", task.id);
        let span = document.createElement("span");
        span.className = "del"
        span.appendChild(document.createTextNode("Delete"));
        div.appendChild(span);
        tasksDiv.appendChild(div);
    })
 }

 function addTasksToLocalStorageFrom(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
 }

function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks")
    if (data) {
        let tasks = JSON.parse(data);
        addTasksToPage(tasks)
    }
}

function toggleTaskCompletedToFrom(taskId) {
    for (let i = 0 ; i < arrayOfTasks.length ; i++) {
        if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false)
        }
    }
   
    addTasksToLocalStorageFrom(arrayOfTasks);
}

let btn = document.querySelector(".btn");

btn.onclick = function () {
    window.localStorage.clear();
    tasksDiv.innerHTML = '';
    arrayOfTasks = [];
}

function deleteTasksWith(taskId) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addTasksToLocalStorageFrom(arrayOfTasks);
}