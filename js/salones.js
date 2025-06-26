// bloquea acceso
if (!sessionStorage.getItem('accessToken')) {
  window.location.href = 'login.html';
}

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
    const idx = salones.findIndex(s => s.id === id);
    if (idx >= 0) salones[idx] = nuevoSalon; else salones.push(nuevoSalon);
    localStorage.setItem("salones", JSON.stringify(salones));
    form.reset(); idInput.value = "";
    renderTabla();
  });

  window.editarSalon = id => {
    const s = salones.find(x => x.id === id);
    if (!s) return;
    idInput.value = s.id;
    titulo.value = s.titulo;
    descripcion.value = s.descripcion;
    direccion.value = s.direccion;
    valor.value = s.valor;
    estado.value = s.estado;
    imagen.value = s.imagen;
  };

  window.eliminarSalon = id => {
    if (!confirm("¿Eliminar este salón?")) return;
    salones = salones.filter(x => x.id !== id);
    localStorage.setItem("salones", JSON.stringify(salones));
    renderTabla();
  };

  renderTabla();
});
