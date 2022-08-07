const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
    const list = event.target.parentElement;
    list.remove();
    toDos = toDos.filter(toDo => toDo.id !== parseInt(list.id));
    saveToDos();
}

function paintToDo(newToDo) {
    const list = document.createElement("li");
    list.id = newToDo.id;
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    list.appendChild(span);
    list.appendChild(delBtn);
    span.innerText = newToDo.text;
    toDoList.appendChild(list);
}

function handelToDoSubmit(event) {
    event.preventDefault();
    const newToDo = toDoInput.value;
    toDoInput.value = "";
    const newToDoObj = {
        text: newToDo,
        id: Date.now(),
    }
    toDos.push(newToDoObj);
    paintToDo(newToDoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", handelToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos) {
    const parsedTodos = JSON.parse(savedToDos);
    toDos = parsedTodos;
    parsedTodos.forEach(paintToDo);
}