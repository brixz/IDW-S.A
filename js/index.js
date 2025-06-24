document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("salonesContainer");
  const salones = JSON.parse(localStorage.getItem("salones")) || [];

  if (salones.length === 0) {
    contenedor.innerHTML = `<p class="text-center">No hay salones cargados aún.</p>`;
    return;
  }

  salones.forEach(salon => {
    const div = document.createElement("div");
    div.className = "col-12 col-md-6 col-lg-3 mb-4";

    div.innerHTML = `
      <div class="card h-100 text-center">
        <img src="${salon.imagen}" class="card-img-top img-fluid" alt="Imagen de salón">
        <div class="card-body">
          <h5 class="card-title">${salon.titulo}</h5>
          <p class="card-text">${salon.descripcion}</p>
          <p class="card-text"><strong>Dirección:</strong> ${salon.direccion}</p>
          <p class="card-text"><strong>Valor:</strong> $${salon.valor}</p>
          <p class="card-text"><strong>Estado:</strong> ${salon.estado}</p>
        </div>
      </div>
    `;
    contenedor.appendChild(div);
  });
});


