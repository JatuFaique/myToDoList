//Selectors 
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener("click",addTodo);
todoList.addEventListener("click",deleteCheck);
filterOption.addEventListener("click",filterTodo);   




//Functions

function addTodo(event) {
    
    
    
    //pREVEnt from form submitting
    event.preventDefault();
     //Todo DIv
    const todoDiv=document.createElement('div');
    todoDiv.classList.add("todo");
    //create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //ADD local stortage
    saveLocalTodos(todoInput.value);
    //completed mark
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    
    //completed TRASH   mark
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    
    //append to list

    todoList.appendChild(todoDiv);
    //clear input val
    todoInput.value = "";
 
}

//Delete check fiunc

function deleteCheck(e) {
    console.log("we are deleting some");
    const item =e.target;
    //delete todo
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        // Animation
        todo.classList.add('fall');

        removeLocalTodos(todo);
        //todo.remove();
        todo.addEventListener('transitionend', function() {

            todo.remove();

        });
        

    }

    //checkmark 
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }


}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch(e.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display ='flex';

                }else{
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if(!(todo.classList.contains("completed"))){
                    todo.style.display="flex";

                }else {
                    todo.style.display = 'none';
                }
                break;
        }
    });

}

//Saving TODO to local storage
function saveLocalTodos(todo){
    // Check ---Hey Do I have thing in here
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];

    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    // Check ---Hey Do I have thing in here
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];

    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){

        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");
        //Create LI
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo);
        // CHECKED Mark Button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        // Trash  Button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        // Append to List
        todoList.appendChild(todoDiv)
        }); 
    }  
//Remove local storage
function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];

    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = Array.from(todoList.childNodes).indexOf(todo);
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos)); 
}   
