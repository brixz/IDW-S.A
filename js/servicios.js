if (!sessionStorage.getItem('accessToken')) {
  window.location.href = 'login.html';
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("servicioForm");
  const descripcion = document.getElementById("descripcion");
  const valor = document.getElementById("valor");
  const idInput = document.getElementById("servicioId");
  const tabla = document.getElementById("tablaServicios").querySelector("tbody");
  let servicios = JSON.parse(localStorage.getItem("servicios")) || [];

  function renderTabla() {
    tabla.innerHTML = "";
    servicios.forEach(s => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${s.id}</td>
        <td>${s.descripcion}</td>
        <td>$${s.valor}</td>
        <td>
          <button class="btn btn-sm btn-warning me-2" onclick="editarServicio(${s.id})">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="eliminarServicio(${s.id})">Eliminar</button>
        </td>`;
      tabla.appendChild(fila);
    });
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const id = idInput.value ? +idInput.value : Date.now();
    const nuevo = { id, descripcion: descripcion.value, valor: +valor.value };
    const idx = servicios.findIndex(x => x.id === id);
    if (idx >= 0) servicios[idx] = nuevo; else servicios.push(nuevo);
    localStorage.setItem("servicios", JSON.stringify(servicios));
    form.reset(); idInput.value = "";
    renderTabla();
  });

  window.editarServicio = id => {
    const s = servicios.find(x => x.id === id);
    if (!s) return;
    idInput.value = s.id;
    descripcion.value = s.descripcion;
    valor.value = s.valor;
  };

  window.eliminarServicio = id => {
    if (!confirm("¿Eliminar este servicio?")) return;
    servicios = servicios.filter(x => x.id !== id);
    localStorage.setItem("servicios", JSON.stringify(servicios));
    renderTabla();
  };

  renderTabla();
});
