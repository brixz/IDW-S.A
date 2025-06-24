document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("salonForm");
  const titulo = document.getElementById("titulo");
  const descripcion = document.getElementById("descripcion");
  const direccion = document.getElementById("direccion");
  const valor = document.getElementById("valor");
  const estado = document.getElementById("estado");
  const idInput = document.getElementById("salonId");
  const imagen = document.getElementById("imagen");
  const tabla = document.getElementById("tablaSalones").querySelector("tbody");

  let salones = JSON.parse(localStorage.getItem("salones")) || [];

  function renderTabla() {
    tabla.innerHTML = "";
    salones.forEach(salon => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${salon.titulo}</td>
        <td>${salon.direccion}</td>
        <td>$${salon.valor}</td>
        <td>${salon.estado}</td>
        <td>
          <button class="btn btn-sm btn-warning me-2" onclick="editarSalon(${salon.id})">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="eliminarSalon(${salon.id})">Eliminar</button>
        </td>
      `;
      tabla.appendChild(fila);
    });
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const id = idInput.value ? parseInt(idInput.value) : Date.now();
    const nuevoSalon = {
      id,
      titulo: titulo.value,
      descripcion: descripcion.value,
      direccion: direccion.value,
      valor: parseFloat(valor.value),
      estado: estado.value,
      imagen: imagen.value
    };

    const index = salones.findIndex(s => s.id === id);
    if (index >= 0) {
      salones[index] = nuevoSalon;
    } else {
      salones.push(nuevoSalon);
    }

    localStorage.setItem("salones", JSON.stringify(salones));
    form.reset();
    idInput.value = "";
    renderTabla();
  });

  window.editarSalon = id => {
    const salon = salones.find(s => s.id === id);
    if (salon) {
      idInput.value = salon.id;
      titulo.value = salon.titulo;
      descripcion.value = salon.descripcion;
      direccion.value = salon.direccion;
      valor.value = salon.valor;
      estado.value = salon.estado;
      imagen.value = salon.imagen || "";
    }
  };

  window.eliminarSalon = id => {
    if (confirm("¿Estás seguro de eliminar este salón?")) {
      salones = salones.filter(s => s.id !== id);
      localStorage.setItem("salones", JSON.stringify(salones));
      renderTabla();
    }
  };

  renderTabla();
});
