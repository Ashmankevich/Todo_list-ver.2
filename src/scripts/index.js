const ADD_TASK_BTN = document.getElementById("add-task-btn");
const DELETE_ALL_TASK_BTN = document.getElementById("delete-task-btn");
const DELETE_TASK_BTN = document.querySelector(".btn-delete");
const DSCRPTN_TASK = document.querySelector(".input");
const TODO_ROW = document.querySelector(".todo__row");

let todoItemElems = [];
let allTasks;

if (localStorage.allTasks === allTasks) {
   allTasks = [];
} else {
   allTasks = JSON.parse(localStorage.getItem('allTasks'))
};

const updateLocalStorage = () => {
   localStorage.setItem('allTasks', JSON.stringify(allTasks));
}

function GetTask(description) {
   this.description = description;
   this.isChecked = false;
   this.id = Date.now();
}

const getSample = (oneTask, index) => {
   return `
      <div class="todo__list ${oneTask.isChecked ? 'checked' : ' '}">
      <div class="item">
      <input onclick="completeTask(${index})" type="checkbox" ${oneTask.isChecked ? 'checked' : ' '} class="btn-complete">
      <span class="check__box"></span>
      </div>
      <div class="item">
      <p class="description">${oneTask.description}</p>
      </div>
      <div class="item">
      <button onclick="deleteTask(${index})" class="btn-delete">
      <i class="fa-solid fa-trash-can"></i>
      </button>
      </div>
      </div>
   `
}

const fillListItem = () => {
   TODO_ROW.innerHTML = '';
   if (allTasks.length > 0) {
      allTasks.forEach((item, index) => {
         TODO_ROW.innerHTML += getSample(item, index)
      });
      todoItemElems = document.querySelectorAll('.todo__list');
   }
}
fillListItem();

const completeTask = (index) => {
   allTasks[index].isChecked = !allTasks[index].isChecked;
   if (allTasks[index].isChecked) {
      todoItemElems[index].classList.add('checked');
   } else {
      todoItemElems[index].classList.remove('checked');
   }
   updateLocalStorage();
   fillListItem();
}

const deleteTask = (index) => {
   todoItemElems[index].classList.add('animation')
   setTimeout(() => {
      allTasks.splice(index, 1);
      updateLocalStorage();
      fillListItem();
   }, 1500)
}

ADD_TASK_BTN.addEventListener('click', () => {
   allTasks.push(new GetTask(DSCRPTN_TASK.value));
   updateLocalStorage();
   fillListItem();
   DSCRPTN_TASK.value = ' ';
});

DELETE_ALL_TASK_BTN.addEventListener('click', () => {
   allTasks.splice(0);
   updateLocalStorage();
   fillListItem();
});