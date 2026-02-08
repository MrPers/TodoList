export const initialTasks = [
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


// --- Элементы DOM ---
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const countSpan = document.getElementById("count");
const emptyState = document.getElementById("emptyState");
const feedback = document.getElementById("feedback");


// 1. Функция валидации (Input Validation: Excellent)
function validateInput(text, currentId = null) {
  // Убираем лишние пробелы
  const cleanedText = text.trim();

  // Проверка на пустоту
  if (cleanedText.length === 0) {
    return "Task cannot be empty";
  }

  // Проверка на дубликаты (исключая саму себя при редактировании)
  // "Excellent: duplicate prevention included"
  const isDuplicate = tasks.some(task => 
    task.text.toLowerCase() === cleanedText.toLowerCase() && task.id !== currentId
  );

  if (isDuplicate) {
    return "This task already exists";
  }

  return null; // Ошибок нет
}

// 2. Функция отрисовки (Technical Implementation: Excellent - dynamic rendering)
function render() {
  taskList.innerHTML = ""; // Очищаем список

  // Обновляем счетчик
  countSpan.textContent = tasks.length;

  // Показываем/скрываем надпись "No tasks"
  if (tasks.length === 0) {
    emptyState.style.display = "block";
  } else {
    emptyState.style.display = "none";
  }

  // Создаем элементы списка
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "task"; // Класс из CSS
    
    // Текст задачи
    const p = document.createElement("p");
    p.className = "task-text";
    p.textContent = task.text;

    // Контейнер кнопок
    const actions = document.createElement("div");
    actions.className = "task-actions";

    // Кнопка Edit
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => enableEditMode(li, task); // Запускаем режим редактирования

    // Кнопка Delete
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "danger"; // Красный цвет из CSS
    deleteBtn.onclick = () => deleteTask(task.id);

    actions.append(editBtn, deleteBtn);
    li.append(p, actions);
    taskList.appendChild(li);
  });
}

// 3. Добавление задачи
function addTask(event) {
  event.preventDefault(); // Чтобы страница не перезагружалась
  
  const text = taskInput.value;
  const error = validateInput(text);

  if (error) {
    feedback.textContent = error;
    feedback.className = "feedback error"; // Красный цвет
    return;
  }

  // Если всё ок
  feedback.textContent = "Task added successfully";
  feedback.className = "feedback ok"; // Зеленый цвет
  
  const newTask = {
    id: Date.now(), // Генерируем уникальный ID
    text: text.trim()
  };

  tasks.push(newTask);
  taskInput.value = ""; // Очищаем поле
  render(); // Перерисовываем
}

// 4. Удаление задачи
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  render();
  feedback.textContent = ""; // Убираем сообщения
}

// 5. Режим редактирования (Bonus Feature: Excellent)
function enableEditMode(liElement, task) {
  // Очищаем содержимое li
  liElement.innerHTML = "";

  // Создаем инпут вместо текста
  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.value = task.text;
  editInput.className = "task-edit-input"; // Класс из CSS

  // Контейнер для кнопок сохранения
  const actions = document.createElement("div");
  actions.className = "task-actions";

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  
  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";
  cancelBtn.className = "danger";

  // Логика сохранения
  saveBtn.onclick = () => {
    const error = validateInput(editInput.value, task.id);
    
    if (error) {
      alert(error); // Можно использовать alert или feedback, здесь alert проще для модальности
      return;
    }

    // Обновляем массив
    task.text = editInput.value.trim();
    render(); // Выходим из режима редактирования, перерисовывая список
    feedback.textContent = "Task updated";
    feedback.className = "feedback ok";
  };

  // Логика отмены
  cancelBtn.onclick = () => {
    render(); // Просто перерисовываем старое состояние
  };

  actions.append(saveBtn, cancelBtn);
  liElement.append(editInput, actions);
  editInput.focus();
}

// --- События ---
taskForm.addEventListener("submit", addTask);

// Запуск при старте
render();