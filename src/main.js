import { deleteIcon } from "./components";

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Get Tasks from local Storage
function getTasks() {
  return JSON.parse(localStorage.getItem("tasks") || "[]");
}

//Save tasks into local storage
function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Delete Task Function
function deleteTask(li, text) {
  li.remove();
  const tasks = getTasks().filter((t) => t.text !== text);
  saveTasks(tasks);
}

// Delete Button for tasks
function createDeleteButton(li, text) {
  const deleteBtn = document.createElement("span");
  deleteBtn.innerHTML = deleteIcon;
  deleteBtn.addEventListener("click", (event) => {
    event.stopPropagation(); // prevent toggling completion when clicking delete
    deleteTask(li, text);
  });
  return deleteBtn;
}

// Helper to update state of local storage
function updateTaskStatus(text, completed) {
  const tasks = getTasks();

  const taskToUpdate = tasks.find((task) => task.text === text);
  if (taskToUpdate) {
    taskToUpdate.completed = completed;
    saveTasks(tasks);
  }
}

// Create tasks
function createTask(text, completed = false) {
  const li = document.createElement("li");
  li.textContent = text;

  if (completed) li.classList.add("completed");

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateTaskStatus(text, li.classList.contains("completed"));
  });

  const deleteBtn = createDeleteButton(li, text);
  li.appendChild(deleteBtn);

  return li;
}

// Add tasks
function addTask() {
  const inputText = taskInput.value.trim();

  if (!inputText) return;

  const tasks = getTasks();
  tasks.push({ text: inputText, completed: false });
  saveTasks(tasks);

  const li = createTask(inputText);
  taskList.appendChild(li);

  taskInput.value = "";
}

// Render Tasks from Local Storage
function renderTasks() {
  taskList.innerHTML = "";
  getTasks().forEach((task) => {
    const li = createTask(task.text, task.completed);
    taskList.appendChild(li);
  });
}

// Initial render
renderTasks();

// Event Listeners
addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});
