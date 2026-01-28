//selectors
const todoInput = document.querySelector('.todo-input')
const todoBtn = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')

//event listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//functions
function addTodo(event) {
    event.preventDefault();

    const todoDiv = document.createElement("DIV")
    todoDiv.classList.add('todo')


    const newTodo = document.createElement('li')
    newTodo.innerText = todoInput.value
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo)

    saveLocalTodos(todoInput.value);

    const completedBtn = document.createElement('button')
    completedBtn.innerHTML = '<i class="fas fa-check"></i>'
    completedBtn.classList.add('complete-btn')
    todoDiv.appendChild(completedBtn)

    const trashBtn = document.createElement('button')
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>'
    trashBtn.classList.add('trash-btn')
    todoDiv.appendChild(trashBtn)

    todoList.appendChild(todoDiv)
    todoDiv.setAttribute('draggable', 'true');

    todoInput.value = ''

}

function deleteCheck(e) {
    const item = e.target;
    console.log(item)
    const todo = item.parentNode;
    if (item.classList[0] === 'trash-btn') {
        todo.classList.add('fall')
        removeLocalTodos(todo)

        todo.addEventListener('transitionend', () => {
            todo.remove();
        })


    }
    if (item.classList[0] === 'complete-btn') {
        todo.classList.toggle('checkedTodo');

    }


}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach((todo) => {
        switch (e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if (todo.classList.contains('checkedTodo')) {
                    todo.style.display = 'flex';

                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('checkedTodo')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }

        }
    })
}

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos))
}
function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function (todo) {


        const todoDiv = document.createElement("DIV")
        todoDiv.classList.add('todo')


        const newTodo = document.createElement('li')
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo)


        const completedBtn = document.createElement('button')
        completedBtn.innerHTML = '<i class="fas fa-check"></i>'
        completedBtn.classList.add('complete-btn')
        todoDiv.appendChild(completedBtn)

        const trashBtn = document.createElement('button')
        trashBtn.innerHTML = '<i class="fas fa-trash"></i>'
        trashBtn.classList.add('trash-btn')
        todoDiv.appendChild(trashBtn)

        todoList.appendChild(todoDiv)
    });
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const localTodo = todo.childNodes[0].innerText
    const index = todos.indexOf(localTodo);

    todos.splice(index, 1)

    localStorage.setItem('todos', JSON.stringify(todos))

}



























