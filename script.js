taskInput = document.getElementById("taskInput");
addTaskBtn = document.getElementById("addTaskBtn");
taskList = document.getElementById("taskList");

function AddTask() {
  const inputText = taskInput.value;

  if (inputText !== "") {
    const li = document.createElement("li");
    li.textContent = inputText;
    taskList.appendChild(li);
    taskInput.value = "";
  }
}

taskInput.addEventListener("keydown", (event) => {
  if (event.keyCode == 13) {
    AddTask();
  }
});
