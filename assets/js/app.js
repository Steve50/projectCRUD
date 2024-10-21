// Obtener los elementos del DOM
const popoverButton = document.getElementById("popover-button");
const popover = document.getElementById("popover");
const modal = document.getElementById("taskModal");
const form = document.getElementById("newTask");
const tbody = document.querySelector("tbody");
const close = document.querySelectorAll(".delete");

// Manejar el clic en el botón para mostrar/ocultar el popover
popoverButton.addEventListener("mouseover", () => {
  popover.classList.toggle("is-active");
});

// Opción para cerrar el popover al hacer clic fuera de él
document.addEventListener("mouseover", (event) => {
  if (
    !popoverButton.contains(event.target) &&
    !popover.contains(event.target)
  ) {
    popover.classList.remove("is-active");
  }
});

// funcion para abrir el modal
popoverButton.addEventListener("click", () => {
  modal.classList.add("is-active");
});

// Boton para cerrar el modal
close.forEach((button) => {
  button.addEventListener("click", () => {
    modal.classList.remove("is-active");
  });
});

function getLocalstorage() {
  let listTask = JSON.parse(localStorage.getItem("listTask")) || [];
  tbody.innerHTML = "";
  listTask.forEach((task) => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
            <td>${task.name}</td>
            <td>${task.desc}</td>
            <td>
                <button id="editTask" class="button is-success">
                    <span class="icon">
                        <i class="fas fa-pen"></i>
                    </span>
                </button>
                <button id="deleteTask" class="button is-danger">
                    <span class="icon">
                        <i class="fas fa-trash"></i>
                    </span>
                </button>
            </td>`;
    const deleteBtn = newRow.querySelector("#deleteTask");
    deleteBtn.addEventListener("click", () => {
      removeTask(task.name);
    });
    tbody.appendChild(newRow);
  });
}

function saveLocalstorage(nameT, descT) {
  let listTask = JSON.parse(localStorage.getItem("listTask")) || [];
  let task = {
    name: nameT,
    desc: descT,
  };
  listTask.push(task);
  localStorage.setItem("listTask", JSON.stringify(listTask));
}

function removeTask(taskName) {
  let listTask = JSON.parse(localStorage.getItem("listTask")) || [];
  listTask = listTask.filter((task) => task.name !== taskName);
  localStorage.setItem("listTask", JSON.stringify(listTask));
  getLocalstorage();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.nombre.value.trim();
  const desc = form.desc.value.trim();
  saveLocalstorage(name, desc);

  // Cerrar el modal después de agregar la tarea
  taskModal.classList.remove("is-active");

  // Limpiar el formulario
  form.reset();
  getLocalstorage();
});
