const SALONES_INIT = [

];

const STORAGE_KEY = "salones_eventos";

function inicializarStorage() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SALONES_INIT));
  }
}

function obtenerSalones() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function guardarSalones(salones) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(salones));
}

function renderizarTabla() {
  const salones = obtenerSalones();
  const tbody = document.querySelector("#tablaSalones tbody");
  tbody.innerHTML = "";

  salones.forEach((salon, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
        <td data-label="Nombre">${salon.nombre}</td>
        <td data-label="Dirección">${salon.direccion}</td>
        <td data-label="Capacidad">${salon.capacidad}</td>
        <td data-label="Acciones">
            <button onclick="editarSalon(${index})">Editar</button>
            <button onclick="eliminarSalon(${index})">Eliminar</button>
        </td>
        `;
    tbody.appendChild(fila);
  });
}

window.editarSalon = (index) => {
  const salones = obtenerSalones();
  const salon = salones[index];
  document.querySelector("#nombre").value = salon.nombre;
  document.querySelector("#direccion").value = salon.direccion;
  document.querySelector("#capacidad").value = salon.capacidad;
  document.querySelector("#salonForm").dataset.editIndex = index;
};

window.eliminarSalon = (index) => {
  const salones = obtenerSalones();
  salones.splice(index, 1);
  guardarSalones(salones);
  renderizarTabla();
};

document.addEventListener("DOMContentLoaded", () => {
  inicializarStorage();
  renderizarTabla();

  document.querySelector("#salonForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.querySelector("#nombre").value.trim();
    const direccion = document.querySelector("#direccion").value.trim();
    const capacidad = parseInt(document.querySelector("#capacidad").value);
    const salones = obtenerSalones();
    const index = e.target.dataset.editIndex;

    const nuevoSalon = { nombre, direccion, capacidad };

    if (index !== undefined) {
      salones[index] = nuevoSalon;
      delete e.target.dataset.editIndex;
    } else {
      salones.push(nuevoSalon);
    }

    guardarSalones(salones);
    renderizarTabla();
    e.target.reset();
  });
});
