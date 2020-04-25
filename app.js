const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const taskInput = document.querySelector('#task');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter')

loadEvtListenerAll();

function loadEvtListenerAll() {
    document.addEventListener('DOMContentLoaded', getTasks)
    form.addEventListener('submit', addTask);
    clearBtn.addEventListener('click', clearList);
    taskList.addEventListener('click', removeTask);
    filter.addEventListener('keyup', filterList);
};

function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
        const lis = document.createElement('li');
        lis.className = 'collection-item';
        lis.appendChild(document.createTextNode(task));
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        lis.appendChild(link);
        taskList.appendChild(lis);
    });
};

function addTask(e) {
    e.preventDefault();
    if (taskInput.value === '')
        alert('Add Task');
    else {
        const lis = document.createElement('li');
        lis.className = 'collection-item';
        lis.appendChild(document.createTextNode(taskInput.value));
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        lis.appendChild(link);
        taskList.appendChild(lis);
        // store task in local storage
        storeLocal(taskInput.value);
        taskInput.value = '';
    }

}


function storeLocal(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
    e.preventDefault();
    if (e.target.parentElement.classList.contains('delete-item')) {
        let task = e.target.parentElement.parentElement;
        if (confirm('Are you sure that you want to delete the task: ' + task.innerText)) {
            task.remove();
            // Remove from LS
            removeTaskFromLS(task);
            // let tasks;
            // if (localStorage.getItem('tasks') === null) {
            //     tasks = [];
            // } else {
            //     tasks = JSON.parse(localStorage.getItem('tasks'));
            // }
            // localStorage.removeItem('tasks', task);
        }
    }
}

function removeTaskFromLS(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(
        function(task, index) {
            if (taskItem.textContent === task) {
                tasks.splice(index, 1);
                // splice function is used to manipulate arrays
                // array.splice(index,num,'arrItem');
                // The above code snippet will replace 'num' elements with 'arrItem' starting from the index 'index' 
            }
        }
    );

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearList(e) {
    e.preventDefault();
    const listItems = document.querySelectorAll('.collection-item');
    // let n = listItems.length;
    // for (let i = 0; i < n; i++)
    //     listItems[i].remove();
    listItems.forEach(function(item) {
        item.remove();
    });
    // Remove from local storage
    localStorage.clear();
}

function filterList(e) {
    e.preventDefault();
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.innerText.toLowerCase();
        // indexOf function returns -1 if the item is not in the list
        if (item.indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
}