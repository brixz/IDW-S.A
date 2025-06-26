if (!sessionStorage.getItem('accessToken')) {
  window.location.href = 'login.html';
}

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
      const o = document.createElement("option");
      o.value = s.titulo; o.textContent = s.titulo;
      salonSelect.appendChild(o);
    });
  }

  function cargarServicios() {
    listaServicios.innerHTML = "";
    servicios.forEach(s => {
      const div = document.createElement("div");
      div.className = "form-check";
      div.innerHTML = `
        <input class="form-check-input" type="checkbox"
               id="serv-${s.id}" value="${s.id}" data-valor="${s.valor}">
        <label class="form-check-label" for="serv-${s.id}">
          ${s.descripcion} ($${s.valor})
        </label>`;
      listaServicios.appendChild(div);
    });
  }

  function calcularTotal() {
    let total = 0;
    listaServicios.querySelectorAll("input:checked")
      .forEach(i => total += +i.dataset.valor);
    const sel = salones.find(x => x.titulo === salonSelect.value);
    if (sel) total += +sel.valor;
    totalSpan.textContent = total.toFixed(2);
    return total;
  }

  listaServicios.addEventListener("change", calcularTotal);

  function renderPresupuestos() {
    tabla.innerHTML = "";
    presupuestos.forEach(p => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${p.nombre}</td>
        <td>${p.fecha}</td>
        <td>${p.tematica}</td>
        <td>${p.salon}</td>
        <td>${p.servicios.map(id => {
          const s = servicios.find(x=>x.id===id);
          return s? s.descripcion : "";
        }).join(", ")}</td>
        <td>$${p.total}</td>`;
      tabla.appendChild(tr);
    });
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const total = calcularTotal();
    const servSel = Array.from(
      listaServicios.querySelectorAll("input:checked")
    ).map(i=>+i.value);
    presupuestos.push({
      id: Date.now(),
      nombre: nombre.value,
      fecha: fecha.value,
      tematica: tematica.value,
      salon: salonSelect.value,
      servicios: servSel,
      total
    });
    localStorage.setItem("presupuestos", JSON.stringify(presupuestos));
    form.reset(); totalSpan.textContent = "0.00";
    renderPresupuestos();
  });

  cargarSalones();
  cargarServicios();
  renderPresupuestos();
});