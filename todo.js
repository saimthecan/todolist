//Select All Elements
const cardbody0 = document.querySelectorAll(".card-body")[0];
const cardbody1 = document.querySelectorAll(".card-body")[1];
const form = document.querySelector("#todo-form");
const todoinput = document.querySelector(".form-control");
const filterTodo = document.querySelector("#filter");
const listgroup = document.querySelector(".list-group");
const clearAll = document.querySelector("#clear-todos");

//add eventListeners

eventListeners();

function eventListeners(){
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI)
    cardbody1.addEventListener("click",deleteTodo);
    filterTodo.addEventListener("keyup",filterTodos);
    clearAll.addEventListener("click",clearAllTodos);

}
function clearAllTodos(e){
    if(confirm("are you sure you want to delete all todos?")){
        //clear todos from UI
        // listgroup.innerHTML = ""; //slow way
        while(listgroup.firstElementChild != null){ 
            listgroup.removeChild(listgroup.firstElementChild);
        }
        localStorage.removeItem("todos");
       
    }
    


}
function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1){
            // d-flex blocks the display, we used !important to prevent this
            listItem.setAttribute("style","display : none !important");
        }
        else {
            listItem.setAttribute("style","display:block");
        }
    })


}
function deleteTodo(e){ // deleteTodo from UI
    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Todo deleted")
    }
}

function deleteTodoFromStorage(deletetodo){ //deletTodo from storage
    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index){
        if (todo === deletetodo){
            todos.splice(index,1); //delete value from array
        }
    })

    localStorage.setItem("todos",JSON.stringify(todos));

}

function loadAllTodosToUI(){ //Adding the todos in the storage back to the page when the page is refreshed
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
    
}

function addTodo(e) {
    const newTodo = todoinput.value.trim();
    //is newTodo empty? check
    if(newTodo === ""){
        // add danger alert if newTodo is empty
        showAlert("danger","Please entry todo");
    }
    else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        //add success alert if NewTodo is not empty
        showAlert("success","Todo added");
    }
    
    e.preventDefault();
}
function getTodosFromStorage(){ // get todos from storage
    let todos;

    if(localStorage.getItem("todos") === null){
        todos =[];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}
function showAlert(type,message){
    //Adding alert message to cardbody0
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    cardbody0.appendChild(alert);

    //setTimeout, Deleting alerts in 2 seconds
    setTimeout(function(){
        alert.remove()
    },2000);
}

function addTodoToUI(newTodo){ //will add string value as list item to UI
    // creating a "li" element
    const listItem = document.createElement("li");
    //creating an "a" element
    const link = document.createElement("a");
    // edit "a" element
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>"
    //edit "li" element
    listItem.className = "list-group-item d-flex justify-content-between"
    // create Text Node
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    // add listItem to listgroup
    listgroup.appendChild(listItem);
   
    // clear todoinput
    todoinput.value = "";
                
}






