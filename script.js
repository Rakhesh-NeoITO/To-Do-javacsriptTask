let initialTextField = document.getElementById("initialTextField");
let taskContainer = document.getElementById("taskContainer");
let succeessDiv = document.getElementById('successDiv');
let errorDiv = document.getElementById('errorDiv');

// Add button
todoForm.addEventListener("submit", function (e) {
  e.preventDefault();

  if (initialTextField.value != "") {
    let newTask = document.createElement('div');
    newTask.className = 'newTask'
    newTask.style.width = '85%';

    newTask.innerHTML = `
          <div  class="taskDiv  h-32 bg-orange-700 rounded-md flex flex-col sm:flex-row items-center justify-evenly sm:justify-between p-5 mb-5">
               <input type="text" maxlength="35" name=""  value="${initialTextField.value}" readonly class="inputField bg-inherit text-white font-bold text-lg w-11/12 focus:outline-none">
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

    if(taskContainer.querySelectorAll('.taskDiv').length = 0) {
      taskContainer.style.height = 'auto';
    } else if(taskContainer.querySelectorAll('.taskDiv').length > 3) {
      taskContainer.style.height = '440' + 'px';
      taskContainer.style.overflow = 'auto';
      console.log(taskContainer.querySelectorAll('.taskDiv').length, 'dd')
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
    
    let saveButtonDiv = `<button  class="saveTask h-8 w-8 border-2 rounded-full">
      <img src="./icons/floppy-disk-solid.svg" alt="" class="h-4  text-white fill-stone-50 m-auto">
      </button>`;

    let inputField = parentDiv.querySelector(".inputField");
    inputField.removeAttribute("readonly");
    inputField.style.borderWidth = "2px";
    inputField.style.borderColor = "white";
    inputField.style.borderRadius = "2px";
    inputField.style.color = "white";
    inputField.style.textDecoration = "none";

    editButton.remove();
    
    buttonDiv.insertAdjacentHTML('afterbegin', saveButtonDiv);
      
    // Save Button
    let saveButton = parentDiv.querySelector('.saveTask')
    saveButton.addEventListener("click", function (event) {
      if (inputField.value != "" ) {
        
        inputField.readOnly = true;
        inputField.style.borderWidth = "0px";
        inputField.style.borderColor = "none";
        inputField.style.borderRadius = "0px";
        inputField.style.color = "white";
        parentDiv.style.backgroundColor ="rgb(194 65 12 / var(--tw-bg-opacity))";
    
        saveButton.remove();
        let editButtonDiv = `<button  class="editTask h-8 w-8 border-2 rounded-full" onclick="editTask(event)">
            <img src="./icons/pen-solid.svg" alt="" class="h-4  text-white fill-stone-50 m-auto">
            </button>`;
            
        let completeButton = `<button  class="completeTask h-8 w-8 border-2 rounded-full" onclick="completeTask(event)">
                <img src="./icons/check-solid.svg" alt="" class="h-4  text-white fill-stone-50 m-auto">
              </button>`
        
        let undoButton = parentDiv.querySelector('.undoComplete')

        buttonDiv.insertAdjacentHTML('afterbegin', editButtonDiv);
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
      }
    });
}

// Complete Button
function completeTask(event) {
  let parentDiv = event.target.closest(".taskDiv");
      let buttonDiv = parentDiv.querySelector(".buttonDiv");
      let inputField = parentDiv.querySelector(".inputField");
      let completeButton = parentDiv.querySelector(".completeTask");
      let removeButton = parentDiv.querySelector('.removeTask')
      
      
      parentDiv.style.backgroundColor = "darkgreen";
      inputField.style.textDecoration = "line-through";
      inputField.style.textDecorationColor = "black";
      inputField.style.textDecorationThickness = "2px";
      let undoButtonDiv = `<button   class="undoComplete h-8 w-8 border-2 rounded-full">
          <img src="./icons/rotate-left-solid.svg" alt="" class="h-4  text-white fill-stone-50 m-auto">
          </button>`;

          completeButton.remove();
          removeButton.insertAdjacentHTML('beforebegin', undoButtonDiv);

      // Undo Button
      let undoButton = parentDiv.querySelector('.undoComplete')
      undoButton.addEventListener("click", function () {
        parentDiv.style.backgroundColor ="rgb(194 65 12 / var(--tw-bg-opacity))";
        inputField.style.textDecoration = "none";
        

        buttonDiv.replaceChild(completeButton, undoButton);

        
      });
}

// Remove Task
function removeTask(event) {
  createBlurBackground();
 
  let selectDiv = event.target.closest('.newTask')
  
  let deleteConfirm = document.querySelector('.deleteConfirm')
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
  }

  if (filterStatus.value == "completed") {
    taskArray.forEach((element) => {
      element.style.display = "none";
    });
    let result = taskArray.filter(
      (task) => task.style.backgroundColor == "darkgreen"
    );

    result.forEach((element) => {
      element.style.display = "flex";
    });
  }

  if (filterStatus.value == "to-do") {
    taskArray.forEach((element) => {
      element.style.display = "none";
    });
    let result = taskArray.filter(
      (task) => task.style.backgroundColor != "darkgreen"
    );

    result.forEach((element) => {
      element.style.display = "flex";
    });

  }
});

function createBlurBackground() {
 let blurBackGround = document.querySelector('.blurBackGround');
 blurBackGround.style.display = 'flex';
 blurBackGround.style.zIndex = 100;

 
  
}


