// Начальные задачи
let todos = [
    { text: "Learn basic JavaScript" },
    { text: "Practice DOM manipulation" }
];

// Получаем элементы
const list = document.getElementById("myUL");
const input = document.getElementById("myInput");
const counter = document.getElementById("counter");

// Функция отображения (Render)
function renderTasks() {
    // Очищаем список перед отрисовкой - плохая практика для больших списков
    list.innerHTML = "";
    
    // Проверка на пустой список
    if (todos.length === 0) {
        document.getElementById("noTasks").style.display = "block";
    } else {
        document.getElementById("noTasks").style.display = "none";
    }

    // Цикл
    for (let i = 0; i < todos.length; i++) {
        // Формируем HTML строку. 
        // Junior часто пишет onclick прямо в HTML, передавая индекс массива
        let li = `
            <li>
                <span>${todos[i].text}</span>
                <div>
                    <button class="editBtn" onclick="editTask(${i})">Edit</button>
                    <button class="deleteBtn" onclick="removeTask(${i})">Delete</button>
                </div>
            </li>
        `;
        list.innerHTML += li;
    }

    // Обновляем счетчик
    counter.innerText = todos.length;
}

// Добавление задачи
function newItem() {
    let val = input.value;

    // Простая валидация
    if (val === "") {
        alert("You must write something!"); // Раздражающий alert
        return;
    }

    // Проверка на дубликаты (сделана неэффективно)
    for(let i=0; i<todos.length; i++) {
        if(todos[i].text === val) {
            alert("This task already exists!");
            return;
        }
    }

    // Добавляем в массив
    todos.push({ text: val });
    
    // Очищаем инпут
    input.value = "";
    
    // Перерисовываем всё
    renderTasks();
}

// Удаление
function removeTask(index) {
    // console.log("deleted " + index); // Забытый консоль лог
    todos.splice(index, 1);
    renderTasks();
}

// Редактирование через prompt (классика новичка)
function editTask(index) {
    let currentText = todos[index].text;
    let newText = prompt("Update your task:", currentText);

    if (newText != null && newText != "") {
        todos[index].text = newText;
        renderTasks();
    }
}

// Запуск при старте
renderTasks();