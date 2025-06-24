document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("servicioForm");
  const descripcion = document.getElementById("descripcion");
  const valor = document.getElementById("valor");
  const idInput = document.getElementById("servicioId");
  const tabla = document.getElementById("tablaServicios").querySelector("tbody");

  let servicios = JSON.parse(localStorage.getItem("servicios")) || [];

  function renderTabla() {
    tabla.innerHTML = "";
    servicios.forEach((servicio) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${servicio.id}</td>
        <td>${servicio.descripcion}</td>
        <td>$${servicio.valor}</td>
        <td>
          <button class="btn btn-sm btn-warning me-2" onclick="editarServicio(${servicio.id})">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="eliminarServicio(${servicio.id})">Eliminar</button>
        </td>
      `;
      tabla.appendChild(fila);
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = idInput.value ? parseInt(idInput.value) : Date.now();
    const nuevo = {
      id,
      descripcion: descripcion.value,
      valor: parseFloat(valor.value)
    };

    const index = servicios.findIndex(s => s.id === id);
    if (index >= 0) {
      servicios[index] = nuevo;
    } else {
      servicios.push(nuevo);
    }

    localStorage.setItem("servicios", JSON.stringify(servicios));
    form.reset();
    idInput.value = "";
    renderTabla();
  });

  window.editarServicio = (id) => {
    const servicio = servicios.find(s => s.id === id);
    if (servicio) {
      idInput.value = servicio.id;
      descripcion.value = servicio.descripcion;
      valor.value = servicio.valor;
    }
  };

  window.eliminarServicio = (id) => {
    if (confirm("¿Estás seguro de eliminar este servicio?")) {
      servicios = servicios.filter(s => s.id !== id);
      localStorage.setItem("servicios", JSON.stringify(servicios));
      renderTabla();
    }
  };

  renderTabla();
});
