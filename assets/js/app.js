// Obtener los elementos del DOM
const popoverButton = document.getElementById("popover-button");
const popover = document.getElementById("popover");
const modal = document.getElementById("taskModal");
const form = document.getElementById("newTask");
const body = document.querySelector("tbody");
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
