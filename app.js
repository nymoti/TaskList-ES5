//Define UI Vars 
const form = document.querySelector('#task-form');
const taskList =  document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#newtask');

//Load all Event Listeners
loadEventListeners();
//
function loadEventListeners(){
    //DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);
    //Add taks event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear task event 
    clearBtn.addEventListener('click', clearTasks);
    //Filter task event 
    filter.addEventListener('keyup', filterTasks);
}

//Get Tasks from LocalStorage
function getTasks(){
    let tasks ;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        //Create li element
        const li = document.createElement('li');
        li.className = 'collection-item';
        // Create div and span  and append them to li 
        const divLi = document.createElement('div');
        divLi.className = 'task-title';
        const spanDiv = document.createElement('span');
        spanDiv.className = 'task-title-sp';
        spanDiv.appendChild(document.createTextNode(task))
        divLi.appendChild(spanDiv);

        const divLink = document.createElement('div');
        divLink.className = 'pull-right hidden-phone'; 
        const link = document.createElement('a');
        link.className = 'btn btn-danger btn-x';
        // add font-awesome icon
        link.innerHTML = '<i class="fa fa-trash-o "></i>';
        divLink.appendChild(link)  

        divLi.appendChild(divLink); 
        li.appendChild(divLi);
        //Append to ul
        taskList.appendChild(li);
    });
}

 

function addTask(e) {
    if(taskInput.value === ''){
        alert('add a task');
    }
    //Create li element
    const li = document.createElement('li');
    li.className = 'collection-item';
    // Create div and span  and append them to li 
    const divLi = document.createElement('div');
    divLi.className = 'task-title';
    const spanDiv = document.createElement('span');
    spanDiv.className = 'task-title-sp';
    spanDiv.appendChild(document.createTextNode(taskInput.value))
    divLi.appendChild(spanDiv);

    const divLink = document.createElement('div');
    divLink.className = 'pull-right hidden-phone'; 
    const link = document.createElement('a');
    link.className = 'btn btn-danger btn-x';
    // add font-awesome icon
    link.innerHTML = '<i class="fa fa-trash-o "></i>';
    divLink.appendChild(link)  

    divLi.appendChild(divLink); 
    li.appendChild(divLi);
    //Append to ul
    taskList.appendChild(li);

    //Store in LocalStorage
    storeTaskInLocalStorage(taskInput.value);
    //Clear input
    taskInput.value = '';
    console.log(li);

    e.preventDefault();
}

//Store Task in LocalStorage
function storeTaskInLocalStorage(task){
    let tasks ;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

//Remove Task
function removeTask(e){

    if(e.target.parentElement.classList.contains('btn-danger')){
        //console.log(e.target);
        if(confirm('Are you sure ?')) {           
            e.target.parentElement.parentElement.parentElement.parentElement.remove();
            //REmove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement.parentElement.parentElement);
        }
    }
}

//Remove fro LS
function removeTaskFromLocalStorage(taskItem){
    let tasks ;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks))
}


//Clear tasks
function clearTasks(){
    //taskList.innerHTML =  '';    
    // Faster
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    // Clear task frol LS
    clearTasksFromLocalStorage();
}
// Clear Tasks from LS
function clearTasksFromLocalStorage(){
    localStorage.clear();
}
// Filter Tasks
function filterTasks(e){
    const text = e.target.value ;
   //console.log(text);
   document.querySelectorAll('.collection-item').forEach(function (task){
       const item =  task.firstChild.textContent ;
       if(item.toLowerCase().indexOf(text) !=  -1){
            task.style.display = 'block' ;
       }else{
            task.style.display = 'none' ;           
       }
   });
}