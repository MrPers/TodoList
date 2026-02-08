let tasks = [
  { id: "1", text: "Do math homework" },
  { id: "2", text: "Prepare for an English test" },
  { id: "3", text: "Pack a school backpack for tomorrow" },
  { id: "4", text: "Check weapons and gear" },
  { id: "5", text: "Get paid for the last contract" },
  { id: "6", text: "Scout the area before the mission" },
  { id: "7", text: "Go grocery shopping" },
  { id: "8", text: "Cook lunch" },
  { id: "9", text: "Do the laundry" },
  { id: "10", text: "Put the kids to bed" },
];

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const countSpan = document.getElementById("count");
const emptyState = document.getElementById("emptyState");
const feedback = document.getElementById("feedback");

function validateInput(text, currentId = null) {
  const cleanedText = text.trim();
  if (!cleanedText) return "Task cannot be empty";
  
  const isDuplicate = tasks.some(t => 
    t.text.toLowerCase() === cleanedText.toLowerCase() && t.id !== currentId
  );
  if (isDuplicate) return "This task already exists";
  
  return null;
}

function render() {
  taskList.innerHTML = "";
  countSpan.textContent = tasks.length;
  emptyState.style.display = tasks.length === 0 ? "block" : "none";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.innerHTML = `
      <p class="task-text">${task.text}</p>
      <div class="task-actions">
        <button class="editBtn">Edit</button>
        <button class="deleteBtn">Delete</button>
      </div>
    `;

    // Навешиваем обработчики
    li.querySelector(".editBtn").onclick = () => enableEditMode(li, task);
    li.querySelector(".deleteBtn").onclick = () => {
      tasks = tasks.filter(t => t.id !== task.id);
      render();
    };

    taskList.appendChild(li);
  });
}

function addTask(event) {
  event.preventDefault();
  const error = validateInput(taskInput.value);

  if (error) {
    feedback.textContent = error;
    feedback.className = "feedback error";
    return;
  }

  tasks.push({ id: Date.now().toString(), text: taskInput.value.trim() });
  taskInput.value = "";
  feedback.textContent = "Task added!";
  feedback.className = "feedback ok";
  render();
}

function enableEditMode(li, task) {
  li.innerHTML = `
    <input type="text" class="task-edit-input" value="${task.text}">
    <div class="task-actions">
      <button class="saveBtn">Save</button>
      <button class="deleteBtn">Cancel</button>
    </div>
  `;

  const input = li.querySelector("input");
  input.focus();

  li.querySelector(".saveBtn").onclick = () => {
    const error = validateInput(input.value, task.id);
    if (error) return alert(error);
    
    task.text = input.value.trim();
    render();
  };

  li.querySelector(".deleteBtn").onclick = render;
}

taskForm.addEventListener("submit", addTask);
render();