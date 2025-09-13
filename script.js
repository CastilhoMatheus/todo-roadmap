const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

function AddTask() {
  const inputText = taskInput.value;

  if (inputText !== "") {
    const li = document.createElement("li");
    li.textContent = inputText;
    li.addEventListener("click", () => {
      li.classList.toggle("completed");
    });
    taskList.appendChild(li);
    taskInput.value = "";
  }
}

addTaskBtn.addEventListener("click", () => AddTask());

taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    AddTask();
  }
});
