document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("presupuestoForm");
  const nombre = document.getElementById("nombre");
  const fecha = document.getElementById("fecha");
  const tematica = document.getElementById("tematica");
  const salonSelect = document.getElementById("salon");
  const listaServicios = document.getElementById("listaServicios");
  const totalSpan = document.getElementById("total");
  const tabla = document.querySelector("#tablaPresupuestos tbody");

  const salones = JSON.parse(localStorage.getItem("salones")) || [];
  const servicios = JSON.parse(localStorage.getItem("servicios")) || [];
  const presupuestos = JSON.parse(localStorage.getItem("presupuestos")) || [];

  function cargarSalones() {
    salonSelect.innerHTML = '<option value="">Seleccionar...</option>';
    salones.forEach(s => {
      const option = document.createElement("option");
      option.value = s.nombre || s.titulo;
      option.textContent = s.nombre || s.titulo;
      salonSelect.appendChild(option);
    });
  }

  function cargarServicios() {
    listaServicios.innerHTML = "";
    servicios.forEach(s => {
      const checkbox = document.createElement("div");
      checkbox.classList.add("form-check");
      checkbox.innerHTML = `
        <input class="form-check-input" type="checkbox" id="serv-${s.id}" value="${s.id}" data-valor="${s.valor}">
        <label class="form-check-label" for="serv-${s.id}">${s.descripcion} ($${s.valor})</label>
      `;
      listaServicios.appendChild(checkbox);
    });
  }

  function calcularTotal() {
  let total = 0;

  // Sumar valor de los servicios seleccionados
  const seleccionados = listaServicios.querySelectorAll("input:checked");
  seleccionados.forEach(s => {
    total += parseFloat(s.dataset.valor);
  });

  // Sumar valor del salón seleccionado
  const salonSeleccionado = salones.find(s => s.nombre === salonSelect.value || s.titulo === salonSelect.value);
  if (salonSeleccionado) {
    total += parseFloat(salonSeleccionado.valor);
  }

  totalSpan.textContent = total.toFixed(2);
  return total;
}


  listaServicios.addEventListener("change", calcularTotal);

  function renderPresupuestos() {
    tabla.innerHTML = "";
    presupuestos.forEach(p => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${p.nombre}</td>
        <td>${p.fecha}</td>
        <td>${p.tematica}</td>
        <td>${p.salon}</td>
        <td>${p.servicios.map(id => {
          const serv = servicios.find(s => s.id === id);
          return serv ? serv.descripcion : "";
        }).join(", ")}</td>
        <td>$${p.total}</td>
      `;
      tabla.appendChild(fila);
    });
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const total = calcularTotal();
    const serviciosSeleccionados = Array.from(listaServicios.querySelectorAll("input:checked")).map(c => parseInt(c.value));
    const nuevoPresupuesto = {
      id: Date.now(),
      nombre: nombre.value,
      fecha: fecha.value,
      tematica: tematica.value,
      salon: salonSelect.value,
      servicios: serviciosSeleccionados,
      total
    };
    presupuestos.push(nuevoPresupuesto);
    localStorage.setItem("presupuestos", JSON.stringify(presupuestos));
    form.reset();
    totalSpan.textContent = 0;
    renderPresupuestos();
  });

  cargarSalones();
  cargarServicios();
  renderPresupuestos();
});

