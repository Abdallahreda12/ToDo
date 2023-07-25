//select elements
let inputFeild = document.querySelector(".input-feild");
let submit = document.querySelector(".input-add");
let allTasks = document.querySelector(".tasks");
let deleteAll = document.querySelector(".deleteAll");
let bottomDelete = document.querySelector(".delete");

//array to save tasks inside it
let arrayOfTasks = [];

//check if there data in local storage or not
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));

  //after add element to array will create it into page
  addElementToPage(arrayOfTasks);
}

//for delete ond done
allTasks.addEventListener("click", (e) => {
  //delete element
  if (e.target.classList.contains("delete")) {
    deletetask(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
  }

  //done element
  if (e.target.classList.contains("task")) {
    e.target.classList.toggle("done");
    donetask(e.target.getAttribute("data-id"));
  }
});

//to delete all tasks
deleteAll.addEventListener("click", function () {
  allTasks.innerHTML = "";
  arrayOfTasks = [];
  window.localStorage.removeItem("tasks");
});

//add task
submit.onclick = function () {
  if (inputFeild.value != "") {
    addtasks(inputFeild.value);
    inputFeild.value = "";
  }
};

function addtasks(taskText) {
  //create task
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };

  //add task to array
  arrayOfTasks.push(task);

  //add tasks to page
  addElementToPage(arrayOfTasks);

  //add tasks to local storage
  addToLocalStorage(arrayOfTasks);
}

function addElementToPage(arrayOfTasks) {
  allTasks.innerHTML = "";
  //add task to page
  arrayOfTasks.forEach((task, index) => {
    let div = document.createElement("div");
    div.classList.add("task");

    //check if task is done
    if (task.completed) {
      div.classList.add("done");
    }
    div.setAttribute("data-id", task.id);
    div.innerHTML = task.title;
    let bottomDelete = document.createElement("span");
    bottomDelete.className = "delete";
    bottomDelete.innerHTML = "Delete";
    div.append(bottomDelete);
    allTasks.append(div);
  });
}

//function to add tasks to local storage
function addToLocalStorage(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

//function to delete task from arrayOfTasks and local storage
function deletetask(taskID) {
  arrayOfTasks = arrayOfTasks.filter((e) => {
    return taskID != e.id;
  });
  addToLocalStorage(arrayOfTasks);
}

//functin to change completed from true to false vice verse
function donetask(taskID) {
  arrayOfTasks.forEach((e) => {
    if (e.id == taskID) {
      if (e.completed == true) {
        e.completed = false;
      } else {
        e.completed = true;
      }
    }
  });
  addToLocalStorage(arrayOfTasks);
}
