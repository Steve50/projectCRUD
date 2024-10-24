// Obtener los elementos del DOM
const popoverButton = document.getElementById("popover-button");
const popover = document.getElementById("popover");
const modal = document.getElementById("taskModal");
const changeName = document.getElementsByClassName("modal-card-title")[0];
const form = document.getElementById("newTask");
const tbody = document.querySelector("tbody");
const close = document.querySelectorAll(".delete");
const btn = document.querySelector(".save");
let isEditing = false;
let editingTaskId = "";

function genarateId() {
  return Math.floor(Math.random() * 1000000);
}

// funcion para abrir el modal
popoverButton.addEventListener("click", () => {
  modal.classList.add("is-active");
  changeName.innerHTML = "Nueva Tarea";
  isEditing = false;
  form.reset();
  btn.innerHTML = "Guardar";
});

// Boton para cerrar el modal
close.forEach((btn) => {
  btn.addEventListener("click", () => {
    modal.classList.remove("is-active");
  });
});

function getLocalstorage() {
  let listTask = JSON.parse(localStorage.getItem("listTask")) || [];
  if (listTask.length > 0) {
    listTask.forEach((task) => {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
              <td>${task.name}</td>
              <td>${task.desc}</td>
              <td>
                  <button class="editTask button is-success">
                      <span class="icon">
                          <i class="fas fa-pen"></i>
                      </span>
                  </button>
                  <button class="deleteTask button is-danger">
                      <span class="icon">
                          <i class="fas fa-trash"></i>
                      </span>
                  </button>
              </td>`;
      const deleteBtn = newRow.querySelector(".deleteTask");
      deleteBtn.addEventListener("click", () => {
        removeTask(task.id);
      });
      const editBtn = newRow.querySelector(".editTask");
      editBtn.addEventListener("click", () => {
        modal.classList.add("is-active");
        changeName.innerHTML = "Modificar Tarea";
        form.nombre.value = task.name;
        form.desc.value = task.desc;
        btn.innerHTML = "Modificar";
        isEditing = true;
        editingTaskId = task.id;
      });
      tbody.appendChild(newRow);
    });
  } else {
    const noTasksRow = document.createElement("tr");
    const noTasksCell = document.createElement("td");

    // Configurar la celda para mostrar el mensaje centrado y abarcar todas las columnas
    noTasksCell.setAttribute("colspan", "3"); // Abarcar 3 columnas (ajústalo según tu tabla)
    noTasksCell.classList.add("has-text-centered"); // Centramos el texto
    noTasksCell.textContent = "No hay tareas disponibles.";

    noTasksRow.appendChild(noTasksCell); // Agregar la celda a la fila
    tbody.appendChild(noTasksRow); // Agregar la fila al tbody
  }
}

function saveLocalstorage(nameT, descT) {
  let listTask = JSON.parse(localStorage.getItem("listTask")) || [];
  let task = {
    id: genarateId(),
    name: nameT,
    desc: descT,
  };
  listTask.push(task);
  localStorage.setItem("listTask", JSON.stringify(listTask));
  if (listTask.length === 1) {
    location.reload();
  }
}

function removeTask(taskId) {
  let listTask = JSON.parse(localStorage.getItem("listTask")) || [];
  listTask = listTask.filter((task) => task.id !== taskId);
  localStorage.setItem("listTask", JSON.stringify(listTask));
  if (listTask.length === 0) {
    location.reload();
  } else {
    getLocalstorage();
  }
}

function editTask(taskName, taskDesc) {
  let listTask = JSON.parse(localStorage.getItem("listTask")) || [];
  listTask = listTask.map((task) => {
    if (task.id === editingTaskId) {
      return { id: task.id, name: taskName, desc: taskDesc };
    }
    return task;
  });
  localStorage.setItem("listTask", JSON.stringify(listTask));
  getLocalstorage();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.nombre.value.trim();
  const desc = form.desc.value.trim();
  if (isEditing) {
    editTask(name, desc);
  } else {
    saveLocalstorage(name, desc);
  }

  // Cerrar el modal después de agregar la tarea
  taskModal.classList.remove("is-active");

  // Limpiar el formulario
  form.reset();
  getLocalstorage();
});
