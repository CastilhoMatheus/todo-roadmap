import { deleteIcon } from "./components";

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

function deleteTask(li) {
  li.remove();
}

function createDeleteButton(li) {
  const deleteBtn = document.createElement("span");
  deleteBtn.innerHTML = deleteIcon;
  deleteBtn.addEventListener("click", (event) => {
    event.stopPropagation(); // prevent toggling completion when clicking delete
    deleteTask(li);
  });
  return deleteBtn;
}

function createTask(text) {
  const li = document.createElement("li");
  li.textContent = text;

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
  });

  const deleteBtn = createDeleteButton(li);
  li.appendChild(deleteBtn);

  return li;
}

function addTask() {
  const inputText = taskInput.value.trim();

  if (!inputText) return;

  const li = createTask(inputText);
  taskList.appendChild(li);

  taskInput.value = "";
}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});
