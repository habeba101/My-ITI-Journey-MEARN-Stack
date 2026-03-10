window.onload = function () {
  getTeamNames();
  removeTask();
};
async function getTeamNames() {
  let result;
  let names;
  result = await Swal.fire({
    title: "👥 Set up your team ",
    theme: "light",
    input: "text",
    inputLabel: "Enter Team members name seperated by a comma",
    inputPlaceholder: "e.g John,Sarah,Mike,Emma",
    confirmButtonText: "Create Board",
    customClass: {
      confirmButton: "my-confirm-btn",
    },
    buttonsStyling: false,
  });
  if (result.value == "") {
    alert("Please enter the Team members Names");
    getTeamNames();
  } else {
    names = result.value.trim();
    names = names.toLowerCase();
    names = names.split(",");
    for (let i = 0; i < names.length; i++) {
      names[i] = names[i][0].toUpperCase() + names[i].slice(1);
    }
    createBoards(names);
    addTaskData();
  }
}

function createBoards(names) {
  let conatiner = document.getElementsByClassName("container")[0];
  for (let i = 0; i < names.length; i++) {
    conatiner.innerHTML += ` <div class="person">
        <h3>👤 ${names[i]}</h3>
        <p class="counter">0</p>
        <span class="dropArea"></span>
      </div> `;
  }
}

function addTaskData() {
  let addBtn = document.querySelector(".task-btn");
  let taskValue = document.querySelector(".task");
  document.getElementsByClassName("start")[0].innerHTML = "";
  let idval = 0;

  addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (taskValue.value != "") {
      addBtn.parentElement.children[1].textContent =
        parseInt(addBtn.parentElement.children[1].textContent) + 1;
      addBtn.parentElement.children[4].innerHTML += `
    <div class="taskName" draggable="true" id="id${idval}">
          <p class="name">${taskValue.value}</p>
          <button class="remove">x</button>
        </div>`;
      idval += 1;

      onDrag();
      dragOver();
      dragAndDrop();
      updateAllCounters();
    }
  });
}

function removeTask() {
  document.body.addEventListener("click", (e) => {
    if (!e.target.classList.contains("remove")) return;
    const task = e.target.closest(
      ".taskName, .not-started, .ongoing, .finished",
    );

    task.remove();
    updateAllCounters();
  });
}
function onDrag() {
  let dargArea = document.querySelectorAll(".taskName");
  dargArea.forEach((elm) => {
    elm.addEventListener("dragstart", (e) => {
      let data = e.target.id;
      e.dataTransfer.setData("task", data);
    });
  });
}
function dragOver() {
  let taskArea = document.querySelectorAll(".dropArea");
  taskArea.forEach((elm) => {
    elm.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
  });
}
function dragAndDrop() {
  let taskArea = document.querySelectorAll(".dropArea");
  taskArea.forEach((elm) => {
    elm.addEventListener("drop", (e) => {
      e.preventDefault();
      let data = e.dataTransfer.getData("task");
      let datahtml = document.getElementById(data).innerHTML;
      if (!document.getElementById(data).querySelector("select")) {
        document.getElementById(data).innerHTML = ` 
      ${datahtml}
      <br />
        <br />
            <select name="progress">
              <option value="notstarted">not started</option>
              <option value="ongoing">On going</option>
              <option value="finished">finished</option>
            </select>`;
        document.getElementById(data).classList.remove("taskName");
        document.getElementById(data).classList.add("not-started");
      }

      e.target.appendChild(document.getElementById(data));

      selection();
      updateAllCounters();
    });
  });
}

function selection() {
  let selector = document.querySelectorAll("select");
  selector.forEach(function (elm) {
    elm.addEventListener("change", function () {
      if (elm.value == "finished") {
        elm.parentElement.classList = "";
        elm.parentElement.classList.add("finished");
        elm.parentElement.draggable = false;
      } else if (elm.value == "ongoing") {
        elm.parentElement.classList = "";
        elm.parentElement.classList.add("ongoing");
        elm.parentElement.draggable = true;
      } else if (elm.value == "notstarted") {
        elm.parentElement.classList = "";
        elm.parentElement.classList.add("not-started");
        elm.parentElement.draggable = true;
      }
    });
  });
}

function updateAllCounters() {
  let taskboard = document.querySelector(".task-board");
  let Taskcounter = taskboard.querySelector(".counter");
  Taskcounter.textContent = document.querySelector(".start").children.length;
  let personBoards = document.querySelectorAll(".person");

  personBoards.forEach((elm) => {
    let persontaskCounter = elm.querySelector(".counter");
    persontaskCounter.textContent =
      elm.querySelector(".dropArea").children.length;
  });
}
