let initialTextField = document.getElementById("initialTextField");
let taskContainer = document.getElementById("taskContainer");
let succeessDiv = document.getElementById('successDiv');
let errorDiv = document.getElementById('errorDiv');
let localArray = [];

window.onload = () => {
  let todoList = JSON.parse(localStorage.getItem("todoList"));
  if(todoList) {
    todoList.forEach(element => {
      let newTask = document.createElement('div');
      newTask.className = 'newTask'
      newTask.style.width = '85%';

      if(element.backgroundColor != "green") {
        
        newTask.innerHTML = `<div  class="taskDiv  h-32  rounded-md flex flex-col sm:flex-row items-center justify-evenly sm:justify-between p-5 mb-5">
            <div>
            <span class="taskAddDate text-white">${element.time}</span>
            <input type="text" maxlength="35" name=""  value="${element.text}" readonly class="inputField  bg-inherit text-white font-bold text-lg w-11/12 focus:outline-none">
            </div>
                 
              <div  class="buttonDiv flex flex-row sm:flex-col gap-2 ">
                <button  class="editTask h-8 w-8 border-2 rounded-full" onclick="editTask(event)">
                  <img src="./icons/pen-solid.svg" alt="" class="h-4  text-white fill-stone-50 m-auto">
                </button>
                <button  class="completeTask h-8 w-8 border-2 rounded-full" onclick="completeTask(event)">
                  <img src="./icons/check-solid.svg" alt="" class="h-4  text-white fill-stone-50 m-auto">
                </button>
                <button  class="removeTask h-8 w-8 border-2 rounded-full" onclick="removeTask(event)">
                  <img src="./icons/trash-solid.svg" alt="" class="h-4  text-white fill-stone-50 m-auto">
                </button>
              </div>
            </div>`;
        taskContainer.prepend(newTask);
        newTask.querySelector('.taskDiv').style.backgroundColor = "#c05621";
        let taskObj = {
          text:element.text,
          time:element.time,
          backgroundColor: 'orange'
        };
        localArray.push(taskObj );
      } else {
        newTask.innerHTML = `
            <div  class="taskDiv  h-32  rounded-md flex flex-col sm:flex-row items-center justify-evenly sm:justify-between p-5 mb-5">
            <div>
            <span class="taskAddDate text-white">${element.time}</span>
            <input type="text" maxlength="35" name=""  value="${element.text}" readonly class="inputField line-through decoration-black text bg-inherit text-white font-bold text-lg w-11/12 focus:outline-none">
            </div>
                 
              <div  class="buttonDiv flex flex-row sm:flex-col gap-2 ">
                <button  class="editTask h-8 w-8 border-2 rounded-full" onclick="editTask(event)">
                  <img src="./icons/pen-solid.svg" alt="" class="h-4  text-white fill-stone-50 m-auto">
                </button>
                <button   class="undoComplete h-8 w-8 border-2 rounded-full">
                  <img src="./icons/rotate-left-solid.svg" alt="" class="h-4  text-white fill-stone-50 m-auto">
                </button>
                <button  class="removeTask h-8 w-8 border-2 rounded-full" onclick="removeTask(event)">
                  <img src="./icons/trash-solid.svg" alt="" class="h-4  text-white fill-stone-50 m-auto">
                </button>
              </div>
            </div>`;
        taskContainer.prepend(newTask);
        newTask.querySelector('.taskDiv').style.backgroundColor = "#276749";

        let taskObj = {
          text:element.text,
          time:element.time,
          backgroundColor: 'green'
        };

        localArray.push(taskObj );

        let undoButton = newTask.querySelector('.undoComplete');
        let taskDiv = newTask.querySelector('.taskDiv');
        let inputField = newTask.querySelector('.inputField');
        let taskDate = newTask.querySelector('.taskAddDate').innerText;
        let removeButton = newTask.querySelector('.removeTask')
        
        let completeButton = `<button  class="completeTask h-8 w-8 border-2 rounded-full" onclick="completeTask(event)">
            <img src="./icons/check-solid.svg" alt="" class="h-4  text-white fill-stone-50 m-auto">
          </button>`;

          undoButton.addEventListener("click", function () {
            taskDiv.style.backgroundColor ="#c05621";
            inputField.style.textDecoration = "none";

            let todoList = JSON.parse(localStorage.getItem("todoList"));
            todoList.forEach(element => {
              if(element.time == taskDate) {
                element.backgroundColor = "orange";
              }
            });
            localStorage.clear();
            localStorage.setItem("todoList", JSON.stringify(todoList));
      
            undoButton.remove();
            removeButton.insertAdjacentHTML('beforebegin', completeButton);
          });
      }

      if(taskContainer.querySelectorAll('.taskDiv').length = 0) {
        taskContainer.style.height = 'auto';
      } else if(taskContainer.querySelectorAll('.taskDiv').length > 3) {
                taskContainer.style.height = '440' + 'px';
                taskContainer.style.overflow = 'auto';

                let allTasks = taskContainer.querySelectorAll('.taskDiv');
                taskContainer.addEventListener('scroll', function() {
                  allTasks.forEach(task => {
                    if( task.getBoundingClientRect().bottom < 775 ) task.style.visibility = 'visible';
                    else  task.style.visibility = 'hidden';
                  }); 
                });
              }
    });
  }
  localStorage.setItem("todoList", JSON.stringify(localArray));
}

// Add button
todoForm.addEventListener("submit", function (e) {
  e.preventDefault();

  if (initialTextField.value != "") {
    let newTask = document.createElement('div');
    newTask.className = 'newTask'
    newTask.style.width = '85%';
    let newDate = new Date();
    let year =newDate.getFullYear();
    let month = newDate.toLocaleString('default', { month: 'short' });
    let date = newDate.getDate();
    let hour = newDate.getHours();
    let minute = newDate.getMinutes();
    let second = newDate.getSeconds();
    
    (second < 10) ? second='0'+second:  second;
    (minute < 10) ? minute='0'+minute:  minute;
    (hour < 10) ? hour='0'+hour:  hour;
    (date < 10) ? date='0'+date:  date;
   

    newTask.innerHTML = `
          <div  class="taskDiv  h-32 bg-[#c05621] rounded-md flex flex-col sm:flex-row items-center justify-evenly sm:justify-between p-5 mb-5">
          
          <div>
          <span class="taskAddDate text-white"> ${year}:${month}:${date}, ${hour}:${minute}:${second}</span>
          <input type="text" maxlength="35" name=""  value="${initialTextField.value}" readonly class="inputField bg-inherit text-white font-bold text-lg w-11/12 focus:outline-none">
          </div>
               
            <div  class="buttonDiv flex flex-row sm:flex-col gap-2 ">
              <button  class="editTask h-8 w-8 border-2 rounded-full" onclick="editTask(event)">
                <img src="./icons/pen-solid.svg" alt="" class="h-4  text-white fill-stone-50 m-auto">
              </button>
              <button  class="completeTask h-8 w-8 border-2 rounded-full" onclick="completeTask(event)">
                <img src="./icons/check-solid.svg" alt="" class="h-4  text-white fill-stone-50 m-auto">
              </button>
              <button  class="removeTask h-8 w-8 border-2 rounded-full" onclick="removeTask(event)">
                <img src="./icons/trash-solid.svg" alt="" class="h-4  text-white fill-stone-50 m-auto">
              </button>
            </div>
          </div>`;

          let taskObj = {
            text:initialTextField.value,
            time:year+':'+month+':'+date+', '+hour+':'+minute+':'+second,
            backgroundColor: 'orange'
          };
          localArray.push(taskObj );
          localStorage.setItem("todoList", JSON.stringify(localArray));
         
    taskContainer.prepend(newTask);

    if(taskContainer.querySelectorAll('.taskDiv').length = 0) {
      taskContainer.style.height = 'auto';
    } else if(taskContainer.querySelectorAll('.taskDiv').length > 3) {
      taskContainer.style.height = '440' + 'px';
      taskContainer.style.overflow = 'auto';
      taskContainer.scrollTo(pageXOffset, 0);
      
      
    }
    
    createBlurBackground();

    succeessDiv.style.zIndex = 111;
    succeessDiv.style.display = 'flex';

    setTimeout(function() {
     succeessDiv.style.display = 'none';
      document.querySelector('.blurBackGround').style.display = 'none';
    }, 1000)
  } else {
    createBlurBackground();
    errorDiv.style.zIndex = 111;
    errorDiv.style.display = 'flex';

    setTimeout(function() {
      errorDiv.style.display = 'none';
       document.querySelector('.blurBackGround').style.display = 'none';
     },1000);

    setTimeout(function() {
      initialTextField.focus()
    },1000)
  }

  initialTextField.value = "";
  initialTextField.style.focus = "none";
  document.getElementById("status").value = "all";
  let tasksList = document.querySelectorAll(".taskDiv");
  let taskArray = Array.from(tasksList);

  if (filterStatus.value == "all") {
    taskArray.forEach((element) => {
      element.style.display = "flex";
    });
  }
  initialTextField.blur();

});

// Edit Button
function editTask(event) {

    let buttonDiv = event.target.closest(".buttonDiv");
    let editButton = event.target.closest(".editTask");
    let parentDiv = event.target.closest(".taskDiv");
    let removeButton = parentDiv.querySelector('.removeTask');
    let taskDate = parentDiv.querySelector('.taskAddDate').innerText;
    
    let saveButtonDiv = `<button  class="saveTask h-8 w-8 border-2 rounded-full">
      <img src="./icons/floppy-disk-solid.svg" alt="" class="h-4  text-white fill-stone-50 m-auto">
      </button>`;

    let inputField = parentDiv.querySelector(".inputField");
   
    
    inputField.removeAttribute("readonly");
    inputField.style.borderWidth = "2px";
    inputField.style.borderColor = "white";
    inputField.style.borderRadius = "2px";
    let end = inputField.value.length;
    inputField.setSelectionRange(end, end);
    inputField.focus()
    inputField.style.color = "white";
    inputField.style.textDecoration = "none";
    
    let allTasks = taskContainer.querySelectorAll("#taskContainer button");
    for (let el of allTasks) { el.disabled = true; }
    let otherElements = document.querySelectorAll("#todoForm input, #todoForm button");
    for (let el of otherElements) { el.disabled = true; } 
    let filterStatus = document.getElementById('status');
    filterStatus.disabled = true;
    
    

    editButton.remove();
    
    buttonDiv.insertAdjacentHTML('afterbegin', saveButtonDiv);
      
    // Save Button
    let saveButton = parentDiv.querySelector('.saveTask')
    saveButton.addEventListener("click", function (event) {
      if (inputField.value != "" ) {
        let todoList = JSON.parse(localStorage.getItem("todoList"));
        todoList.forEach(element => {
          if(element.time == taskDate) {
            element.text = inputField.value;
            element.backgroundColor = "orange";
          }
        });

        localStorage.clear();
        localStorage.setItem("todoList", JSON.stringify(todoList));
 
        inputField.readOnly = true;
        inputField.style.borderWidth = "0px";
        inputField.style.borderColor = "none";
        inputField.style.borderRadius = "0px";
        inputField.style.color = "white";
        inputField.style.textDecoration = "none";
        parentDiv.style.backgroundColor ="#c05621";
    
        saveButton.remove();
        let editButtonDiv = `<button  class="editTask h-8 w-8 border-2 rounded-full" onclick="editTask(event)">
            <img src="./icons/pen-solid.svg" alt="" class="h-4  text-white fill-stone-50 m-auto">
            </button>`;
            
        let completeButton = `<button  class="completeTask h-8 w-8 border-2 rounded-full" onclick="completeTask(event)">
                <img src="./icons/check-solid.svg" alt="" class="h-4  text-white fill-stone-50 m-auto">
              </button>`
        
        let undoButton = parentDiv.querySelector('.undoComplete')

        buttonDiv.insertAdjacentHTML('afterbegin', editButtonDiv);
        
        let allTasks = taskContainer.querySelectorAll("#taskContainer button");
        for (let el of allTasks) { el.disabled = false; }
        let otherElements = document.querySelectorAll("#todoForm input, #todoForm button");
        for (let el of otherElements) { el.disabled = false; } 
        let filterStatus = document.getElementById('status');
        filterStatus.disabled = false;

        if(undoButton){
          undoButton.remove();
          removeButton.insertAdjacentHTML('beforebegin', completeButton);
        }

        createBlurBackground();

        succeessDiv.style.zIndex = 111;
        succeessDiv.style.display = 'flex';

        setTimeout(function() {
          succeessDiv.style.display = 'none';
           document.querySelector('.blurBackGround').style.display = 'none';
         },1000)

      } else {
        createBlurBackground();
        errorDiv.style.zIndex = 111;
        errorDiv.style.display = 'flex';
        
        setTimeout(function() {
          errorDiv.style.display = 'none';
           document.querySelector('.blurBackGround').style.display = 'none';
         },1000);
        setTimeout(function() {
          inputField.focus()
        },1000)
      }
    });
}

// Complete Button
function completeTask(event) {
    let parentDiv = event.target.closest(".taskDiv");
    let buttonDiv = parentDiv.querySelector(".buttonDiv");
    let inputField = parentDiv.querySelector(".inputField");
    let completeButton = parentDiv.querySelector(".completeTask");
    let removeButton = parentDiv.querySelector('.removeTask');
    let taskDate = parentDiv.querySelector('.taskAddDate').innerText;
        
    parentDiv.style.backgroundColor = "#276749";
    inputField.style.textDecoration = "line-through";
    inputField.style.textDecorationColor = "black";
    inputField.style.textDecorationThickness = "4px";
    let undoButtonDiv = `<button   class="undoComplete h-8 w-8 border-2 rounded-full">
        <img src="./icons/rotate-left-solid.svg" alt="" class="h-4  text-white fill-stone-50 m-auto">
        </button>`;

    completeButton.remove();
    removeButton.insertAdjacentHTML('beforebegin', undoButtonDiv);


    let todoList = JSON.parse(localStorage.getItem("todoList"));
    todoList.forEach(element => {
      if(element.time == taskDate) {
        element.backgroundColor = "green";
      }
    });
    localStorage.clear();
    localStorage.setItem("todoList", JSON.stringify(todoList));

    // Undo Button
    let undoButton = parentDiv.querySelector('.undoComplete')
      undoButton.addEventListener("click", function () {
        parentDiv.style.backgroundColor ="#c05621";
        inputField.style.textDecoration = "none";

          let todoList = JSON.parse(localStorage.getItem("todoList"));
          todoList.forEach(element => {
            if(element.time == taskDate) {
              element.backgroundColor = "orange";
            }
          });
          localStorage.clear();
          localStorage.setItem("todoList", JSON.stringify(todoList));
    
        buttonDiv.replaceChild(completeButton, undoButton);
    
    });
}

// Remove Task
function removeTask(event) {
  createBlurBackground();
  let selectDiv = event.target.closest('.newTask');
  let taskDate = selectDiv.querySelector('.taskAddDate').innerText;
  let deleteConfirm = document.querySelector('.deleteConfirm');

  deleteConfirm.style.zIndex = 111;
  deleteConfirm.style.display = 'flex';
  let deletetask = deleteConfirm.querySelector('.deleteTask');

  let result = deletetask.addEventListener('click', function (event) {
    event.target.closest('.deleteConfirm').style.display = 'none';
    document.querySelector('.blurBackGround').style.display = 'none';
    selectDiv.remove();

    if(taskContainer.querySelectorAll('.taskDiv').length <= 3) {
      taskContainer.style.height = 'auto';
      taskContainer.style.overflow = 'hidden';
    }

    let todoList = JSON.parse(localStorage.getItem("todoList"));

    let localStorageFiltered = todoList.filter(  
      (list) => list.time !== taskDate
    );

    localArray = [];
    localStorage.clear();

    localStorageFiltered.forEach((element) => {
      localArray.push(element);
    });

    localStorage.setItem("todoList", JSON.stringify(localArray));
  } )
     
}

function undoDelete(event) {
  event.target.closest('.deleteConfirm').style.display = 'none';
  document.querySelector('.blurBackGround').style.display = 'none';
}

// Filtering
let filterStatus = document.getElementById("status");

filterStatus.addEventListener("change", function () {
  let tasksList = document.querySelectorAll(".taskDiv");
  let taskArray = Array.from(tasksList);

  if (filterStatus.value == "all") {

    taskArray.forEach((element) => {
      element.style.display = "flex";
    });

    if(taskArray.length >= 3) {
      taskContainer.style.height = '440' + 'px';
      taskContainer.style.overflow = 'auto';
    }
  }

  if (filterStatus.value == "completed") {

    taskArray.forEach((element) => {
      element.style.display = "none";
    });

    let result = taskArray.filter(
      (task) => task.style.backgroundColor == "rgb(39, 103, 73)"
    );

    result.forEach((element) => {
      element.style.display = "flex";
    });

    if(result.length <= 3) {
      taskContainer.style.height = 'auto';
      taskContainer.style.overflow = 'hidden';
    }else {
      taskContainer.style.height = '440' + 'px';
      taskContainer.style.overflow = 'auto';
    }
  }

  if (filterStatus.value == "to-do") {
    taskArray.forEach((element) => {
      element.style.display = "none";
    });

    let result = taskArray.filter(
      (task) => task.style.backgroundColor != "rgb(39, 103, 73)"
    );

    result.forEach((element) => {
      element.style.display = "flex";
    });

    if(result.length <= 3) {
      taskContainer.style.height = 'auto';
      taskContainer.style.overflow = 'hidden';
    }else {
      taskContainer.style.height = '440' + 'px';
      taskContainer.style.overflow = 'auto';
    }
  }
});

function createBlurBackground() {
 let blurBackGround = document.querySelector('.blurBackGround');
 blurBackGround.style.display = 'flex';
 blurBackGround.style.zIndex = 100;

}