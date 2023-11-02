// set localStorage 
if(localStorage.getItem('todos') == null){
  let arr = [{"empty": "empty"}];
  localStorage.setItem('todos', JSON.stringify(arr));
}

//fetch and display to do items
function displayToDos(){

  //get todos
  let currentLocalStorage = localStorage.getItem('todos');
  let todoArr = JSON.parse(currentLocalStorage);

  //run through each item inside todos
  for(let i = 1; i < todoArr.length; i++){

    //for each item create a dom element
      const todo_div = document.createElement("div");
      const input_val = todoArr[i].name;
      const txt = document.createTextNode(input_val);

      todo_div.appendChild(txt);
      todo_div.classList.add("todo");
      todo_div.setAttribute("draggable", "true");

      /* create span */
      const span = document.createElement("span");
      const span_txt = document.createTextNode("\u00D7");
      span.classList.add("close");
      span.appendChild(span_txt);

      todo_div.appendChild(span);


      //get appropriate column
      let columnName = todoArr[i].status;
      let column = document.getElementById(columnName);
      //then append the child element to the correct column
      column.appendChild(todo_div);

      span.addEventListener("click", () => {
        removeFromLocalStorage(span.parentElement);
        span.parentElement.style.display = "none";
        
      });

      todo_div.addEventListener("dragstart", dragStart);
      todo_div.addEventListener("dragend", dragEnd);
  }
     
}

displayToDos();

const todos = document.querySelectorAll(".todo");
const all_status = document.querySelectorAll(".status");
let draggableTodo = null;

todos.forEach((todo) => {
  todo.addEventListener("dragstart", dragStart);
  todo.addEventListener("dragend", dragEnd);
});

function dragStart() {
  draggableTodo = this;
  draggableTodo.value = this.innerText;
  setTimeout(() => {
    this.style.display = "none";
  }, 0);
  console.log("dragStart");
}

function dragEnd() {
  draggableTodo = null;
  //draggableTodo.value = " ";
  setTimeout(() => {
    this.style.display = "block";
  }, 0);
  console.log("dragEnd");
}


all_status.forEach((status) => {
  status.addEventListener("dragover", dragOver);
  status.addEventListener("dragenter", dragEnter);
  status.addEventListener("dragleave", dragLeave);
  status.addEventListener("drop", dragDrop);
});

function dragOver(e) {
  e.preventDefault();
  //   console.log("dragOver");
}

function dragEnter() {
  //this.style.border = "1px dashed #ccc";
  console.log("dragEnter");
}

function dragLeave() {
  //this.style.border = "none";
  console.log("dragLeave");
}

function dragDrop() {
  //this.style.border = "none";
  this.appendChild(draggableTodo);

  //search localStorage todos array for name of task; then change that todo object's status to the div status of this
  

  let todoList = localStorage.getItem('todos');
  let todoListArr = JSON.parse(todoList);

  let strEnd = ("" + draggableTodo.value).length - 2;
  let draggableToDoValue = ("" + draggableTodo.value).slice(0, strEnd);
  console.log(draggableToDoValue);
  console.log(this.id);

  for(let i = 1; i < todoListArr.length; i++){
    if(todoListArr[i].name == draggableToDoValue){
      console.log("set new column status");
      todoListArr[i].status = this.id;
    }

  }
  localStorage.setItem("todos", JSON.stringify(todoListArr));
  console.log("dropped");
}



/* modal */
const btns = document.querySelectorAll("[data-target-modal]");
const close_modals = document.querySelectorAll(".close-modal");
const overlay = document.getElementById("overlay");

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(btn.dataset.targetModal).classList.add("active");
    overlay.classList.add("active");
  });
});

close_modals.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".modal");
    modal.classList.remove("active");
    overlay.classList.remove("active");
  });
});

window.onclick = (event) => {
  if (event.target == overlay) {
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => modal.classList.remove("active"));
    overlay.classList.remove("active");
  }
};

/* save to localStorage */
function saveToLocalStorage(taskname, column){

  let currentLocalStorage = localStorage.getItem('todos');
  let todoArr = [];

  if(taskname.length =! 0){
    //create todo object
    const todo = {
      "name" : taskname,
      "status": column
    };
    
    //parse current localStorage array and push new todo
    if (currentLocalStorage) {
      // converts back to array and store it in todos array
      todoArr = JSON.parse(currentLocalStorage);
      todoArr.push(todo);
    }

    //store current localStorage again
    localStorage.setItem('todos', JSON.stringify(todoArr));  // '[ {name: "buy pens", status: "today"} ]'
  }

}

/* remove from localStorage*/
function removeFromLocalStorage(todoElement){
  console.log("remove from storage");
  //remove todo from localStorage
  let currentLocalStorage = localStorage.getItem('todos');
  let todoArr = [];
  todoArr = JSON.parse(currentLocalStorage);

  let indexToRemove = null;
  //new task+x
  let strEnd = ("" + todoElement.innerText).length - 2;
  console.log(todoElement);
  let todoElementStr = ("" + todoElement.innerText).slice(0, strEnd);

  for(let i = 1; i < todoArr.length; i++){
    if(todoArr[i].name == todoElementStr){
      todoArr.splice(i, 1);
      break;
    }
  }

  //reset storage
  localStorage.removeItem('todos');
  localStorage.setItem('todos', JSON.stringify(todoArr));
}

/* create todo  */
const todo_submit = document.getElementById("todo_submit");

todo_submit.addEventListener("click", createTodo);

function createTodo() {
  const todo_div = document.createElement("div");
  const input_val = document.getElementById("todo_input").value;         
  const txt = document.createTextNode(input_val);

  todo_div.appendChild(txt);
  todo_div.classList.add("todo");
  todo_div.setAttribute("draggable", "true");

  /* create span */
  const span = document.createElement("span");
  const span_txt = document.createTextNode("\u00D7");
  span.classList.add("close");
  span.appendChild(span_txt);

  todo_div.appendChild(span);

  today.appendChild(todo_div);

  span.addEventListener("click", () => {
    removeFromLocalStorage(span.parentElement);
    span.parentElement.style.display = "none";
    
  });
  //   console.log(todo_div);

  todo_div.addEventListener("dragstart", dragStart);
  todo_div.addEventListener("dragend", dragEnd);

  // run save to localStorage
  saveToLocalStorage(input_val, "today");

  //
  // document.getElementById("todo_input").value = "";
  todo_form.classList.remove("active");
  overlay.classList.remove("active");
}

const close_btns = document.querySelectorAll(".close");

close_btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    
    btn.parentElement.style.display = "none";
  });
});

